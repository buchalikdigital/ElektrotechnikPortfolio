"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "1998", title: "Gründung", desc: "Stefan Ampera gründet den Betrieb als Einzelunternehmen in Frankfurt-Sachsenhausen." },
  { year: "2004", title: "Meisterbetrieb", desc: "Erster Meisterbrief und Eintrag in die Handwerksrolle der Handwerkskammer Frankfurt." },
  { year: "2010", title: "Team-Wachstum", desc: "Erweiterung auf 12 Fachkräfte. Erster Großauftrag: Industriehalle in Höchst." },
  { year: "2016", title: "Photovoltaik", desc: "Neue Geschäftseinheit Photovoltaik & Speicher – über 50 PV-Anlagen im ersten Jahr." },
  { year: "2021", title: "Smart Home", desc: "Zertifizierung als KNX-Partner und Loxone-Gold-Partner für Gebäudeautomation." },
  { year: "2025", title: "Heute", desc: "31 Fachkräfte, 2.400+ Projekte, führender Elektrotechnikbetrieb in der Rhein-Main-Region." },
];

const badges = [
  { icon: "🏆", label: "Meisterbetrieb", sub: "seit 2004" },
  { icon: "🔒", label: "5 Jahre Garantie", sub: "auf alle Arbeiten" },
  { icon: "✓", label: "VDE-zertifiziert", sub: "geprüfte Qualität" },
  { icon: "💰", label: "Festpreisangebot", sub: "keine Überraschungen" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ueber-uns" ref={ref} className="py-24 lg:py-32 bg-void-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-plasma-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Text + Badges */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-5"
            >
              <span className="section-label">Über AMPERA</span>
            </motion.div>

            <motion.h2
              className="font-rajdhani font-bold text-[var(--text-primary)] mb-6"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              27 Jahre Erfahrung.
              <br />
              <span className="text-plasma-gradient">Volle Verlässlichkeit.</span>
            </motion.h2>

            <motion.p
              className="text-[var(--text-secondary)] text-base leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Als Familienbetrieb aus Frankfurt verfolgen wir seit 1998 ein klares Ziel: Elektrotechnik auf
              höchstem Niveau – termingerecht, sauber und zu fairen Festpreisen.
            </motion.p>

            <motion.p
              className="text-[var(--text-secondary)] text-base leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Unser Team aus <strong className="text-[var(--text-primary)]">31 Fachkräften</strong> – darunter Elektroinstallateur-Meister,
              Photovoltaik-Spezialisten und KNX-Planer – steht für lückenlose Qualität von der Planung bis zur Abnahme.
            </motion.p>

            {/* Quality badges */}
            <div className="grid grid-cols-2 gap-4">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  className="card p-4 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-inter)" }}>
                      {b.label}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                      {b.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-plasma mt-8 px-7 py-3.5 rounded-full font-semibold text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              Kostenlose Beratung →
            </motion.button>
          </div>

          {/* Right: Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-4 top-2 bottom-2 w-px timeline-line origin-top"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="pl-12 relative"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full ${i === timeline.length - 1 ? "bg-arc-400" : "bg-plasma-600"}`}
                      style={{ boxShadow: i === timeline.length - 1 ? "0 0 12px #38BDF8" : "0 0 12px #7C3AED" }}
                    />
                    {i === timeline.length - 1 && (
                      <div className="absolute w-5 h-5 rounded-full border border-arc-400/40 animate-ping" />
                    )}
                  </div>

                  <div className="card p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span
                        className="font-mono text-xs text-plasma-400 font-bold tracking-wider"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {item.year}
                      </span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
