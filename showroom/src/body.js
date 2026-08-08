/* ---------------------------------------------------------------------------
   The body is one lofted surface, not a pile of boxes.

   Every cross-section is a superellipse whose width, height, centre and
   exponent are driven by monotone splines along the length of the car. The
   lower edge of each section is clipped at a "bottom line" that swells over
   the wheel centres, which is what carves the wheel arches: the skin simply
   stops existing below the arch curve. Surface sculpting (side intakes, bonnet
   channel, haunch waist) is applied as smooth dents along the section normal,
   so trims and glass generated from the same surface stay glued to it.

   Axes: +X points at the nose, +Y is up, +Z is the right-hand side.
--------------------------------------------------------------------------- */
(function (global) {
  'use strict';

  const { pchip, clamp, lerp, smoothMax, spow, bump, HALF_PI } = MX;

  const SPEC = {
    length: 4.72,
    width: 2.064,
    height: 1.145,
    wheelbase: 2.72,
    frontAxle: 1.36,
    rearAxle: -1.36,
    noseX: 2.36,
    tailX: -2.36,
    front: { radius: 0.362, halfWidth: 0.155, track: 0.822 },
    rear: { radius: 0.382, halfWidth: 0.195, track: 0.822 },
  };

  const ARCHES = [
    { x: SPEC.frontAxle, r: 0.386, cy: SPEC.front.radius + 0.008 },
    { x: SPEC.rearAxle, r: 0.406, cy: SPEC.rear.radius + 0.008 },
  ];

  const topY = pchip([
    [2.36, 0.455], [2.30, 0.52], [2.20, 0.60], [2.05, 0.672], [1.85, 0.742],
    [1.62, 0.795], [1.45, 0.826], [1.30, 0.843], [1.10, 0.848], [0.92, 0.842],
    [0.78, 0.852], [0.62, 0.912], [0.42, 1.002], [0.18, 1.079], [-0.10, 1.128],
    [-0.38, 1.145], [-0.62, 1.136], [-0.85, 1.096], [-1.05, 1.032], [-1.25, 0.992],
    [-1.50, 0.972], [-1.80, 0.962], [-2.05, 0.944], [-2.25, 0.918], [-2.36, 0.878],
  ]);

  const halfW = pchip([
    [2.36, 0.09], [2.30, 0.245], [2.22, 0.4], [2.10, 0.56], [1.95, 0.7],
    [1.78, 0.83], [1.60, 0.928], [1.45, 0.99], [1.36, 1.018], [1.26, 1.031],
    [1.1, 1.02], [0.95, 0.988], [0.70, 0.951], [0.35, 0.929], [0.00, 0.926],
    [-0.35, 0.939], [-0.70, 0.969], [-1.00, 1.006], [-1.22, 1.028], [-1.36, 1.032],
    [-1.55, 1.024], [-1.85, 0.985], [-2.1, 0.936], [-2.28, 0.892], [-2.36, 0.858],
  ]);

  const midY = pchip([
    [2.36, 0.30], [2.10, 0.39], [1.75, 0.51], [1.45, 0.60], [1.36, 0.62],
    [1.15, 0.60], [0.90, 0.585], [0.50, 0.60], [0.00, 0.63], [-0.60, 0.65],
    [-1.05, 0.665], [-1.36, 0.68], [-1.70, 0.66], [-2.05, 0.62], [-2.36, 0.60],
  ]);

  const lowY = pchip([
    [2.36, 0.06], [1.90, 0.05], [1.36, 0.055], [0.50, 0.075], [0.00, 0.085],
    [-0.80, 0.085], [-1.36, 0.075], [-1.90, 0.10], [-2.36, 0.16],
  ]);

  /* Shoulder fullness. Cranked up over the axles so the fenders read as
     haunches wrapping the wheels rather than a smooth tube. */
  const nUp = pchip([
    [2.36, 2.6], [2.10, 3.0], [1.85, 3.6], [1.62, 4.2], [1.45, 4.7],
    [1.36, 4.9], [1.18, 4.6], [1.00, 3.9], [0.60, 3.4], [0.20, 3.1],
    [-0.30, 3.0], [-0.80, 3.3], [-1.15, 4.4], [-1.36, 5.0], [-1.60, 4.8],
    [-1.90, 4.0], [-2.15, 3.8], [-2.36, 3.8],
  ]);

  const nDn = pchip([
    [2.36, 2.2], [1.60, 2.6], [0.60, 3.0], [-0.60, 3.0], [-1.60, 2.8], [-2.36, 2.6],
  ]);

  const rocker = pchip([
    [2.36, 0.075], [2.00, 0.075], [1.75, 0.10], [1.45, 0.16], [1.00, 0.205],
    [0.00, 0.216], [-1.00, 0.205], [-1.50, 0.18], [-1.90, 0.225], [-2.15, 0.31],
    [-2.36, 0.365],
  ]);

  /* Beltline, expressed as a drop below the roof line so the canopy keeps a
     constant visual depth as the roof rises and falls. A negative drop pushes
     the line above the body, which pinches the glass shut at both ends. */
  const beltDrop = pchip([
    [0.72, -0.06], [0.62, 0.02], [0.48, 0.1], [0.2, 0.155], [-0.2, 0.178],
    [-0.5, 0.172], [-0.72, 0.135], [-0.88, 0.07], [-1.02, -0.06],
  ]);
  const beltY = (x) => topY(x) - beltDrop(x);

  /* Surface sculpting. th is the section angle: -1.0 is deep under the flank,
     0 sits on the widest line, PI/2 is the centreline of the roof. */
  const DENTS = [
    { x: -0.60, rx: 0.72, th: 0.14, rth: 0.60, d: 0.105 }, // side intake mouth
    { x: -0.74, rx: 0.55, th: -0.44, rth: 0.34, d: 0.045 }, // lower intake blade
    { x: 0.34, rx: 0.88, th: -0.30, rth: 0.48, d: 0.032 }, // door scallop
    { x: 1.93, rx: 0.32, th: -0.32, rth: 0.48, d: 0.055 }, // bumper corner vent
    { x: 1.60, rx: 0.56, th: 1.45, rth: 0.36, d: 0.042 }, // bonnet channel
    { x: 2.14, rx: 0.34, th: 1.40, rth: 0.42, d: 0.018 }, // nose vee
    { x: -0.55, rx: 0.42, th: 1.52, rth: 0.22, d: 0.026 }, // roof duct
    { x: -1.32, rx: 0.46, th: 1.33, rth: 0.44, d: 0.034 }, // engine deck dip
    { x: -1.80, rx: 0.56, th: 0.10, rth: 0.46, d: 0.026 }, // rear haunch waist
    { x: 0.95, rx: 0.30, th: 0.42, rth: 0.26, d: 0.022 }, // fender exit vent
    { x: 2.18, rx: 0.30, th: -0.55, rth: 0.55, d: 0.05 }, // front mouth
    // character lines: shallow creases that break up the reflections the way
    // a real pressed panel does
    { x: 0.2, rx: 1.5, th: 0.5, rth: 0.1, d: 0.013, slope: 0.1 }, // shoulder
    { x: 0.5, rx: 1.3, th: -0.5, rth: 0.12, d: 0.01, slope: 0.05 }, // lower flank
    { x: 1.35, rx: 0.75, th: 1.05, rth: 0.16, d: 0.016, slope: 0.32 }, // bonnet edge
  ];

  function bottomEdge(x) {
    let y = rocker(x);
    for (let i = 0; i < ARCHES.length; i++) {
      const a = ARCHES[i];
      const dx = x - a.x;
      const inside = a.r * a.r - dx * dx;
      const arc = inside > 0
        ? a.cy + Math.sqrt(inside)
        : a.cy - (Math.abs(dx) - a.r) * 2.6;
      y = smoothMax(y, arc, 0.085);
    }
    return y;
  }

  function evalRaw(x, th, out) {
    const w = halfW(x);
    const yc = midY(x);
    const s = Math.sin(th);
    const c = Math.cos(th);
    if (s >= 0) {
      const e = 2 / nUp(x);
      out.y = yc + (topY(x) - yc) * Math.pow(s, e);
      out.z = w * spow(c, e);
    } else {
      const e = 2 / nDn(x);
      out.y = yc - (yc - lowY(x)) * Math.pow(-s, e);
      out.z = w * spow(c, e);
    }
    return out;
  }

  function dentDepth(x, th) {
    let d = 0;
    for (let i = 0; i < DENTS.length; i++) {
      const t = DENTS[i];
      const bx = bump((x - t.x) / t.rx);
      if (bx === 0) continue;
      const c = t.slope ? t.th + t.slope * (x - t.x) : t.th;
      d += t.d * bx * bump((th - c) / t.rth);
    }
    return d;
  }

  const _a = { y: 0, z: 0 };
  const _b = { y: 0, z: 0 };

  /* Point on the right half of the section, dents included. */
  function evalSection(x, th, out) {
    out = out || { y: 0, z: 0, ny: 0, nz: 0 };
    evalRaw(x, th, out);
    const h = 0.004;
    evalRaw(x, th - h, _a);
    evalRaw(x, th + h, _b);
    const tz = _b.z - _a.z;
    const ty = _b.y - _a.y;
    const len = Math.hypot(tz, ty) || 1;
    out.nz = ty / len;
    out.ny = -tz / len;
    const d = dentDepth(x, th);
    if (d > 1e-6) {
      out.y -= out.ny * d;
      out.z -= out.nz * d;
    }
    return out;
  }

  /* Section angle where the skin stops (the arch / rocker line). */
  function thetaMin(x) {
    const yc = midY(x);
    const yb = bottomEdge(x);
    if (yb >= yc) {
      const s = Math.pow(clamp((yb - yc) / (topY(x) - yc), 0, 1), nUp(x) / 2);
      return Math.asin(clamp(s, 0, 0.9995));
    }
    const s = Math.pow(clamp((yc - yb) / (yc - lowY(x)), 0, 1), nDn(x) / 2);
    return -Math.asin(clamp(s, 0, 0.9995));
  }

  function thetaAtHeight(x, y) {
    const yc = midY(x);
    if (y >= yc) {
      const s = Math.pow(clamp((y - yc) / (topY(x) - yc), 0, 1), nUp(x) / 2);
      return Math.asin(clamp(s, 0, 1));
    }
    const s = Math.pow(clamp((yc - y) / (yc - lowY(x)), 0, 1), nDn(x) / 2);
    return -Math.asin(clamp(s, 0, 1));
  }

  /* Ring coordinate q: 0 on the roof centreline, +-1 at the bottom edge. */
  function qFromTheta(x, th) {
    const t0 = thetaMin(x);
    return clamp((HALF_PI - th) / (HALF_PI - t0), 0, 1);
  }
  function thetaFromQ(x, q) {
    const t0 = thetaMin(x);
    return HALF_PI - (HALF_PI - t0) * Math.abs(q);
  }
  function qAtHeight(x, y) {
    return qFromTheta(x, thetaAtHeight(x, y));
  }

  const _p = { y: 0, z: 0, ny: 0, nz: 0 };

  /* World-space point at ring coordinate q, pushed out along the surface
     normal by `off` metres (used to lay trims and glass onto the skin). */
  function surfacePoint(x, q, off, target) {
    const th = thetaFromQ(x, q);
    evalSection(x, th, _p);
    const side = q < 0 ? -1 : 1;
    const o = off || 0;
    target[0] = x;
    target[1] = _p.y + _p.ny * o;
    target[2] = (_p.z + _p.nz * o) * side;
    return target;
  }

  function halfRingLength(x) {
    const t0 = thetaMin(x);
    const K = 96;
    let len = 0;
    let pz = 0;
    let py = 0;
    for (let i = 0; i <= K; i++) {
      const th = t0 + (HALF_PI - t0) * (i / K);
      evalSection(x, th, _p);
      if (i) len += Math.hypot(_p.z - pz, _p.y - py);
      pz = _p.z;
      py = _p.y;
    }
    return len;
  }

  /* Resample one half-section at equal arc length, so the mesh keeps a even
     density from the rocker up to the roof no matter how the section changes. */
  function halfRing(x, nh) {
    const t0 = thetaMin(x);
    const K = 220;
    const zs = new Float64Array(K + 1);
    const ys = new Float64Array(K + 1);
    const cum = new Float64Array(K + 1);
    for (let i = 0; i <= K; i++) {
      evalSection(x, t0 + (HALF_PI - t0) * (i / K), _p);
      zs[i] = _p.z;
      ys[i] = _p.y;
      if (i) cum[i] = cum[i - 1] + Math.hypot(zs[i] - zs[i - 1], ys[i] - ys[i - 1]);
    }
    const total = cum[K] || 1;
    const out = new Float64Array(nh * 2);
    let j = 0;
    for (let i = 0; i < nh; i++) {
      const target = (i / (nh - 1)) * total;
      while (j < K - 1 && cum[j + 1] < target) j++;
      const seg = cum[j + 1] - cum[j] || 1;
      const f = clamp((target - cum[j]) / seg, 0, 1);
      out[i * 2] = lerp(zs[j], zs[j + 1], f);
      out[i * 2 + 1] = lerp(ys[j], ys[j + 1], f);
    }
    return out;
  }

  function gridIndices(nStations, nRing, flip) {
    const idx = [];
    for (let a = 0; a < nStations - 1; a++) {
      for (let i = 0; i < nRing - 1; i++) {
        const v00 = a * nRing + i;
        const v10 = (a + 1) * nRing + i;
        const v01 = a * nRing + i + 1;
        const v11 = (a + 1) * nRing + i + 1;
        if (flip) {
          idx.push(v00, v01, v10, v10, v01, v11);
        } else {
          idx.push(v00, v10, v01, v10, v11, v01);
        }
      }
    }
    return idx;
  }

  /* ---- the main shell ---------------------------------------------------- */
  function buildShell(THREE, opts) {
    const nx = (opts && opts.stations) || 216;
    const nh = (opts && opts.ringHalf) || 56;
    const nRing = nh * 2 - 1;

    const rings = [];
    for (let a = 0; a < nx; a++) {
      const t = a / (nx - 1);
      // squeeze stations toward the nose and tail where curvature is highest
      const tt = t + 0.06 * Math.sin(Math.PI * 2 * t) / (Math.PI * 2);
      const x = lerp(SPEC.noseX, SPEC.tailX, clamp(tt, 0, 1));
      rings.push({ x, pts: halfRing(x, nh) });
    }

    // rounded nose tip
    const noseRings = 3;
    const first = rings[0];
    const ycN = midY(first.x);
    for (let k = 1; k <= noseRings; k++) {
      const a = k / noseRings;
      const s = Math.cos(a * HALF_PI);
      const pts = new Float64Array(nh * 2);
      for (let i = 0; i < nh; i++) {
        pts[i * 2] = first.pts[i * 2] * s;
        pts[i * 2 + 1] = ycN + (first.pts[i * 2 + 1] - ycN) * (0.35 + 0.65 * s);
      }
      rings.unshift({ x: first.x + 0.055 * Math.sin(a * HALF_PI), pts });
    }

    // recessed tail: roll the edge over, then step the panel forward
    const last = rings[rings.length - 1];
    const ycT = midY(last.x);
    const tailSteps = [
      { s: 0.99, dx: -0.02 },
      { s: 0.968, dx: -0.028 },
      { s: 0.945, dx: -0.008 },
      { s: 0.928, dx: 0.05 },
      { s: 0.915, dx: 0.105 },
    ];
    const tailStart = rings.length;
    tailSteps.forEach((step) => {
      const pts = new Float64Array(nh * 2);
      for (let i = 0; i < nh; i++) {
        pts[i * 2] = last.pts[i * 2] * step.s;
        pts[i * 2 + 1] = ycT + (last.pts[i * 2 + 1] - ycT) * step.s;
      }
      rings.push({ x: last.x + step.dx, pts });
    });
    // flat panel closing the recess
    const inner = rings[rings.length - 1];
    [0.62, 0.3, 0.0].forEach((s) => {
      const pts = new Float64Array(nh * 2);
      for (let i = 0; i < nh; i++) {
        pts[i * 2] = inner.pts[i * 2] * s;
        pts[i * 2 + 1] = ycT + (inner.pts[i * 2 + 1] - ycT) * s;
      }
      rings.push({ x: inner.x + 0.012 * (1 - s), pts });
    });

    const nStations = rings.length;
    const pos = new Float32Array(nStations * nRing * 3);
    const uv = new Float32Array(nStations * nRing * 2);
    let p = 0;
    let q = 0;
    for (let a = 0; a < nStations; a++) {
      const r = rings[a];
      const u = (SPEC.noseX + 0.06 - r.x) / (SPEC.length + 0.12);
      for (let i = 0; i < nRing; i++) {
        const k = i < nh ? i : nRing - 1 - i;
        const side = i < nh - 1 ? -1 : 1;
        pos[p++] = r.x;
        pos[p++] = r.pts[k * 2 + 1];
        pos[p++] = r.pts[k * 2] * side;
        uv[q++] = u;
        uv[q++] = i / (nRing - 1);
      }
    }

    const idx = gridIndices(nStations, nRing, false);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);

    // the recessed tail panel gets its own (dark) material
    const perStation = (nRing - 1) * 6;
    const cut = (tailStart + 2) * perStation;
    geo.addGroup(0, cut, 0);
    geo.addGroup(cut, idx.length - cut, 1);
    geo.computeVertexNormals();
    return geo;
  }

  /* ---- panels laid onto the shell (glass, carbon trims, intake inserts) --- */
  function buildPatch(THREE, opts) {
    const nx = opts.nx || 72;
    const nv = opts.nv || 24;
    const x0 = opts.x0;
    const x1 = opts.x1;
    const off = opts.offset || (() => 0.004);
    const qLo = opts.qLo;
    const qHi = opts.qHi;
    const pos = new Float32Array(nx * nv * 3);
    const uv = new Float32Array(nx * nv * 2);
    const tmp = [0, 0, 0];
    let p = 0;
    let t = 0;
    for (let a = 0; a < nx; a++) {
      const fx = a / (nx - 1);
      const x = lerp(x0, x1, fx);
      const lo = qLo(x);
      const hi = qHi(x);
      for (let i = 0; i < nv; i++) {
        const fv = i / (nv - 1);
        const qq = lerp(lo, hi, fv);
        surfacePoint(x, qq, off(fx, fv), tmp);
        pos[p++] = tmp[0];
        pos[p++] = tmp[1];
        pos[p++] = tmp[2];
        uv[t++] = fx;
        uv[t++] = fv;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(gridIndices(nx, nv, !!opts.flip));
    geo.computeVertexNormals();
    return geo;
  }

  global.BODY = {
    SPEC,
    ARCHES,
    topY,
    halfW,
    midY,
    lowY,
    rocker,
    beltY,
    bottomEdge,
    evalSection,
    thetaMin,
    thetaAtHeight,
    qAtHeight,
    qFromTheta,
    thetaFromQ,
    surfacePoint,
    halfRingLength,
    buildShell,
    buildPatch,
  };
})(window);
