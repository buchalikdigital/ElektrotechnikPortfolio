"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Telefon",
    value: "+49 69 1234 5678",
    href: "tel:+4969123456789",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "E-Mail",
    value: "info@ampera-gmbh.de",
    href: "mailto:info@ampera-gmbh.de",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Adresse",
    value: "Mainzer Landstraße 42, 60325 Frankfurt am Main",
    href: "https://maps.google.com",
  },
];

const hours = [
  { day: "Mo – Fr", time: "07:00 – 18:00 Uhr" },
  { day: "Samstag", time: "08:00 – 14:00 Uhr" },
  { day: "Notdienst", time: "24/7 erreichbar" },
];

const leistungOptions = [
  "Elektroinstallation",
  "Photovoltaik & Speicher",
  "Smart Home / KNX",
  "Blitzschutz & Erdung",
  "Industrie-Elektrik",
  "E-Check",
  "Sonstiges",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    leistung: "",
    message: "",
    whatsapp: false,
    dsgvo: false,
    honeypot: "",
  });

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;
    if (!form.name || !form.email || !form.message || !form.dsgvo) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setState("success");
  };

  return (
    <section id="kontakt" ref={ref} className="py-24 lg:py-32 bg-void-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-950/60 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-plasma-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block mb-5"
          >
            <span className="section-label">Kontakt</span>
          </motion.div>
          <motion.h2
            className="font-rajdhani font-bold text-[var(--text-primary)] mb-3"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Jetzt Angebot anfordern
          </motion.h2>
          <motion.p
            className="text-[var(--text-secondary)] text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Kostenlose Erstberatung – wir melden uns innerhalb von 24 Stunden.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Emergency badge */}
            <div
              className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center gap-3"
            >
              <div className="relative flex-shrink-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-red-400" style={{ fontFamily: "var(--font-inter)" }}>
                  24h Notdienst
                </div>
                <div className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "var(--font-inter)" }}>
                  Stromausfall & Elektrostörungen – sofort erreichbar
                </div>
              </div>
            </div>

            {/* Contact cards */}
            {contactInfo.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label === "Adresse" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card p-4 rounded-xl flex items-center gap-4 group cursor-pointer block"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-plasma-400 group-hover:text-plasma-300 group-hover:bg-plasma-600/20 transition-colors duration-200"
                  style={{ background: "rgba(124,58,237,0.1)" }}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)] mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                    {c.label}
                  </div>
                  <div className="text-sm font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-inter)" }}>
                    {c.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Hours */}
            <motion.div
              className="card p-5 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
            >
              <div className="text-xs font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                Öffnungszeiten
              </div>
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-xs py-1.5 border-b border-[var(--border)] last:border-0">
                  <span className="text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-inter)" }}>{h.day}</span>
                  <span
                    className={h.day === "Notdienst" ? "text-arc-400 font-semibold" : "text-[var(--text-primary)]"}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div className="card rounded-2xl p-7">
              {state === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}
                  >
                    <svg className="w-8 h-8 text-plasma-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3
                    className="font-rajdhani font-bold text-2xl text-[var(--text-primary)] mb-2"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    Nachricht gesendet!
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-inter)" }}>
                    Danke, {form.name}! Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.honeypot}
                    onChange={(e) => set("honeypot", e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                        Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Max Mustermann"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                        Telefon
                      </label>
                      <input
                        type="tel"
                        placeholder="+49 69 ..."
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                      E-Mail *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="max@example.de"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                      Gewünschte Leistung
                    </label>
                    <select
                      value={form.leistung}
                      onChange={(e) => set("leistung", e.target.value)}
                      className="input-field"
                      style={{ appearance: "none" }}
                    >
                      <option value="">Bitte wählen ...</option>
                      {leistungOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                      Nachricht *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Beschreiben Sie Ihr Anliegen ..."
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className="input-field resize-none"
                      style={{ minHeight: "110px" }}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.whatsapp}
                        onChange={(e) => set("whatsapp", e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded"
                        style={{ accentColor: "#25D366" }}
                      />
                      <span className="text-xs text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-inter)" }}>
                        Ich möchte Rückmeldung auch per WhatsApp erhalten
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={form.dsgvo}
                        onChange={(e) => set("dsgvo", e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded"
                        style={{ accentColor: "#7C3AED" }}
                      />
                      <span className="text-xs text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-inter)" }}>
                        Ich stimme der Verarbeitung meiner Daten gemäß{" "}
                        <span className="text-plasma-400 underline cursor-pointer">Datenschutzerklärung</span> zu. *
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="btn-plasma w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {state === "loading" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Wird gesendet …
                      </>
                    ) : (
                      "Angebot anfordern →"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
