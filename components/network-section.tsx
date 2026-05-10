"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  Briefcase,
  Github,
  Linkedin,
  MessageSquare,
  Terminal,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { SiLeetcode, SiUpwork, SiWhatsapp } from "react-icons/si";

type AnyIcon = LucideIcon | IconType | ComponentType<{ className?: string }>;

interface NetworkLink {
  service: string;
  label: string;
  description: string;
  cta: string;
  href: string;
  Icon: AnyIcon;
  BackgroundIcon: AnyIcon;
}

const networkLinks: NetworkLink[] = [
  {
    service: "GitHub",
    label: "Contributions",
    description:
      "Open-source contributions, side projects, and the source for everything I ship.",
    cta: "View Repos",
    href: "https://github.com/abzaek",
    Icon: Github,
    BackgroundIcon: Terminal,
  },
  {
    service: "LinkedIn",
    label: "Network",
    description:
      "Career history, recommendations, and connections with engineering teams.",
    cta: "Connect",
    href: "https://linkedin.com/in/abzaek",
    Icon: Linkedin,
    BackgroundIcon: Users,
  },
  {
    service: "Upwork",
    label: "Consultancy",
    description:
      "Available for freelance engagements — full-stack builds, performance audits, and platform work.",
    cta: "Hire Direct",
    href: "https://www.upwork.com/freelancers/abzaek",
    Icon: SiUpwork,
    BackgroundIcon: Briefcase,
  },
  {
    service: "LeetCode",
    label: "Algorithms",
    description:
      "Algorithm practice and steady progress against hard problems.",
    cta: "View Profile",
    href: "https://leetcode.com/abzaek",
    Icon: SiLeetcode,
    BackgroundIcon: Braces,
  },
  {
    service: "WhatsApp",
    label: "Direct Line",
    description:
      "Fastest way to reach me directly — message anytime, day or night.",
    cta: "Open Chat",
    href: "https://wa.me/251985045300",
    Icon: SiWhatsapp,
    BackgroundIcon: MessageSquare,
  },
];

export function NetworkSection() {
  return (
    <section
      id="network"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[500px] h-[500px] bg-noir-accent/[0.05] blur-[120px] rounded-full -z-0"
      />

      <div className="container max-w-container-max relative z-10 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-noir-accent/60" />
            <span className="noir-label text-noir-accent">
              Find Me Out There
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-text">
            Network &amp; Contributions
          </h2>
          <p className="mt-4 text-noir-text-mute leading-relaxed">
            Where I show my work, sharpen my craft, and stay reachable.
            Pick the platform that fits.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {networkLinks.map((link, i) => (
            <NetworkCard key={link.service} link={link} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NetworkCard({ link, index }: { link: NetworkLink; index: number }) {
  const { service, label, description, cta, href, Icon, BackgroundIcon } = link;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.3),
        ease: "easeOut",
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl
                 bg-noir-surface-dim border border-noir-line p-6 min-h-[280px]
                 transition-[border-color,transform,box-shadow] duration-300
                 hover:border-noir-accent hover:-translate-y-1 hover:shadow-noir-glow
                 focus:outline-none focus-visible:border-noir-accent focus-visible:shadow-noir-glow"
      aria-label={`${service} — ${label}`}
    >
      {/* Faded oversized background icon, brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-3 text-noir-accent
                   opacity-[0.06] group-hover:opacity-[0.55]
                   transition-opacity duration-500"
      >
        <BackgroundIcon className="w-28 h-28" />
      </div>

      {/* Top row: brand icon + name + label */}
      <div className="relative">
        <Icon className="w-9 h-9 text-noir-accent" />
        <h3 className="font-display text-xl font-semibold text-noir-text mt-5 mb-1">
          {service}
        </h3>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-noir-text-faint">
          {label}
        </p>
      </div>

      {/* Description */}
      <p className="relative text-sm text-noir-text-mute leading-relaxed mt-6 mb-8 flex-1">
        {description}
      </p>

      {/* CTA — gap grows on hover */}
      <div className="relative flex items-center gap-2 group-hover:gap-4 transition-[gap] duration-300">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-noir-accent">
          {cta}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-noir-accent" />
      </div>
    </motion.a>
  );
}
