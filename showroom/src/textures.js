/* Every texture in the showroom is drawn at runtime on a 2D canvas: no image
   files, so the whole scene stays inside one HTML document. */
(function (global) {
  'use strict';

  const { mulberry32, clamp } = MX;

  function canvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }

  function toTexture(THREE, cv, { repeat = [1, 1], srgb = false, aniso = 8 } = {}) {
    const tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
    tex.anisotropy = aniso;
    if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /* Sobel filter over a greyscale height canvas -> tangent-space normal map. */
  function heightToNormal(THREE, heightCanvas, strength) {
    const w = heightCanvas.width;
    const h = heightCanvas.height;
    const src = heightCanvas.getContext('2d').getImageData(0, 0, w, h).data;
    const out = canvas(w, h);
    const ctx = out.getContext('2d');
    const img = ctx.createImageData(w, h);
    const at = (x, y) => src[((((y + h) % h) * w + ((x + w) % w)) << 2)] / 255;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const tl = at(x - 1, y - 1);
        const t = at(x, y - 1);
        const tr = at(x + 1, y - 1);
        const l = at(x - 1, y);
        const r = at(x + 1, y);
        const bl = at(x - 1, y + 1);
        const b = at(x, y + 1);
        const br = at(x + 1, y + 1);
        const dx = tl + 2 * l + bl - (tr + 2 * r + br);
        const dy = tl + 2 * t + tr - (bl + 2 * b + br);
        let nx = dx * strength;
        let ny = dy * strength;
        const nz = 1;
        const len = Math.hypot(nx, ny, nz);
        nx /= len;
        ny /= len;
        const i = (y * w + x) << 2;
        img.data[i] = (nx * 0.5 + 0.5) * 255;
        img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
        img.data[i + 2] = (nz / len) * 255;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return out;
  }

  /* --- carbon fibre, 2x2 twill ------------------------------------------- */
  function carbonCanvases(size = 512, cells = 16) {
    const col = canvas(size, size);
    const hgt = canvas(size, size);
    const cc = col.getContext('2d');
    const hc = hgt.getContext('2d');
    const s = size / cells;
    cc.fillStyle = '#080809';
    cc.fillRect(0, 0, size, size);
    hc.fillStyle = '#3a3a3a';
    hc.fillRect(0, 0, size, size);

    for (let j = 0; j < cells; j++) {
      for (let i = 0; i < cells; i++) {
        // 2x2 twill: tows step one cell per row, so the weave reads diagonally.
        const warp = ((i + j) % 4 < 2);
        const x = i * s;
        const y = j * s;
        const g = cc.createLinearGradient(
          x + (warp ? 0 : s * 0.5),
          y + (warp ? s * 0.5 : 0),
          x + (warp ? s : s * 0.5),
          y + (warp ? s * 0.5 : s)
        );
        g.addColorStop(0, '#050506');
        g.addColorStop(0.42, '#1d1e23');
        g.addColorStop(0.55, '#24252b');
        g.addColorStop(1, '#050506');
        cc.fillStyle = g;
        cc.fillRect(x, y, s, s);

        const gh = hc.createLinearGradient(
          x + (warp ? 0 : s * 0.5),
          y + (warp ? s * 0.5 : 0),
          x + (warp ? s : s * 0.5),
          y + (warp ? s * 0.5 : s)
        );
        gh.addColorStop(0, '#101010');
        gh.addColorStop(0.5, '#e8e8e8');
        gh.addColorStop(1, '#101010');
        hc.fillStyle = gh;
        hc.fillRect(x, y, s, s);

        // individual filaments running along the tow
        cc.save();
        cc.beginPath();
        cc.rect(x, y, s, s);
        cc.clip();
        cc.globalAlpha = 0.28;
        cc.strokeStyle = '#000';
        cc.lineWidth = 0.7;
        for (let k = 1; k < 7; k++) {
          const o = (k / 7) * s;
          cc.beginPath();
          if (warp) {
            cc.moveTo(x, y + o);
            cc.lineTo(x + s, y + o);
          } else {
            cc.moveTo(x + o, y);
            cc.lineTo(x + o, y + s);
          }
          cc.stroke();
        }
        cc.restore();
      }
    }
    return { color: col, height: hgt };
  }

  /* --- metallic paint flake ---------------------------------------------- */
  function flakeHeight(size = 256, seed = 7) {
    const cv = canvas(size, size);
    const ctx = cv.getContext('2d');
    const rnd = mulberry32(seed);
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);
    const img = ctx.getImageData(0, 0, size, size);
    for (let i = 0; i < size * size; i++) {
      const v = 128 + (rnd() - 0.5) * 150;
      const k = i << 2;
      img.data[k] = img.data[k + 1] = img.data[k + 2] = v;
      img.data[k + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return cv;
  }

  /* --- tyre: tread blocks on the crown, ribbed sidewalls ----------------- */
  function tyreCanvases(w = 1024, h = 512) {
    const col = canvas(w, h);
    const hgt = canvas(w, h);
    const rgh = canvas(w, h);
    const cc = col.getContext('2d');
    const hc = hgt.getContext('2d');
    const rc = rgh.getContext('2d');
    cc.fillStyle = '#0a0a0b';
    cc.fillRect(0, 0, w, h);
    hc.fillStyle = '#9a9a9a';
    hc.fillRect(0, 0, w, h);
    rc.fillStyle = '#c9c9c9'; // crown: matte
    rc.fillRect(0, 0, w, h);

    // sidewalls sit either side of the crown band and read glossier than tread
    const sideBands = [[0.1, 0.33], [0.67, 0.9]];
    sideBands.forEach(([a, b]) => {
      rc.fillStyle = '#8f8f8f';
      rc.fillRect(0, a * h, w, (b - a) * h);
      cc.fillStyle = '#0d0d0f';
      cc.fillRect(0, a * h, w, (b - a) * h);
      // concentric moulding ribs
      for (let y = a * h; y < b * h; y += 5) {
        hc.fillStyle = ((y / 5) | 0) % 2 ? '#a6a6a6' : '#8e8e8e';
        hc.fillRect(0, y, w, 3);
      }
      // shoulder lettering block, kept abstract
      cc.save();
      cc.globalAlpha = 0.5;
      cc.fillStyle = '#3a3a3e';
      const ty = (a + (b - a) * 0.45) * h;
      for (let x = 0; x < w; x += 128) {
        cc.fillRect(x + 18, ty, 62, 7);
        cc.fillRect(x + 88, ty, 26, 7);
      }
      cc.restore();
    });

    // crown: four circumferential grooves plus angled sipes
    const c0 = 0.33 * h;
    const c1 = 0.67 * h;
    hc.fillStyle = '#9a9a9a';
    hc.fillRect(0, c0, w, c1 - c0);
    [0.4, 0.5, 0.6].forEach((p) => {
      hc.fillStyle = '#2b2b2b';
      hc.fillRect(0, p * h - 6, w, 12);
      cc.fillStyle = '#050506';
      cc.fillRect(0, p * h - 6, w, 12);
    });
    hc.strokeStyle = '#2f2f2f';
    cc.strokeStyle = '#060607';
    hc.lineWidth = 7;
    cc.lineWidth = 7;
    for (let x = 0; x < w; x += 26) {
      hc.beginPath();
      hc.moveTo(x, c0);
      hc.lineTo(x + 22, c1);
      hc.stroke();
      cc.beginPath();
      cc.moveTo(x, c0);
      cc.lineTo(x + 22, c1);
      cc.stroke();
    }
    return { color: col, height: hgt, roughness: rgh };
  }

  /* --- honeycomb mesh used behind the intakes ---------------------------- */
  function honeycombCanvas(size = 512, r = 16) {
    const cv = canvas(size, size);
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#050506';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#2e3036';
    ctx.lineWidth = 2.4;
    const dx = r * Math.sqrt(3);
    const dy = r * 1.5;
    for (let row = -1; row * dy < size + r; row++) {
      for (let colI = -1; colI * dx < size + r; colI++) {
        const cx = colI * dx + (row % 2 ? dx / 2 : 0);
        const cy = row * dy;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k + Math.PI / 6;
          const px = cx + r * 0.94 * Math.cos(a);
          const py = cy + r * 0.94 * Math.sin(a);
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    return cv;
  }

  /* --- brake rotor: drilled and slotted ---------------------------------- */
  function rotorCanvas(size = 512) {
    const cv = canvas(size, size);
    const ctx = cv.getContext('2d');
    const c = size / 2;
    ctx.fillStyle = '#101013';
    ctx.fillRect(0, 0, size, size);
    const g = ctx.createRadialGradient(c, c, size * 0.16, c, c, size * 0.5);
    g.addColorStop(0, '#26262b');
    g.addColorStop(0.42, '#3a3b41');
    g.addColorStop(0.94, '#4a4b52');
    g.addColorStop(1, '#1b1c20');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c, c, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    // turned finish
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = '#000';
    for (let r = size * 0.2; r < size * 0.5; r += 2.2) {
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // curved slots
    ctx.strokeStyle = '#0b0b0d';
    ctx.lineWidth = 6;
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(c, c, size * 0.36, a, a + 0.5);
      ctx.stroke();
    }
    // drilled holes
    ctx.fillStyle = '#08080a';
    for (let ring = 0; ring < 3; ring++) {
      const rr = size * (0.26 + ring * 0.07);
      const n = 16 + ring * 6;
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + ring * 0.2;
        ctx.beginPath();
        ctx.arc(c + rr * Math.cos(a), c + rr * Math.sin(a), size * 0.011, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // hub shadow
    ctx.fillStyle = '#0d0d10';
    ctx.beginPath();
    ctx.arc(c, c, size * 0.19, 0, Math.PI * 2);
    ctx.fill();
    return cv;
  }

  /* --- studio floor and cyclorama --------------------------------------- */
  function floorCanvas(size, inner, outer) {
    const cv = canvas(size, size);
    const ctx = cv.getContext('2d');
    const c = size / 2;
    ctx.fillStyle = outer;
    ctx.fillRect(0, 0, size, size);
    const g = ctx.createRadialGradient(c, c, 0, c, c, c);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return cv;
  }

  function backdropCanvas(bottom, top, hold) {
    const cv = canvas(4, 512);
    const ctx = cv.getContext('2d');
    const g = ctx.createLinearGradient(0, 512, 0, 0);
    g.addColorStop(0, bottom);
    g.addColorStop(hold === undefined ? 0.42 : hold, bottom);
    g.addColorStop(1, top);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 512);
    return cv;
  }

  /* --- soft contact shadow ---------------------------------------------- */
  function blobCanvas(size = 512) {
    const cv = canvas(size, size);
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    const draw = (cx, cy, rx, ry, a) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(rx, ry);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, `rgba(0,0,0,${a})`);
      g.addColorStop(0.55, `rgba(0,0,0,${a * 0.55})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const c = size / 2;
    draw(c, c, size * 0.47, size * 0.26, 0.5);
    draw(c, c * 0.72, size * 0.2, size * 0.11, 0.42);
    draw(c, c * 1.3, size * 0.22, size * 0.12, 0.42);
    return cv;
  }

  /* --- headlight / tail lamp inner optic --------------------------------- */
  function lampCanvas(w = 256, h = 64, tint = '#ff2a2a') {
    const cv = canvas(w, h);
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#000');
    g.addColorStop(0.34, tint);
    g.addColorStop(0.66, tint);
    g.addColorStop(1, '#000');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#000';
    for (let x = 0; x < w; x += 8) ctx.fillRect(x, 0, 2.5, h);
    return cv;
  }

  global.TX = {
    canvas,
    toTexture,
    heightToNormal,
    carbonCanvases,
    flakeHeight,
    tyreCanvases,
    honeycombCanvas,
    rotorCanvas,
    floorCanvas,
    backdropCanvas,
    blobCanvas,
    lampCanvas,
    clamp,
  };
})(window);
