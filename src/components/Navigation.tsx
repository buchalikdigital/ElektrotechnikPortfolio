"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Projekte", href: "#projekte" },
  { label: "Team", href: "#team" },
  { label: "Bewertungen", href: "#bewertungen" },
  { label: "Kontakt", href: "#kontakt" },
];

function AmperaLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* A shape with lightning bolt */}
      <path
        d="M18 3L32 30H22.5L20 24H16L13.5 30H4L18 3Z"
        fill="url(#logoGrad)"
        filter="url(#logoGlow)"
        opacity="0.15"
      />
      {/* Outer A strokes */}
      <path
        d="M18 4L31 29H23L20.5 23H15.5L13 29H5L18 4Z"
        stroke="url(#logoGrad)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#logoGlow)"
      />
      {/* Crossbar lightning bolt */}
      <path
        d="M21 19.5H15L16.5 16H19.5L18 13L22 19.5H19L20.5 22.5H15.5"
        stroke="#38BDF8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-dark py-3" : "py-5"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="group-hover:scale-110 transition-transform duration-300">
              <AmperaLogo />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-rajdhani font-700 text-xl tracking-[0.15em] text-plasma-gradient"
                style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
              >
                AMPERA
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
                GmbH · Frankfurt
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 relative group"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-plasma-600 to-arc-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLink("#kontakt")}
              className="hidden lg:flex btn-plasma px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Angebot anfordern
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
              aria-label="Menü"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[var(--text-primary)] block rounded-full"
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-6 h-0.5 bg-[var(--text-primary)] block rounded-full"
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-[var(--text-primary)] block rounded-full"
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass-dark flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-8 pt-20">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  className="font-rajdhani text-4xl font-bold tracking-wider text-[var(--text-primary)] hover:text-plasma-gradient transition-all"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleLink("#kontakt")}
                className="btn-plasma mt-4 px-8 py-3.5 rounded-full text-lg font-semibold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.42, duration: 0.35 }}
              >
                Angebot anfordern
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
