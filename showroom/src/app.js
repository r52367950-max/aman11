/* Studio: renderer, lighting rig, camera work, and the controls that drive
   the car rig. */
(function () {
  'use strict';

  const THREE = window.THREE;
  const { clamp, lerp, damp, smoothstep } = MX;

  const VIEWS = [
    { id: 'fq', cn: '前 3/4', k: 'FRONT 3/4', theta: -38, phi: 13, r: 9.4, fov: 30 },
    { id: 'rq', cn: '后 3/4', k: 'REAR 3/4', theta: -146, phi: 15, r: 9.6, fov: 30 },
    { id: 'side', cn: '侧视', k: 'SIDE', theta: -90, phi: 2.5, r: 17.5, fov: 16 },
    { id: 'front', cn: '前视', k: 'FRONT', theta: 0, phi: 5, r: 17.5, fov: 16 },
    { id: 'rear', cn: '后视', k: 'REAR', theta: 180, phi: 5, r: 17.5, fov: 16 },
    { id: 'top', cn: '俯视', k: 'TOP', theta: -90, phi: 84, r: 18.5, fov: 16 },
  ];

  const dom = (id) => document.getElementById(id);
  const loader = dom('loader');
  const loaderMsg = dom('loader-msg');

  function fail(msg) {
    loader.classList.remove('done');
    loader.innerHTML = '<span class="eyebrow">无法启动展台</span><p class="fail">' + msg + '</p>';
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: dom('view'),
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
  } catch (e) {
    fail('这台设备的浏览器没有可用的 WebGL 上下文，无法渲染实时三维场景。');
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.4, 240);

  /* ---- studio environment ------------------------------------------------ */
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envCache = {};

  function buildEnv(dark) {
    if (envCache[dark]) return envCache[dark];
    const s = new THREE.Scene();
    const room = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        side: THREE.BackSide,
        color: dark ? 0x0b0c10 : 0xa9adb5,
        roughness: 1,
        metalness: 0,
      })
    );
    room.scale.set(34, 17, 34);
    room.position.y = 6;
    s.add(room);

    const panel = (w, h, d, x, y, z, intensity, color, rx, ry) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: new THREE.Color(color),
          emissiveIntensity: intensity,
          roughness: 1,
        })
      );
      m.position.set(x, y, z);
      if (rx) m.rotation.x = rx;
      if (ry) m.rotation.y = ry;
      s.add(m);
      return m;
    };

    // two long overhead strips give the body its stretched highlight
    panel(24, 0.2, 3.6, 0, 11.5, 3.8, dark ? 7 : 8.5, 0xffffff);
    panel(24, 0.2, 3.0, 0, 11.5, -3.6, dark ? 5.5 : 6.5, 0xfff4e6);
    // key softbox, high and forward
    panel(10, 7, 0.2, 9, 8, 7, dark ? 4 : 4.6, 0xffffff, -0.5, -0.6);
    // side fills shape the flanks
    panel(16, 7, 0.2, 0, 4.5, 12, dark ? 1.6 : 3.2, 0xdfe8ff);
    panel(16, 7, 0.2, 0, 4.5, -12, dark ? 1.2 : 2.6, 0xfff0dd);
    // low rim from behind picks out the rear haunches
    panel(8, 3, 0.2, -13, 2.6, 0, dark ? 3.2 : 2.4, 0xbfd4ff, 0, 1.57);
    // ground bounce
    panel(26, 0.2, 20, 0, -0.4, 0, dark ? 0.35 : 1.5, 0xffffff);

    const tex = pmrem.fromScene(s, 0.03).texture;
    s.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
    envCache[dark] = tex;
    return tex;
  }

  /* ---- floor, backdrop, contact shadow ---------------------------------- */
  const floorTex = TX.toTexture(THREE, TX.floorCanvas(512, '#ffffff', '#b7babf'), { srgb: true });
  floorTex.wrapS = floorTex.wrapT = THREE.ClampToEdgeWrapping;
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xe8e9eb,
    map: floorTex,
    roughness: 0.62,
    metalness: 0,
    envMapIntensity: 0.55,
  });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(70, 96), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  /* Cyclorama: an unlit gradient wall whose base colour is exactly the fog
     colour, so the floor dissolves into it and there is no horizon line. */
  const SKY = { light: '#e6e7ea', dark: '#0a0b0d' };
  const backTex = TX.toTexture(THREE, TX.backdropCanvas(SKY.light, '#c3c6cc', 0.5), { srgb: true });
  backTex.wrapS = backTex.wrapT = THREE.ClampToEdgeWrapping;
  const backMat = new THREE.MeshBasicMaterial({
    map: backTex,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    // fog is composited after tone mapping, so the wall must skip tone mapping
    // too or the horizon shows as a step between wall and fogged floor
    toneMapped: false,
  });
  const backdrop = new THREE.Mesh(new THREE.CylinderGeometry(150, 150, 300, 48, 1, true), backMat);
  scene.add(backdrop);
  scene.fog = new THREE.Fog(0xe6e7ea, 17, 44);

  const blobTex = TX.toTexture(THREE, TX.blobCanvas(512));
  blobTex.wrapS = blobTex.wrapT = THREE.ClampToEdgeWrapping;
  const blobMat = new THREE.MeshBasicMaterial({
    map: blobTex,
    transparent: true,
    opacity: 0.55,
    color: 0x000000,
    depthWrite: false,
  });
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 3.3), blobMat);
  blob.rotation.x = -Math.PI / 2;
  blob.position.y = 0.004;
  blob.renderOrder = 1;
  scene.add(blob);

  /* ---- key light --------------------------------------------------------- */
  const key = new THREE.DirectionalLight(0xffffff, 1.9);
  key.position.set(5.5, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 26;
  key.shadow.camera.left = -4.2;
  key.shadow.camera.right = 4.2;
  key.shadow.camera.top = 4.2;
  key.shadow.camera.bottom = -4.2;
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.018;
  scene.add(key);
  scene.add(key.target);

  const fill = new THREE.DirectionalLight(0xcfe0ff, 0.35);
  fill.position.set(-7, 4, -6);
  scene.add(fill);

  /* ---- theme ------------------------------------------------------------- */
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  let themeOverride = null;

  function isDark() {
    if (themeOverride) return themeOverride === 'dark';
    return mq.matches;
  }

  function applyTheme() {
    const dark = isDark();
    scene.environment = buildEnv(dark);
    scene.background = new THREE.Color(dark ? 0x0a0b0d : 0xe6e7ea);
    scene.fog.color.setHex(dark ? 0x0a0b0d : 0xe6e7ea);
    floorMat.color.setHex(dark ? 0x15171b : 0xe9eaec);
    backMat.map = TX.toTexture(
      THREE,
      TX.backdropCanvas(dark ? SKY.dark : SKY.light, dark ? '#1b1e24' : '#c3c6cc', 0.5),
      { srgb: true }
    );
    backMat.map.wrapS = backMat.map.wrapT = THREE.ClampToEdgeWrapping;
    backMat.needsUpdate = true;
    blobMat.opacity = dark ? 0.72 : 0.55;
    key.intensity = dark ? 1.5 : 1.9;
    fill.intensity = dark ? 0.22 : 0.35;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
  mq.addEventListener('change', () => {
    if (!themeOverride) applyTheme();
  });

  /* ---- camera rig -------------------------------------------------------- */
  const rig = {
    theta: (VIEWS[0].theta * Math.PI) / 180,
    phi: (VIEWS[0].phi * Math.PI) / 180,
    r: VIEWS[0].r,
    fov: VIEWS[0].fov,
  };
  const goal = Object.assign({}, rig);
  const target = new THREE.Vector3(0, 0.62, 0);
  let snap = true;

  /* The control rail covers part of the canvas, so the car is nudged off the
     geometric centre to sit centred in what the viewer actually sees. */
  let frameForUI = true;
  const _right = new THREE.Vector3();
  const _up = new THREE.Vector3();
  const _off = new THREE.Vector3();
  const _look = new THREE.Vector3();

  function placeCamera() {
    const cp = Math.cos(rig.phi);
    camera.position.set(
      target.x + rig.r * cp * Math.cos(rig.theta),
      target.y + rig.r * Math.sin(rig.phi),
      target.z + rig.r * cp * Math.sin(rig.theta)
    );
    camera.fov = rig.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(target);
    if (!frameForUI) return;
    const h = Math.max(1, window.innerHeight);
    const perPx = (2 * rig.r * Math.tan((rig.fov * Math.PI) / 360)) / h;
    const narrow = window.innerWidth <= 860;
    const dx = narrow ? 0 : 153 * perPx;
    const dy = narrow ? -h * 0.24 * perPx : 0;
    camera.updateMatrixWorld(true);
    _right.setFromMatrixColumn(camera.matrixWorld, 0);
    _up.setFromMatrixColumn(camera.matrixWorld, 1);
    _off.copy(_right).multiplyScalar(dx).addScaledVector(_up, dy);
    camera.position.add(_off);
    _look.copy(target).add(_off);
    camera.lookAt(_look);
  }

  function setView(v, immediate) {
    goal.theta = (v.theta * Math.PI) / 180;
    goal.phi = (v.phi * Math.PI) / 180;
    goal.r = v.r;
    goal.fov = v.fov;
    if (immediate) {
      Object.assign(rig, goal);
      placeCamera();
    }
  }

  /* pointer orbit */
  const canvas = renderer.domElement;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let pinch = 0;

  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' && e.isPrimary === false) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add('dragging');
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    goal.theta -= (e.clientX - lastX) * 0.0055;
    goal.phi = clamp(goal.phi + (e.clientY - lastY) * 0.0045, -0.06, 1.49);
    lastX = e.clientX;
    lastY = e.clientY;
  });
  const endDrag = () => {
    dragging = false;
    canvas.classList.remove('dragging');
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      goal.r = clamp(goal.r * (1 + e.deltaY * 0.0012), 4.2, 26);
    },
    { passive: false }
  );
  canvas.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length !== 2) return;
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (pinch) goal.r = clamp(goal.r * (pinch / d), 4.2, 26);
      pinch = d;
    },
    { passive: true }
  );
  canvas.addEventListener('touchend', () => {
    pinch = 0;
  });

  /* ---- state ------------------------------------------------------------- */
  const state = {
    speedTarget: 0,
    speed: 0,
    prevSpeed: 0,
    braking: false,
    wing: 0,
    steerOn: false,
    steerPhase: 0,
    autoRotate: true,
    tour: false,
    tourTimer: 0,
    tourIndex: 0,
    lamps: true,
    view: VIEWS[0],
    spinAngle: 0,
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) state.autoRotate = false;

  /* ---- build the car ----------------------------------------------------- */
  let car = null;
  let mats = null;

  function build() {
    mats = CAR.makeMaterials(THREE);
    car = CAR.buildCar(THREE, mats);
    scene.add(car.root);
    window.__car = car;
    car.root.add(blob);
    key.target.position.set(0, 0.5, 0);
    applyPaint(0);
  }

  function applyPaint(i) {
    const p = CAR.PAINTS[i];
    mats.paint.color.setHex(p.color);
    mats.paint.metalness = p.metal;
    mats.paint.roughness = p.rough;
    dom('paint-cn').textContent = p.name;
    dom('paint-en').textContent = p.en.toUpperCase();
  }

  /* ---- UI ---------------------------------------------------------------- */
  function buildUI() {
    const viewWrap = dom('views');
    const viewButtons = [];
    VIEWS.forEach((v, i) => {
      const b = document.createElement('button');
      b.innerHTML = v.cn + '<span class="k">' + (i + 1) + '</span>';
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', () => selectView(i));
      viewWrap.appendChild(b);
      viewButtons.push(b);
    });

    function selectView(i, immediate) {
      state.view = VIEWS[i];
      setView(VIEWS[i], !!immediate);
      viewButtons.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
      if (state.autoRotate) toggleSpin(false);
    }

    const paintWrap = dom('paints');
    const paintButtons = [];
    CAR.PAINTS.forEach((p, i) => {
      const b = document.createElement('button');
      b.className = 'swatch';
      b.style.background = '#' + p.color.toString(16).padStart(6, '0');
      b.title = p.name + ' / ' + p.en;
      b.setAttribute('aria-label', p.name);
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', () => {
        applyPaint(i);
        paintButtons.forEach((x, k) => x.setAttribute('aria-pressed', String(k === i)));
      });
      paintWrap.appendChild(b);
      paintButtons.push(b);
    });

    const speed = dom('speed');
    speed.addEventListener('input', () => {
      state.speedTarget = +speed.value;
      dom('speed-val').textContent = speed.value;
    });

    const brake = dom('brake');
    const setBrake = (on) => {
      state.braking = on;
      brake.setAttribute('aria-pressed', String(on));
    };
    brake.addEventListener('pointerdown', () => setBrake(true));
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) =>
      brake.addEventListener(ev, () => setBrake(false))
    );
    brake.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') setBrake(true);
    });
    brake.addEventListener('keyup', () => setBrake(false));

    const spinBtn = dom('spin');
    function toggleSpin(on) {
      state.autoRotate = on;
      spinBtn.setAttribute('aria-pressed', String(on));
    }
    spinBtn.addEventListener('click', () => toggleSpin(!state.autoRotate));
    toggleSpin(state.autoRotate);
    window.__toggleSpin = toggleSpin;

    const steerBtn = dom('steer');
    steerBtn.addEventListener('click', () => {
      state.steerOn = !state.steerOn;
      steerBtn.setAttribute('aria-pressed', String(state.steerOn));
    });

    const lampBtn = dom('lamps');
    lampBtn.addEventListener('click', () => {
      state.lamps = !state.lamps;
      lampBtn.setAttribute('aria-pressed', String(state.lamps));
    });

    const tourBtn = dom('tour');
    tourBtn.addEventListener('click', () => {
      state.tour = !state.tour;
      state.tourTimer = 0;
      state.tourIndex = 0;
      tourBtn.setAttribute('aria-pressed', String(state.tour));
      if (state.tour) toggleSpin(false);
    });

    const exposure = dom('exposure');
    exposure.addEventListener('input', () => {
      renderer.toneMappingExposure = +exposure.value;
      dom('exposure-val').textContent = (+exposure.value).toFixed(2);
    });

    dom('theme').addEventListener('click', () => {
      themeOverride = isDark() ? 'light' : 'dark';
      applyTheme();
    });

    dom('reset').addEventListener('click', () => {
      state.speedTarget = 0;
      speed.value = 0;
      dom('speed-val').textContent = '0';
      state.steerOn = false;
      steerBtn.setAttribute('aria-pressed', 'false');
      state.tour = false;
      tourBtn.setAttribute('aria-pressed', 'false');
      selectView(0);
      toggleSpin(true);
      car.root.rotation.y = 0;
    });

    dom('shot').addEventListener('click', exportSheet);

    window.addEventListener('keydown', (e) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 6) selectView(n - 1);
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        toggleSpin(!state.autoRotate);
      }
    });

    let hintTimer = setTimeout(() => {
      dom('hint').style.opacity = '0';
    }, 9000);
    canvas.addEventListener('pointerdown', () => {
      clearTimeout(hintTimer);
      dom('hint').style.opacity = '0';
    });

    window.__selectView = selectView;
  }

  /* ---- six-view contact sheet -------------------------------------------- */
  function exportSheet() {
    const cw = 1120;
    const ch = 760;
    const cols = 3;
    const rows = 2;
    const out = document.createElement('canvas');
    out.width = cw * cols;
    out.height = ch * rows;
    const ctx = out.getContext('2d');
    const dark = isDark();
    ctx.fillStyle = dark ? '#0a0b0d' : '#e6e7ea';
    ctx.fillRect(0, 0, out.width, out.height);

    const savedRig = Object.assign({}, rig);
    const savedRot = car.root.rotation.y;
    const savedRatio = renderer.getPixelRatio();
    const size = new THREE.Vector2();
    renderer.getSize(size);

    car.root.rotation.y = 0;
    frameForUI = false;
    renderer.setPixelRatio(1);
    renderer.setSize(cw, ch, false);
    camera.aspect = cw / ch;

    VIEWS.forEach((v, i) => {
      setView(v, true);
      renderer.render(scene, camera);
      const x = (i % cols) * cw;
      const y = Math.floor(i / cols) * ch;
      ctx.drawImage(renderer.domElement, x, y);
      ctx.fillStyle = dark ? 'rgba(233,236,241,0.72)' : 'rgba(15,18,22,0.6)';
      ctx.font = '600 22px "Saira Condensed", sans-serif';
      ctx.fillText(v.cn + '  ·  ' + v.k, x + 34, y + ch - 32);
    });

    ctx.fillStyle = dark ? 'rgba(233,236,241,0.5)' : 'rgba(15,18,22,0.45)';
    ctx.font = '600 24px "Saira Condensed", sans-serif';
    ctx.fillText('NOCTIS R1 PROTOTIPO · SIX-VIEW STUDY', 34, 44);

    renderer.setPixelRatio(savedRatio);
    frameForUI = true;
    resize();
    Object.assign(rig, savedRig);
    Object.assign(goal, savedRig);
    car.root.rotation.y = savedRot;
    placeCamera();

    out.toBlob((b) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = 'noctis-r1-six-view.png';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }, 'image/png');
  }

  /* ---- loop -------------------------------------------------------------- */
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  const fmt = (v) => Math.round(v).toString();

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);

    if (state.tour) {
      state.tourTimer += dt;
      if (state.tourTimer > 3.4) {
        state.tourTimer = 0;
        state.tourIndex = (state.tourIndex + 1) % VIEWS.length;
        window.__selectView(state.tourIndex);
        state.tour = true;
        dom('tour').setAttribute('aria-pressed', 'true');
      }
    }

    // drivetrain
    const wanted = state.braking ? 0 : state.speedTarget;
    state.speed = damp(state.speed, wanted, state.braking ? 1.9 : 0.6, dt);
    const accel = (state.speed - state.prevSpeed) / Math.max(dt, 1e-3);
    state.prevSpeed = state.speed;

    const v = state.speed;
    const wingTarget = state.braking && v > 40 ? 0.95 : smoothstep((v - 70) / 140) * 0.16;
    state.wing = damp(state.wing, wingTarget, 5, dt);
    car.wing.rotation.z = state.wing;
    car.wing.position.y = 1.05 + state.wing * 0.1;

    const ride = smoothstep(v / 260) * 0.03;
    car.chassis.position.y = -ride;
    car.chassis.rotation.z = clamp(-accel * 0.0012, -0.012, 0.012);

    state.spinAngle -= ((v / 3.6) * dt) / 0.36;
    state.steerPhase += dt;
    const steerAngle = state.steerOn ? Math.sin(state.steerPhase * 0.8) * 0.42 : 0;
    car.wheels.forEach((w) => {
      w.spin.rotation.z = state.spinAngle * (0.36 / w.radius) * w.flip;
      if (w.isFront) w.steer.rotation.y = damp(w.steer.rotation.y, steerAngle, 6, dt);
    });

    // lamps
    const lampOn = state.lamps ? 1 : 0;
    mats.lampWhite.emissiveIntensity = damp(
      mats.lampWhite.emissiveIntensity,
      lampOn * 3.4,
      8,
      dt
    );
    const brakeGlow = state.braking ? 6.5 : 2.4;
    mats.lampRed.emissiveIntensity = damp(
      mats.lampRed.emissiveIntensity,
      lampOn * brakeGlow,
      10,
      dt
    );

    if (state.autoRotate && !dragging) car.root.rotation.y += dt * 0.16;

    // camera easing
    if (snap) {
      Object.assign(rig, goal);
      snap = false;
    } else {
      rig.theta = damp(rig.theta, goal.theta, 5, dt);
      rig.phi = damp(rig.phi, goal.phi, 5, dt);
      rig.r = damp(rig.r, goal.r, 5, dt);
      rig.fov = damp(rig.fov, goal.fov, 5, dt);
    }
    placeCamera();

    // telemetry
    const gear = clamp(Math.floor(v / 47), 0, 6);
    const rpm = v < 1 ? 820 : 1500 + ((v - gear * 47) / 47) * 7200;
    const df = 0.0135 * v * v * (1 + state.wing * 0.5);
    dom('t-speed').innerHTML = fmt(v) + '<i>km/h</i>';
    dom('t-rpm').innerHTML = fmt(rpm) + '<i>rpm</i>';
    dom('t-wing').innerHTML = fmt((state.wing * 180) / Math.PI) + '<i>°</i>';
    dom('t-df').innerHTML = fmt(df) + '<i>kg</i>';
    dom('t-ride').innerHTML = fmt(124 - ride * 1000) + '<i>mm</i>';
    dom('telemetry').classList.toggle('alert', state.braking);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  /* ---- boot -------------------------------------------------------------- */
  applyTheme();
  resize();
  placeCamera();

  requestAnimationFrame(() => {
    loaderMsg.textContent = '正在生成车身曲面';
    requestAnimationFrame(() => {
      try {
        const t0 = performance.now();
        build();
        buildUI();
        window.__buildMs = Math.round(performance.now() - t0);
        loader.classList.add('done');
        tick();
      } catch (err) {
        fail('生成三维场景时出错：' + (err && err.message ? err.message : err));
        throw err;
      }
    });
  });
})();
