"use client";

const footerLinks = {
  navigation: [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Über uns", href: "#ueber-uns" },
    { label: "Projekte", href: "#projekte" },
    { label: "Team", href: "#team" },
    { label: "Bewertungen", href: "#bewertungen" },
    { label: "Kontakt", href: "#kontakt" },
  ],
  services: [
    "Elektroinstallation",
    "Photovoltaik & Speicher",
    "Smart Home / KNX",
    "Blitzschutz & Erdung",
    "Industrie-Elektrik",
    "E-Check",
  ],
  legal: [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "AGB", href: "#" },
  ],
};

function AmperaLogoFull() {
  return (
    <div className="flex items-center gap-3">
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <path d="M18 4L31 29H23L20.5 23H15.5L13 29H5L18 4Z" stroke="url(#footerGrad)" strokeWidth="1.5" fill="rgba(124,58,237,0.1)" />
        <path d="M21 19.5H15L16.5 16H19.5L18 13L22 19.5H19L20.5 22.5H15.5" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <div>
        <div className="font-rajdhani font-bold text-lg tracking-[0.15em] text-plasma-gradient" style={{ fontFamily: "var(--font-rajdhani)" }}>
          AMPERA
        </div>
        <div className="font-mono text-[8px] tracking-[0.2em] text-[var(--text-muted)] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
          GmbH · Frankfurt
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-void-950 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <AmperaLogoFull />
            <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Ihr VDE-zertifizierter Meisterbetrieb für Elektrotechnik in Frankfurt und der Rhein-Main-Region. Seit 1998.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              {[
                { label: "Facebook", letter: "F", href: "#" },
                { label: "Instagram", letter: "I", href: "#" },
                { label: "LinkedIn", letter: "in", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-muted)] hover:border-plasma-600/50 hover:text-plasma-400 transition-colors duration-200"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                >
                  {s.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-5" style={{ fontFamily: "var(--font-inter)" }}>
              Navigation
            </div>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-xs text-[var(--text-muted)] hover:text-plasma-400 transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-5" style={{ fontFamily: "var(--font-inter)" }}>
              Leistungen
            </div>
            <ul className="space-y-2.5">
              {footerLinks.services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#leistungen")}
                    className="text-xs text-[var(--text-muted)] hover:text-plasma-400 transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-5" style={{ fontFamily: "var(--font-inter)" }}>
              Kontakt
            </div>
            <ul className="space-y-3">
              {[
                { icon: "📞", val: "+49 69 1234 5678", href: "tel:+4969123456789" },
                { icon: "✉", val: "info@ampera-gmbh.de", href: "mailto:info@ampera-gmbh.de" },
                { icon: "📍", val: "Mainzer Landstr. 42, 60325 Frankfurt", href: "#" },
              ].map((c) => (
                <li key={c.val}>
                  <a
                    href={c.href}
                    className="flex items-start gap-2 text-xs text-[var(--text-muted)] hover:text-plasma-400 transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="mt-0.5">{c.icon}</span>
                    <span>{c.val}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-[var(--text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} AMPERA GmbH · Alle Rechte vorbehalten
          </span>
          <div className="flex gap-5">
            {footerLinks.legal.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] text-[var(--text-muted)] hover:text-plasma-400 transition-colors duration-200"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
