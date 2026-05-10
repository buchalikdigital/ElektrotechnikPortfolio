"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Thomas Kessler",
    role: "Immobilieneigentümer",
    project: "Komplettsanierung, Frankfurt-Sachsenhausen",
    text: "AMPERA hat unsere gesamte Elektroanlage in einem 1960er-Jahre-Haus komplett erneuert – sauber, termingerecht und zum Festpreis. Keine Überraschungen, nur Ergebnisse. Absolute Weiterempfehlung!",
    stars: 5,
    initials: "TK",
    color: "#7C3AED",
  },
  {
    name: "Sabine Müller-Hoffmann",
    role: "Hausverwalterin, WEG Frankfurt",
    project: "Wartungsvertrag, 3 Liegenschaften",
    text: "Seit zwei Jahren betreut AMPERA unsere drei Wohnanlagen mit einem Wartungsvertrag. Reaktionszeiten unter 60 Minuten bei Störungen – besser geht es nicht. Das Team ist professionell und immer erreichbar.",
    stars: 5,
    initials: "SM",
    color: "#38BDF8",
  },
  {
    name: "Klaus & Inge Bergmann",
    role: "Privatpersonen",
    project: "Photovoltaik-Anlage, Oberursel",
    text: "Jana hat uns von A bis Z beraten – Förderantrag, Planung, Installation und Netzanmeldung. Die Anlage läuft seit 6 Monaten einwandfrei. Wir sparen schon jetzt 70% unserer Stromkosten. Top!",
    stars: 5,
    initials: "KB",
    color: "#A78BFA",
  },
  {
    name: "Architekturbüro Strauss & Partner",
    role: "Architekt",
    project: "Smart Home Penthouse, Frankfurt-Museumsufer",
    text: "Als Architekten arbeiten wir nur mit verlässlichen Partnern. AMPERA hat die gesamte KNX-Anlage des Penthouse termingerecht umgesetzt – perfekt koordiniert mit den anderen Gewerken. Genau so soll Zusammenarbeit aussehen.",
    stars: 5,
    initials: "SP",
    color: "#34D399",
  },
  {
    name: "Maria Santos",
    role: "Kita-Betreiberin",
    project: "E-Check & Notstromanlage, Bockenheim",
    text: "Für unsere Kita war die Sicherheit oberstes Gebot. AMPERA hat den E-Check durchgeführt, alle Mängel beseitigt und eine Notstromanlage installiert. Schnell, zuverlässig und sehr kompetent.",
    stars: 5,
    initials: "MS",
    color: "#F59E0B",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setDirection(1);
    setCurrent((i) => (i + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + reviews.length) % reviews.length);
  };

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const r = reviews[current];

  return (
    <section id="bewertungen" className="py-24 lg:py-32 bg-void-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void-950/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-plasma-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-block mb-5"
          >
            <span className="section-label">Bewertungen</span>
          </motion.div>
          <motion.h2
            className="font-rajdhani font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
          >
            Was unsere Kunden sagen
          </motion.h2>

          {/* Trust strip */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              { v: "4.9/5", l: "Google" },
              { v: "187", l: "Bewertungen" },
              { v: "100%", l: "Weiterempfehlung" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-2">
                <span className="font-mono font-bold text-plasma-400 text-lg" style={{ fontFamily: "var(--font-mono)" }}>
                  {s.v}
                </span>
                <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "var(--font-inter)" }}>
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div
            className="relative overflow-hidden"
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const dx = touchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 50) { dx > 0 ? next() : prev(); resetTimer(); }
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="card rounded-2xl p-8"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <svg key={i} className="w-5 h-5" style={{ color: r.color }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-base italic" style={{ fontFamily: "var(--font-inter)" }}>
                  &ldquo;{r.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ background: `${r.color}20`, color: r.color, fontFamily: "var(--font-rajdhani)" }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                      {r.name}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "var(--font-inter)" }}>{r.role}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: r.color, fontFamily: "var(--font-mono)" }}>{r.project}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => { prev(); resetTimer(); }}
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-plasma-600/50 hover:text-plasma-400 transition-colors"
              aria-label="Zurück"
            >
              ←
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); resetTimer(); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-plasma-500" : "w-1.5 bg-void-700"
                  }`}
                  aria-label={`Bewertung ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => { next(); resetTimer(); }}
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-plasma-600/50 hover:text-plasma-400 transition-colors"
              aria-label="Weiter"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
