"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Sparkles } from "lucide-react";

const SPLASH_SESSION_KEY = "doomsday_initial_splash_shown";

interface InitialSplashLoaderProps {
  /** Minimum display duration in ms on first visit */
  durationMs?: number;
}

export function InitialSplashLoader({
  durationMs = 1500,
}: InitialSplashLoaderProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown = window.sessionStorage.getItem(SPLASH_SESSION_KEY);
      if (alreadyShown) return;

      window.sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (e.g. strict privacy mode) — still show once cleanly
    }

    const showTimer = window.setTimeout(() => {
      setVisible(true);
    }, 0);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, durationMs);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [durationMs]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="initial-splash-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          aria-live="polite"
          aria-label="Loading Doomsday Ready"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#050507] px-6 text-center"
        >
          {/* Ambient radial lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-red-600/25 via-rose-500/15 to-amber-500/15 blur-[120px]"
          />

          {/* Center emblem + animated rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.1, 0.55] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-2xl border border-red-500/40"
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-500/25 via-rose-500/10 to-amber-500/10 text-red-400 shadow-[0_0_35px_rgba(239,68,68,0.35)]">
                <Film className="h-8 w-8" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-red-300 mb-3">
              <Sparkles className="h-3 w-3 text-red-400" />
              Watch-Party Hub
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Doomsday{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                Ready
              </span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-zinc-400">
              Preparing your lineup, rewatch sequences &amp; group bookings…
            </p>

            {/* Smooth animated loading bar */}
            <div className="mt-7 h-1 w-48 sm:w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-red-500 to-amber-400"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
