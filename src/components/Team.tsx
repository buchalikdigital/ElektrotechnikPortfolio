"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const members = [
  {
    name: "Stefan Volker",
    role: "Geschäftsführer & Meister",
    initials: "SV",
    color: "#7C3AED",
    years: "27 Jahre Erfahrung",
    specialty: "Elektroinstallation & Industrieelektrik",
    quote: "Qualität entsteht nicht durch Zufall – sie ist das Ergebnis konsequenter Arbeit.",
    bio: "Stefan Volker gründete AMPERA GmbH 1998 und führt das Unternehmen seitdem mit klarem Fokus auf Handwerksqualität und Kundenzufriedenheit. Als Elektroinstallateur-Meister überwacht er alle Großprojekte persönlich.",
  },
  {
    name: "Jana Richter",
    role: "Projektleiterin PV & Smart Home",
    initials: "JR",
    color: "#38BDF8",
    years: "14 Jahre Erfahrung",
    specialty: "Photovoltaik & KNX/Loxone",
    quote: "Die Energie der Sonne nutzbar zu machen – das fasziniert mich jeden Tag neu.",
    bio: "Jana Richter ist zertifizierte KNX-Planerin und Loxone-Gold-Partnerin. Sie leitet alle Smart-Home- und Photovoltaik-Projekte und begeistert Kunden mit zukunftsfähigen Lösungen.",
  },
  {
    name: "Marcus Weiß",
    role: "Meister Industrieelektrik",
    initials: "MW",
    color: "#A78BFA",
    years: "19 Jahre Erfahrung",
    specialty: "Schaltschrankbau & SPS",
    quote: "Ein sauber aufgebauter Schaltschrank ist das Herzstück jeder Anlage.",
    bio: "Marcus Weiß ist Spezialist für Schaltschrankbau, SPS-Programmierung (Siemens S7/TIA Portal) und Maschineninstallation. Kein Industrieprojekt ist für ihn zu komplex.",
  },
  {
    name: "Laura Baum",
    role: "Kundenberatung & Koordination",
    initials: "LB",
    color: "#34D399",
    years: "9 Jahre Erfahrung",
    specialty: "Projektkoordination & Förderberatung",
    quote: "Unsere Kunden sollen sich von Anfang bis Ende gut betreut fühlen.",
    bio: "Laura Baum koordiniert alle Kundenprojekte und berät zu Förderprogrammen für PV-Anlagen und Wärmepumpen. Sie ist die erste Ansprechpartnerin für Neukunden.",
  },
];

function MemberCard({ m, index }: { m: typeof members[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="h-72 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl card p-6 flex flex-col items-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 font-rajdhani"
            style={{
              background: `linear-gradient(135deg, ${m.color}30, ${m.color}10)`,
              border: `2px solid ${m.color}40`,
              color: m.color,
              fontFamily: "var(--font-rajdhani)",
              boxShadow: `0 0 20px ${m.color}20`,
            }}
          >
            {m.initials}
          </div>

          <h3
            className="font-rajdhani font-bold text-lg text-[var(--text-primary)] mb-1"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {m.name}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mb-4" style={{ fontFamily: "var(--font-inter)", color: m.color }}>
            {m.role}
          </p>
          <p className="text-xs text-[var(--text-muted)] italic leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            &ldquo;{m.quote}&rdquo;
          </p>

          <div className="mt-auto pt-4 flex items-center gap-1.5 text-[var(--text-muted)]">
            <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>Mehr →</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${m.color}15, rgba(13,10,26,0.95))`,
            border: `1px solid ${m.color}30`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{ background: `${m.color}20`, color: m.color, fontFamily: "var(--font-rajdhani)" }}
            >
              {m.initials}
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-inter)" }}>
                {m.name}
              </div>
              <div className="text-[10px]" style={{ color: m.color, fontFamily: "var(--font-mono)" }}>
                {m.years}
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 flex-1" style={{ fontFamily: "var(--font-inter)" }}>
            {m.bio}
          </p>

          <div
            className="text-[10px] px-3 py-1.5 rounded-full inline-block self-start"
            style={{
              background: `${m.color}15`,
              border: `1px solid ${m.color}30`,
              color: m.color,
              fontFamily: "var(--font-mono)",
            }}
          >
            {m.specialty}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-void-950 relative overflow-hidden">
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-plasma-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-block mb-5"
          >
            <span className="section-label">Team</span>
          </motion.div>
          <motion.h2
            className="font-rajdhani font-bold text-[var(--text-primary)] mb-3"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
          >
            Die Menschen hinter AMPERA
          </motion.h2>
          <motion.p
            className="text-xs text-[var(--text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Klicken zum Umdrehen
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m, i) => (
            <MemberCard key={m.name} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
