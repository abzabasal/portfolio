"use client";

import { useEffect, useState } from "react";
import { Music, Pause } from "lucide-react";
import { useAudio } from "./audio-provider";

/**
 * Play/pause toggle for the background score. Sits in the FloatingNav
 * next to the theme toggle.
 *
 * Hydration-safe: renders an inert placeholder until mounted so the
 * server render and the first client render match.
 */
export function AudioToggle() {
  const { state, enable, disable } = useAudio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPlaying = mounted && state === "playing";
  const label = mounted
    ? isPlaying
      ? "Pause background music"
      : "Play background music"
    : "Toggle background music";

  const handleClick = () => {
    if (!mounted) return;
    if (isPlaying) {
      disable();
    } else {
      enable();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isPlaying}
      title={label}
      className="flex items-center justify-center w-9 h-9
                 text-noir-text-soft border border-noir-line
                 transition-colors duration-200
                 hover:border-noir-accent hover:text-noir-accent
                 focus:outline-none focus-visible:border-noir-accent"
    >
      {mounted ? (
        isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Music className="h-4 w-4" />
        )
      ) : (
        // Placeholder so dimensions match server render
        <span className="block h-4 w-4" />
      )}
    </button>
  );
}
