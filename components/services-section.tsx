"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Cog,
  Plus,
  Terminal,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cta: string;
}

const services: Service[] = [
  {
    id: "0xFS_01",
    title: "Full-Stack Development",
    description:
      "Building end-to-end web products with React / Next.js front-ends and Go / Node services that hold up under real-world load.",
    tags: ["Frontend", "Backend", "Performance"],
    cta: "Execute Service",
  },
  {
    id: "0xSA_02",
    title: "System Architecture",
    description:
      "Designing distributed systems, event-driven pipelines, and database schemas that survive scale spikes and stay easy to reason about.",
    tags: ["Scalability", "Databases", "APIs"],
    cta: "Design Blueprint",
  },
  {
    id: "0xDO_03",
    title: "DevOps & Automation",
    description:
      "Streamlining delivery with CI/CD pipelines, infrastructure-as-code, container orchestration, and observable cloud architectures.",
    tags: ["Cloud", "Docker", "CI/CD"],
    cta: "Deploy Stack",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container max-w-container-max relative z-10 px-6">
        <SectionHeader />

        {/* Bento grid: 12-col on desktop, single col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
          <FullStackModule service={services[0]} />
          <ArchitectureModule service={services[1]} />
          <DevOpsModule service={services[2]} />
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="border-l-2 border-noir-accent pl-6 max-w-3xl"
    >
      <div className="font-mono text-[14px] text-noir-accent mb-3">
        [ SECTION_01 // EXPERTISE ]
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-noir-text uppercase leading-[1.1] mb-3">
        Services &amp; Solutions
      </h2>
      <p className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-noir-accent uppercase mb-6">
        Technical Expertise For Modern Products
      </p>

      {/* Step-loader calibration indicator */}
      <div className="flex items-center gap-3">
        <div className="flex gap-[2px]">
          <span className="w-1 h-3 bg-noir-accent-bright" />
          <span className="w-1 h-3 bg-noir-accent-bright" />
          <span className="w-1 h-3 bg-noir-accent-bright" />
          <span className="w-1 h-3 bg-noir-accent-bright" />
          <span className="w-1 h-3 bg-noir-line-strong" />
        </div>
        <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-noir-text-faint">
          System Calibration: Optimal
        </span>
      </div>
    </motion.header>
  );
}

/** Reusable card shell with blueprint corner markers + hover-cyan border. */
function BlueprintCard({
  className = "",
  index = 0,
  children,
}: {
  className?: string;
  index?: number;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.24),
        ease: "easeOut",
      }}
      className={`group relative bg-noir-surface-1 border border-noir-line-strong p-6 md:p-7
                  transition-colors duration-300 hover:border-noir-accent-bright ${className}`}
    >
      {/* 4 schematic-corner anchor markers (1px L-brackets, 8px each) */}
      <span aria-hidden className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      {children}
    </motion.section>
  );
}

function ModuleHeader({
  id,
  title,
  status = "STABLE",
  version,
  icon,
}: {
  id: string;
  title: string;
  status?: string;
  version?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex items-start gap-4">
        {icon}
        <div>
          <div className="font-mono text-[12px] font-bold tracking-[0.1em] uppercase text-noir-text-faint mb-1">
            MODULE_ID: {id}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] text-noir-text">
            {title}
          </h3>
        </div>
      </div>
      {(version || status) && (
        <div className="flex flex-col items-end font-mono text-[13px] shrink-0">
          {status && <span className="text-noir-accent">[ {status} ]</span>}
          {version && <span className="text-noir-text-faint">{version}</span>}
        </div>
      )}
    </div>
  );
}

function TagPills({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-[11px] tracking-[0.04em] bg-noir-surface-2 border border-noir-line text-noir-text-soft px-2 py-1"
        >
          [ {tag} ]
        </span>
      ))}
    </div>
  );
}

