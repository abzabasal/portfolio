"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Background-music playlist with crossfade between tracks.
 *
 * Architecture: a classic two-deck DJ setup. We keep two <audio>
 * elements alive at all times (deck A and deck B). One is always the
 * "active" deck (audible). Near the end of the active track we start
 * the inactive deck on the NEXT track and run a linear volume fade
 * over CROSSFADE_MS so the transition is seamless.
 *
 * State machine (persisted as localStorage `bgm`):
 *   unprompted → first visit, consent banner appears.
 *   playing    → audio is on.
 *   paused     → user explicitly turned it off, OR autoplay was blocked.
 */
export type AudioState = "unprompted" | "playing" | "paused";

interface AudioContextValue {
  state: AudioState;
  /** Start / resume playback. Must be called from a user-initiated event. */
  enable: () => void;
  /** Pause playback. Persists "off". */
  disable: () => void;
  /** Dismiss the consent banner without enabling audio. */
  dismissPrompt: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

const TRACKS = [
  "/the-builders-pace.mp3",
  "/the-architect-in-the-frame.mp3",
  "/slow-mornings-in-addis.mp3",
] as const;

const BGM_KEY = "bgm";
const VOLUME = 0.35;
const CROSSFADE_MS = 3000; // length of the linear volume fade
const MIN_PLAY_SEC = 10; // refuse to crossfade in the first N seconds of a track

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // Two decks — one audible, one queued for crossfade.
  const deckARef = useRef<HTMLAudioElement | null>(null);
  const deckBRef = useRef<HTMLAudioElement | null>(null);

  // Which deck is currently the audible / "active" one.
  const activeIsARef = useRef(true);
  // Index into TRACKS currently playing on the active deck.
  const trackIdxRef = useRef(0);
  // True while a crossfade animation is mid-flight.
  const crossfadingRef = useRef(false);
  // rAF id for the running crossfade, so we can cancel it on pause.
  const fadeRafRef = useRef<number | null>(null);

  const [state, setState] = useState<AudioState>("unprompted");

  const getActive = useCallback(
    (): HTMLAudioElement | null =>
      activeIsARef.current ? deckARef.current : deckBRef.current,
    [],
  );
  const getInactive = useCallback(
    (): HTMLAudioElement | null =>
      activeIsARef.current ? deckBRef.current : deckARef.current,
    [],
  );

  /** Cancel any in-flight crossfade and restore deck volumes. */
  const cancelFade = useCallback(() => {
    if (fadeRafRef.current != null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
    crossfadingRef.current = false;
  }, []);

  /** Begin a CROSSFADE_MS linear fade from active deck → inactive deck on next track. */
  const startCrossfade = useCallback(() => {
    if (crossfadingRef.current) return;

    const active = getActive();
    const inactive = getInactive();
    if (!active || !inactive) return;

    const nextIdx = (trackIdxRef.current + 1) % TRACKS.length;
    inactive.src = TRACKS[nextIdx];
    inactive.currentTime = 0;
    inactive.volume = 0;

    inactive
      .play()
      .then(() => {
        crossfadingRef.current = true;
        const startTime = performance.now();
        const tick = () => {
          const elapsed = performance.now() - startTime;
          const t = Math.min(1, elapsed / CROSSFADE_MS);
          // Linear crossfade. Equal-power could be added later if needed.
          active.volume = VOLUME * (1 - t);
          inactive.volume = VOLUME * t;

          if (t < 1) {
            fadeRafRef.current = requestAnimationFrame(tick);
          } else {
            // Crossfade complete — swap decks.
            active.pause();
            active.currentTime = 0;
            active.volume = VOLUME; // reset for next reuse
            activeIsARef.current = !activeIsARef.current;
            trackIdxRef.current = nextIdx;
            crossfadingRef.current = false;
            fadeRafRef.current = null;
          }
        };
        fadeRafRef.current = requestAnimationFrame(tick);
      })
      .catch(() => {
        // If play() rejects, bail on this crossfade.
        crossfadingRef.current = false;
      });
  }, [getActive, getInactive]);

  /** Attach playback-progress listeners on both decks. */
  useEffect(() => {
    const a = deckARef.current;
    const b = deckBRef.current;
    if (!a || !b) return;

    const handleTimeUpdate = (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      if (audio !== getActive()) return;
      if (crossfadingRef.current) return;
      if (audio.currentTime < MIN_PLAY_SEC) return;

      const remaining = audio.duration - audio.currentTime;
      if (!Number.isFinite(remaining)) return;

      if (remaining <= CROSSFADE_MS / 1000) {
        startCrossfade();
      }
    };

    /** Safety net: if a track ends before crossfade fires (very short
     * track or browser jitter), advance to next track on the same deck. */
    const handleEnded = (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      if (audio !== getActive()) return;
      if (crossfadingRef.current) return;
      const nextIdx = (trackIdxRef.current + 1) % TRACKS.length;
      trackIdxRef.current = nextIdx;
      audio.src = TRACKS[nextIdx];
      audio.volume = VOLUME;
      audio.play().catch(() => {});
    };

    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);
    a.addEventListener("ended", handleEnded);
    b.addEventListener("ended", handleEnded);

    return () => {
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
      a.removeEventListener("ended", handleEnded);
      b.removeEventListener("ended", handleEnded);
    };
  }, [getActive, startCrossfade]);

  /** On mount: read stored preference, optionally attempt autoplay. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const deckA = deckARef.current;
    if (deckA) {
      deckA.src = TRACKS[0];
      deckA.volume = VOLUME;
    }

    const stored = window.localStorage.getItem(BGM_KEY);
    if (stored === "on" && deckA) {
      deckA
        .play()
        .then(() => setState("playing"))
        .catch(() => setState("paused"));
    } else if (stored === "off") {
      setState("paused");
    } else {
      setState("unprompted");
    }
  }, []);

  const enable = useCallback(() => {
    const active = getActive();
    if (!active) return;
    if (!active.src) active.src = TRACKS[trackIdxRef.current];
    active.volume = VOLUME;
    active
      .play()
      .then(() => {
        setState("playing");
        window.localStorage.setItem(BGM_KEY, "on");
      })
      .catch(() => {
        setState("paused");
        window.localStorage.setItem(BGM_KEY, "off");
      });
  }, [getActive]);

  const disable = useCallback(() => {
    cancelFade();
    deckARef.current?.pause();
    deckBRef.current?.pause();
    // Restore volumes so a future resume sounds normal.
    if (deckARef.current) deckARef.current.volume = VOLUME;
    if (deckBRef.current) deckBRef.current.volume = VOLUME;
    setState("paused");
    window.localStorage.setItem(BGM_KEY, "off");
  }, [cancelFade]);

  const dismissPrompt = useCallback(() => {
    setState("paused");
    window.localStorage.setItem(BGM_KEY, "off");
  }, []);

  return (
    <AudioCtx.Provider value={{ state, enable, disable, dismissPrompt }}>
      <audio ref={deckARef} preload="auto" />
      <audio ref={deckBRef} preload="auto" />
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    throw new Error("useAudio must be used inside <AudioProvider>");
  }
  return ctx;
}
