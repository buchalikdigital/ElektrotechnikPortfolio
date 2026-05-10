"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const rotatingWords = ["Sicherheit.", "Präzision.", "Zukunft.", "Innovation."];

const trustBadges = [
  { icon: "⚡", label: "Elektroinstallateur-Meister" },
  { icon: "✓", label: "VDE-zertifiziert" },
  { icon: "★", label: "ZVEH-Mitglied" },
];

function ElectricBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const isMobile = window.innerWidth < 768;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0D0A1A, 0.055);
    const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.z = 6;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0D0A1A, 0.5);
    scene.add(ambientLight);

    const plasmaLight = new THREE.PointLight(0x7C3AED, 6, 14);
    plasmaLight.position.set(3, 2, 3);
    scene.add(plasmaLight);

    const arcLight = new THREE.PointLight(0x38BDF8, 4, 10);
    arcLight.position.set(-3, -2, 2);
    scene.add(arcLight);

    // ─── Circuit trace lines ───
    const traceGroup = new THREE.Group();
    const traceMat = new THREE.MeshBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.5 });
    const traceMats: { mat: THREE.MeshBasicMaterial; phase: number; speed: number }[] = [];

    for (let i = 0; i < (isMobile ? 8 : 14); i++) {
      const pts: THREE.Vector3[] = [];
      let x = (Math.random() - 0.5) * 12;
      let y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;
      pts.push(new THREE.Vector3(x, y, z));
      const segments = 3 + Math.floor(Math.random() * 4);
      for (let s = 0; s < segments; s++) {
        const axis = Math.random() > 0.5 ? "x" : "y";
        const dist = 0.8 + Math.random() * 1.8;
        if (axis === "x") x += (Math.random() > 0.5 ? 1 : -1) * dist;
        else y += (Math.random() > 0.5 ? 1 : -1) * dist;
        pts.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.TubeGeometry(curve, pts.length * 4, 0.012, 4, false);
      const mat = new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0x38BDF8 : 0x7C3AED, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(geo, mat);
      traceGroup.add(mesh);
      traceMats.push({ mat, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.5 });
    }
    scene.add(traceGroup);

    // ─── Circuit nodes ───
    const nodeGroup = new THREE.Group();
    const nodeData: { mesh: THREE.Mesh; phase: number; speed: number; baseY: number }[] = [];
    const nodeCount = isMobile ? 12 : 22;

    for (let i = 0; i < nodeCount; i++) {
      const geo = new THREE.SphereGeometry(0.045 + Math.random() * 0.04, 8, 8);
      const isArc = i % 4 === 0;
      const mat = new THREE.MeshPhysicalMaterial({
        color: isArc ? 0x38BDF8 : 0x8B5CF6,
        emissive: isArc ? 0x38BDF8 : 0x7C3AED,
        emissiveIntensity: 1.8,
        metalness: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const bY = (Math.random() - 0.5) * 7;
      mesh.position.set((Math.random() - 0.5) * 12, bY, (Math.random() - 0.5) * 4 - 1);
      nodeGroup.add(mesh);
      nodeData.push({ mesh, phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.6, baseY: bY });
    }
    scene.add(nodeGroup);

    // ─── Particles ───
    const particleCount = isMobile ? 80 : 160;
    const plasmaCount = Math.floor(particleCount * 0.75);
    const arcCount = particleCount - plasmaCount;

    function makeParticles(count: number, color: number, size: number) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.6, sizeAttenuation: true });
      return new THREE.Points(geo, mat);
    }

    const plasmaParticles = makeParticles(plasmaCount, 0x7C3AED, 0.04);
    const arcParticles = makeParticles(arcCount, 0x38BDF8, 0.055);
    scene.add(plasmaParticles);
    scene.add(arcParticles);

    // ─── Lightning bolts ───
    const boltGroup = new THREE.Group();
    const boltData: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; nextFlash: number; flashing: boolean; flashT: number; light: THREE.PointLight }[] = [];
    const boltCount = isMobile ? 2 : 4;

    for (let b = 0; b < boltCount; b++) {
      const pts: THREE.Vector3[] = [];
      const startX = (Math.random() - 0.5) * 10;
      const startY = 2 + Math.random() * 2;
      let cx = startX, cy = startY;
      for (let s = 0; s < 8; s++) {
        cx += (Math.random() - 0.5) * 0.6;
        cy -= 0.5 + Math.random() * 0.4;
        pts.push(new THREE.Vector3(cx, cy, (Math.random() - 0.5) * 0.5));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.TubeGeometry(curve, 24, 0.018, 4, false);
      const mat = new THREE.MeshBasicMaterial({ color: 0xC4B5FD, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(geo, mat);
      boltGroup.add(mesh);
      const light = new THREE.PointLight(0x8B5CF6, 0, 5);
      light.position.copy(pts[4]);
      scene.add(light);
      boltData.push({ mesh, mat, nextFlash: 2 + Math.random() * 5, flashing: false, flashT: 0, light });
    }
    scene.add(boltGroup);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Animate
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Camera parallax
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.03;

      // Plasma light orbit
      plasmaLight.position.x = Math.cos(t * 0.35) * 4;
      plasmaLight.position.y = Math.sin(t * 0.25) * 3;

      // Arc light counter-orbit
      arcLight.position.x = Math.cos(t * 0.45 + Math.PI) * 3;
      arcLight.position.y = Math.sin(t * 0.35 + Math.PI) * 2;

      // Trace glow pulse
      traceMats.forEach(({ mat, phase, speed }) => {
        mat.opacity = 0.2 + Math.sin(t * speed + phase) * 0.35;
      });

      // Node float
      nodeData.forEach(({ mesh, phase, speed, baseY }) => {
        (mesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 1.4 + Math.sin(t * speed + phase) * 0.8;
        mesh.position.y = baseY + Math.sin(t * speed * 0.5 + phase) * 0.3;
      });

      // Particles rotate
      plasmaParticles.rotation.y = t * 0.04;
      arcParticles.rotation.y = -t * 0.06;
      plasmaParticles.rotation.x = t * 0.015;
      arcParticles.rotation.x = -t * 0.02;

      // Lightning flash
      boltData.forEach((bd) => {
        if (!bd.flashing) {
          bd.nextFlash -= 0.016;
          if (bd.nextFlash <= 0) {
            bd.flashing = true;
            bd.flashT = 0;
            bd.nextFlash = 3 + Math.random() * 6;
          }
        } else {
          bd.flashT += 0.05;
          const opacity = bd.flashT < 0.3 ? bd.flashT / 0.3 * 0.7 : Math.max(0, 0.7 - (bd.flashT - 0.3) / 0.4 * 0.7);
          bd.mat.opacity = opacity;
          bd.light.intensity = opacity * 5;
          if (bd.flashT > 0.7) bd.flashing = false;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-void-950">
      {/* Three.js background */}
      <ElectricBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-950/60 via-transparent to-void-950/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-void-950/80 via-transparent to-void-950/80 pointer-events-none" />

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-plasma-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="section-label">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-arc-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-arc-400" />
              </span>
              Meisterbetrieb · Frankfurt am Main · seit 1998
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-rajdhani font-bold leading-[0.95] mb-3"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              <span className="text-[var(--text-primary)]">Ihr Strom.</span>
              <br />
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    className="text-plasma-gradient inline-block"
                    initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
                    animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                    exit={{ opacity: 0, y: -20, clipPath: "inset(100% 0 0 0)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {rotatingWords[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            AMPERA GmbH ist Ihr Meisterbetrieb für Elektroinstallation, Photovoltaik und Gebäudeautomation
            in Frankfurt und der Rhein-Main-Region. Über <strong className="text-[var(--text-primary)]">2.400 Projekte</strong> sprechen für sich.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <button
              onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-plasma px-8 py-4 rounded-full text-base font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Kostenloses Angebot →
            </button>
            <button
              onClick={() => document.querySelector("#projekte")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline px-8 py-4 rounded-full text-base font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Projekte ansehen
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(124,58,237,0.25)] bg-[rgba(124,58,237,0.08)]"
              >
                <span className="text-arc-400 text-sm">{b.icon}</span>
                <span className="text-xs font-medium text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-inter)" }}>
                  {b.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">Scrollen</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-plasma-600 to-transparent"
          animate={{ scaleY: [0, 1, 0], y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
