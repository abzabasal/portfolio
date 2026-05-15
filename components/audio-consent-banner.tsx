"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, X } from "lucide-react";
import { useAudio } from "./audio-provider";

/**
 * First-visit prompt asking the user whether to enable the background
 * score. Once dismissed or enabled, never shown again (state lives in
 * localStorage via AudioProvider).
 */
export function AudioConsentBanner() {
  const { state, enable, dismissPrompt } = useAudio();
  const [mounted, setMounted] = useState(false);

  // Avoid SSR/hydration mismatch — the banner depends on the
  // hydration-resolved state from AudioProvider's useEffect.
  useEffect(() => {
    setMounted(true);
  }, []);

  const show = mounted && state === "unprompted";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Background music preference"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-40 w-[min(360px,calc(100vw-2rem))] bg-noir-surface-1 border border-noir-line-strong p-5 shadow-noir-lift"
        >
          {/* Schematic-corner anchor markers — match the rest of the site. */}
          <span aria-hidden className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-noir-accent-bright" />
          <span aria-hidden className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-noir-accent-bright" />
          <span aria-hidden className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-noir-accent-bright" />
          <span aria-hidden className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-noir-accent-bright" />

          {/* Close (skip) — top-right */}
          <button
            type="button"
            onClick={dismissPrompt}
            aria-label="Dismiss without enabling background music"
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center
                       text-noir-text-faint hover:text-noir-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 mb-4 pr-6">
            <Music className="w-5 h-5 text-noir-accent-bright shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-noir-accent mb-1">
                [ AUDIO_STREAM // OPTIONAL ]
              </p>
              <h3 className="font-display text-base font-semibold text-noir-text mb-1.5 leading-tight">
                Background score available
              </h3>
              <p className="text-sm text-noir-text-soft leading-relaxed">
                This portfolio has a soft instrumental playlist:{" "}
                <span className="italic">The Builder's Pace</span>,{" "}
                <span className="italic">The Architect in the Frame</span>, and{" "}
                <span className="italic">Slow Mornings in Addis</span>,
                crossfading on loop. Nothing plays unless you enable it. You
                can pause anytime from the nav.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={enable}
              className="flex-1 bg-noir-cta text-noir-cta-fg px-4 py-2.5
                         font-display text-[12px] font-bold tracking-[0.1em] uppercase
                         transition-[background,color,transform] duration-200
                         hover:bg-noir-accent hover:text-white active:scale-95"
            >
              Enable Audio
            </button>
            <button
              type="button"
              onClick={dismissPrompt}
              className="px-4 py-2.5 border border-noir-outline text-noir-text-soft
                         font-display text-[12px] font-bold tracking-[0.1em] uppercase
                         transition-colors duration-200
                         hover:border-noir-accent hover:text-noir-accent"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
