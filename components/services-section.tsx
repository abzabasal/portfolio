"use client";

import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Network, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cta: string;
  Icon: LucideIcon;
}

const services: Service[] = [
  {
    id: "FSD-01",
    title: "Full-Stack Development",
    description:
      "Building end-to-end web products with React / Next.js front-ends and Go / Node services that hold up under real-world load.",
    tags: ["Frontend", "Backend", "Performance"],
    cta: "Execute Service",
    Icon: Terminal,
  },
  {
    id: "ARC-02",
    title: "System Architecture",
    description:
      "Designing distributed systems, event-driven pipelines, and database schemas that survive scale spikes and stay easy to reason about.",
    tags: ["Scalability", "Databases", "APIs"],
    cta: "Design Blueprint",
    Icon: Network,
  },
  {
    id: "OPS-03",
    title: "DevOps & Automation",
    description:
      "Streamlining delivery with CI/CD pipelines, infrastructure-as-code, container orchestration, and observable cloud architectures.",
    tags: ["Cloud", "Docker", "CI/CD"],
    cta: "Deploy Stack",
    Icon: GitBranch,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
    >

      <div className="container max-w-container-max relative z-10 px-6">
        {/* Section header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <span className="inline-block px-3 py-1.5 mb-6 rounded bg-noir-surface-3 border border-noir-line font-mono text-[12px] tracking-[0.04em] text-noir-text-soft">
            [ status: operational // active_services: 03 ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-text mb-3 leading-[1.1]">
            Services &amp; Solutions
          </h2>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-noir-text-faint">
            Technical expertise for modern products
          </p>
        </motion.header>

        {/* Service modules grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Asymmetric Architecture Audit feature */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0"
        >
          <ArchitectureAuditPane />
          <TerminalPane />
        </motion.section>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { id, title, description, tags, cta, Icon } = service;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.24),
        ease: "easeOut",
      }}
      className="group flex flex-col rounded bg-noir-surface-1 border border-noir-line p-7
                 transition-[border-color,box-shadow] duration-300
                 hover:border-noir-accent hover:shadow-noir-glow"
    >
      {/* Top row: icon + ID */}
      <div className="flex items-start justify-between mb-10">
        <Icon className="w-9 h-9 text-noir-accent" strokeWidth={1.5} />
        <span className="font-mono text-[11px] tracking-[0.04em] text-noir-text-faint">
          [ ID: {id} ]
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-xl font-semibold text-noir-text mb-3 group-hover:text-noir-accent transition-colors">
          {title}
        </h3>
        <p className="text-[15px] text-noir-text-mute leading-relaxed mb-6">
          {description}
        </p>

        {/* Bracket-style tag pills */}
        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.04em]
                         bg-noir-surface-2 border border-noir-line text-noir-text-soft
                         px-2 py-1 rounded"
            >
              [ {tag} ]
            </span>
          ))}
        </div>
      </div>

      {/* Bottom action strip */}
      <div className="flex items-center justify-between pt-5 border-t border-noir-line">
        <a
          href="#contact"
          className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-noir-accent
                     focus:outline-none focus-visible:underline"
          aria-label={`${cta} — open contact`}
        >
          {cta}
        </a>
        <ArrowRight
          className="w-4 h-4 text-noir-text-mute transition-[transform,color] duration-200
                     group-hover:translate-x-1 group-hover:text-noir-accent"
        />
      </div>
    </motion.article>
  );
}

/**
 * Always-dark "console" feature card that stays visually distinct in both
 * themes. Hardcoded hex values intentional — this is the "terminal /
 * IDE-output" component of the page and must read as a console regardless
 * of theme.
 */
function ArchitectureAuditPane() {
  return (
    <article
      className="relative md:col-span-7 p-7 md:p-10 overflow-hidden
                 border-l-4 border-noir-accent
                 bg-[#0a1218] text-[#e2e8eb] rounded-r"
    >
      {/* Faded oversized terminal icon, top-right */}
      <div
        aria-hidden
        className="absolute top-3 right-3 opacity-[0.08] pointer-events-none"
      >
        <Terminal className="w-32 h-32" strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="font-mono text-sm text-[#9cf0ff] mb-6">
          &gt; tail -f service_logs
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
          Architecture Audit &amp; Optimization
        </h3>
        <p className="text-[#bac9cc] leading-relaxed max-w-xl mb-7">
          Unlocking system performance through rigorous code analysis and
          structural refinement. I identify bottlenecks in your data layer
          and tune the underlying infrastructure for maximum throughput.
        </p>
        <div className="grid grid-cols-2 gap-3 font-mono text-[13px] text-[#9cf0ff]">
          <div>[ page_loads: -30% ]</div>
          <div>[ api_size: -25% ]</div>
          <div>[ uptime_target: 99.9% ]</div>
          <div>[ scalability: aws-native ]</div>
        </div>
      </div>
    </article>
  );
}

function TerminalPane() {
  return (
    <aside
      className="md:col-span-5 p-6 md:p-7
                 bg-[#0a1218] border-l border-[#1d2a33] rounded-l
                 font-mono text-[12px] leading-[1.7] overflow-hidden"
      aria-hidden
    >
      <Line prompt="$" cmd="kubectl rollout status deploy/api" />
      <Line text="deployment &quot;api&quot; successfully rolled out" tone="muted" />
      <Spacer />
      <Line prompt="$" cmd="aws lambda invoke worker --payload '...'" />
      <Line text='{ "StatusCode": 200, "Duration": 84 }' tone="accent" />
      <Spacer />
      <Line prompt="$" cmd="go test -bench=. ./..." />
      <Line text="PASS  10.234s  workers/orchestrator" tone="muted" />
      <Spacer />
      <Line prompt="$" cmd={<span className="text-[#9cf0ff] animate-pulse">▮</span>} />
    </aside>
  );
}

function Line({
  prompt,
  cmd,
  text,
  tone = "default",
}: {
  prompt?: string;
  cmd?: React.ReactNode;
  text?: string;
  tone?: "default" | "muted" | "accent";
}) {
  const toneClass =
    tone === "accent"
      ? "text-[#9cf0ff]"
      : tone === "muted"
      ? "text-[#bac9cc]"
      : "text-[#e2e8eb]";
  return (
    <div className={toneClass}>
      {prompt && <span className="text-[#5b6d76] mr-2">{prompt}</span>}
      {cmd ?? text}
    </div>
  );
}

function Spacer() {
  return <div className="h-3" aria-hidden />;
}
