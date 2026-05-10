"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 27, suffix: "", label: "Jahre Erfahrung", sublabel: "seit 1998", prefix: "" },
  { value: 2400, suffix: "+", label: "Projekte", sublabel: "abgeschlossen", prefix: "" },
  { value: 31, suffix: "", label: "Fachkräfte", sublabel: "im Team", prefix: "" },
  { value: 4.9, suffix: "/5", label: "Bewertung", sublabel: "Google Reviews", prefix: "" },
];

function Counter({ value, suffix, prefix, isDecimal }: { value: number; suffix: string; prefix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString("de-DE");

  return (
    <span ref={ref} className="stat-number">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-void-800 via-void-700 to-void-800" />
      <div className="absolute inset-0 divider-plasma opacity-100" style={{ top: 0, height: "1px" }} />
      <div className="absolute inset-0 divider-plasma opacity-100" style={{ bottom: 0, top: "auto", height: "1px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-plasma-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="font-rajdhani font-bold text-plasma-gradient mb-1"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                  lineHeight: 1,
                }}
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  isDecimal={s.value % 1 !== 0}
                />
              </div>
              <div className="text-[var(--text-primary)] font-semibold text-sm uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                {s.label}
              </div>
              <div className="text-[var(--text-muted)] text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                {s.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
