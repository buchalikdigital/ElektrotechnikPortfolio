"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const categories = ["Alle", "Photovoltaik", "Smart Home", "Industrie", "Blitzschutz", "E-Check"];

const projects = [
  {
    id: 1,
    title: "Bürokomplex Westend",
    desc: "PV-Anlage 120 kWp + Batteriespeicher",
    category: "Photovoltaik",
    year: "2024",
    size: "large",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Villa Sachsenhausen",
    desc: "Komplett-Elektrosanierung + KNX Smart Home",
    category: "Smart Home",
    year: "2024",
    size: "small",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Logistikzentrum Fechenheim",
    desc: "Industrieinstallation 800A Hauptverteiler",
    category: "Industrie",
    year: "2023",
    size: "small",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Wohnanlage Rödelheim",
    desc: "E-Check & Zählerschranksanierung (48 WE)",
    category: "E-Check",
    year: "2023",
    size: "large",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Hotel Taunus",
    desc: "Notstromsystem + Blitzschutz DIN EN 62305",
    category: "Blitzschutz",
    year: "2023",
    size: "small",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Stadthaus Nordend",
    desc: "Smart Home Loxone + Rollläden + Lichtsteuerung",
    category: "Smart Home",
    year: "2022",
    size: "small",
    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "Produktionshalle Höchst",
    desc: "Schaltschrankbau + SPS-Programmierung",
    category: "Industrie",
    year: "2022",
    size: "large",
    img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Kita Bockenheim",
    desc: "Photovoltaik 28 kWp + Wallbox E-Mobilität",
    category: "Photovoltaik",
    year: "2022",
    size: "small",
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    title: "Penthouse Museumsufer",
    desc: "Gebäudeautomation + Audio/Video-Integration",
    category: "Smart Home",
    year: "2021",
    size: "small",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("Alle");

  const filtered = active === "Alle" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projekte" className="py-24 lg:py-32 bg-void-900 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-block mb-5"
          >
            <span className="section-label">Projekte</span>
          </motion.div>
          <motion.h2
            className="font-rajdhani font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
          >
            Unsere Referenzen
          </motion.h2>
        </div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "btn-plasma"
                  : "btn-outline text-[var(--text-secondary)]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                    p.size === "large" ? "sm:col-span-2" : ""
                  }`}
                  style={{ minHeight: p.size === "large" ? "300px" : "220px" }}
                >
                  {/* Image */}
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void-950/95 via-void-950/30 to-transparent" />
                  <div className="absolute inset-0 bg-plasma-600/0 group-hover:bg-plasma-600/10 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(124,58,237,0.3)",
                              border: "1px solid rgba(124,58,237,0.4)",
                              color: "#C4B5FD",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {p.category}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                            {p.year}
                          </span>
                        </div>
                        <h3
                          className="font-rajdhani font-bold text-lg text-[var(--text-primary)] leading-tight"
                          style={{ fontFamily: "var(--font-rajdhani)" }}
                        >
                          {p.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                          {p.desc}
                        </p>
                      </div>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                        style={{ background: "rgba(124,58,237,0.4)", border: "1px solid rgba(139,92,246,0.5)" }}
                      >
                        <span className="text-[var(--text-primary)] text-sm">→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
