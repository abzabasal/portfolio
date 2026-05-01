"use client";

import { motion } from "framer-motion";

export function CreativeHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-noir-bg overflow-hidden pt-24 pb-20 px-6"
    >
      {/* Ambient cyan glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-noir-accent/[0.06] blur-[120px] rounded-full -z-0"
      />
      {/* Subtle grid + noise */}
      <div
        aria-hidden
        className="absolute inset-0 grid-overlay opacity-[0.35] pointer-events-none -z-0"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-noise"
      />

      <div className="container max-w-container-max relative z-10 mx-auto">
        <div className="max-w-3xl">
          {/* Eyebrow row: short cyan rule + uppercase code-sm label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-px bg-noir-accent" />
            <span className="font-mono text-[14px] font-medium tracking-[0.05em] uppercase text-noir-accent">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Headline — italic cyan span mid-phrase */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] text-noir-text mb-8 text-balance"
          >
            Building fast, scalable products through{" "}
            <span className="text-noir-accent italic font-semibold">
              rigorous code
            </span>{" "}
            and clean architecture.
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-noir-text-soft leading-relaxed max-w-2xl mb-10"
          >
            Full-stack engineer specializing in high-performance web systems —
            Next.js / React on the front, Go / TypeScript / Python services on
            the back. I deliver measurable wins like 30% faster page loads, 25%
            leaner API responses, and production-ready AI features.
          </motion.p>

          {/* CTAs — sharp rounded-sm, uppercase label-caps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-4 rounded-sm
                         bg-noir-accent-soft text-black
                         font-mono font-bold uppercase tracking-[0.1em] text-[12px]
                         transition-transform duration-200 hover:scale-95"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-sm
                         border border-noir-outline text-noir-text
                         font-mono font-bold uppercase tracking-[0.1em] text-[12px]
                         transition-colors duration-200
                         hover:border-noir-accent hover:text-noir-accent"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Identity strip — small introduction line below CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-14 flex items-center gap-3 text-noir-text-faint"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              Abdulazez Zeinu
            </span>
            <span className="h-px w-8 bg-noir-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              Full-Stack Engineer
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="noir-label">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-noir-accent/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
