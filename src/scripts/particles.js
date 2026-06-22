import * as THREE from 'three';

const bgCanvas = document.getElementById('canvas-3d');
if (bgCanvas) {
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    canvas: bgCanvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const particleCount = 2500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * 80;
    const y = (Math.random() - 0.5) * 80;
    const z = (Math.random() - 0.5) * 80;
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
    originalPositions[i3] = x;
    originalPositions[i3 + 1] = y;
    originalPositions[i3 + 2] = z;
    velocities[i3] = 0;
    velocities[i3 + 1] = 0;
    velocities[i3 + 2] = 0;

    const t = Math.random();
    colors[i3] = 0.5 + t * 0.5;
    colors[i3 + 1] = 0.6 + t * 0.4;
    colors[i3 + 2] = 0.8 + t * 0.2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = 64;
  particleCanvas.height = 64;
  const pCtx = particleCanvas.getContext('2d');
  const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(180,210,255,0.6)');
  gradient.addColorStop(1, 'rgba(60,120,255,0)');
  pCtx.fillStyle = gradient;
  pCtx.fillRect(0, 0, 64, 64);
  const particleTexture = new THREE.CanvasTexture(particleCanvas);

  const material = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    map: particleTexture,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const connMaterial = new THREE.LineBasicMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.07,
    blending: THREE.AdditiveBlending,
  });
  const connGeometry = new THREE.BufferGeometry();
  const connectionLines = new THREE.LineSegments(connGeometry, connMaterial);
  scene.add(connectionLines);

  function buildConnections() {
    const pos = geometry.attributes.position.array;
    const connArray = [];
    const threshold = 4.5;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < Math.min(i + 8, particleCount); j++) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < threshold && dist > 0.5 && Math.random() > 0.75) {
          connArray.push(pos[i3], pos[i3 + 1], pos[i3 + 2]);
          connArray.push(pos[j3], pos[j3 + 1], pos[j3 + 2]);
        }
      }
    }

    connGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connArray, 3));
  }
  buildConnections();

  const ripples = [];
  const rippleMaterial = new THREE.LineBasicMaterial({
    color: 0x66aaff,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });

  function createRipple(x, y) {
    const segments = 64;
    const rippleGeo = new THREE.BufferGeometry();
    const ripplePos = new Float32Array((segments + 1) * 3);
    rippleGeo.setAttribute('position', new THREE.BufferAttribute(ripplePos, 3));
    const rippleLine = new THREE.Line(rippleGeo, rippleMaterial.clone());
    rippleLine.position.set(x, y, 0);
    scene.add(rippleLine);
    ripples.push({ mesh: rippleLine, radius: 0, maxRadius: 15, age: 0, maxAge: 1.5 });
  }

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let mouseWorldX = 0, mouseWorldY = 0;

  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    const mouseVec = new THREE.Vector3(targetMouseX * 15, targetMouseY * 10, 0);
    mouseVec.unproject(camera);
    mouseWorldX = mouseVec.x;
    mouseWorldY = mouseVec.y;
  });

  document.addEventListener('click', (e) => {
    const cx = (e.clientX / window.innerWidth) * 2 - 1;
    const cy = -(e.clientY / window.innerHeight) * 2 + 1;
    createRipple(cx * 15, cy * 10);

    const clickWorldVec = new THREE.Vector3(cx * 15, cy * 10, 0);
    clickWorldVec.unproject(camera);
    const clickX = clickWorldVec.x;
    const clickY = clickWorldVec.y;
    const pushRadius = 8;
    const pushForce = 3;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const dx = positions[i3] - clickX;
      const dy = positions[i3 + 1] - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < pushRadius && dist > 0.1) {
        const force = (1 - dist / pushRadius) * pushForce;
        velocities[i3] += (dx / dist) * force;
        velocities[i3 + 1] += (dy / dist) * force;
      }
    }
  });

  let scrollY = 0;
  let scrollVelocity = 0;
  let lastScrollY = 0;

  document.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let frameCount = 0;
  const clock = new THREE.Clock();

  function animateBackground() {
    requestAnimationFrame(animateBackground);
    frameCount++;
    const delta = clock.getDelta();

    mouseX += (targetMouseX - mouseX) * 0.03;
    mouseY += (targetMouseY - mouseY) * 0.03;

    scrollVelocity = (scrollY - lastScrollY) * 0.1;
    lastScrollY += (scrollY - lastScrollY) * 0.1;

    particles.rotation.x += 0.0002;
    particles.rotation.y += 0.0003;

    const posArray = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const depth = (originalPositions[i3 + 2] + 40) / 80;
      const parallaxFactor = 0.3 + depth * 0.7;
      posArray[i3 + 1] = originalPositions[i3 + 1] - scrollY * 0.002 * parallaxFactor;

      const dx = posArray[i3] - mouseWorldX;
      const dy = posArray[i3 + 1] - mouseWorldY;
      const distSq = dx * dx + dy * dy;
      const repelRadius = 6;
      if (distSq < repelRadius * repelRadius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / repelRadius) * 0.15;
        velocities[i3] += (dx / dist) * force;
        velocities[i3 + 1] += (dy / dist) * force;
      }

      velocities[i3] *= 0.92;
      velocities[i3 + 1] *= 0.92;
      velocities[i3 + 2] *= 0.92;
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      const springBack = 0.002;
      posArray[i3] += (originalPositions[i3] - posArray[i3]) * springBack;
      posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * springBack;
    }
    geometry.attributes.position.needsUpdate = true;

    camera.position.x += (mouseX * 2 - camera.position.x) * 0.008;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.008;

    camera.rotation.z += (-scrollVelocity * 0.001 - camera.rotation.z) * 0.05;

    camera.lookAt(scene.position);

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.age += delta;
      r.radius += 12 * delta;
      const t = r.age / r.maxAge;
      r.mesh.material.opacity = 0.4 * (1 - t);
      r.mesh.scale.setScalar(r.radius);

      if (r.age >= r.maxAge) {
        scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
        ripples.splice(i, 1);
      }
    }

    if (frameCount % 120 === 0) buildConnections();

    renderer.render(scene, camera);
  }
  animateBackground();
}
