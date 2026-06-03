"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "27", suffix: "", label: "Jahre Erfahrung", sublabel: "Gegründet 1998", fill: 90 },
  { value: "2.400", suffix: "+", label: "Projekte abgeschlossen", sublabel: "bundesweit realisiert", fill: 85 },
  { value: "31", suffix: "", label: "Fachkräfte im Team", sublabel: "qualifiziert & zertifiziert", fill: 72 },
  { value: "4,9", suffix: " / 5", label: "Google Bewertung", sublabel: "aus über 340 Rezensionen", fill: 98 },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-void-800 via-void-700 to-void-800" />
      <div className="absolute inset-x-0 top-0 h-px divider-plasma opacity-100" />
      <div className="absolute inset-x-0 bottom-0 h-px divider-plasma opacity-100" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="section-label">Kennzahlen</span>
        </motion.div>

        <div className="space-y-9">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-baseline justify-between mb-2.5">
                <span
                  className="text-[var(--text-secondary)] text-sm font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {s.label}
                </span>
                <span
                  className="font-rajdhani font-bold text-plasma-gradient"
                  style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", lineHeight: 1 }}
                >
                  {s.value}{s.suffix}
                </span>
              </div>

              <div className="relative h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #7C3AED, #38BDF8)",
                    boxShadow: "0 0 18px rgba(124,58,237,0.7), 0 0 6px rgba(56,189,248,0.5)",
                  }}
                  initial={{ width: "0%" }}
                  animate={inView ? { width: `${s.fill}%` } : { width: "0%" }}
                  transition={{ delay: i * 0.13 + 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="mt-1.5 text-[var(--text-muted)] text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                {s.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
