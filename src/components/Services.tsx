"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    tag: "Komplettstrom",
    title: "Elektroinstallation",
    desc: "Neuinstallation und Umbau elektrischer Anlagen in Wohn- und Gewerbeimmobilien – Sicherungskasten, Leitungen, Steckdosen.",
    color: "#7C3AED",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
    features: [
      "Neuinstallation & Modernisierung kompletter Anlagen",
      "Sicherungskästen & Unterverteilungen",
      "Unterputz- & Aufputzleitungen",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    tag: "Erneuerbar",
    title: "Photovoltaik & Speicher",
    desc: "Solaranlagen, Batteriespeicher und Wallboxen – klimafreundlich und wirtschaftlich sinnvoll.",
    color: "#38BDF8",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    features: [
      "Planung & Montage von Solaranlagen",
      "Batteriespeicher & Netzeinspeisung",
      "Wallboxen für E-Mobilität",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    tag: "Smart Living",
    title: "Gebäudeautomation",
    desc: "Smart-Home-Lösungen, KNX und Loxone – Ihr Zuhause steuert sich selbst.",
    color: "#A78BFA",
    image: "https://images.unsplash.com/photo-1558002038-1ad4b54b43e2?auto=format&fit=crop&w=800&q=80",
    features: [
      "KNX & Loxone Systemintegration",
      "Beleuchtungs- & Klimasteuerung",
      "App-Bedienung & Visualisierung",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    tag: "Sicherheit",
    title: "Blitzschutz & Erdung",
    desc: "Äußerer und innerer Blitzschutz nach DIN EN 62305 – professionell geplant und installiert.",
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80",
    features: [
      "Äußerer Blitzschutz nach DIN EN 62305",
      "Innerer Überspannungsschutz",
      "Erdungsanlagen & Potentialausgleich",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    tag: "Industrial",
    title: "Industrie-Elektrik",
    desc: "Schaltschrankbau, Maschineninstallation und SPS-Programmierung für industrielle Anlagen.",
    color: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    features: [
      "Schaltschrankbau & Verdrahtung",
      "SPS-Programmierung & Inbetriebnahme",
      "Maschineninstallation & Wartung",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tag: "Zertifiziert",
    title: "E-Check & Notbeleuchtung",
    desc: "E-Checks für Privat und Gewerbe, Notbeleuchtung nach DIN EN 1838 und Brandmeldesysteme.",
    color: "#34D399",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    features: [
      "E-Check für Wohn- & Gewerbeimmobilien",
      "Notbeleuchtung nach DIN EN 1838",
      "Brandmelde- & Sicherheitssysteme",
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const s = services[active];

  return (
    <section ref={ref} id="leistungen" className="py-24 lg:py-32 bg-void-950 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="section-label">Leistungen</span>
          </motion.div>
          <motion.h2
            className="font-rajdhani font-bold text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Was wir für Sie tun
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          {/* Left: featured service panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="card rounded-2xl relative overflow-hidden"
            >
              {/* Hero image area */}
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(0.55)" }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${s.color}35 0%, transparent 55%), linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)` }}
                />
                {/* Icon badge on image */}
                <div
                  className="absolute bottom-4 left-5 w-11 h-11 rounded-xl flex items-center justify-center p-2.5"
                  style={{ color: s.color, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: `1px solid ${s.color}50` }}
                >
                  {s.icon}
                </div>
                {/* Tag badge on image */}
                <span
                  className="absolute top-4 right-4 text-[10px] font-mono tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                  style={{ color: s.color, background: "rgba(0,0,0,0.55)", border: `1px solid ${s.color}50`, backdropFilter: "blur(4px)" }}
                >
                  {s.tag}
                </span>
              </div>

              {/* Color accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: s.color }} />

              {/* Content */}
              <div className="relative z-10 flex flex-col p-8 lg:p-10">
                <h3
                  className="font-rajdhani font-bold text-[var(--text-primary)] mb-3"
                  style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
                >
                  {s.title}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-7" style={{ fontFamily: "var(--font-inter)" }}>
                  {s.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {s.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5"
                        style={{ background: `${s.color}20`, color: s.color }}
                      >
                        ✓
                      </span>
                      <span style={{ fontFamily: "var(--font-inter)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3 self-start"
                  style={{ color: s.color, fontFamily: "var(--font-inter)" }}
                >
                  Jetzt anfragen
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: service list tabs */}
          <div className="flex flex-col gap-1.5 lg:overflow-y-auto">
            {services.map((svc, i) => (
              <motion.button
                key={svc.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(i)}
                className="group w-full text-left rounded-xl p-4 transition-all duration-300 relative"
                style={{
                  background: active === i ? "rgba(255,255,255,0.05)" : "transparent",
                  border: `1px solid ${active === i ? "rgba(255,255,255,0.08)" : "transparent"}`,
                }}
              >
                {active === i && (
                  <div className="absolute left-0 inset-y-0 w-0.5 rounded-full" style={{ background: svc.color }} />
                )}
                <div className="flex items-center gap-3 pl-2">
                  {/* Thumbnail */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={svc.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ filter: "brightness(0.6)" }}
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center p-2"
                      style={{ color: active === i ? svc.color : "rgba(255,255,255,0.6)" }}
                    >
                      {svc.icon}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-sm font-semibold leading-tight transition-colors duration-300"
                      style={{
                        color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {svc.title}
                    </div>
                    <div className="text-[10px] font-mono tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {svc.tag}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
