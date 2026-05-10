"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Was kostet eine Elektroinstallation?",
    a: "Die Kosten hängen vom Umfang ab. Eine Steckdose kostet ab 80 €, ein neuer Sicherungskasten ab 600 €. Größere Renovierungsprojekte liegen meist zwischen 3.000 und 15.000 €. Wir erstellen Ihnen immer ein verbindliches Festpreisangebot – ohne versteckte Kosten.",
  },
  {
    q: "Wie lange dauert ein E-Check?",
    a: "Für ein Einfamilienhaus rechnen wir mit 2–4 Stunden. Bei Gewerbeimmobilien je nach Größe mit einem halben bis ganzen Tag. Nach dem E-Check erhalten Sie ein detailliertes Prüfprotokoll nach DIN VDE 0100-600.",
  },
  {
    q: "Erhalte ich ein Festpreisangebot?",
    a: "Ja, immer. Nach einer kostenlosen Vor-Ort-Besichtigung erhalten Sie innerhalb von 48 Stunden ein schriftliches Festpreisangebot. Dieser Preis ist verbindlich – egal was bei der Arbeit dazukommt.",
  },
  {
    q: "Führen Sie Photovoltaik-Anlagen auf Firmengebäuden durch?",
    a: "Ja, das ist einer unserer Schwerpunkte. Wir planen und installieren PV-Anlagen von 10 kWp bis 500 kWp – inklusive Batteriespeicher, Wallboxen, Netzanmeldung und Beantragung aller Fördermittel.",
  },
  {
    q: "Sind Sie VDE-zertifiziert?",
    a: "Ja. AMPERA GmbH ist VDE-zertifizierter Meisterbetrieb und Mitglied im ZVEH (Zentralverband der Deutschen Elektro- und Informationstechnischen Handwerke). Alle unsere Installationen entsprechen den aktuellen DIN-VDE-Normen.",
  },
  {
    q: "Bieten Sie einen Notdienst an?",
    a: "Ja – 24/7. Bei Stromausfall oder elektrischen Störungen erreichen Sie uns unter unserer Notdienstnummer. Wir sind in der Regel innerhalb von 45–60 Minuten vor Ort.",
  },
  {
    q: "Welche Garantie haben Ihre Arbeiten?",
    a: "Wir gewähren 5 Jahre Garantie auf alle ausgeführten Arbeiten (gesetzliche Gewährleistung 2 Jahre). Verwendete Materialien tragen zusätzlich die Herstellergarantie – bei Photovoltaik-Modulen bis zu 25 Jahre.",
  },
  {
    q: "Wie läuft ein Smart-Home-Projekt ab?",
    a: "Wir beginnen mit einer kostenfreien Bedarfsanalyse, zeigen Ihnen live verschiedene KNX- und Loxone-Demonstrationen, erstellen ein Konzept und installieren anschließend das komplette System. Die Einweisung und Programmierung sind inklusive.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-void-950 relative overflow-hidden">
      <div className="absolute left-1/4 bottom-0 w-96 h-64 bg-arc-500/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-start">

          {/* Left label */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="inline-block mb-5"
            >
              <span className="section-label">FAQ</span>
            </motion.div>
            <motion.h2
              className="font-rajdhani font-bold text-[var(--text-primary)] mb-4"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1 }}
            >
              Häufige Fragen
            </motion.h2>
            <motion.p
              className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 }}
            >
              Noch Fragen? Wir antworten gern persönlich – einfach anrufen oder das Kontaktformular nutzen.
            </motion.p>
            <motion.button
              onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline px-6 py-3 rounded-full text-sm font-medium"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Frage stellen →
            </motion.button>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-3 space-y-2">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
                  open === i ? "border-plasma-600/50 bg-void-900" : "border-[var(--border)] bg-void-900"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-200 ${
                      open === i ? "text-plasma-300" : "text-[var(--text-primary)]"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`text-lg flex-shrink-0 transition-all duration-300 ${
                      open === i ? "text-plasma-400 rotate-45" : "text-[var(--text-muted)]"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="accordion-content"
                    >
                      <div className="px-5 pb-4">
                        <div className="h-px bg-gradient-to-r from-plasma-600/30 to-transparent mb-4" />
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                          {f.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
