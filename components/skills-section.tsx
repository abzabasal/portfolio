"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface LanguageCard {
  id: string;
  name: string;
  tagline: string;
  description: string;
  proof: string[];
  meta: { years: string; projects: string };
}

const languages: LanguageCard[] = [
  {
    id: "0xLG_TS",
    name: "TypeScript",
    tagline: "Frontend applications and API gateways",
    description:
      "Type-safe end to end. Every user-facing surface I ship lands here, plus the gateways that sit between client and core services.",
    proof: [
      "34 modules of the Reisearch frontend",
      "Strict generics, discriminated unions",
      "Next.js 15 / React 19",
    ],
    meta: { years: "4 yrs", projects: "All UI" },
  },
  {
    id: "0xLG_GO",
    name: "Go",
    tagline: "Performance-critical pipelines",
    description:
      "Concurrent workers, low-latency services, infrastructure code. Where the system has to be fast, this is what I reach for.",
    proof: [
      "40 min to 4 min Go orchestration rebuild",
      "Deal monitor and comps scraper",
      "16 microservices behind the platform API",
    ],
    meta: { years: "3 yrs", projects: "5 systems" },
  },
  {
    id: "0xLG_PY",
    name: "Python",
    tagline: "AI / ML integration and data work",
    description:
      "Rapid prototyping, AI orchestration, data processing. The Renovation Copilot and recommendation engines run on it.",
    proof: [
      "Renovation Copilot orchestrator (FastAPI)",
      "LightFM hybrid recommender",
      "9.6M-record ingestion pipeline",
    ],
    meta: { years: "3 yrs", projects: "4 systems" },
  },
];

const TOOLING = [
  "React 19",
  "Next.js",
  "FastAPI",
  "Gin",
  "AWS Lambda",
  "DynamoDB",
  "SQS",
  "S3",
  "Cognito",
  "Docker",
  "Kubernetes",
  "OpenAI",
  "Google Gemini",
  "Pandas",
  "NumPy",
  "GitHub Actions",
  "Tailwind CSS",
  "Framer Motion",
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container max-w-container-max relative z-10 px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="border-l-2 border-noir-accent pl-6 max-w-3xl mb-12"
        >
          <div className="font-mono text-[14px] text-noir-accent mb-3">
            [ SECTION_04 // STACK_OVERVIEW ]
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-noir-text uppercase leading-[1.1] mb-3">
            Architectural Arsenal
          </h2>
          <p className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-noir-accent uppercase mb-6">
            Three Languages. One Platform.
          </p>
          <p className="text-noir-text-soft leading-relaxed max-w-2xl">
            Organized by where it sits in the system, not by trend. The right
            tool for the job, picked because it shipped, not because it was
            fashionable.
          </p>
        </motion.header>

        {/* Three primary language cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languages.map((l, i) => (
            <LanguageBlock key={l.id} card={l} index={i} />
          ))}
        </div>

        {/* Tooling strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-noir-surface-1 border border-noir-line-strong p-6 md:p-7 relative"
        >
          <BlueprintCorners />
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-noir-text">
              Supporting Stack
            </h3>
            <span className="font-mono text-[12px] tracking-[0.05em] uppercase text-noir-text-faint">
              {TOOLING.length} tools indexed
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TOOLING.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] tracking-[0.04em] bg-noir-surface-2 border border-noir-line text-noir-text-soft px-2 py-1"
              >
                [ {t} ]
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LanguageBlock({
  card,
  index,
}: {
  card: LanguageCard;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.24),
        ease: "easeOut",
      }}
      className="group relative flex flex-col bg-noir-surface-1 border border-noir-line-strong p-6 md:p-7 transition-colors duration-300 hover:border-noir-accent-bright"
    >
      <BlueprintCorners />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-noir-text-faint mb-1">
            MODULE_ID: {card.id}
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em] text-noir-text">
            {card.name}
          </h3>
        </div>
        <div className="flex flex-col items-end font-mono text-[12px] shrink-0">
          <span className="text-noir-accent">[ STABLE ]</span>
          <span className="text-noir-text-faint">{card.meta.years}</span>
        </div>
      </div>

      <p className="font-display text-base font-semibold text-noir-accent uppercase tracking-[0.02em] mb-3">
        {card.tagline}
      </p>

      <p className="text-noir-text-soft leading-relaxed mb-5">
        {card.description}
      </p>

      {/* Proof list */}
      <ul className="space-y-2 mt-auto pt-5 border-t border-noir-line">
        <li className="font-mono text-[11px] uppercase tracking-[0.08em] text-noir-text-faint mb-1">
          Field Deployments
        </li>
        {card.proof.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2 font-mono text-[12px] text-noir-text-soft"
          >
            <span className="text-noir-accent-bright mt-[1px]">▸</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function BlueprintCorners(): ReactNode {
  return (
    <>
      <span aria-hidden className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
    </>
  );
}
