"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    tag: "Komplettstrom",
    title: "Elektroinstallation",
    desc: "Neuinstallation und Umbau elektrischer Anlagen in Wohn- und Gewerbeimmobilien – Sicherungskasten, Leitungen, Steckdosen.",
    color: "#7C3AED",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    tag: "Erneuerbar",
    title: "Photovoltaik & Speicher",
    desc: "Solaranlagen, Batteriespeicher und Wallboxen – klimafreundlich und wirtschaftlich sinnvoll.",
    color: "#38BDF8",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    tag: "Smart Living",
    title: "Gebäudeautomation",
    desc: "Smart-Home-Lösungen, KNX und Loxone – Ihr Zuhause steuert sich selbst.",
    color: "#A78BFA",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    tag: "Sicherheit",
    title: "Blitzschutz & Erdung",
    desc: "Äußerer und innerer Blitzschutz nach DIN EN 62305 – professionell geplant und installiert.",
    color: "#F59E0B",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    tag: "Industrial",
    title: "Industrie-Elektrik",
    desc: "Schaltschrankbau, Maschineninstallation und SPS-Programmierung für industrielle Anlagen.",
    color: "#8B5CF6",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tag: "Zertifiziert",
    title: "E-Check & Notbeleuchtung",
    desc: "E-Checks für Privat und Gewerbe, Notbeleuchtung nach DIN EN 1838 und Brandmeldesysteme.",
    color: "#34D399",
  },
];

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientX - cx) / (rect.width / 2)) * 10;
    const y = -((e.clientY - cy) / (rect.height / 2)) * 10;
    setTilt({ x, y });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease",
      }}
      className="group card p-6 rounded-2xl cursor-default relative overflow-hidden"
    >
      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${s.color}60, transparent)`,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(315deg, ${s.color}60, transparent)`,
          clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
        }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${s.color}10, transparent 70%)` }}
      />

      {/* Tag */}
      <div className="mb-5 flex items-center justify-between">
        <span
          className="text-[10px] font-mono tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
          style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}30` }}
        >
          {s.tag}
        </span>
      </div>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}25` }}
      >
        {s.icon}
      </div>

      {/* Content */}
      <h3
        className="font-rajdhani font-bold text-xl text-[var(--text-primary)] mb-3 group-hover:text-plasma-gradient transition-all duration-300"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        {s.title}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
        {s.desc}
      </p>

      {/* Arrow */}
      <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
        <span className="text-xs font-medium" style={{ color: s.color, fontFamily: "var(--font-inter)" }}>
          Mehr erfahren
        </span>
        <span style={{ color: s.color }}>→</span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="leistungen" className="py-24 lg:py-32 bg-void-950 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-block mb-5"
          >
            <span className="section-label">⚡ Leistungen</span>
          </motion.div>
          <motion.h2
            className="font-rajdhani font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Was wir für Sie tun
          </motion.h2>
          <motion.p
            className="text-[var(--text-secondary)] max-w-xl mx-auto text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Von der klassischen Elektroinstallation bis zur intelligenten Gebäudeautomation –
            wir bieten das komplette Spektrum der modernen Elektrotechnik.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
