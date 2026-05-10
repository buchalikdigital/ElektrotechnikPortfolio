"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const accepted = localStorage.getItem("ampera-cookies");
      if (!accepted) setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem("ampera-cookies", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("ampera-cookies", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          <div
            className="max-w-3xl mx-auto rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background: "rgba(19,13,34,0.95)",
              border: "1px solid rgba(124,58,237,0.3)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 -4px 40px rgba(124,58,237,0.15)",
            }}
          >
            <div className="flex-1">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                🍪 Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.
                Durch die Nutzung stimmen Sie unserer{" "}
                <span className="text-plasma-400 underline cursor-pointer">Datenschutzerklärung</span> zu.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={decline}
                className="btn-outline px-4 py-2 rounded-lg text-xs font-medium"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Ablehnen
              </button>
              <button
                onClick={accept}
                className="btn-plasma px-4 py-2 rounded-lg text-xs font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
