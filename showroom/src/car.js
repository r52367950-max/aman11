/* Materials and full-vehicle assembly. Returns a rig whose parts the
   animation loop can drive: wheels spin and steer, the wing swings, the
   chassis squats and pitches on its springs, the lamps light up. */
(function (global) {
  'use strict';

  const { clamp, lerp } = MX;
  const B = BODY;
  const P = PARTS;
  const S = B.SPEC;

  const PAINTS = [
    { id: 'aurora', name: '极光青', en: 'Aurora Teal', color: 0x0f3a44, metal: 0.55, rough: 0.32 },
    { id: 'midnight', name: '深海蓝', en: 'Abyss Blue', color: 0x101f3c, metal: 0.56, rough: 0.3 },
    { id: 'graphite', name: '石墨灰', en: 'Graphite', color: 0x2b2e33, metal: 0.62, rough: 0.34 },
    { id: 'ember', name: '熔岩橙', en: 'Ember', color: 0x9c3208, metal: 0.42, rough: 0.31 },
    { id: 'pearl', name: '珠光白', en: 'Pearl', color: 0xc6c9cd, metal: 0.3, rough: 0.26 },
    { id: 'obsidian', name: '曜石黑', en: 'Obsidian', color: 0x0b0c10, metal: 0.62, rough: 0.24 },
  ];

  function makeMaterials(THREE) {
    const carbon = TX.carbonCanvases(512, 14);
    const carbonMap = TX.toTexture(THREE, carbon.color, { repeat: [7, 7], srgb: true });
    const carbonNrm = TX.toTexture(THREE, TX.heightToNormal(THREE, carbon.height, 1.5), {
      repeat: [7, 7],
    });
    const flakeNrm = TX.toTexture(THREE, TX.heightToNormal(THREE, TX.flakeHeight(256), 0.55), {
      repeat: [90, 46],
    });
    const tyre = TX.tyreCanvases();
    const honey = TX.toTexture(THREE, TX.honeycombCanvas(512, 15), { repeat: [5, 5], srgb: true });
    const rotor = TX.toTexture(THREE, TX.rotorCanvas(512), { srgb: true });

    const paint = new THREE.MeshPhysicalMaterial({
      color: PAINTS[0].color,
      metalness: PAINTS[0].metal,
      roughness: PAINTS[0].rough,
      clearcoat: 1,
      clearcoatRoughness: 0.045,
      normalMap: flakeNrm,
      normalScale: new THREE.Vector2(0.045, 0.045),
      envMapIntensity: 0.95,
    });

    const carbonMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: carbonMap,
      normalMap: carbonNrm,
      normalScale: new THREE.Vector2(0.5, 0.5),
      metalness: 0.36,
      roughness: 0.4,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      envMapIntensity: 0.75,
      side: THREE.DoubleSide,
    });

    const carbonFine = carbonMat.clone();
    carbonFine.map = carbonMap.clone();
    carbonFine.map.repeat.set(16, 16);
    carbonFine.map.needsUpdate = true;
    carbonFine.normalMap = carbonNrm.clone();
    carbonFine.normalMap.repeat.set(16, 16);
    carbonFine.normalMap.needsUpdate = true;

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x080a0e,
      metalness: 0.08,
      roughness: 0.045,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1.6,
    });

    const trim = new THREE.MeshPhysicalMaterial({
      color: 0x121317,
      metalness: 0.55,
      roughness: 0.38,
      envMapIntensity: 0.9,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.MeshStandardMaterial({
      color: 0x8d9098,
      map: honey,
      metalness: 0.55,
      roughness: 0.72,
      envMapIntensity: 0.32,
      side: THREE.DoubleSide,
    });

    const tyreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: TX.toTexture(THREE, tyre.color, { repeat: [2, 1], srgb: true }),
      roughnessMap: TX.toTexture(THREE, tyre.roughness, { repeat: [2, 1] }),
      normalMap: TX.toTexture(THREE, TX.heightToNormal(THREE, tyre.height, 1.1), {
        repeat: [2, 1],
      }),
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughness: 1,
      metalness: 0,
      envMapIntensity: 0.55,
    });

    const rim = new THREE.MeshPhysicalMaterial({
      color: 0x33363c,
      metalness: 1,
      roughness: 0.3,
      clearcoat: 0.4,
      envMapIntensity: 1.1,
    });

    const lock = new THREE.MeshStandardMaterial({
      color: 0x9a9ea6,
      metalness: 1,
      roughness: 0.28,
    });

    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: rotor,
      metalness: 0.95,
      roughness: 0.42,
    });

    const caliper = new THREE.MeshPhysicalMaterial({
      color: 0x9c6a2a,
      metalness: 0.95,
      roughness: 0.3,
      clearcoat: 0.6,
    });

    const lampWhite = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      emissive: 0xdfe9ff,
      emissiveIntensity: 3.4,
      roughness: 0.25,
      metalness: 0,
    });

    const lampRed = new THREE.MeshStandardMaterial({
      color: 0x160203,
      emissive: 0xff0806,
      emissiveIntensity: 1.9,
      roughness: 0.25,
      metalness: 0,
    });

    const lens = new THREE.MeshPhysicalMaterial({
      color: 0x05060a,
      metalness: 0.2,
      roughness: 0.08,
      clearcoat: 1,
      envMapIntensity: 1.4,
      side: THREE.DoubleSide,
    });

    const mirror = new THREE.MeshStandardMaterial({
      color: 0xb8bcc2,
      metalness: 1,
      roughness: 0.05,
    });

    const gap = new THREE.MeshStandardMaterial({
      color: 0x090a0c,
      metalness: 0.1,
      roughness: 0.95,
      envMapIntensity: 0.25,
      side: THREE.DoubleSide,
    });

    const liner = new THREE.MeshStandardMaterial({
      color: 0x0c0d10,
      metalness: 0.2,
      roughness: 0.85,
      side: THREE.DoubleSide,
    });

    return {
      paint,
      carbon: carbonMat,
      carbonFine,
      glass,
      trim,
      mesh,
      tyre: tyreMat,
      rim,
      lock,
      rotor: rotorMat,
      caliper,
      lampWhite,
      lampRed,
      lens,
      mirror,
      liner,
      gap,
    };
  }

  /* Region helper: a lens-shaped patch on the flank between two height
     curves, pinched to a point at both ends so it reads as a moulded inlet. */
  function heightRegion(yTop, yBot, x0, x1, soft) {
    const pinch = (x) => {
      const d = Math.min(Math.abs(x - x0), Math.abs(x - x1));
      return MX.smoothstep(d / soft);
    };
    return {
      lo: (x) => {
        const a = B.qAtHeight(x, yTop(x));
        const b = B.qAtHeight(x, yBot(x));
        const mid = (a + b) / 2;
        return mid + (a - mid) * pinch(x);
      },
      hi: (x) => {
        const a = B.qAtHeight(x, yTop(x));
        const b = B.qAtHeight(x, yBot(x));
        const mid = (a + b) / 2;
        return mid + (b - mid) * pinch(x);
      },
    };
  }

  function sidePanels(THREE, opts) {
    const r = heightRegion(opts.yTop, opts.yBot, opts.x0, opts.x1, opts.soft || 0.18);
    const off = opts.offset || (() => 0.004);
    const right = B.buildPatch(THREE, {
      x0: opts.x0,
      x1: opts.x1,
      nx: opts.nx || 60,
      nv: opts.nv || 18,
      qLo: r.lo,
      qHi: r.hi,
      offset: off,
    });
    const left = B.buildPatch(THREE, {
      x0: opts.x0,
      x1: opts.x1,
      nx: opts.nx || 60,
      nv: opts.nv || 18,
      qLo: (x) => -r.hi(x),
      qHi: (x) => -r.lo(x),
      offset: (fx, fv) => off(fx, 1 - fv),
    });
    return P.mergeGeos(THREE, [right, left]);
  }


  /* Panel shut lines. A car reads as sheet metal because of its gaps, so each
     seam is a hairline ribbon laid on the surface and followed in arc-length
     space, which keeps it an even width as the section changes. */
  function seam(THREE, waypoints, width, samples) {
    const n = samples || 120;
    const half = (width || 0.0055) / 2;
    const at = (t) => {
      const f = t * (waypoints.length - 1);
      const i = Math.min(waypoints.length - 2, Math.floor(f));
      const u = f - i;
      const a = waypoints[i];
      const b = waypoints[i + 1];
      // smooth the corners so the ribbon does not kink
      const e = u * u * (3 - 2 * u);
      return [lerp(a[0], b[0], e), lerp(a[1], b[1], e)];
    };
    const rows = [];
    const tmp = [0, 0, 0];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const p = at(t);
      const p0 = at(Math.max(0, t - 0.004));
      const p1 = at(Math.min(1, t + 0.004));
      const L = B.halfRingLength(p[0]) || 1;
      let dx = p1[0] - p0[0];
      let da = (p1[1] - p0[1]) * L;
      const len = Math.hypot(dx, da) || 1;
      dx /= len;
      da /= len;
      // perpendicular in (length, arc) space
      const px = -da * half;
      const pa = dx * half;
      const row = [];
      [-1, 1].forEach((sgn) => {
        const x = p[0] + sgn * px;
        const q = clamp(p[1] + (sgn * pa) / (B.halfRingLength(x) || 1), -0.999, 0.999);
        B.surfacePoint(x, q, 0.0009, tmp);
        row.push([tmp[0], tmp[1], tmp[2]]);
      });
      rows.push(row);
    }
    return P.sheet(THREE, rows);
  }

  function buildCar(THREE, mats) {
    const root = new THREE.Group();
    const chassis = new THREE.Group();
    root.add(chassis);

    const add = (geo, mat, castShadow) => {
      const m = new THREE.Mesh(geo, mat);
      m.castShadow = castShadow !== false;
      m.receiveShadow = true;
      chassis.add(m);
      return m;
    };

    /* --- painted shell + recessed tail panel ----------------------------- */
    const shell = new THREE.Mesh(
      B.buildShell(THREE, { stations: 218, ringHalf: 58 }),
      [mats.paint, mats.trim]
    );
    shell.castShadow = true;
    shell.receiveShadow = true;
    chassis.add(shell);

    /* --- canopy ---------------------------------------------------------- */
    const beltQ = (x) => B.qAtHeight(x, B.beltY(x));
    const canopy = B.buildPatch(THREE, {
      x0: 0.7,
      x1: -1.06,
      nx: 96,
      nv: 60,
      qLo: (x) => -beltQ(x),
      qHi: (x) => beltQ(x),
      offset: (fx, fv) => 0.0015 + 0.0075 * Math.sqrt(Math.sin(Math.PI * fv)),
    });
    add(canopy, mats.glass);

    /* --- carbon lower trim running the full perimeter -------------------- */
    const trimWidth = MX.pchip([
      [2.36, 0.2], [2.05, 0.17], [1.75, 0.1], [1.4, 0.075], [0.9, 0.1],
      [0.0, 0.115], [-0.9, 0.1], [-1.4, 0.075], [-1.8, 0.14], [-2.1, 0.26],
      [-2.36, 0.34],
    ]);
    const trimLo = (x) => {
      const L = B.halfRingLength(x);
      return clamp(1 - trimWidth(x) / L, 0.05, 0.995);
    };
    const bandOffset = (fx, fv) => 0.0018 + 0.0032 * MX.smoothstep(fv * 3.5);
    const bandR = B.buildPatch(THREE, {
      x0: 2.33,
      x1: -2.33,
      nx: 190,
      nv: 12,
      qLo: trimLo,
      qHi: () => 1.0,
      offset: bandOffset,
    });
    const bandL = B.buildPatch(THREE, {
      x0: 2.33,
      x1: -2.33,
      nx: 190,
      nv: 12,
      qLo: () => -1.0,
      qHi: (x) => -trimLo(x),
      offset: (fx, fv) => bandOffset(fx, 1 - fv),
    });
    add(P.mergeGeos(THREE, [bandR, bandL]), mats.carbon);

    /* --- intakes --------------------------------------------------------- */
    // deep flank scoop ahead of the rear wheels
    add(
      sidePanels(THREE, {
        x0: -0.06,
        x1: -1.14,
        yTop: (x) => 0.72 - 0.02 * x,
        yBot: () => 0.36,
        soft: 0.26,
        nx: 66,
        nv: 20,
        offset: () => 0.005,
      }),
      mats.mesh
    );
    // bumper corner vents
    add(
      sidePanels(THREE, {
        x0: 2.06,
        x1: 1.76,
        yTop: () => 0.36,
        yBot: () => 0.16,
        soft: 0.1,
        nx: 30,
        nv: 12,
        offset: () => 0.005,
      }),
      mats.mesh
    );
    // front mouth, low and wide
    add(
      sidePanels(THREE, {
        x0: 2.31,
        x1: 2.0,
        yTop: () => 0.31,
        yBot: () => 0.0,
        soft: 0.08,
        nx: 28,
        nv: 12,
        offset: () => 0.006,
      }),
      mats.mesh
    );
    // fender exit louvre
    add(
      sidePanels(THREE, {
        x0: 1.1,
        x1: 0.82,
        yTop: () => 0.8,
        yBot: () => 0.68,
        soft: 0.08,
        nx: 22,
        nv: 10,
        offset: () => 0.004,
      }),
      mats.mesh
    );
    // engine deck vent across the spine
    add(
      B.buildPatch(THREE, {
        x0: -1.06,
        x1: -1.62,
        nx: 34,
        nv: 26,
        qLo: (x) => -0.38 * MX.smoothstep((x + 1.62) / 0.16) * MX.smoothstep((-1.06 - x) / 0.16),
        qHi: (x) => 0.38 * MX.smoothstep((x + 1.62) / 0.16) * MX.smoothstep((-1.06 - x) / 0.16),
        offset: () => 0.004,
      }),
      mats.mesh
    );
    // roof duct feeding the engine
    add(
      B.buildPatch(THREE, {
        x0: -0.34,
        x1: -0.82,
        nx: 26,
        nv: 16,
        qLo: (x) => -0.12 * MX.smoothstep((x + 0.82) / 0.16) * MX.smoothstep((-0.34 - x) / 0.16),
        qHi: (x) => 0.12 * MX.smoothstep((x + 0.82) / 0.16) * MX.smoothstep((-0.34 - x) / 0.16),
        offset: () => 0.003,
      }),
      mats.trim
    );

    /* --- head and tail lamps --------------------------------------------- */
    const lampHousing = sidePanels(THREE, {
      x0: 2.26,
      x1: 1.74,
      yTop: (x) => lerp(0.585, 0.735, (x - 2.26) / (1.74 - 2.26)),
      yBot: (x) => lerp(0.475, 0.625, (x - 2.26) / (1.74 - 2.26)),
      soft: 0.12,
      nx: 40,
      nv: 14,
      offset: () => 0.004,
    });
    add(lampHousing, mats.lens);

    const drlPath = (rows, side) => {
      const pts = [];
      rows.forEach(([x, y]) => {
        const t = [0, 0, 0];
        B.surfacePoint(x, side * B.qAtHeight(x, y), 0.003, t);
        pts.push([t[0], t[1], t[2]]);
      });
      return pts;
    };
    // a single blade per side, wrapping from the fender round to the nose
    const drlBlade = [
      [1.76, 0.7], [1.9, 0.685], [2.02, 0.66], [2.12, 0.625], [2.19, 0.582],
      [2.24, 0.535],
    ];
    // short vertical fang dropping off the leading corner
    const drlFang = [
      [2.2, 0.535], [2.215, 0.485], [2.21, 0.44],
    ];
    const drlProf = P.rectProfile(0.013, 0.011, 0.004);
    const fangProf = P.rectProfile(0.012, 0.014, 0.004);
    const drlGeos = [];
    [1, -1].forEach((side) => {
      drlGeos.push(P.sweep(THREE, drlPath(drlBlade, side), drlProf, [0, 1, 0], true));
      drlGeos.push(P.sweep(THREE, drlPath(drlFang, side), fangProf, [0, 0, 1], true));
    });
    const drl = add(P.mergeGeos(THREE, drlGeos), mats.lampWhite, false);

    // tail bar sits inside the recessed panel
    const tailBarPath = [];
    for (let i = 0; i <= 40; i++) {
      const z = lerp(-0.72, 0.72, i / 40);
      tailBarPath.push([-2.318 + 0.028 * Math.pow(Math.abs(z) / 0.72, 2.4), 0.762, z]);
    }
    const tailBar = add(
      P.sweep(THREE, tailBarPath, P.rectProfile(0.013, 0.013, 0.004), [0, 1, 0], true),
      mats.lampRed,
      false
    );
    // tail bar surround
    const tailSurround = [];
    for (let i = 0; i <= 40; i++) {
      const z = lerp(-0.78, 0.78, i / 40);
      tailSurround.push([-2.272 + 0.028 * Math.pow(Math.abs(z) / 0.78, 2.4), 0.762, z]);
    }
    add(P.sweep(THREE, tailSurround, P.rectProfile(0.022, 0.03, 0.008), [0, 1, 0], true), mats.lens);

    // reversing lamps low on the panel
    [[-0.34], [0.34]].forEach(([z]) => {
      const g = new THREE.BoxGeometry(0.02, 0.036, 0.085);
      g.translate(-2.292, 0.545, z);
      add(g, mats.lampWhite, false);
    });

    /* --- vents on the tail panel and exhausts ---------------------------- */
    const tailVent = new THREE.PlaneGeometry(1.1, 0.2);
    tailVent.rotateY(-Math.PI / 2);
    tailVent.translate(-2.262, 0.63, 0);
    add(tailVent, mats.mesh, false);

    [-0.24, 0.24].forEach((z) => {
      const pipe = new THREE.CylinderGeometry(0.058, 0.062, 0.14, 24, 1, true);
      pipe.rotateZ(Math.PI / 2);
      pipe.translate(-2.32, 0.45, z);
      const m = add(pipe, mats.lock);
      m.material.side = THREE.DoubleSide;
      const inner = new THREE.CircleGeometry(0.056, 20);
      inner.rotateY(-Math.PI / 2);
      inner.translate(-2.27, 0.45, z);
      add(inner, mats.liner, false);
    });

    /* --- front splitter --------------------------------------------------- */
    const splitterRings = [];
    const edgeRing = (x, side) => {
      const inner = [0, 0, 0];
      B.surfacePoint(x, side, 0, inner);
      const nz = inner[2] === 0 ? side : Math.sign(inner[2]);
      const grow = lerp(0.01, 0.05, MX.smoothstep((x - 1.5) / 0.86));
      const ox = inner[0] + (x > 2.18 ? (x - 2.18) * 0.45 + 0.028 : 0);
      const oz = inner[2] + nz * grow;
      return [
        [inner[0], inner[1], inner[2]],
        [ox, 0.064, oz],
        [ox, 0.05, oz],
        [inner[0], inner[1] - 0.014, inner[2]],
      ];
    };
    for (let i = 0; i <= 30; i++) splitterRings.push(edgeRing(lerp(1.5, S.noseX, i / 30), 1));
    for (let i = 0; i <= 30; i++) splitterRings.push(edgeRing(lerp(S.noseX, 1.5, i / 30), -1));
    add(P.tubeFromRings(THREE, splitterRings, true, true), mats.carbon);

    /* --- side skirts ------------------------------------------------------ */
    const skirts = [];
    [1, -1].forEach((side) => {
      const rings = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const x = lerp(1.04, -1.04, t);
        const inner = [0, 0, 0];
        B.surfacePoint(x, side, 0, inner);
        const nz = Math.sign(inner[2]) || side;
        const blade = 0.02 + 0.016 * Math.sin(Math.PI * t);
        rings.push([
          [x, inner[1], inner[2]],
          [x, inner[1] - 0.05, inner[2] + nz * blade],
          [x, inner[1] - 0.072, inner[2] + nz * (blade - 0.014)],
          [x, 0.084, inner[2] - nz * 0.075],
        ]);
      }
      skirts.push(P.tubeFromRings(THREE, rings, true, true));
    });
    add(P.mergeGeos(THREE, skirts), mats.carbon);

    /* --- flat floor and rear diffuser ------------------------------------- */
    const floorRows = [];
    for (let i = 0; i <= 24; i++) {
      const x = lerp(1.95, -1.78, i / 24);
      const hw = Math.min(0.8, B.halfW(x) - 0.14);
      floorRows.push([
        [x, 0.072, -hw],
        [x, 0.072, 0],
        [x, 0.072, hw],
      ]);
    }
    add(P.sheet(THREE, floorRows), mats.carbonFine, false);

    const diffRows = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      const x = lerp(-1.78, -2.3, t);
      const y = lerp(0.072, 0.42, Math.pow(t, 1.5));
      const hw = lerp(0.8, 0.74, t);
      diffRows.push([
        [x, y, -hw],
        [x, y, 0],
        [x, y, hw],
      ]);
    }
    add(P.sheet(THREE, diffRows), mats.carbonFine);
    // diffuser strakes
    const strakes = [];
    [-0.52, -0.24, 0.24, 0.52].forEach((z) => {
      const outline = [];
      for (let i = 0; i <= 16; i++) {
        const t = i / 16;
        outline.push([lerp(-1.78, -2.3, t), lerp(0.072, 0.42, Math.pow(t, 1.5))]);
      }
      for (let i = 16; i >= 0; i--) {
        const t = i / 16;
        const ramp = lerp(0.072, 0.42, Math.pow(t, 1.5));
        outline.push([lerp(-1.78, -2.3, t), Math.max(0.03, ramp - 0.018 - 0.085 * t)]);
      }
      strakes.push(P.vplate(THREE, outline, 0.016, z));
    });
    add(P.mergeGeos(THREE, strakes), mats.carbon);

    /* --- mirrors ---------------------------------------------------------- */
    [1, -1].forEach((side) => {
      const root2 = [0, 0, 0];
      B.surfacePoint(0.66, side * B.qAtHeight(0.66, 0.86), 0, root2);
      const tip = [root2[0] + 0.05, root2[1] + 0.055, root2[2] + side * 0.105];
      const stalk = P.sweep(
        THREE,
        [
          [root2[0], root2[1], root2[2]],
          [root2[0] + 0.028, root2[1] + 0.03, root2[2] + side * 0.05],
          tip,
        ],
        P.rectProfile(0.016, 0.026, 0.006),
        [0, 1, 0],
        true
      );
      add(stalk, mats.carbon);
      const housing = new THREE.SphereGeometry(1, 20, 12);
      housing.scale(0.075, 0.052, 0.042);
      housing.translate(tip[0] - 0.012, tip[1] + 0.022, tip[2] + side * 0.014);
      add(housing, mats.carbon);
      const glassM = new THREE.CircleGeometry(0.036, 18);
      glassM.rotateY(Math.PI * 0.92);
      glassM.scale(1, 0.7, 1);
      glassM.translate(tip[0] - 0.082, tip[1] + 0.022, tip[2] + side * 0.014);
      add(glassM, mats.mirror, false);
    });

    /* --- roof fin --------------------------------------------------------- */
    const finOutline = [
      [-0.78, 1.108], [-1.02, 1.11], [-1.32, 1.06], [-1.55, 0.99], [-1.55, 0.965],
      [-1.3, 1.005], [-1.0, 1.05], [-0.78, 1.06],
    ];
    add(P.vplate(THREE, finOutline, 0.024, 0), mats.carbon);

    /* --- rear wing -------------------------------------------------------- */
    const wing = new THREE.Group();
    wing.position.set(-2.03, 1.115, 0);
    chassis.add(wing);

    // NACA-style inverted section: round leading edge forward, sharp trailing
    // edge aft, camber curving down so it reads as a downforce element.
    const chord = 0.32;
    const airfoil = new THREE.Shape();
    const upper = [];
    const lower = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      const th =
        5 * 0.12 * (0.2969 * Math.sqrt(t) - 0.126 * t - 0.3516 * t * t + 0.2843 * t * t * t - 0.1015 * t * t * t * t);
      const cm = -0.055 * 4 * t * (1 - t);
      const px = chord * (0.5 - t);
      upper.push([px, (cm + th) * chord]);
      lower.push([px, (cm - th) * chord]);
    }
    upper.forEach((p, i) => (i === 0 ? airfoil.moveTo(p[0], p[1]) : airfoil.lineTo(p[0], p[1])));
    for (let i = lower.length - 1; i >= 0; i--) airfoil.lineTo(lower[i][0], lower[i][1]);
    airfoil.closePath();

    const span = 1.58;
    const wingGeo = new THREE.ExtrudeGeometry(airfoil, {
      depth: span,
      bevelEnabled: false,
      curveSegments: 3,
    });
    wingGeo.translate(0, 0, -span / 2);
    const wingMesh = new THREE.Mesh(wingGeo, mats.carbonFine);
    wingMesh.castShadow = true;
    wing.add(wingMesh);

    // endplates: tall at the front, swept away at the back
    [1, -1].forEach((side) => {
      const plate = P.vplate(
        THREE,
        [
          [0.18, -0.055], [0.185, 0.045], [0.12, 0.072], [-0.02, 0.062], [-0.12, 0.01],
          [-0.135, -0.05], [-0.09, -0.085], [0.06, -0.092],
        ],
        0.016,
        side * (span / 2 + 0.008)
      );
      const m = new THREE.Mesh(plate, mats.carbonFine);
      m.castShadow = true;
      wing.add(m);
    });

    // swan-neck struts: they hang the wing from above, clear of the suction side
    [1, -1].forEach((side) => {
      const outline = [
        [0.07, -0.012], [0.025, -0.075], [-0.025, -0.135], [-0.06, -0.175],
        [-0.005, -0.183], [0.035, -0.14], [0.085, -0.08], [0.125, -0.014],
      ];
      const m = new THREE.Mesh(P.vplate(THREE, outline, 0.028, side * 0.4), mats.carbonFine);
      m.castShadow = true;
      wing.add(m);
    });

    /* --- shut lines -------------------------------------------------------- */
    const seams = [];
    // bonnet, wrapping over the centreline at the cowl
    seams.push(
      seam(THREE, [
        [1.99, 0.46], [1.72, 0.42], [1.4, 0.37], [1.1, 0.3], [0.9, 0.19],
        [0.79, 0.07], [0.76, 0.0], [0.79, -0.07], [0.9, -0.19], [1.1, -0.3],
        [1.4, -0.37], [1.72, -0.42], [1.99, -0.46],
      ])
    );
    // door cuts, front and rear, on both flanks
    [1, -1].forEach((side) => {
      seams.push(
        seam(THREE, [
          [0.74, side * 0.28], [0.71, side * 0.45], [0.68, side * 0.66],
          [0.66, side * 0.85], [0.66, side * 0.99],
        ], 0.0055, 60)
      );
      seams.push(
        seam(THREE, [
          [-0.4, side * 0.3], [-0.44, side * 0.5], [-0.5, side * 0.72],
          [-0.56, side * 0.9], [-0.6, side * 0.99],
        ], 0.0055, 60)
      );
    });
    // engine cover, front edge and rear edge
    seams.push(
      seam(THREE, [
        [-0.98, 0.44], [-1.0, 0.3], [-1.02, 0.12], [-1.03, 0.0], [-1.02, -0.12],
        [-1.0, -0.3], [-0.98, -0.44],
      ], 0.0055, 80)
    );
    seams.push(
      seam(THREE, [
        [-1.72, 0.4], [-1.74, 0.24], [-1.75, 0.08], [-1.75, -0.08], [-1.74, -0.24],
        [-1.72, -0.4],
      ], 0.0055, 80)
    );
    add(P.mergeGeos(THREE, seams), mats.gap, false);

    /* --- wheels ----------------------------------------------------------- */
    const wheels = [];
    const layout = [
      { x: S.frontAxle, z: S.front.track, size: S.front, steer: true },
      { x: S.frontAxle, z: -S.front.track, size: S.front, steer: true },
      { x: S.rearAxle, z: S.rear.track, size: S.rear, steer: false },
      { x: S.rearAxle, z: -S.rear.track, size: S.rear, steer: false },
    ];
    layout.forEach((w) => {
      const built = P.buildWheel(THREE, mats, w.size);
      const steer = new THREE.Group();
      steer.position.set(w.x, w.size.radius, w.z);
      if (w.z < 0) built.group.rotation.y = Math.PI;
      steer.add(built.group);
      root.add(steer);
      wheels.push({
        steer,
        spin: built.spin,
        isFront: w.steer,
        radius: w.size.radius,
        // left-hand wheels are turned around so the rim faces out, which also
        // reverses their local spin axis
        flip: w.z < 0 ? -1 : 1,
      });

      const liner = P.archLiner(
        THREE,
        mats.liner,
        (w.x > 0 ? B.ARCHES[0].r : B.ARCHES[1].r) + 0.028,
        w.size.halfWidth + 0.005
      );
      liner.position.set(w.x, (w.x > 0 ? B.ARCHES[0].cy : B.ARCHES[1].cy), w.z);
      if (w.z < 0) liner.rotation.y = Math.PI;
      chassis.add(liner);
    });

    return { root, chassis, wheels, wing, lamps: { drl, tailBar }, shell };
  }

  global.CAR = { makeMaterials, buildCar, PAINTS };
})(window);
