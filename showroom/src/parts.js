/* Hard parts: wheels, aero, lamps and the bits of trim that hang off the
   lofted shell. Everything here is built from primitives, extrusions and
   sweeps, then merged so the scene stays at a few dozen draw calls. */
(function (global) {
  'use strict';

  const { clamp, lerp } = MX;

  /* ---- geometry utilities ----------------------------------------------- */

  function mergeGeos(THREE, geos) {
    let vCount = 0;
    let iCount = 0;
    geos.forEach((g) => {
      if (!g.attributes.normal) g.computeVertexNormals();
      if (!g.index) {
        const n = g.attributes.position.count;
        const idx = new Uint32Array(n);
        for (let i = 0; i < n; i++) idx[i] = i;
        g.setIndex(new THREE.BufferAttribute(idx, 1));
      }
      vCount += g.attributes.position.count;
      iCount += g.index.count;
    });
    const pos = new Float32Array(vCount * 3);
    const nrm = new Float32Array(vCount * 3);
    const uv = new Float32Array(vCount * 2);
    const idx = new Uint32Array(iCount);
    let vo = 0;
    let io = 0;
    geos.forEach((g) => {
      const p = g.attributes.position.array;
      const n = g.attributes.normal.array;
      const u = g.attributes.uv ? g.attributes.uv.array : null;
      pos.set(p, vo * 3);
      nrm.set(n, vo * 3);
      if (u) uv.set(u, vo * 2);
      const gi = g.index.array;
      for (let i = 0; i < gi.length; i++) idx[io + i] = gi[i] + vo;
      vo += g.attributes.position.count;
      io += gi.length;
    });
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    out.setIndex(new THREE.BufferAttribute(idx, 1));
    return out;
  }

  /* Flat plate lying in the ground plane: outline is given in world (x, z). */
  function plate(THREE, outline, thickness, y, bevel) {
    const shape = new THREE.Shape();
    outline.forEach((p, i) => {
      if (i === 0) shape.moveTo(p[0], -p[1]);
      else shape.lineTo(p[0], -p[1]);
    });
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: !!bevel,
      bevelThickness: bevel || 0.001,
      bevelSize: bevel || 0.001,
      bevelSegments: 2,
      curveSegments: 12,
    });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, y, 0);
    return geo;
  }

  /* Vertical plate: outline given in world (x, y), extruded across z. */
  function vplate(THREE, outline, thickness, z, bevel) {
    const shape = new THREE.Shape();
    outline.forEach((p, i) => {
      if (i === 0) shape.moveTo(p[0], p[1]);
      else shape.lineTo(p[0], p[1]);
    });
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: !!bevel,
      bevelThickness: bevel || 0.001,
      bevelSize: bevel || 0.001,
      bevelSegments: 2,
      curveSegments: 16,
    });
    geo.translate(0, 0, z - thickness / 2);
    return geo;
  }

  /* Sweep a closed 2D profile along a 3D polyline with a fixed up reference. */
  function sweep(THREE, path, profile, up, caps) {
    const n = path.length;
    const m = profile.length;
    const pos = new Float32Array(n * m * 3);
    const uv = new Float32Array(n * m * 2);
    const U = up || [0, 1, 0];
    let p = 0;
    let t = 0;
    for (let i = 0; i < n; i++) {
      const a = path[Math.max(0, i - 1)];
      const b = path[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0];
      let ty = b[1] - a[1];
      let tz = b[2] - a[2];
      const tl = Math.hypot(tx, ty, tz) || 1;
      tx /= tl;
      ty /= tl;
      tz /= tl;
      // N = up x T, B = T x N
      let nx = U[1] * tz - U[2] * ty;
      let ny = U[2] * tx - U[0] * tz;
      let nz = U[0] * ty - U[1] * tx;
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl;
      ny /= nl;
      nz /= nl;
      const bx = ty * nz - tz * ny;
      const by = tz * nx - tx * nz;
      const bz = tx * ny - ty * nx;
      const c = path[i];
      const s = c[3] === undefined ? 1 : c[3];
      for (let j = 0; j < m; j++) {
        const u = profile[j][0] * s;
        const v = profile[j][1] * s;
        pos[p++] = c[0] + nx * u + bx * v;
        pos[p++] = c[1] + ny * u + by * v;
        pos[p++] = c[2] + nz * u + bz * v;
        uv[t++] = i / (n - 1);
        uv[t++] = j / m;
      }
    }
    const idx = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m; j++) {
        const j2 = (j + 1) % m;
        const v00 = i * m + j;
        const v01 = i * m + j2;
        const v10 = (i + 1) * m + j;
        const v11 = (i + 1) * m + j2;
        idx.push(v00, v10, v01, v10, v11, v01);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    if (caps) {
      // fan-cap both ends so the sweep reads as a solid
      const extra = [];
      [0, n - 1].forEach((ring, k) => {
        let cx = 0;
        let cy = 0;
        let cz = 0;
        for (let j = 0; j < m; j++) {
          cx += pos[(ring * m + j) * 3];
          cy += pos[(ring * m + j) * 3 + 1];
          cz += pos[(ring * m + j) * 3 + 2];
        }
        cx /= m;
        cy /= m;
        cz /= m;
        const cp = new Float32Array((m + 1) * 3);
        const cuv = new Float32Array((m + 1) * 2);
        cp[0] = cx;
        cp[1] = cy;
        cp[2] = cz;
        for (let j = 0; j < m; j++) {
          cp[(j + 1) * 3] = pos[(ring * m + j) * 3];
          cp[(j + 1) * 3 + 1] = pos[(ring * m + j) * 3 + 1];
          cp[(j + 1) * 3 + 2] = pos[(ring * m + j) * 3 + 2];
        }
        const ci = [];
        for (let j = 0; j < m; j++) {
          const a = 1 + j;
          const b = 1 + ((j + 1) % m);
          if (k === 0) ci.push(0, b, a);
          else ci.push(0, a, b);
        }
        const cg = new THREE.BufferGeometry();
        cg.setAttribute('position', new THREE.BufferAttribute(cp, 3));
        cg.setAttribute('uv', new THREE.BufferAttribute(cuv, 2));
        cg.setIndex(ci);
        cg.computeVertexNormals();
        extra.push(cg);
      });
      return mergeGeos(THREE, [geo].concat(extra));
    }
    return geo;
  }

  function rectProfile(w, h, r) {
    // rounded rectangle, counter-clockwise
    const pts = [];
    const seg = 4;
    const corners = [
      [w - r, h - r, 0],
      [-(w - r), h - r, Math.PI / 2],
      [-(w - r), -(h - r), Math.PI],
      [w - r, -(h - r), Math.PI * 1.5],
    ];
    corners.forEach(([cx, cy, a0]) => {
      for (let i = 0; i <= seg; i++) {
        const a = a0 + (i / seg) * (Math.PI / 2);
        pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
      }
    });
    return pts;
  }

  /* ---- wheels ------------------------------------------------------------ */

  function tyreGeometry(THREE, r, hw) {
    const prof = [];
    const pts = [
      [0.66, -0.78], [0.74, -0.9], [0.82, -0.98], [0.875, -1.0], [0.925, -0.985],
      [0.958, -0.95], [0.982, -0.9], [0.995, -0.8], [1.0, -0.62], [1.0, -0.3],
      [1.0, 0], [1.0, 0.3], [1.0, 0.62], [0.995, 0.8], [0.982, 0.9],
      [0.958, 0.95], [0.925, 0.985], [0.875, 1.0], [0.82, 0.98], [0.74, 0.9],
      [0.66, 0.78],
    ];
    pts.forEach(([rr, aa]) => prof.push(new THREE.Vector2(rr * r, aa * hw)));
    const geo = new THREE.LatheGeometry(prof, 84);
    geo.rotateX(Math.PI / 2);
    return geo;
  }

  function spokeGeometry(THREE, rimR, count, depth) {
    const hubR = rimR * 0.20;
    const outR = rimR * 0.985;
    const shape = new THREE.Shape();
    const wHub = 0.052;
    const wMid = 0.030;
    const wOut = 0.062;
    shape.moveTo(hubR, -wHub);
    shape.bezierCurveTo(rimR * 0.45, -wMid * 1.35, rimR * 0.72, -wMid, outR, -wOut);
    shape.lineTo(outR, wOut);
    shape.bezierCurveTo(rimR * 0.72, wMid, rimR * 0.45, wMid * 1.35, hubR, wHub);
    shape.closePath();
    const one = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
      curveSegments: 10,
    });
    // dish the face: the outer end of each spoke stands proud of the hub
    const pa = one.attributes.position.array;
    for (let i = 0; i < pa.length; i += 3) {
      const rad = Math.hypot(pa[i], pa[i + 1]) / rimR;
      pa[i + 2] += 0.055 * rad * rad;
    }
    one.computeVertexNormals();
    const all = [];
    for (let k = 0; k < count; k++) {
      const g = one.clone();
      g.rotateZ((k / count) * Math.PI * 2);
      all.push(g);
    }
    one.dispose();
    return mergeGeos(THREE, all);
  }

  function buildWheel(THREE, mats, size) {
    const r = size.radius;
    const hw = size.halfWidth;
    const rimR = r * 0.735;

    const spin = new THREE.Group();

    const tyre = new THREE.Mesh(tyreGeometry(THREE, r, hw), mats.tyre);
    tyre.castShadow = true;
    spin.add(tyre);

    const rimParts = [];
    // barrel
    const barrel = new THREE.CylinderGeometry(rimR * 0.99, rimR * 0.99, hw * 1.75, 56, 1, true);
    barrel.rotateX(Math.PI / 2);
    rimParts.push(barrel);
    // outer lip
    const lip = new THREE.TorusGeometry(rimR * 0.995, 0.014, 8, 64);
    lip.translate(0, 0, hw * 0.87);
    rimParts.push(lip);
    // inner face closing the barrel
    const back = new THREE.CircleGeometry(rimR * 0.99, 48);
    back.rotateY(Math.PI);
    back.translate(0, 0, -hw * 0.86);
    rimParts.push(back);
    // spokes and hub
    const spokes = spokeGeometry(THREE, rimR, 10, 0.026);
    spokes.translate(0, 0, hw * 0.30);
    rimParts.push(spokes);
    const hub = new THREE.CylinderGeometry(rimR * 0.235, rimR * 0.26, 0.09, 28);
    hub.rotateX(Math.PI / 2);
    hub.translate(0, 0, hw * 0.40);
    rimParts.push(hub);

    const rim = new THREE.Mesh(mergeGeos(THREE, rimParts), mats.rim);
    rim.castShadow = true;
    spin.add(rim);

    // centre lock
    const lockParts = [];
    const nut = new THREE.CylinderGeometry(0.048, 0.052, 0.05, 6);
    nut.rotateX(Math.PI / 2);
    nut.rotateZ(0.3);
    nut.translate(0, 0, hw * 0.46);
    lockParts.push(nut);
    const cap = new THREE.CylinderGeometry(0.03, 0.03, 0.012, 20);
    cap.rotateX(Math.PI / 2);
    cap.translate(0, 0, hw * 0.5);
    lockParts.push(cap);
    const lock = new THREE.Mesh(mergeGeos(THREE, lockParts), mats.lock);
    lock.castShadow = true;
    spin.add(lock);

    // brake rotor
    const rotorR = r * 0.66;
    const rotor = new THREE.Mesh(
      new THREE.CylinderGeometry(rotorR, rotorR, 0.034, 56, 1, false),
      mats.rotor
    );
    rotor.geometry.rotateX(Math.PI / 2);
    rotor.position.z = hw * 0.02;
    spin.add(rotor);

    const group = new THREE.Group();
    group.add(spin);

    // caliper stays with the upright, so it does not spin with the wheel
    const calParts = [];
    const body = new THREE.TorusGeometry(rotorR * 0.9, 0.052, 10, 22, 1.0);
    body.rotateZ(Math.PI * 0.62);
    calParts.push(body);
    const bridge = new THREE.BoxGeometry(0.07, 0.14, 0.055);
    bridge.translate(-rotorR * 0.62, rotorR * 0.62, 0);
    calParts.push(bridge);
    const cal = new THREE.Mesh(mergeGeos(THREE, calParts), mats.caliper);
    cal.scale.z = 0.85;
    cal.position.z = hw * 0.02;
    cal.castShadow = true;
    group.add(cal);

    return { group, spin };
  }

  /* ---- wheel arch liners ------------------------------------------------- */
  function archLiner(THREE, mat, r, hw) {
    const parts = [];
    const shell = new THREE.CylinderGeometry(r, r, hw * 2, 36, 1, true, -0.6, Math.PI + 1.2);
    shell.rotateX(Math.PI / 2);
    shell.rotateY(Math.PI / 2);
    parts.push(shell);
    const wall = new THREE.CircleGeometry(r, 32, -0.6 + Math.PI / 2, Math.PI + 1.2);
    wall.translate(0, 0, -hw);
    parts.push(wall);
    const m = new THREE.Mesh(mergeGeos(THREE, parts), mat);
    m.material.side = THREE.DoubleSide;
    return m;
  }


  /* Build a closed tube from a list of equal-length rings of world points. */
  function tubeFromRings(THREE, rings, capStart, capEnd) {
    const n = rings.length;
    const m = rings[0].length;
    const pos = new Float32Array(n * m * 3);
    const uv = new Float32Array(n * m * 2);
    let p = 0;
    let t = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        pos[p++] = rings[i][j][0];
        pos[p++] = rings[i][j][1];
        pos[p++] = rings[i][j][2];
        uv[t++] = i / (n - 1);
        uv[t++] = j / m;
      }
    }
    const idx = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m; j++) {
        const j2 = (j + 1) % m;
        idx.push(i * m + j, (i + 1) * m + j, i * m + j2);
        idx.push((i + 1) * m + j, (i + 1) * m + j2, i * m + j2);
      }
    }
    const capOf = (ring, reverse) => {
      const base = ring * m;
      for (let j = 1; j < m - 1; j++) {
        if (reverse) idx.push(base, base + j + 1, base + j);
        else idx.push(base, base + j, base + j + 1);
      }
    };
    if (capStart) capOf(0, true);
    if (capEnd) capOf(n - 1, false);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  }

  /* Grid surface from rows of world points (open sheet, rendered two-sided). */
  function sheet(THREE, rows) {
    const n = rows.length;
    const m = rows[0].length;
    const pos = new Float32Array(n * m * 3);
    const uv = new Float32Array(n * m * 2);
    let p = 0;
    let t = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        pos[p++] = rows[i][j][0];
        pos[p++] = rows[i][j][1];
        pos[p++] = rows[i][j][2];
        uv[t++] = i / (n - 1);
        uv[t++] = j / (m - 1);
      }
    }
    const idx = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m - 1; j++) {
        idx.push(i * m + j, (i + 1) * m + j, i * m + j + 1);
        idx.push((i + 1) * m + j, (i + 1) * m + j + 1, i * m + j + 1);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  }

  global.PARTS = {
    mergeGeos,
    plate,
    vplate,
    sweep,
    rectProfile,
    buildWheel,
    archLiner,
    tyreGeometry,
    tubeFromRings,
    sheet,
  };
})(window);
