/* Small math toolkit shared by the surface builder and the animation loop. */
(function (global) {
  'use strict';

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (t) => {
    t = clamp(t, 0, 1);
    return t * t * (3 - 2 * t);
  };
  const smootherstep = (t) => {
    t = clamp(t, 0, 1);
    return t * t * t * (t * (t * 6 - 15) + 10);
  };

  /* Polynomial smooth maximum: blends the two branches over a window of k
     instead of creating the hard crease that Math.max would leave behind. */
  function smoothMax(a, b, k) {
    const h = clamp(0.5 + (0.5 * (b - a)) / k, 0, 1);
    return lerp(a, b, h) + k * h * (1 - h);
  }

  /* Monotone cubic interpolation (Fritsch-Carlson). Plain Catmull-Rom
     overshoots between control points, which shows up as phantom bulges in a
     car's width profile, so the body curves all go through this instead. */
  function pchip(points) {
    const p = points.slice().sort((a, b) => a[0] - b[0]);
    const n = p.length;
    const xs = new Float64Array(n);
    const ys = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      xs[i] = p[i][0];
      ys[i] = p[i][1];
    }
    const h = new Float64Array(n - 1);
    const d = new Float64Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
      h[i] = xs[i + 1] - xs[i];
      d[i] = (ys[i + 1] - ys[i]) / h[i];
    }
    const m = new Float64Array(n);
    m[0] = d[0];
    m[n - 1] = d[n - 2];
    for (let i = 1; i < n - 1; i++) {
      if (d[i - 1] * d[i] <= 0) {
        m[i] = 0;
      } else {
        const w1 = 2 * h[i] + h[i - 1];
        const w2 = h[i] + 2 * h[i - 1];
        m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
      }
    }
    return function (x) {
      if (x <= xs[0]) return ys[0];
      if (x >= xs[n - 1]) return ys[n - 1];
      let lo = 0;
      let hi = n - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (xs[mid] > x) hi = mid;
        else lo = mid;
      }
      const t = (x - xs[lo]) / h[lo];
      const t2 = t * t;
      const t3 = t2 * t;
      const h00 = 2 * t3 - 3 * t2 + 1;
      const h10 = t3 - 2 * t2 + t;
      const h01 = -2 * t3 + 3 * t2;
      const h11 = t3 - t2;
      return h00 * ys[lo] + h10 * h[lo] * m[lo] + h01 * ys[lo + 1] + h11 * h[lo] * m[lo + 1];
    };
  }

  /* Sign-preserving power, so superellipse formulas stay valid when the angle
     walks past the quadrant boundary (needed for finite-difference normals). */
  const spow = (v, e) => (v < 0 ? -Math.pow(-v, e) : Math.pow(v, e));

  /* Frame-rate independent exponential approach. */
  const damp = (current, target, lambda, dt) => lerp(current, target, 1 - Math.exp(-lambda * dt));

  /* Compact-support bump, 1 at the centre and 0 beyond |s| >= 1. */
  function bump(s) {
    const a = Math.abs(s);
    if (a >= 1) return 0;
    const q = 1 - a * a;
    return q * q * q;
  }

  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* Deterministic hash noise: the same seed always renders the same texture. */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  global.MX = {
    clamp,
    lerp,
    smoothstep,
    smootherstep,
    smoothMax,
    pchip,
    spow,
    damp,
    bump,
    easeInOut,
    mulberry32,
    TAU: Math.PI * 2,
    HALF_PI: Math.PI / 2,
  };
})(window);