/** col-span-8 — large left card with terminal preview pane on the right. */
function FullStackModule({ service }: { service: Service }) {
  const { id, title, description, tags, cta } = service;
  return (
    <BlueprintCard className="md:col-span-8 flex flex-col" index={0}>
      <ModuleHeader id={id} title={title} version="v1.0.4" />

      <div className="grid md:grid-cols-2 gap-6 flex-1">
        <div className="space-y-4">
          <p className="text-noir-text-soft leading-relaxed">{description}</p>
          <ul className="space-y-2 pt-1">
            {tags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-2 font-mono text-[13px] text-noir-text-soft"
              >
                <CheckCircle2
                  className="w-4 h-4 text-noir-accent-bright shrink-0"
                  strokeWidth={2}
                />
                {tag}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <TagPills tags={tags} />
          </div>
        </div>

        {/* Decorative terminal preview pane */}
        <div
          aria-hidden
          className="relative min-h-[180px] md:min-h-full bg-noir-surface-2 border border-noir-line flex items-center justify-center overflow-hidden"
        >
          {/* Dotted radial-gradient backdrop */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(hsl(var(--noir-accent)) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-2">
            <Terminal
              className="w-12 h-12 text-noir-accent-bright"
              strokeWidth={1.5}
            />
            <span className="font-mono text-[12px] tracking-[0.05em] text-noir-text-faint">
              BUILD_SUCCESSFUL
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 border border-noir-line-strong px-4 py-2
                     font-display text-[12px] font-bold tracking-[0.1em] uppercase text-noir-text
                     transition-colors duration-200
                     hover:bg-noir-accent-bright hover:text-noir-accent-deep hover:border-noir-accent-bright"
          aria-label={`${cta} — open contact`}
        >
          <Plus className="w-3.5 h-3.5" />
          View Specs
        </a>
      </div>
    </BlueprintCard>
  );
}

/** col-span-4 — narrow right card with technical schematic visualization. */
function ArchitectureModule({ service }: { service: Service }) {
  const { id, title, description, tags, cta } = service;
  return (
    <BlueprintCard className="md:col-span-4 flex flex-col" index={1}>
      <ModuleHeader id={id} title={title} />

      <div className="mb-5 font-mono text-[13px]">
        <span className="text-noir-accent">[ STABLE ]</span>
        <span className="text-noir-text-faint ml-2">v2.1.0</span>
      </div>

      <p className="text-noir-text-soft leading-relaxed mb-5">{description}</p>

      <div className="mb-5">
        <TagPills tags={tags} />
      </div>

      {/* Technical Schematic mini-chart */}
      <div className="mt-auto p-4 bg-noir-surface-2 border-l-4 border-noir-accent">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-noir-text-faint mb-2">
          Technical Schematic
        </div>
        <div className="h-20 w-full flex items-end gap-1">
          <div className="w-full bg-noir-accent/20 h-1/2" />
          <div className="w-full bg-noir-accent/40 h-3/4" />
          <div className="w-full bg-noir-accent h-full" />
          <div className="w-full bg-noir-accent/60 h-2/3" />
        </div>
      </div>

      <a
        href="#contact"
        className="mt-5 w-full flex items-center justify-center gap-2 border border-noir-line-strong px-4 py-3
                   font-display text-[12px] font-bold tracking-[0.1em] uppercase text-noir-text
                   transition-colors duration-200
                   hover:bg-noir-accent-bright hover:text-noir-accent-deep hover:border-noir-accent-bright"
        aria-label={`${cta} — open contact`}
      >
        <ArrowRight className="w-3.5 h-3.5" />
        Architecture Logs
      </a>
    </BlueprintCard>
  );
}

/** col-span-12 — wide bottom card with horizontal layout + status metrics. */
function DevOpsModule({ service }: { service: Service }) {
  const { id, title, description, tags, cta } = service;
  return (
    <BlueprintCard className="md:col-span-12" index={2}>
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1">
          <ModuleHeader
            id={id}
            title={title}
            icon={
              <Cog
                className="w-9 h-9 text-noir-accent-bright shrink-0 mt-1"
                strokeWidth={1.5}
              />
            }
          />
          <p className="text-noir-text-soft leading-relaxed max-w-2xl mb-5">
            {description}
          </p>
          <TagPills tags={tags} />
        </div>

        {/* Status metrics column */}
        <div className="flex flex-col gap-2 w-full lg:w-72 shrink-0 self-center">
          <MetricRow label="Pipeline State" value="[ RUNNING ]" accent />
          <MetricRow label="Uptime" value="99.998%" />
          <MetricRow label="Build Rev" value="v1.0.4-STABLE" />
        </div>

        <div className="flex items-center self-stretch lg:self-center">
          <a
            href="#contact"
            className="w-full lg:w-auto flex items-center justify-center gap-2 bg-noir-accent text-white
                       px-6 py-3 font-display text-[12px] font-bold tracking-[0.1em] uppercase
                       transition-colors duration-200
                       hover:bg-noir-accent-bright hover:text-noir-accent-deep"
            aria-label={`${cta} — open contact`}
          >
            Init Deploy
          </a>
        </div>
      </div>
    </BlueprintCard>
  );
}

function MetricRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between font-mono text-[13px] border-b border-noir-line pb-1.5">
      <span className="text-noir-text-faint uppercase tracking-[0.05em]">
        {label}:
      </span>
      <span className={accent ? "text-noir-accent" : "text-noir-text"}>
        {value}
      </span>
    </div>
  );
}
