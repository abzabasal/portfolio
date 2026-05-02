"use client";

import { motion } from "framer-motion";
import { GitBranch, Network, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  tags: string[];
  Icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Full-Stack Development",
    description:
      "Building end-to-end web products with React / Next.js front-ends and Go / Node services that hold up under real-world load.",
    tags: ["Frontend", "Backend", "Performance"],
    Icon: Terminal,
  },
  {
    title: "System Architecture",
    description:
      "Designing distributed systems, event-driven pipelines, and database schemas that survive scale spikes and stay easy to reason about.",
    tags: ["Scalability", "Databases", "APIs"],
    Icon: Network,
  },
  {
    title: "DevOps & Automation",
    description:
      "Streamlining delivery with CI/CD pipelines, infrastructure-as-code, container orchestration, and observable cloud architectures.",
    tags: ["Cloud", "Docker", "CI/CD"],
    Icon: GitBranch,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-noir-bg overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-noise"
      />

      <div className="container max-w-container-max relative z-10 px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-noir-accent/60" />
            <span className="noir-label text-noir-accent">
              What I Build
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-text mb-3">
            Services &amp; Solutions
          </h2>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-noir-text-faint">
            Technical expertise for modern products
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { title, description, tags, Icon } = service;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.24), ease: "easeOut" }}
      className="group relative flex flex-col rounded-xl bg-noir-surface-dim border border-noir-line p-8
                 transition-[border-color,transform,box-shadow] duration-300
                 hover:border-noir-accent hover:-translate-y-1 hover:shadow-noir-glow"
    >
      {/* Icon */}
      <div className="text-noir-accent mb-10">
        <Icon className="w-9 h-9" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-noir-text mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-noir-text-mute leading-relaxed mb-6 flex-1">
        {description}
      </p>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] font-medium uppercase tracking-[0.1em]
                       border border-noir-line px-2 py-1 rounded
                       text-noir-text-faint group-hover:text-noir-text-soft transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
