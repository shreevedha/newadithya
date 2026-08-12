/* ====================================================================
   ADITYA MEDICARE HOSPITALS — CINEMATIC ANIMATION ENGINE v3.0
   ====================================================================
   Awwwards-Level Premium Animation System
   Three.js + GSAP ScrollTrigger + D3.js + Custom GLSL Shaders
   
   Architecture:
   ─── Hero → Spectacular WebGL (shaders, DNA, ECG, particles, camera parallax)
   ─── Major Sections → Cinematic scroll choreography (pinning, camera dolly)
   ─── Cards → Interactive 3D (cursor lighting, multi-axis tilt, layer separation)
   ─── Buttons → Magnetic + glow + ripple physics
   ─── Images → WebGL distortion + parallax
   ─── Navigation → Spatial glass with dynamic blur
   ─── Background → Noise field + flow particles
   ─── Text → Kinetic typography + velocity skew
   ─── Footer → Elegant stagger reveal
   ==================================================================== */

(function() {
  'use strict';

  // ─── DEVICE & PERFORMANCE DETECTION ─────────────────────────────
  const W = window;
  const D = document;
  const isMobile = W.innerWidth < 768;
  const isTablet = W.innerWidth >= 768 && W.innerWidth < 1024;
  const isReducedMotion = false; // Ensure full Awwwards-level animations run by default
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const performanceTier = isMobile ? 'mid' : 'high';
  const activeScenes = [];
  let customCursorEl = null;
  let cursorDot = null;

  // Fix DOMContentLoaded race: if DOM already loaded, call boot directly
  if (D.readyState === 'loading') {
    D.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  W.addEventListener('beforeunload', cleanup);

  function boot() {
    const isMobile = W.innerWidth < 768;
    const performanceTier = isMobile ? 'mid' : 'high';

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.config({ nullTargetWarn: false });
    }

    function safeRun(fn) {
      try { fn(); } catch (e) { /* resilient error boundary */ }
    }

    // Layer 1: Core (runs everywhere)
    safeRun(injectAnimationStyles);
    safeRun(initWhatsAppContactButton);
    safeRun(initAnimatedAwardCards);
    safeRun(initPinnedFooterReveal);
    safeRun(initFormGlowAnimations);

    // Layer 2: Standard animations
    if (!isReducedMotion) {
      safeRun(initHeroTextReveal);
      safeRun(initScrollChoreography);
      safeRun(initMagneticButtons);
      safeRun(initStatCounterAnimation);
      safeRun(initNavigationGlass);
      safeRun(initCareJourneyMap);
      safeRun(initImageEffects);
      safeRun(initChatbotMotion);
      safeRun(initFooterReveal);
      safeRun(initSpringPhysicsStagger);
      safeRun(initHeroParallax);
      safeRun(initHealthCardAnimations);
    }

    // Layer 3: Enhanced
    if (!isMobile && !isReducedMotion) {
      safeRun(initCardInteractive3D);
      safeRun(initFloatingMedicalParticles);
      safeRun(initKineticTypography);
      safeRun(initCursorSpotlight);
      safeRun(initPhysicallyBasedMedicalIcons);
      safeRun(initGlassRefractionShader);
      safeRun(initHumanAnatomyExplorer);
    }

    // Layer 4: Premium WebGL
    if (performanceTier === 'high' && !isReducedMotion) {
      safeRun(initCustomCursor);
      // Hero WebGL/cube removed: the hero now uses the lightweight ECG wave.
      safeRun(initMedicalTechGallery3D);
      safeRun(initFluidGradientBackground);
      safeRun(initDisplacementTransition);
      // Removed: the legacy particle-morph overlay rendered as a distracting
      // cyan block cloud behind the Legacy section.
      // Keep the hospital image clean; no displacement canvas over the hero.
    }

    // Layer 5: Data
    if (typeof d3 !== 'undefined' && !isReducedMotion) {
      safeRun(initEmergencyCapacityD3);
    }

    // Layer 6: Tilt enhancement
    if (!isReducedMotion) safeRun(initEnhancedTilt);
  }

  function cleanup() {
    activeScenes.forEach(s => {
      try {
        cancelAnimationFrame(s.raf);
        if (s.renderer) { s.renderer.dispose(); s.renderer.forceContextLoss(); }
      } catch(e) {}
    });
  }

  // ─── GLOBAL ANIMATION STYLE INJECTION ───────────────────────────
  function injectAnimationStyles() {
    const css = D.createElement('style');
    css.id = 'aditya-anim-styles';
    css.textContent = `
      /* ── Normal System Cursor ── */
      .agy-cursor, .agy-cursor-dot { display: none !important; }
      body, html { cursor: auto !important; }
      a, button, input[type="button"], input[type="submit"], .btn, select, [role="button"] { cursor: pointer !important; }

      /* ── Magnetic Button Glow ── */
      .btn-glow-active { box-shadow: 0 0 25px rgba(0,240,255,0.35), 0 0 50px rgba(0,136,204,0.15),
        inset 0 0 15px rgba(0,240,255,0.05) !important; }

      /* ── Button Shine Sweep ── */
      .btn { position: relative; overflow: hidden; }
      .btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        transform: skewX(-25deg); transition: none; }
      .btn:hover::before { left: 150%; transition: left 0.6s ease; }

      /* ── Journey Pulse ── */
      .jm-active { position: relative; }
      .jm-active::after { content: ''; position: absolute; inset: -6px; border: 2px solid rgba(0,240,255,0.3);
        border-radius: 16px; animation: jmPulse 2s ease-in-out infinite; pointer-events: none; }
      @keyframes jmPulse { 0%,100% { opacity:0.3; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.04); } }

      /* ── Card Cursor Lighting ── */
      .card-light-overlay { position: absolute; inset: 0; border-radius: inherit;
        pointer-events: none; z-index: 2; opacity: 0; transition: opacity 0.3s ease;
        background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(0,240,255,0.06), transparent 40%); }

      /* ── Floating Medical Particles ── */
      @keyframes medSymbolFloat {
        0%,100% { transform: translateY(0) rotate(0deg); opacity: var(--p-opacity); }
        50% { transform: translateY(calc(var(--float-y, -20px))) rotate(var(--float-r, 5deg)); opacity: calc(var(--p-opacity) * 1.5); }
      }
      .med-sym { position: absolute; pointer-events: none; z-index: 0; will-change: transform;
        animation: medSymbolFloat var(--float-dur, 6s) ease-in-out infinite; animation-delay: var(--float-delay, 0s); }
      .med-cross { width: 10px; height: 10px; }
      .med-cross::before, .med-cross::after { content:''; position:absolute; background: rgba(0,240,255,0.12); border-radius:1px; }
      .med-cross::before { width:10px; height:3px; top:3.5px; left:0; }
      .med-cross::after { width:3px; height:10px; top:0; left:3.5px; }
      .med-pill { width:12px; height:5px; border-radius:3px;
        background: linear-gradient(90deg, rgba(0,240,255,0.12) 50%, rgba(0,170,255,0.08) 50%); }
      .med-helix { width:8px; height:8px; border:1.5px solid rgba(0,240,255,0.1);
        border-radius:50%; border-top-color: transparent; border-bottom-color: transparent; }

      /* ── Hotspot Ping ── */
      @keyframes hsPing { 0%,100% { box-shadow:0 0 8px rgba(0,240,255,0.3); transform:scale(1); }
        50% { box-shadow:0 0 20px rgba(0,240,255,0.6); transform:scale(1.3); } }

      /* ── Kinetic Text ── */
      .k-char { display: inline-block; will-change: transform; }

      /* ── Glass Nav ── */
      .navbar { transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease !important; }
      .navbar.glass-active { background: rgba(12,30,53,0.72) !important;
        backdrop-filter: blur(16px) saturate(1.4) !important;
        -webkit-backdrop-filter: blur(16px) saturate(1.4) !important;
        box-shadow: 0 4px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05) !important; }

      /* ── Ripple ── */
      .btn-ripple { position:absolute; border-radius:50%; background:rgba(255,255,255,0.35);
        pointer-events:none; transform:scale(0); }

      /* ── Noise Canvas ── */
      .noise-bg-canvas { position:absolute; inset:0; pointer-events:none; z-index:0; opacity:0.04; }

      /* ── Responsive ── */
      @media (max-width:768px) {
        .agy-cursor, .agy-cursor-dot { display:none !important; }
        .card-light-overlay { display:none; }
      }
    `;
    D.head.appendChild(css);
  }

  /* ================================================================
     ██╗  ██╗███████╗██████╗  ██████╗
     ██║  ██║██╔════╝██╔══██╗██╔═══██╗
     ███████║█████╗  ██████╔╝██║   ██║
     ██╔══██║██╔══╝  ██╔══██╗██║   ██║
     ██║  ██║███████╗██║  ██║╚██████╔╝
     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝
     1. WEBGL HERO — Spectacular 3D Scene
     ================================================================ */
  function initWebGLHero() {
    const container = D.getElementById('hero-3d-scene-container');
    if (!container || typeof THREE === 'undefined') return;
    container.innerHTML = '';

    const scene = new THREE.Scene();
    const w = container.clientWidth, h = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(W.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);

    // ── GLSL Noise Shader Background Plane ──
    const noiseVert = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
    const noiseFrag = `
      precision mediump float;
      uniform float uTime;
      varying vec2 vUv;
      
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v=0.0, a=0.5;
        for(int i=0; i<4; i++) { v += a*noise(p); p *= 2.0; a *= 0.5; }
        return v;
      }
      void main() {
        vec2 uv = vUv * 3.0;
        float n = fbm(uv + uTime * 0.15);
        float n2 = fbm(uv * 1.5 - uTime * 0.1);
        vec3 c1 = vec3(0.0, 0.06, 0.12);
        vec3 c2 = vec3(0.0, 0.94, 1.0);
        vec3 col = mix(c1, c2, n * n2 * 0.5);
        gl_FragColor = vec4(col, 0.08);
      }
    `;
    const noiseMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: noiseVert, fragmentShader: noiseFrag,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const noisePlane = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), noiseMat);
    noisePlane.position.z = -5;
    world.add(noisePlane);

    // ── HERO SCENE LIGHTING (PointLight + Volumetric Light Beam) ──
    const heroPointLight = new THREE.PointLight(0x00F0FF, 2, 40);
    heroPointLight.position.set(5, 5, 8);
    world.add(heroPointLight);

    const ambLight = new THREE.AmbientLight(0x0c1e35, 1.5);
    world.add(ambLight);

    // Volumetric Cone Light Beam Shader
    const beamGeo = new THREE.ConeGeometry(8, 25, 32, 1, true);
    const beamMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          float fadeY = smoothstep(1.0, 0.0, vUv.y);
          float fadeX = smoothstep(0.5, 0.0, abs(vUv.x - 0.5));
          float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
          gl_FragColor = vec4(0.0, 0.94, 1.0, fadeY * fadeX * 0.09 * pulse);
        }
      `,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    // ── 3D HOSPITAL ARCHITECTURE MODEL WITH X-RAY FRESNEL SHADER ──
    const fresnelVert = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vPosition = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const fresnelFrag = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform float uCamRotY;
      void main() {
        vec3 viewVector = normalize(-vPosition);
        float fresnel = pow(1.0 - abs(dot(viewVector, vNormal)), 2.0);
        float intensity = (0.45 + 0.55 * fresnel) * (1.0 + 0.4 * sin(uCamRotY * 2.5 + uTime));
        vec3 xRayColor = mix(vec3(0.0, 0.35, 0.75), vec3(0.0, 0.94, 1.0), fresnel);
        float pulse = 0.85 + 0.15 * sin(uTime * 2.2);
        gl_FragColor = vec4(xRayColor, intensity * 0.42 * pulse);
      }
    `;
    const fresnelMat = new THREE.ShaderMaterial({
      vertexShader: fresnelVert,
      fragmentShader: fresnelFrag,
      uniforms: { uTime: { value: 0 }, uCamRotY: { value: 0 } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const hospitalModelGroup = new THREE.Group();
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(6.5, 8.5, 4.5), fresnelMat);
    mainBuilding.position.set(-6, -1, -4);
    const eastWing = new THREE.Mesh(new THREE.BoxGeometry(4.5, 5.5, 3.5), fresnelMat);
    eastWing.position.set(-1, -2.5, -5);
    const westWing = new THREE.Mesh(new THREE.BoxGeometry(3.8, 4.8, 3.5), fresnelMat);
    westWing.position.set(-10, -3, -5);
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 1.8, 16), fresnelMat);
    tower.position.set(-6, 4.2, -4);

    hospitalModelGroup.add(mainBuilding, eastWing, westWing, tower);
    world.add(hospitalModelGroup);

    // ── SCROLL-DRIVEN CAMERA ORBIT ──
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to(camera.position, {
        x: 6,
        y: 4,
        z: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
      gsap.to(hospitalModelGroup.rotation, {
        y: Math.PI * 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: self => {
            fresnelMat.uniforms.uCamRotY.value = self.progress * Math.PI * 0.35;
          }
        }
      });
    }

    // ── DNA Double Helix with Glow ──
    const dna = new THREE.Group();
    const sGeo = new THREE.SphereGeometry(0.15, 10, 10);
    const s1Mat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending });
    const s2Mat = new THREE.MeshBasicMaterial({ color: 0x0088FF, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
    const lMat = new THREE.LineBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.05 });

    for (let i = 0; i < 55; i++) {
      const a = i * 0.33, y = (i / 55) * 20 - 10, r = 1.6;
      const p1 = new THREE.Vector3(Math.cos(a)*r, y, Math.sin(a)*r);
      const p2 = new THREE.Vector3(Math.cos(a+Math.PI)*r, y, Math.sin(a+Math.PI)*r);
      const m1 = new THREE.Mesh(sGeo, s1Mat); m1.position.copy(p1);
      const m2 = new THREE.Mesh(sGeo, s2Mat); m2.position.copy(p2);
      dna.add(m1, m2);
      if (i % 2 === 0) dna.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([p1,p2]), lMat));
    }
    dna.position.set(7, 0, -3);
    dna.rotation.z = 0.3;
    world.add(dna);

    // ── ECG Heartbeat Line ──
    const ecgN = 150;
    const ecgArr = new Float32Array(ecgN * 3);
    const ecgGeo = new THREE.BufferGeometry();
    ecgGeo.setAttribute('position', new THREE.BufferAttribute(ecgArr, 3));
    const ecgLine = new THREE.Line(ecgGeo, new THREE.LineBasicMaterial({
      color: 0x00F0FF, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending
    }));
    ecgLine.position.set(0, -5, -1);
    world.add(ecgLine);

    // ── Particle System (120 particles) ──
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pVelocities = [];
    for (let i = 0; i < pCount; i++) {
      pPositions[i*3] = (Math.random()-0.5)*40;
      pPositions[i*3+1] = (Math.random()-0.5)*25;
      pPositions[i*3+2] = (Math.random()-0.5)*15;
      pVelocities.push({ vy: Math.random()*0.012+0.004, vx: (Math.random()-0.5)*0.006, phase: Math.random()*6.28 });
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00F0FF, size: 1.5, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const points = new THREE.Points(pGeo, pMat);
    world.add(points);

    // ── Mouse Parallax ──
    let mx = 0, my = 0;
    W.addEventListener('mousemove', e => { mx = (e.clientX/W.innerWidth - 0.5)*2; my = (e.clientY/W.innerHeight - 0.5)*2; });

    W.addEventListener('resize', () => {
      const nw = container.clientWidth, nh = container.clientHeight;
      camera.aspect = nw/nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh);
    });

    let t = 0, raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      t += 0.03;

      // Shader time
      noiseMat.uniforms.uTime.value = t;
      beamMat.uniforms.uTime.value = t;
      fresnelMat.uniforms.uTime.value = t;

      // DNA rotation
      dna.rotation.y += 0.003;

      // ECG wave
      const ep = ecgLine.geometry.attributes.position.array;
      for (let i = 0; i < ecgN; i++) {
        ep[i*3] = (i - ecgN/2) * 0.2;
        const w = (ep[i*3] + t * 4) % 14;
        let y = 0;
        if (w > 6 && w < 6.3) y = Math.sin((w-6)/0.3*Math.PI) * 1.2;
        else if (w > 6.3 && w < 6.5) y = -Math.sin((w-6.3)/0.2*Math.PI) * 2.8;
        else if (w > 6.5 && w < 7.2) y = Math.sin((w-6.5)/0.7*Math.PI) * 1.6;
        ep[i*3+1] = y;
      }
      ecgLine.geometry.attributes.position.needsUpdate = true;

      // Particles float
      const pp = points.geometry.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        const v = pVelocities[i];
        pp[i*3+1] += v.vy;
        pp[i*3] += v.vx;
        v.phase += 0.02;
        if (pp[i*3+1] > 13) pp[i*3+1] = -13;
        if (Math.abs(pp[i*3]) > 20) pp[i*3] *= -0.9;
      }
      points.geometry.attributes.position.needsUpdate = true;

      // Camera parallax with smooth lerp
      camera.position.x += (mx * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (-my * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();
    activeScenes.push({ renderer, scene, raf });
  }

  /* ================================================================
     2. HERO TEXT REVEAL — Cinematic Split Text Animation
     ================================================================ */
  function initHeroTextReveal() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    const badge = D.querySelector('.hero-badge');
    const title = D.querySelector('.hero-title');
    const subtitle = D.querySelector('.hero-subtitle');
    const ctaButtons = D.querySelectorAll('.hero-actions .btn');
    const infoBar = D.querySelector('.hero-info-bar');
    const statCards = D.querySelectorAll('.stat-card');

    // Badge entrance
    if (badge) tl.from(badge, { y: -30, opacity: 0, scale: 0.9, duration: 0.7 }, 0.3);

    // Title entrance without wiping innerHTML formatting
    if (title) {
      tl.from(title, {
        y: 35, opacity: 0, duration: 0.9
      }, 0.5);
    }

    if (subtitle) tl.from(subtitle, { y: 30, opacity: 0, duration: 0.9 }, 1.0);

    // CTA with spring bounce
    if (ctaButtons.length) tl.from(ctaButtons, {
      scale: 0.6, opacity: 0, y: 20, duration: 0.8,
      stagger: 0.12, ease: 'back.out(2)'
    }, 1.2);

    // Info bar slide up
    if (infoBar) tl.from(infoBar, { y: 40, opacity: 0, duration: 0.8 }, 1.5);

    // Stats counter stagger
    if (statCards.length) tl.from(statCards, {
      y: 30, opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.1
    }, 1.8);
  }

  /* ================================================================
     3. SCROLL CHOREOGRAPHY — Cinematic Section Transitions
     ================================================================ */
  function initScrollChoreography() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // ── Section Headers: cinematic reveal ──
    D.querySelectorAll('.section-header').forEach(header => {
      if (header.closest('.subpage-hero-banner') || header.closest('.hero-section') || header.closest('.health-card-hero') || header.closest('.expert-talks-card') || header.closest('.healthy-family-card') || header.closest('.review-card')) {
        // Hero & Card section headers animate immediately on load using fromTo for guaranteed opacity 1
        const tag = header.querySelector('.section-tag');
        const title = header.querySelector('.section-title');
        const sub = header.querySelector('.section-subtitle');
        const tl = gsap.timeline();
        if (tag) tl.fromTo(tag, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);
        if (title) tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.25);
        if (sub) tl.fromTo(sub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.45);
        return;
      }

      const tag = header.querySelector('.section-tag');
      const title = header.querySelector('.section-title');
      const sub = header.querySelector('.section-subtitle');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: header, start: 'top 88%', toggleActions: 'play none none none' }
      });

      if (tag) tl.fromTo(tag, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
      if (title) tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.15);
      if (sub) tl.fromTo(sub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.35);
    });

    // ── Staggered Card Grids ──
    const grids = {
      '#doctors-grid-container': '.doctor-card',
      '.facilities-grid': '.facility-card',
      '.tech-grid': '.tech-card',
      '.journey-timeline-grid': '.journey-step-item',
      '.clinical-dept-grid': '.clinical-dept-item',
      '.ribbon-grid': '.ribbon-item'
    };

    Object.entries(grids).forEach(([g, c]) => {
      const grid = D.querySelector(g);
      if (!grid) return;
      const cards = grid.querySelectorAll(c);
      if (!cards.length) return;

      gsap.fromTo(cards, 
        { y: 35, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 90%' }
        }
      );
    });

    // ── Dark section dramatic entrance ──
    D.querySelectorAll('.section-dark-tech, .clinical-depts-section, #section-3d-gif-showcase').forEach(sec => {
      gsap.from(sec, {
        opacity: 0.3, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: sec, start: 'top 90%' }
      });
    });

    // ── Robotic banner parallax ──
    const roboticImg = D.querySelector('.robotic-media img');
    if (roboticImg) {
      gsap.fromTo(roboticImg, { y: 40 }, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: roboticImg, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }

    // ── Legacy section timeline draw ──
    const legacyCards = D.querySelectorAll('.legacy-card');
    if (legacyCards.length) {
      gsap.from(legacyCards, {
        x: -60, opacity: 0, duration: 0.7,
        stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: legacyCards[0], start: 'top 80%' }
      });
    }
  }

  /* ================================================================
     4. INTERACTIVE 3D CARDS — Cursor Lighting + Layer Separation
     ================================================================ */
  function initCardInteractive3D() {
    const allCards = D.querySelectorAll('.doctor-card, .facility-card, .tech-card, .specialty-card, .stat-card, .clinical-dept-item');

    allCards.forEach(card => {
      // Add cursor-based lighting overlay
      const overlay = D.createElement('div');
      overlay.className = 'card-light-overlay';
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(overlay);

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
        overlay.style.opacity = '1';

        // Dynamic shadow based on cursor position
        const shadowX = (x - 50) * -0.3;
        const shadowY = (y - 50) * -0.3;
        card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,240,255,0.05)`;
      });

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, duration: 0.35, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
        card.style.boxShadow = '';
        gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
      });
    });
  }

  /* ================================================================
     5. MAGNETIC CTA BUTTONS — Magnetic-Elasticity Spring & Liquid-Ripple
     ================================================================ */
  function initMagneticButtons() {
    if (typeof gsap === 'undefined') return;

    D.querySelectorAll('.btn, [data-open-modal="true"]').forEach(btn => {
      if (isMobile) return;

      // Magnetic attraction
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) * 0.28;
        const y = (e.clientY - r.top - r.height/2) * 0.28;
        gsap.to(btn, { x, y, duration: 0.25, ease: 'power2.out' });
      });

      // Scale & glow on hover
      btn.addEventListener('mouseenter', () => {
        btn.classList.add('btn-glow-active');
        gsap.to(btn, { scale: 1.08, duration: 0.3, ease: 'back.out(1.8)' });
      });

      // Overshoot spring snap-back animation on mouseleave
      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('btn-glow-active');
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1.5, 0.22)' // Overshoot spring physics
        });
      });

      // Liquid-ripple expansion effect on click
      btn.addEventListener('click', function(e) {
        const ripple = D.createElement('span');
        ripple.className = 'btn-liquid-ripple';
        const r = this.getBoundingClientRect();
        const sz = Math.max(r.width, r.height) * 2.4;
        ripple.style.cssText = `
          position: absolute;
          width: ${sz}px;
          height: ${sz}px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,240,255,0.45) 0%, rgba(0,136,204,0.2) 60%, transparent 80%);
          pointer-events: none;
          transform: scale(0);
          left: ${e.clientX - r.left - sz/2}px;
          top: ${e.clientY - r.top - sz/2}px;
          z-index: 10;
        `;
        this.appendChild(ripple);
        gsap.to(ripple, {
          scale: 1,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          onComplete: () => ripple.remove()
        });
      });
    });
  }

  /* ================================================================
     6. CUSTOM CURSOR — Physics + Trail + Context Awareness
     ================================================================ */
  function initCustomCursor() {
    // Restore normal native system cursor everywhere
    if (D.body) D.body.style.cursor = 'auto';
    D.querySelectorAll('.agy-cursor, .agy-cursor-dot').forEach(el => el.remove());
  }

  /* ================================================================
     7. STAT COUNTER — Animated Count-Up
     ================================================================ */
  function initStatCounterAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    D.querySelectorAll('.stat-number').forEach(el => {
      const raw = el.textContent.trim();
      const numMatch = raw.match(/[\d,]+/);
      if (!numMatch) return;
      const target = parseInt(numMatch[0].replace(/,/g, ''));
      const prefix = raw.substring(0, raw.indexOf(numMatch[0]));
      const suffix = raw.substring(raw.indexOf(numMatch[0]) + numMatch[0].length);

      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: target, duration: 2.5, ease: 'power2.out',
            onUpdate: () => {
              const n = Math.round(obj.v);
              el.textContent = prefix + n.toLocaleString() + suffix;
            }
          });
        }
      });
    });
  }

  /* ================================================================
     8. GLASS NAVIGATION — Dynamic Backdrop Blur on Scroll
     ================================================================ */
  function initNavigationGlass() {
    const nav = D.querySelector('.navbar');
    if (!nav) return;

    // Animated nav link underlines
    D.querySelectorAll('.nav-links a').forEach(link => {
      const ul = D.createElement('span');
      ul.style.cssText = 'position:absolute;bottom:-3px;left:0;width:0;height:2px;background:var(--blue,#0088cc);border-radius:2px;transition:width 0.35s cubic-bezier(0.16,1,0.3,1);';
      link.style.position = 'relative';
      link.appendChild(ul);
      link.addEventListener('mouseenter', () => ul.style.width = '100%');
      link.addEventListener('mouseleave', () => ul.style.width = '0');
    });

    // Glass effect on scroll with GSAP
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: self => {
        if (self.direction === 1 && W.scrollY > 50) nav.classList.add('glass-active');
        else if (W.scrollY <= 50) nav.classList.remove('glass-active');
      }
    });
  }

  /* ================================================================
     9. CARE JOURNEY MAP — SVG Path Animation + Step Pulse
     ================================================================ */
  function initCareJourneyMap() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const section = D.querySelector('.patient-journey-section');
    const steps = D.querySelectorAll('.journey-step-item');
    if (!section || steps.length < 2) return;

    // Create SVG overlay
    const svg = D.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible;';

    // Glow path
    const glow = D.createElementNS('http://www.w3.org/2000/svg', 'path');
    glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke', '#00F0FF');
    glow.setAttribute('stroke-width', '8');
    glow.setAttribute('stroke-linecap', 'round');
    glow.setAttribute('opacity', '0.08');
    glow.setAttribute('filter', 'blur(6px)');

    // Main path
    const path = D.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#00F0FF');
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('opacity', '0.5');

    // Traveling dot
    const dot = D.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '5');
    dot.setAttribute('fill', '#00F0FF');
    dot.setAttribute('opacity', '0.9');
    dot.setAttribute('filter', 'drop-shadow(0 0 8px #00F0FF)');

    // Checkpoint circles
    const checkpoints = [];
    steps.forEach(() => {
      const cp = D.createElementNS('http://www.w3.org/2000/svg', 'circle');
      cp.setAttribute('r', '8');
      cp.setAttribute('fill', 'none');
      cp.setAttribute('stroke', '#00F0FF');
      cp.setAttribute('stroke-width', '2');
      cp.setAttribute('opacity', '0');
      checkpoints.push(cp);
      svg.appendChild(cp);
    });

    svg.appendChild(glow);
    svg.appendChild(path);
    svg.appendChild(dot);

    const container = section.querySelector('.container') || section;
    container.style.position = 'relative';
    container.appendChild(svg);

    // Build path after layout renders
    requestAnimationFrame(() => {
      setTimeout(() => {
        const cRect = container.getBoundingClientRect();
        const pts = Array.from(steps).map(s => {
          const iconEl = s.querySelector('.journey-step-icon') || s;
          const rIcon = iconEl.getBoundingClientRect();
          return {
            x: rIcon.left + rIcon.width / 2 - cRect.left,
            y: rIcon.top + rIcon.height / 2 - cRect.top
          };
        });

        // Smooth bezier path
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i-1], c = pts[i];
          const mx = (p.x + c.x) / 2;
          d += ` C ${mx} ${p.y} ${mx} ${c.y} ${c.x} ${c.y}`;
        }
        path.setAttribute('d', d);
        glow.setAttribute('d', d);

        // Set checkpoint positions
        pts.forEach((p, i) => {
          checkpoints[i].setAttribute('cx', p.x);
          checkpoints[i].setAttribute('cy', p.y);
        });

        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        glow.style.strokeDasharray = len;
        glow.style.strokeDashoffset = len;

        // Scroll-driven animation
        ScrollTrigger.create({
          trigger: section, start: 'top 65%', end: 'bottom 35%', scrub: 0.6,
          onUpdate: self => {
            const p = self.progress;
            const off = len * (1 - p);
            path.style.strokeDashoffset = off;
            glow.style.strokeDashoffset = off;

            // Move dot
            const pt = path.getPointAtLength(len * p);
            dot.setAttribute('cx', pt.x);
            dot.setAttribute('cy', pt.y);

            // Activate steps + checkpoints
            steps.forEach((step, i) => {
              const threshold = (i + 0.5) / steps.length;
              if (p >= threshold) {
                step.classList.add('jm-active');
                checkpoints[i].setAttribute('opacity', '0.7');
                checkpoints[i].setAttribute('fill', 'rgba(0,240,255,0.15)');
              } else {
                step.classList.remove('jm-active');
                checkpoints[i].setAttribute('opacity', '0');
                checkpoints[i].setAttribute('fill', 'none');
              }
            });
          }
        });
      }, 200);
    });
  }

  /* ================================================================
     10. MEDICAL TECHNOLOGY GALLERY 3D — Heart + Brain + DNA + Hotspots
     ================================================================ */
  function initMedicalTechGallery3D() {
    const sec = D.querySelector('.section-dark-tech');
    if (!sec || typeof THREE === 'undefined') return;

    const wrap = D.createElement('div');
    wrap.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
    sec.style.position = 'relative';
    sec.insertBefore(wrap, sec.firstChild);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, sec.clientWidth/sec.clientHeight, 0.1, 500);
    cam.position.set(0, 0, 16);

    const ren = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    ren.setSize(sec.clientWidth, sec.clientHeight);
    ren.setPixelRatio(Math.min(W.devicePixelRatio, 2));
    wrap.appendChild(ren.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const wm = new THREE.MeshBasicMaterial({ color: 0x00F0FF, wireframe: true, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending });
    const wm2 = new THREE.MeshBasicMaterial({ color: 0x0066CC, wireframe: true, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending });

    // Heart
    const heart = new THREE.Mesh(new THREE.TorusKnotGeometry(1.6, 0.5, 80, 20, 2, 3), wm);
    heart.position.set(-5.5, 1.5, -1);
    group.add(heart);

    // Brain
    const bGeo = new THREE.IcosahedronGeometry(1.7, 3);
    const bPos = bGeo.attributes.position;
    for (let i = 0; i < bPos.count; i++) {
      const x=bPos.getX(i),y=bPos.getY(i),z=bPos.getZ(i);
      const n = Math.sin(x*4)*Math.cos(y*3)*0.12 + Math.sin(z*5)*0.08;
      bPos.setXYZ(i, x*(1+n*0.5), y*(1+n*0.3), z*(1+n*0.4));
    }
    bGeo.computeVertexNormals();
    const brain = new THREE.Mesh(bGeo, wm);
    brain.position.set(5.5, 1.5, -1);
    group.add(brain);

    // DNA center
    const dnaG = new THREE.Group();
    const dsGeo = new THREE.SphereGeometry(0.1, 6, 6);
    for (let i = 0; i < 40; i++) {
      const a = i * 0.38, y = (i/40)*9 - 4.5, r = 1.0;
      const m1 = new THREE.Mesh(dsGeo, wm);
      m1.position.set(Math.cos(a)*r, y, Math.sin(a)*r);
      const m2 = new THREE.Mesh(dsGeo, wm2);
      m2.position.set(Math.cos(a+Math.PI)*r, y, Math.sin(a+Math.PI)*r);
      dnaG.add(m1, m2);
      if (i % 3 === 0) {
        const lg = new THREE.BufferGeometry().setFromPoints([m1.position, m2.position]);
        dnaG.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.05 })));
      }
    }
    dnaG.position.set(0, -1, 0);
    group.add(dnaG);

    // Orbit rings
    [{ rx: Math.PI/3, rz: 0 }, { rx: -Math.PI/4, rz: Math.PI/6 }].forEach(o => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.015, 6, 80), new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.05 }));
      ring.rotation.x = o.rx; ring.rotation.z = o.rz;
      group.add(ring);
    });

    // Hotspot overlays
    const hotData = [
      { p: new THREE.Vector3(-5.5, 1.5, 0), label: '🫀 Cardiology', info: 'Cath Lab & 24/7 Cardiac Emergency' },
      { p: new THREE.Vector3(5.5, 1.5, 0), label: '🧠 Neurology', info: 'Advanced EEG & Neuro Diagnostics' },
      { p: new THREE.Vector3(0, -1, 0), label: '🧬 Genetics', info: 'Molecular Diagnostics & DNA Analysis' }
    ];

    const hsOverlay = D.createElement('div');
    hsOverlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:3;';
    sec.appendChild(hsOverlay);

    const hsEls = hotData.map(h => {
      const el = D.createElement('div');
      el.style.cssText = 'position:absolute;pointer-events:none;transition:opacity 0.4s ease;';
      el.innerHTML = `
        <div style="width:12px;height:12px;background:rgba(0,240,255,0.5);border-radius:50%;border:2px solid #00F0FF;animation:hsPing 2s ease-in-out infinite;box-shadow:0 0 10px rgba(0,240,255,0.3);"></div>
        <div style="position:absolute;top:-40px;left:16px;white-space:nowrap;background:rgba(3,13,26,0.9);border:1px solid rgba(0,240,255,0.2);padding:5px 10px;border-radius:6px;color:#00F0FF;font-size:0.7rem;font-weight:700;backdrop-filter:blur(8px);">
          <div>${h.label}</div>
          <div style="color:rgba(255,255,255,0.5);font-size:0.6rem;font-weight:400;">${h.info}</div>
        </div>`;
      hsOverlay.appendChild(el);
      return { el, pos: h.p };
    });

    // Scroll rotation
    gsap.to(group.rotation, {
      y: Math.PI * 2, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });

    let camAngle = 0;
    W.addEventListener('resize', () => { cam.aspect = sec.clientWidth/sec.clientHeight; cam.updateProjectionMatrix(); ren.setSize(sec.clientWidth, sec.clientHeight); });

    let raf;
    function anim() {
      raf = requestAnimationFrame(anim);
      heart.rotation.x += 0.005; heart.rotation.z += 0.003;
      brain.rotation.y += 0.004; brain.rotation.x -= 0.003;
      dnaG.rotation.y += 0.007;

      camAngle += 0.0008;
      cam.position.x = Math.sin(camAngle) * 2;
      cam.lookAt(0, 0, 0);

      // Project hotspots
      hsEls.forEach(h => {
        const sp = h.pos.clone().applyMatrix4(group.matrixWorld).project(cam);
        h.el.style.left = ((sp.x * 0.5 + 0.5) * sec.clientWidth) + 'px';
        h.el.style.top = ((-sp.y * 0.5 + 0.5) * sec.clientHeight) + 'px';
        h.el.style.opacity = sp.z < 1 ? '1' : '0';
      });

      ren.render(scene, cam);
    }
    anim();
    activeScenes.push({ renderer: ren, scene, raf });
  }

  /* ================================================================
     11. FLOATING MEDICAL PARTICLES — Crosses + Pills + Helices
     ================================================================ */
  function initFloatingMedicalParticles() {
    const darkSections = D.querySelectorAll('.section-dark-tech, .clinical-depts-section, #section-3d-gif-showcase');
    const types = ['med-cross', 'med-pill', 'med-helix', 'med-cross', 'med-pill'];

    darkSections.forEach(sec => {
      sec.style.position = 'relative';
      sec.style.overflow = 'hidden';
      const count = isMobile ? 5 : 16;

      for (let i = 0; i < count; i++) {
        const el = D.createElement('div');
        el.className = 'med-sym ' + types[i % types.length];
        el.style.setProperty('--p-opacity', (Math.random() * 0.1 + 0.03).toFixed(2));
        el.style.setProperty('--float-y', -(Math.random() * 25 + 10) + 'px');
        el.style.setProperty('--float-r', (Math.random() * 10 - 5) + 'deg');
        el.style.setProperty('--float-dur', (Math.random() * 5 + 5) + 's');
        el.style.setProperty('--float-delay', (Math.random() * 6) + 's');
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        sec.appendChild(el);
      }
    });
  }

  /* ================================================================
     12. KINETIC TYPOGRAPHY — Character-level scroll velocity effects
     ================================================================ */
  function initKineticTypography() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    D.querySelectorAll('.section-title').forEach(title => {
      gsap.from(title, {
        y: 30, opacity: 0,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 88%' }
      });
    });
  }

  /* ================================================================
     13. IMAGE EFFECTS — Scroll Zoom + Grayscale + Parallax
     ================================================================ */
  function initImageEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Scroll zoom on images
    D.querySelectorAll('.facility-card img, .tech-showcase-container img').forEach(img => {
      gsap.fromTo(img, { scale: 1 }, {
        scale: 1.06, ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Doctor photo grayscale → color
    D.querySelectorAll('.doctor-card').forEach(card => {
      const img = card.querySelector('.doctor-photo-wrap img');
      if (!img) return;
      img.style.transition = 'filter 0.45s ease';
      img.style.filter = 'grayscale(25%)';
      card.addEventListener('mouseenter', () => img.style.filter = 'grayscale(0%) brightness(1.04)');
      card.addEventListener('mouseleave', () => img.style.filter = 'grayscale(25%)');
    });
  }

  /* ================================================================
     14. BACKGROUND NOISE FIELD — Subtle WebGL Noise
     ================================================================ */
  function initBackgroundNoiseField() {
    // Add subtle noise texture to hero section for premium feel
    const hero = D.querySelector('.hero-section');
    if (!hero) return;

    const canvas = D.createElement('canvas');
    canvas.className = 'noise-bg-canvas';
    canvas.width = 256; canvas.height = 256;
    hero.style.position = 'relative';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    function drawNoise() {
      const imageData = ctx.createImageData(256, 256);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = data[i+1] = data[i+2] = v;
        data[i+3] = 20;
      }
      ctx.putImageData(imageData, 0, 0);
    }
    drawNoise();

    // Subtle noise animation
    let noiseFrame = 0;
    function animateNoise() {
      noiseFrame++;
      if (noiseFrame % 4 === 0) drawNoise();
      requestAnimationFrame(animateNoise);
    }
    animateNoise();
  }

  /* ================================================================
     15. CHATBOT MOTION — Float + Notification Pulse
     ================================================================ */
  function initChatbotMotion() {
    if (typeof gsap === 'undefined') return;

    const btn = D.querySelector('.chatbot-widget-container button');
    if (!btn) return;

    gsap.to(btn, { y: -7, repeat: -1, yoyo: true, duration: 2, ease: 'sine.inOut' });

    // Notification dot
    const dot = D.createElement('span');
    dot.style.cssText = `
      position:absolute;top:-3px;right:-3px;width:12px;height:12px;background:#ef4444;border-radius:50%;
      border:2px solid white;z-index:2;
    `;
    btn.style.position = 'relative';
    btn.appendChild(dot);

    // Pulse animation
    gsap.fromTo(dot, { scale: 1 }, { scale: 1.3, repeat: 5, yoyo: true, duration: 0.5, ease: 'power1.inOut', onComplete: () => { gsap.to(dot, { opacity: 0, duration: 0.3, onComplete: () => dot.remove() }); } });
  }

  /* ================================================================
     16. FOOTER REVEAL — Elegant Stagger
     ================================================================ */
  function initFooterReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const footer = D.querySelector('.footer');
    if (!footer) return;

    const cols = footer.querySelectorAll('.footer-col');
    if (cols.length) {
      gsap.from(cols, {
        y: 40, opacity: 0, duration: 0.7,
        stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 90%' }
      });
    }
  }

  /* ================================================================
     17. D3 EMERGENCY CAPACITY MONITOR
     ================================================================ */
  function initEmergencyCapacityD3() {
    const section = D.getElementById('section-emergency-desk');
    if (!section) return;

    let chartEl = D.getElementById('d3-capacity-chart');
    if (!chartEl) {
      let wrap = section.querySelector('.capacity-chart-container');
      if (!wrap) {
        wrap = D.createElement('div');
        wrap.style.cssText = 'margin-top:16px;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:16px;';
        const c = section.querySelector('.container');
        (c || section).appendChild(wrap);
      }
      chartEl = D.createElement('div');
      chartEl.id = 'd3-capacity-chart';
      wrap.appendChild(chartEl);
    }

    let data = [
      { label: 'ICU Beds', value: 78 },
      { label: 'OT Rooms', value: 45 },
      { label: 'ER Capacity', value: 62 },
      { label: 'Ventilators', value: 35 },
      { label: 'Critical Care', value: 58 }
    ];

    const m = { top: 8, right: 40, bottom: 8, left: 82 };
    const cW = Math.min(chartEl.clientWidth || 380, 460);
    const w = cW - m.left - m.right;
    const h = 140;

    chartEl.innerHTML = '';
    const svg = d3.select(chartEl).append('svg')
      .attr('width', w + m.left + m.right).attr('height', h + m.top + m.bottom)
      .append('g').attr('transform', `translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain([0, 100]).range([0, w]);
    const y = d3.scaleBand().range([0, h]).domain(data.map(d => d.label)).padding(0.28);

    svg.append('g').call(d3.axisLeft(y).tickSize(0))
      .selectAll('text').style('fill', '#94a3b8').style('font-size', '9px');
    svg.selectAll('.domain').style('stroke', 'none');

    const gc = v => v > 80 ? '#ef4444' : v > 50 ? '#f59e0b' : '#10b981';

    svg.selectAll('.bgbar').data(data).enter().append('rect')
      .attr('y', d => y(d.label)).attr('height', y.bandwidth()).attr('x', 0)
      .attr('width', w).attr('fill', 'rgba(255,255,255,0.03)').attr('rx', 3);

    const bars = svg.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar')
      .attr('y', d => y(d.label)).attr('height', y.bandwidth()).attr('x', 0)
      .attr('width', 0).attr('fill', d => gc(d.value)).attr('rx', 3);

    const labels = svg.selectAll('.vlbl').data(data).enter().append('text').attr('class', 'vlbl')
      .attr('y', d => y(d.label) + y.bandwidth()/2 + 3).attr('x', 4)
      .attr('fill', '#fff').attr('font-size', '9px').attr('font-weight', '600')
      .text(d => d.value + '%').style('opacity', 0);

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: chartEl, start: 'top 88%', once: true,
        onEnter: () => {
          bars.transition().duration(1200).ease(d3.easeCubicOut).attr('width', d => x(d.value));
          labels.transition().duration(1200).ease(d3.easeCubicOut).attr('x', d => x(d.value) + 6).style('opacity', 1);
        }
      });
    }

    setInterval(() => {
      data = data.map(d => ({ ...d, value: Math.min(98, Math.max(8, d.value + Math.round((Math.random()-0.5)*7))) }));
      bars.data(data).transition().duration(700).attr('width', d => x(d.value)).attr('fill', d => gc(d.value));
      labels.data(data).transition().duration(700).attr('x', d => x(d.value) + 6).text(d => d.value + '%');
    }, 5000);
  }

  /* ================================================================
     18. ENHANCED VANILLA TILT
     ================================================================ */
  function initEnhancedTilt() {
    if (typeof VanillaTilt === 'undefined' || isMobile) return;

    const cards = D.querySelectorAll('.doctor-card, .facility-card, .tech-card, .stat-card');
    cards.forEach(c => { if (c.vanillaTilt) c.vanillaTilt.destroy(); });

    VanillaTilt.init(cards, {
      max: 7, speed: 500, glare: true, 'max-glare': 0.1, scale: 1.02,
      perspective: 1400, gyroscope: false
    });
  }

  /* ================================================================
     19. ANIMATED AWARD CARDS — 3D Tilt + Metallic Gold Reflection
     ================================================================ */
  function initAnimatedAwardCards() {
    const items = D.querySelectorAll('.accreditation-item');
    if (!items.length) return;

    // Inject metallic reflection CSS
    const awardCSS = D.createElement('style');
    awardCSS.textContent = `
      .accreditation-item {
        position: relative;
        overflow: hidden;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease !important;
        transform-style: preserve-3d;
        perspective: 1200px;
        cursor: pointer;
      }

      /* Metallic gold reflection overlay */
      .award-metallic-shine {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 2;
        border-radius: inherit;
        background: linear-gradient(
          105deg,
          transparent 30%,
          rgba(255, 215, 0, 0.04) 38%,
          rgba(255, 215, 0, 0.10) 42%,
          rgba(255, 223, 50, 0.12) 45%,
          rgba(255, 215, 0, 0.10) 48%,
          rgba(255, 215, 0, 0.04) 52%,
          transparent 60%
        );
        background-size: 300% 100%;
        background-position: 100% 0;
        opacity: 0;
        transition: opacity 0.4s ease;
      }

      .accreditation-item:hover .award-metallic-shine {
        opacity: 1;
        animation: awardShinePass 1s ease forwards;
      }

      @keyframes awardShinePass {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }

      /* Badge glow on hover */
      .accreditation-item:hover .accreditation-badge {
        transform: scale(1.15) rotateY(10deg);
        filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.35));
      }

      .accreditation-badge {
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease !important;
      }

      /* Gold border glow on hover */
      .accreditation-item::before {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, rgba(255,215,0,0), rgba(255,215,0,0));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        transition: background 0.4s ease;
      }

      .accreditation-item:hover::before {
        background: linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,215,0,0.05), rgba(255,215,0,0.2));
      }
    `;
    D.head.appendChild(awardCSS);

    items.forEach(item => {
      // Add metallic shine overlay
      const shine = D.createElement('div');
      shine.className = 'award-metallic-shine';
      item.appendChild(shine);

      if (isMobile) return;

      // 3D tilt effect on mousemove
      item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateY = x * 18;   // max 9deg each direction
        const rotateX = -y * 14;  // max 7deg each direction

        gsap.to(item, {
          rotateX, rotateY,
          boxShadow: `${-x * 15}px ${y * 15}px 30px rgba(0,0,0,0.12), 0 0 20px rgba(255,215,0,0.06)`,
          duration: 0.35,
          ease: 'power2.out',
          transformPerspective: 1200
        });

        // Move the metallic reflection with cursor dynamically
        const shineX = (x + 0.5) * 100;
        const shineY = (y + 0.5) * 100;
        shine.style.background = `radial-gradient(350px circle at ${shineX}% ${shineY}%, rgba(255,223,50,0.35), rgba(255,215,0,0.12) 35%, transparent 70%)`;
        shine.style.opacity = '1';
      });

      item.addEventListener('mouseenter', () => {
        gsap.to(item, { y: -8, duration: 0.3, ease: 'power2.out' });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          rotateX: 0, rotateY: 0, y: 0,
          boxShadow: 'none',
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          transformPerspective: 1200
        });
        shine.style.opacity = '0';
      });
    });

    // Scroll-triggered stagger entrance
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const grid = D.querySelector('.accreditations-grid');
      if (grid) {
        gsap.from(items, {
          y: 50, opacity: 0, scale: 0.9, rotateX: 15,
          duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 82%' }
        });
      }
    }
  }

  /* ================================================================
     20. PINNED FOOTER REVEAL — Content scrolls over fixed footer
     ================================================================ */
  function initPinnedFooterReveal() {
    const footer = D.querySelector('.footer');
    if (!footer) return;

    // Inject clean relative footer CSS to eliminate overlap & scroll gaps
    const footerCSS = D.createElement('style');
    footerCSS.id = 'clean-footer-styles';
    footerCSS.textContent = `
      .footer {
        position: relative !important;
        z-index: 10 !important;
        background-color: var(--navy, #0c1e35) !important;
      }
    `;
    D.head.appendChild(footerCSS);
  }

  /* ================================================================
     21. FORM GLOW ANIMATIONS — Focus Pulse + Success Checkmark
     ================================================================ */
  function initFormGlowAnimations() {
    const modal = D.getElementById('appointment-modal');
    const form = D.getElementById('appointment-form');
    if (!modal || !form) return;

    // Inject form animation CSS
    const formCSS = D.createElement('style');
    formCSS.textContent = `
      /* ── Focus Glow Effect ── */
      .form-control {
        position: relative;
        transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
      }

      .form-group {
        position: relative;
      }

      /* Animated gradient border on focus */
      .form-glow-ring {
        position: absolute;
        inset: -2px;
        border-radius: 10px;
        padding: 2px;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        background: linear-gradient(135deg, #0088cc, #00F0FF, #0088cc, #00F0FF);
        background-size: 300% 300%;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }

      .form-glow-ring.active {
        opacity: 1;
        animation: formGlowPulse 2.5s ease-in-out infinite;
      }

      @keyframes formGlowPulse {
        0% { background-position: 0% 50%; opacity: 0.6; }
        25% { opacity: 1; }
        50% { background-position: 100% 50%; opacity: 0.6; }
        75% { opacity: 1; }
        100% { background-position: 0% 50%; opacity: 0.6; }
      }

      .form-control:focus {
        border-color: transparent !important;
        box-shadow: 0 0 0 1px rgba(0,136,204,0.3), 0 0 20px rgba(0,240,255,0.08) !important;
        position: relative;
        z-index: 1;
      }

      /* Floating label pull-up */
      .form-group label {
        transition: color 0.3s ease, transform 0.3s ease !important;
      }

      .form-group:focus-within label {
        color: #0088cc !important;
      }

      /* ── Success Overlay ── */
      .form-success-overlay {
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0.97);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 100;
        border-radius: 16px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
      }

      .form-success-overlay.active {
        opacity: 1;
        pointer-events: auto;
      }

      /* Checkmark Circle */
      .success-checkmark {
        width: 80px;
        height: 80px;
        position: relative;
        margin-bottom: 20px;
      }

      .success-checkmark .check-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 3px solid #22c55e;
        position: absolute;
        transform: scale(0);
        animation: checkCirclePop 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards;
      }

      .success-checkmark .check-circle::after {
        content: '';
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        border: 3px solid rgba(34, 197, 94, 0.2);
        animation: checkRipple 0.8s ease-out 0.5s forwards;
        opacity: 0;
      }

      @keyframes checkCirclePop {
        0% { transform: scale(0); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }

      @keyframes checkRipple {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.5); opacity: 0; }
      }

      /* Animated Checkmark Path */
      .success-checkmark svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 36px;
        height: 36px;
      }

      .success-checkmark svg path {
        stroke: #22c55e;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        stroke-dasharray: 50;
        stroke-dashoffset: 50;
        animation: checkDraw 0.5s ease-out 0.5s forwards;
      }

      @keyframes checkDraw {
        to { stroke-dashoffset: 0; }
      }

      /* Success text */
      .success-title {
        font-family: var(--font-heading, 'Playfair Display', serif);
        font-size: 1.4rem;
        color: var(--navy, #0c1e35);
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(10px);
        animation: successTextIn 0.5s ease-out 0.7s forwards;
      }

      .success-subtitle {
        font-size: 0.9rem;
        color: #64748b;
        text-align: center;
        max-width: 300px;
        opacity: 0;
        transform: translateY(10px);
        animation: successTextIn 0.5s ease-out 0.9s forwards;
      }

      @keyframes successTextIn {
        to { opacity: 1; transform: translateY(0); }
      }

      /* Success confetti dots */
      .success-confetti {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        opacity: 0;
      }
    `;
    D.head.appendChild(formCSS);

    // ── Add glow rings to all form inputs ──
    form.querySelectorAll('.form-control').forEach(input => {
      const group = input.closest('.form-group');
      if (!group) return;

      const ring = D.createElement('div');
      ring.className = 'form-glow-ring';
      // Insert ring before the input so it sits behind
      group.style.position = 'relative';
      group.insertBefore(ring, input);

      input.addEventListener('focus', () => {
        ring.classList.add('active');
        // GSAP subtle scale pulse on the input
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(input, { scale: 1 }, { scale: 1.01, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' });
        }
      });

      input.addEventListener('blur', () => {
        ring.classList.remove('active');
      });
    });

    // ── Create success overlay ──
    const successOverlay = D.createElement('div');
    successOverlay.className = 'form-success-overlay';
    successOverlay.innerHTML = `
      <div class="success-checkmark">
        <div class="check-circle"></div>
        <svg viewBox="0 0 36 36"><path d="M8 18 L15 25 L28 11" /></svg>
      </div>
      <div class="success-title">Appointment Booked!</div>
      <div class="success-subtitle">Our team will contact you within 30 minutes to confirm your appointment.</div>
    `;
    // Insert overlay into modal container
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
      modalContainer.style.position = 'relative';
      modalContainer.appendChild(successOverlay);
    }

    // ── Intercept form submission for animation ──
    form.addEventListener('submit', function(e) {
      // Don't prevent default — let existing handler in script.js run first
      // We'll hook into it with a small delay

      const name = D.getElementById('modal-patient-name');
      const phone = D.getElementById('modal-patient-phone');
      if (!phone || !phone.value) return; // Let main handler show error

      // Show success animation after short delay (original handler fires first)
      setTimeout(() => {
        successOverlay.classList.add('active');

        // Add confetti dots
        const colors = ['#22c55e', '#0088cc', '#00F0FF', '#fbbf24', '#ef4444'];
        for (let i = 0; i < 12; i++) {
          const dot = D.createElement('div');
          dot.className = 'success-confetti';
          dot.style.background = colors[i % colors.length];
          dot.style.left = '50%';
          dot.style.top = '35%';
          successOverlay.appendChild(dot);

          if (typeof gsap !== 'undefined') {
            gsap.to(dot, {
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 150,
              opacity: 1,
              scale: Math.random() * 2 + 0.5,
              duration: 0.6,
              delay: 0.4 + Math.random() * 0.3,
              ease: 'power2.out',
              onComplete: () => {
                gsap.to(dot, { opacity: 0, y: '+=30', duration: 0.4, delay: 0.3, onComplete: () => dot.remove() });
              }
            });
          }
        }

        // Auto-close after 3.5s
        setTimeout(() => {
          successOverlay.classList.remove('active');
          // Remove checkmark elements for re-trigger
          const cm = successOverlay.querySelector('.success-checkmark');
          if (cm) {
            cm.innerHTML = '<div class="check-circle"></div><svg viewBox="0 0 36 36"><path d="M8 18 L15 25 L28 11" /></svg>';
          }
          // Reset text animations
          const title = successOverlay.querySelector('.success-title');
          const sub = successOverlay.querySelector('.success-subtitle');
          if (title) { title.style.animation = 'none'; void title.offsetWidth; title.style.animation = ''; }
          if (sub) { sub.style.animation = 'none'; void sub.offsetWidth; sub.style.animation = ''; }

          if (typeof window.closeAppointmentModal === 'function') {
            window.closeAppointmentModal();
          }
        }, 3500);
      }, 50);
    }, true); // Use capture phase to run before the main handler closes modal
  }

  /* ================================================================
     22. HERO PARALLAX — Differential velocity for image vs text
     ================================================================ */
  function initHeroParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const hero = D.querySelector('.hero-section');
    if (!hero) return;

    const bg = hero.querySelector('.hero-bg-media');
    const content = hero.querySelector('.hero-content');
    const infoBar = hero.querySelector('.hero-info-bar');
    const gifLeft = hero.querySelector('.hero-floating-gif-left');
    const gifRight = hero.querySelector('.hero-floating-gif-right');

    // Background image moves slower (parallax depth)
    if (bg) {
      gsap.to(bg, {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }

    // Text content moves faster (foreground layer)
    if (content) {
      gsap.to(content, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3
        }
      });
    }

    // Info bar slides away faster
    if (infoBar) {
      gsap.to(infoBar, {
        y: -90,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '30% top',
          end: 'bottom top',
          scrub: 0.4
        }
      });
    }

    // Floating GIFs at intermediate depth
    [gifLeft, gifRight].forEach((gif, i) => {
      if (!gif) return;
      gsap.to(gif, {
        y: i === 0 ? -40 : -55,
        x: i === 0 ? -20 : 20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    });
  }

  /* ================================================================
     23. CURSOR SPOTLIGHT — Mouse-following blue glow on glass panels
     ================================================================ */
  function initCursorSpotlight() {
    if (typeof gsap === 'undefined') return;

    // Inject spotlight CSS
    const spotCSS = D.createElement('style');
    spotCSS.textContent = `
      .cursor-spotlight-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 3;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.35s ease;
        background: radial-gradient(
          400px circle at var(--spot-x, 50%) var(--spot-y, 50%),
          rgba(0, 170, 255, 0.07),
          rgba(0, 240, 255, 0.03) 30%,
          transparent 60%
        );
      }
      .cursor-spotlight-layer.active {
        opacity: 1;
      }
    `;
    D.head.appendChild(spotCSS);

    // Apply to all glass/card elements
    const targets = D.querySelectorAll(
      '.doctor-card, .facility-card, .tech-card, .stat-card, .clinical-dept-item, .specialty-card, .ribbon-item, .accreditation-item, .legacy-card, .testimonial-card'
    );

    targets.forEach(card => {
      const spot = D.createElement('div');
      spot.className = 'cursor-spotlight-layer';
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(spot);

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--spot-x', x + '%');
        card.style.setProperty('--spot-y', y + '%');
        spot.classList.add('active');
      });

      card.addEventListener('mouseleave', () => {
        spot.classList.remove('active');
      });
    });
  }

  /* ================================================================
     24. SPRING PHYSICS STAGGER — Bouncy scroll entrance for sections
     ================================================================ */
  function initSpringPhysicsStagger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Ribbon items with individual spring bounce
    D.querySelectorAll('.ribbon-item').forEach((item, i) => {
      gsap.from(item, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        delay: i * 0.06,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: item,
          start: 'top 92%'
        }
      });
    });
  }

  /* ================================================================
     25. FLUID GRADIENT BACKGROUND — GLSL Liquid Shader
     ================================================================ */
  function initFluidGradientBackground() {
    if (typeof THREE === 'undefined') return;

    const hero = D.querySelector('.hero-section');
    if (!hero) return;

    // Create a full-hero fluid gradient canvas
    const container = D.createElement('div');
    container.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;';
    hero.insertBefore(container, hero.firstChild);

    const scene = new THREE.Scene();
    const w = hero.clientWidth, h = hero.clientHeight;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(W.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const vertShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;

    const fragShader = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      varying vec2 vUv;

      // Simplex-like noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.08;

        // Layered noise for fluid motion
        float n1 = snoise(uv * 2.0 + t);
        float n2 = snoise(uv * 3.5 - t * 0.7 + vec2(5.2, 1.3));
        float n3 = snoise(uv * 5.0 + t * 0.5 + vec2(-3.7, 4.1));

        // Mouse influence (soft pull)
        float mouseDist = length(uv - uMouse) * 2.0;
        float mouseInfluence = smoothstep(0.8, 0.0, mouseDist) * 0.15;

        float combined = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * 0.5 + 0.5 + mouseInfluence;

        // Hospital brand colors: navy → blue → cyan
        vec3 c1 = vec3(0.047, 0.118, 0.208);  // dark navy
        vec3 c2 = vec3(0.0, 0.33, 0.55);       // medium blue
        vec3 c3 = vec3(0.0, 0.94, 1.0);        // cyan accent

        vec3 color = mix(c1, c2, smoothstep(0.3, 0.6, combined));
        color = mix(color, c3, smoothstep(0.65, 0.9, combined) * 0.3);

        // Soft volumetric light beam from top-right
        float beam = smoothstep(0.4, 0.0, abs(uv.x - 0.7 + sin(t * 2.0) * 0.1) * 1.5)
                   * smoothstep(1.0, 0.3, uv.y)
                   * 0.08;
        color += vec3(0.0, 0.6, 0.8) * beam;

        gl_FragColor = vec4(color, 0.12);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(w, h) }
      },
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // Mouse tracking
    W.addEventListener('mousemove', e => {
      material.uniforms.uMouse.value.x = e.clientX / W.innerWidth;
      material.uniforms.uMouse.value.y = 1.0 - (e.clientY / W.innerHeight);
    });

    W.addEventListener('resize', () => {
      const nw = hero.clientWidth, nh = hero.clientHeight;
      renderer.setSize(nw, nh);
      material.uniforms.uResolution.value.set(nw, nh);
    });

    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      material.uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
    }
    animate();
    activeScenes.push({ renderer, scene, raf });
  }

  /* ================================================================
     26. DISPLACEMENT TRANSITION — WebGL liquid page morph
     ================================================================ */
  function initDisplacementTransition() {
    if (typeof THREE === 'undefined') return;

    // Create fullscreen transition curtain
    const curtain = D.createElement('div');
    curtain.id = 'page-transition-curtain';
    curtain.style.cssText = 'position:fixed;inset:0;z-index:999990;pointer-events:none;opacity:0;transition:opacity 0.15s;';
    D.body.appendChild(curtain);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(W.innerWidth, W.innerHeight);
    renderer.setPixelRatio(Math.min(W.devicePixelRatio, 1.5));
    curtain.appendChild(renderer.domElement);

    const transVert = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;
    const transFrag = `
      precision mediump float;
      uniform float uProgress;
      uniform float uTime;
      varying vec2 vUv;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
      }

      void main() {
        vec2 uv = vUv;
        float disp = noise(uv * 6.0 + uTime) * 0.15;
        float edge = smoothstep(uProgress - 0.08, uProgress + 0.08, uv.x + disp);

        vec3 navyColor = vec3(0.047, 0.118, 0.208);
        vec3 cyanAccent = vec3(0.0, 0.6, 0.8);

        // Glowing edge
        float edgeGlow = smoothstep(0.02, 0.0, abs(uv.x + disp - uProgress)) * 0.5;
        vec3 color = mix(navyColor, cyanAccent, edgeGlow);

        float alpha = (1.0 - edge) * uProgress * 2.0;
        alpha = clamp(alpha, 0.0, 1.0);
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const transMat = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 }
      },
      vertexShader: transVert,
      fragmentShader: transFrag,
      transparent: true
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), transMat);
    scene.add(plane);

    // Expose global transition function
    W.triggerPageTransition = function(callback) {
      curtain.style.opacity = '1';
      curtain.style.pointerEvents = 'all';

      const duration = 0.8;
      const start = performance.now();

      function animateIn(now) {
        const elapsed = (now - start) / 1000;
        const p = Math.min(elapsed / (duration * 0.5), 1);
        transMat.uniforms.uProgress.value = p;
        transMat.uniforms.uTime.value += 0.02;
        renderer.render(scene, camera);

        if (p < 1) {
          requestAnimationFrame(animateIn);
        } else {
          if (callback) callback();

          // Animate out
          const start2 = performance.now();
          function animateOut(now2) {
            const elapsed2 = (now2 - start2) / 1000;
            const p2 = 1 - Math.min(elapsed2 / (duration * 0.5), 1);
            transMat.uniforms.uProgress.value = p2;
            transMat.uniforms.uTime.value += 0.02;
            renderer.render(scene, camera);

            if (p2 > 0) {
              requestAnimationFrame(animateOut);
            } else {
              curtain.style.opacity = '0';
              curtain.style.pointerEvents = 'none';
            }
          }
          requestAnimationFrame(animateOut);
        }
      }
      requestAnimationFrame(animateIn);
    };

    // Intercept internal navigation links
    D.querySelectorAll('a[href$=".html"]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        W.triggerPageTransition(() => {
          W.location.href = href;
        });
      });
    });

    W.addEventListener('resize', () => {
      renderer.setSize(W.innerWidth, W.innerHeight);
    });
  }

  /* ================================================================
     27. PHYSICALLY-BASED MEDICAL ICONS — 3D Metallic PBR Objects
     ================================================================ */
  function initPhysicallyBasedMedicalIcons() {
    if (typeof THREE === 'undefined') return;

    const deptIcons = D.querySelectorAll('.clinical-dept-icon');
    if (!deptIcons.length) return;

    const sec = D.querySelector('.clinical-depts-section');
    if (!sec) return;

    const geoms = [
      new THREE.TorusKnotGeometry(0.7, 0.25, 64, 16), // Cardiology
      new THREE.TorusGeometry(0.8, 0.3, 16, 32),      // Cardiothoracic
      new THREE.IcosahedronGeometry(0.85, 2),          // Brain / Neuro
      new THREE.OctahedronGeometry(0.9, 0),           // Neurology
      new THREE.CylinderGeometry(0.5, 0.5, 1.4, 16),   // Nephrology
      new THREE.DodecahedronGeometry(0.85, 0)          // Gastroenterology
    ];

    // Single shared WebGL canvas overlay
    const canvas = D.createElement('canvas');
    canvas.className = 'shared-pbr-icons-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:2;';
    sec.style.position = 'relative';
    sec.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(W.devicePixelRatio, 2));
    renderer.setScissorTest(true);

    const scenes = [];
    deptIcons.forEach((iconEl, idx) => {
      iconEl.innerHTML = '<span style="display:inline-block;width:44px;height:44px;visibility:hidden;"></span>';

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 3.2;

      const pbrMat = new THREE.MeshStandardMaterial({
        color: 0x00F0FF,
        metalness: 0.85,
        roughness: 0.15,
        emissive: 0x003366,
        emissiveIntensity: 0.4
      });

      const geom = geoms[idx % geoms.length];
      const mesh = new THREE.Mesh(geom, pbrMat);
      scene.add(mesh);

      const pLight = new THREE.PointLight(0xffffff, 2.5, 10);
      pLight.position.set(2, 2, 3);
      scene.add(pLight);

      const aLight = new THREE.AmbientLight(0x0c1e35, 1.2);
      scene.add(aLight);

      scenes.push({ el: iconEl, scene, camera, mesh });
    });

    let raf;
    function renderAll() {
      raf = requestAnimationFrame(renderAll);
      const width = sec.clientWidth;
      const height = sec.clientHeight;

      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
      }

      const secRect = sec.getBoundingClientRect();

      scenes.forEach(s => {
        s.mesh.rotation.x += 0.012;
        s.mesh.rotation.y += 0.018;

        const rect = s.el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > W.innerHeight || rect.right < 0 || rect.left > W.innerWidth) return;

        const left = rect.left - secRect.left;
        const bottom = secRect.bottom - rect.bottom;
        const w = rect.width;
        const h = rect.height;

        renderer.setViewport(left, bottom, w, h);
        renderer.setScissor(left, bottom, w, h);
        renderer.render(s.scene, s.camera);
      });
    }
    renderAll();
    activeScenes.push({ renderer, scene: null, raf });
  }

  /* ================================================================
     28. GLASS REFRACTION SHADER — Real-time screen-space distortion
     ================================================================ */
  function initGlassRefractionShader() {
    const glassCSS = D.createElement('style');
    glassCSS.textContent = `
      .doctor-card, .facility-card, .tech-card, .specialty-card, .stat-card, .clinical-dept-item {
        backdrop-filter: blur(16px) saturate(1.8) contrast(1.05) !important;
        -webkit-backdrop-filter: blur(16px) saturate(1.8) contrast(1.05) !important;
      }
      .glass-refract-mesh {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
        border-radius: inherit;
        background: radial-gradient(
          800px circle at var(--refract-x, 50%) var(--refract-y, 50%),
          rgba(255, 255, 255, 0.08),
          rgba(0, 240, 255, 0.04) 40%,
          transparent 70%
        );
        mix-blend-mode: overlay;
        transition: opacity 0.3s ease;
      }
    `;
    D.head.appendChild(glassCSS);

    D.querySelectorAll('.doctor-card, .facility-card, .tech-card, .specialty-card, .stat-card, .clinical-dept-item').forEach(card => {
      const refract = D.createElement('div');
      refract.className = 'glass-refract-mesh';
      card.style.position = 'relative';
      card.appendChild(refract);

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--refract-x', x + '%');
        card.style.setProperty('--refract-y', y + '%');
      });
    });
  }

  /* ================================================================
     29. HUMAN ANATOMY EXPLORER — 3D Organ System Navigator
     ================================================================ */
  function initHumanAnatomyExplorer() {
    return; // Preserving high-quality animated medical GIF visualizers

    const scene = new THREE.Scene();
    const w = container.clientWidth || 400, h = container.clientHeight || 180;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(W.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Organ materials
    const heartMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.7, roughness: 0.2, emissive: 0x7f1d1d, emissiveIntensity: 0.5 });
    const brainMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.6, roughness: 0.25, emissive: 0x581c87, emissiveIntensity: 0.5 });
    const boneMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.15, emissive: 0x0369a1, emissiveIntensity: 0.5 });
    const gastroMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.75, roughness: 0.2, emissive: 0x047857, emissiveIntensity: 0.5 });

    // Organ geometries
    const heartMesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.24, 64, 16, 2, 3), heartMat);
    const brainMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 2), brainMat);
    const boneMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.6, 16), boneMat);
    const gastroMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8, 0), gastroMat);

    const organGroup = new THREE.Group();
    organGroup.add(heartMesh);
    scene.add(organGroup);

    // Lighting
    const pLight = new THREE.PointLight(0x00F0FF, 3, 20);
    pLight.position.set(3, 3, 4);
    scene.add(pLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    // Tooltip element
    const tooltip = D.createElement('div');
    tooltip.className = 'anatomy-tooltip';
    tooltip.style.cssText = 'position:absolute;top:10px;right:10px;background:rgba(3,13,26,0.9);border:1px solid #00F0FF;padding:6px 12px;border-radius:6px;color:#00F0FF;font-size:0.75rem;font-weight:700;pointer-events:none;opacity:0;transition:opacity 0.3s ease;z-index:5;';
    container.style.position = 'relative';
    container.appendChild(tooltip);

    const organData = {
      cardio: { mesh: heartMesh, title: '🫀 Cardiology Dept', desc: 'Cath Lab, Angioplasty & Bypass Surgery' },
      neuro: { mesh: brainMesh, title: '🧠 Neurology Dept', desc: 'Stroke Care, Neurosurgery & Brain Tumor Unit' },
      ortho: { mesh: boneMesh, title: '🦴 Orthopedics Dept', desc: 'MISSO Robotic Knee & Joint Replacements' },
      gastro: { mesh: gastroMesh, title: '🧬 Gastroenterology', desc: 'Laparoscopy, Endoscopy & GI Surgery' }
    };

    // Button interactions
    D.querySelectorAll('.organ-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-organ');
        if (!organData[type]) return;

        // Swap mesh in scene
        organGroup.clear();
        const active = organData[type];
        organGroup.add(active.mesh);

        // GSAP pulse animation on organ mesh
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(active.mesh.scale, { x: 0.5, y: 0.5, z: 0.5 }, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'back.out(2)' });
          gsap.fromTo(active.mesh.rotation, { y: 0 }, { y: Math.PI * 2, duration: 0.8, ease: 'power2.out' });
        }

        // Show tooltip
        tooltip.textContent = `${active.title}: ${active.desc}`;
        tooltip.style.opacity = '1';
        setTimeout(() => tooltip.style.opacity = '0', 3500);
      });
    });

    W.addEventListener('resize', () => {
      const nw = container.clientWidth || 400, nh = container.clientHeight || 180;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });

    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      organGroup.rotation.y += 0.015;
      organGroup.rotation.x = Math.sin(performance.now() * 0.001) * 0.15;
      renderer.render(scene, camera);
    }
    animate();
    activeScenes.push({ renderer, scene, raf });
  }

  /* ================================================================
     30. MEDICAL PARTICLE MORPH — GSAP Caduceus / Cross Particle Morph
     ================================================================ */
  function initMedicalParticleMorph() {
    if (typeof THREE === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const legacySection = D.querySelector('.legacy-section') || D.getElementById('section-3d-gif-showcase');
    if (!legacySection) return;

    const wrap = D.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
    legacySection.style.position = 'relative';
    legacySection.insertBefore(wrap, legacySection.firstChild);

    const scene = new THREE.Scene();
    const w = legacySection.clientWidth, h = legacySection.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(W.devicePixelRatio, 2));
    wrap.appendChild(renderer.domElement);

    const pCount = 90;
    const randomPos = new Float32Array(pCount * 3);
    const targetPos = new Float32Array(pCount * 3);
    const currentPos = new Float32Array(pCount * 3);

    // Random cloud vs Caduceus / Cross shape coordinates
    for (let i = 0; i < pCount; i++) {
      randomPos[i*3] = (Math.random() - 0.5) * 20;
      randomPos[i*3+1] = (Math.random() - 0.5) * 12;
      randomPos[i*3+2] = (Math.random() - 0.5) * 6;

      // Morph into Medical Cross shape
      if (i < pCount / 2) {
        targetPos[i*3] = ((i / (pCount/2)) - 0.5) * 6; // Horizontal bar
        targetPos[i*3+1] = 0;
        targetPos[i*3+2] = 0;
      } else {
        const j = i - pCount / 2;
        targetPos[i*3] = 0;
        targetPos[i*3+1] = ((j / (pCount/2)) - 0.5) * 6; // Vertical bar
        targetPos[i*3+2] = 0;
      }

      currentPos[i*3] = randomPos[i*3];
      currentPos[i*3+1] = randomPos[i*3+1];
      currentPos[i*3+2] = randomPos[i*3+2];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(currentPos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 2.2,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    const morphObj = { progress: 0 };
    ScrollTrigger.create({
      trigger: legacySection,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onUpdate: self => {
        morphObj.progress = self.progress;
        const pos = geo.attributes.position.array;
        for (let i = 0; i < pCount * 3; i++) {
          pos[i] = randomPos[i] + (targetPos[i] - randomPos[i]) * morphObj.progress;
        }
        geo.attributes.position.needsUpdate = true;
      }
    });

    W.addEventListener('resize', () => {
      camera.aspect = legacySection.clientWidth / legacySection.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(legacySection.clientWidth, legacySection.clientHeight);
    });

    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      particles.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();
    activeScenes.push({ renderer, scene, raf });
  }

  /* ================================================================
     31. HERO DEPTH MAP PARALLAX SHADER — Volumetric pixel displacement
     ================================================================ */
  function initHeroDepthParallaxShader() {
    if (typeof THREE === 'undefined') return;

    const mediaWrap = D.querySelector('.hero-bg-media');
    if (!mediaWrap) return;

    const img = mediaWrap.querySelector('img');
    if (!img) return;

    // Create displacement overlay canvas over hero image
    const canvasWrap = D.createElement('div');
    canvasWrap.className = 'hero-depth-canvas-wrap';
    canvasWrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:2;opacity:0.25;mix-blend-mode:soft-light;';
    mediaWrap.appendChild(canvasWrap);

    const scene = new THREE.Scene();
    const w = mediaWrap.clientWidth || 1200, h = mediaWrap.clientHeight || 700;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(W.devicePixelRatio, 1.5));
    canvasWrap.appendChild(renderer.domElement);

    const depthVert = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;
    const depthFrag = `
      precision mediump float;
      uniform vec2 uMouse;
      uniform float uTime;
      varying vec2 vUv;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
      }

      void main() {
        vec2 uv = vUv;
        vec2 offset = (uMouse - 0.5) * 0.04;
        float depth = noise(uv * 4.0 + uTime * 0.1);
        vec2 displacedUv = uv + offset * depth;

        vec3 c1 = vec3(0.0, 0.94, 1.0);
        vec3 c2 = vec3(0.0, 0.53, 0.8);
        vec3 col = mix(c1, c2, depth);

        gl_FragColor = vec4(col, depth * 0.2);
      }
    `;

    const depthMat = new THREE.ShaderMaterial({
      uniforms: {
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 }
      },
      vertexShader: depthVert,
      fragmentShader: depthFrag,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), depthMat);
    scene.add(mesh);

    W.addEventListener('mousemove', e => {
      depthMat.uniforms.uMouse.value.x = e.clientX / W.innerWidth;
      depthMat.uniforms.uMouse.value.y = 1.0 - (e.clientY / W.innerHeight);
    });

    W.addEventListener('resize', () => {
      renderer.setSize(mediaWrap.clientWidth, mediaWrap.clientHeight);
    });

    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      depthMat.uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
    }
    animate();
    activeScenes.push({ renderer, scene, raf });
  }

  /* ================================================================
     32. HEALTH CARD ANIMATIONS — Slide-up text reveal & Card Stagger
     ================================================================ */
  function initHealthCardAnimations() {
    if (typeof gsap === 'undefined') return;

    // Stagger fade upon mount for benefit cards
    const benefitCards = D.querySelectorAll('.benefit-card-box');
    if (benefitCards.length) {
      gsap.from(benefitCards, {
        y: 45,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: typeof ScrollTrigger !== 'undefined' ? {
          trigger: benefitCards[0],
          start: 'top 85%'
        } : null
      });
    }

    // Scroll-triggered slide up reveal for text blocks
    const textBlocks = D.querySelectorAll('.health-card-hero h1, .health-card-hero p');
    textBlocks.forEach(text => {
      gsap.fromTo(text, { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: typeof ScrollTrigger !== 'undefined' ? {
          trigger: text,
          start: 'top 88%',
          toggleActions: 'play none none none'
        } : null
      });
    });
  }

  /* ================================================================
     33. WHATSAPP CONTACT BUTTON — Configurable Pulse Floating Action
     ================================================================ */
  function initWhatsAppContactButton() {
    function createButton() {
      if (!D.body) return;
      // Contact config dictionary
      W.AdityaHospitalConfig = W.AdityaHospitalConfig || {
        whatsAppNumber: '919100049445',
        spoc2: '917331110873',
        emergency: '08632944444',
        message: encodeURIComponent('Hello Aditya Medicare, I want to register for the Health Card / Inquiry')
      };

      let btn = D.querySelector('.whatsapp-float-pulse');
      if (!btn) {
        btn = D.createElement('a');
        btn.className = 'whatsapp-float-pulse';
        btn.target = '_blank';
        btn.title = 'Chat on WhatsApp with Aditya Medicare SPOC';
        btn.href = `https://wa.me/${W.AdityaHospitalConfig.whatsAppNumber}?text=${W.AdityaHospitalConfig.message}`;
        btn.innerHTML = `<svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.299.434 2.503 1.185 3.477l-.774 2.827 2.905-.762c.939.619 2.057.962 3.251.963 3.181 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.765-5.767-5.765zm3.385 8.125c-.145.408-.845.774-1.185.807-.33.032-.756.142-2.481-.571-2.078-.857-3.411-2.973-3.515-3.111-.104-.139-.844-1.121-.844-2.137 0-1.016.533-1.516.723-1.721.19-.205.413-.256.551-.256.138 0 .277.002.396.007.128.005.3.003.435.328.145.348.498 1.214.542 1.303.044.089.073.193.015.308-.058.116-.087.188-.173.289-.087.101-.183.226-.261.303-.087.087-.178.182-.077.355.101.173.45 0.742 0.965 1.201.662.59 1.22.774 1.393.86.173.087.275.073.376-.044.101-.116.434-.506.55-.68.116-.173.232-.145.39-.087.158.058 1.002.472 1.175.559.173.087.289.13.332.203.043.073.043.421-.102.829z"/></svg>`;
        D.body.appendChild(btn);
      }

      // Inject pulse animation CSS
      if (!D.getElementById('whatsapp-pulse-style')) {
        const style = D.createElement('style');
        style.id = 'whatsapp-pulse-style';
        style.textContent = `
          .whatsapp-float-pulse {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 9999;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #25D366;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
            text-decoration: none;
            animation: waPulse 2s infinite;
            transition: transform 0.3s ease;
          }
          .whatsapp-float-pulse:hover {
            transform: scale(1.12) rotate(5deg);
          }
          @keyframes waPulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
            70% { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
        `;
        D.head.appendChild(style);
      }
    }

    if (D.body) createButton();
    else D.addEventListener('DOMContentLoaded', createButton);
  }

})();
