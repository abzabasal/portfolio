"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import lambdaIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/64/Arch_AWS-Lambda_64.svg";
import dynamoDbIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Database/64/Arch_Amazon-DynamoDB_64.svg";
import sqsIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_App-Integration/Arch_64/Arch_Amazon-Simple-Queue-Service_64.svg";
import s3Icon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Storage/64/Arch_Amazon-S3-on-Outposts_Storage_64.svg";

interface Skill {
  name: string;
  description: string;
  icon: string;
  tags?: string[];
}

const frontend: Skill[] = [
  {
    name: "React / Next.js",
    description:
      "Modern web architecture focusing on SSR, static generation, and intuitive UI components.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    tags: ["TYPESCRIPT", "APP ROUTER"],
  },
  {
    name: "TypeScript",
    description:
      "Type-safe development end-to-end with strict generics, discriminated unions, and reliable refactors.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tags: ["STRICT", "GENERICS"],
  },
  {
    name: "Tailwind CSS",
    description:
      "Utility-first styling, design-token driven systems, and rapid component composition.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    tags: ["UTILITY", "TOKENS"],
  },
  {
    name: "Framer Motion",
    description:
      "Production-ready animations, layout transitions, and gesture-driven micro-interactions.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
    tags: ["MOTION"],
  },
  {
    name: "Three.js",
    description:
      "WebGL experiences with React Three Fiber, custom shaders, and post-processing.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    tags: ["WEBGL", "R3F"],
  },
  {
    name: "React (Core)",
    description:
      "Hooks, server components, and the rendering model — used to build interactive dashboards at scale.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tags: ["HOOKS", "RSC"],
  },
];

const backend: Skill[] = [
  {
    name: "Serverless (Lambda)",
    description: "Event-driven TS/Python services with Cognito JWT auth.",
    icon: lambdaIcon,
  },
  {
    name: "DynamoDB",
    description: "Single-table, GSI patterns, conditional writes.",
    icon: dynamoDbIcon,
  },
  {
    name: "S3 + Pre-signed URLs",
    description: "Secure asset pipelines with MIME validation.",
    icon: s3Icon,
  },
  {
    name: "SQS Pipelines",
    description: "Fan-out / fan-in queues for training and messaging.",
    icon: sqsIcon,
  },
  {
    name: "Go",
    description: "High-performance services and concurrent worker pools.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    name: "Python + LightFM",
    description: "Hybrid recommenders with geospatial scoring.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Node.js",
    description: "TS services bundled with ESBuild and serverless workflows.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "PostgreSQL",
    description: "Relational modeling and high-integrity transactional data.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
];

const dockerIcon =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg";
const githubIcon =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
const linuxIcon =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg";
const gitIcon =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
const vercelIcon =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[420px] max-w-4xl bg-noir-accent/[0.06] blur-[120px] rounded-full -z-0"
      />

      <div className="container max-w-container-max relative z-10 px-6">
        {/* Hero header */}
        <motion.header
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="noir-label text-noir-accent inline-block mb-4">
            Infrastructure &amp; Tooling
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-noir-text mb-6">
            Architectural Arsenal
          </h2>
          <p className="max-w-2xl mx-auto text-noir-text-soft leading-relaxed">
            The stack I reach for, organized by where it sits in the system.
            Built for performance, scalability, and developer experience.
          </p>
        </motion.header>

        {/* Frontend */}
        <CategoryBlock title="Frontend">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontend.map((s, i) => (
              <FeatureCard key={s.name} skill={s} index={i} />
            ))}
          </div>
        </CategoryBlock>

        {/* Backend & Core */}
        <CategoryBlock title="Backend &amp; Core">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {backend.map((s, i) => (
              <CompactCard key={s.name} skill={s} index={i} />
            ))}
          </div>
        </CategoryBlock>

        {/* DevOps & Tooling */}
        <CategoryBlock title="DevOps &amp; Tooling" last>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[220px]">
            {/* Docker hero (col-span-2) */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-2 md:row-span-2 group flex flex-col justify-between p-7 rounded-xl bg-noir-surface-1 border border-noir-line hover:border-noir-accent/40 transition-colors duration-200"
            >
              <div>
                <div className="flex items-start justify-between">
                  <IconTile src={dockerIcon} size="lg" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-noir-text-faint bg-noir-surface-dim px-3 py-1 border border-noir-line rounded">
                    v24.0
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-noir-text mt-6 mb-3">
                  Docker
                </h3>
                <p className="text-noir-text-mute max-w-lg leading-relaxed">
                  Containerization for consistent deployments across
                  environments. Isolating dependencies and enforcing parity
                  between dev, staging, and production.
                </p>
              </div>
              <pre className="mt-6 p-4 rounded-lg font-mono text-[12px] text-noir-accent bg-noir-surface-dim border border-noir-line overflow-x-auto leading-relaxed">
                <code>
                  <span className="text-noir-text-faint">$</span> docker compose up -d --build{"\n"}
                  <span className="text-noir-text-faint">$</span> docker exec api migrate up
                </code>
              </pre>
            </motion.article>

            {/* GitHub Actions */}
            <BentoMiniCard
              icon={githubIcon}
              title="CI / CD"
              description="GitHub Actions workflows for tests, builds, and deploys."
              index={1}
            />

            {/* Linux */}
            <BentoMiniCard
              icon={linuxIcon}
              title="Linux / Bash"
              description="Unix environments and shell scripting fluency."
              index={2}
            />
          </div>

          {/* AWS wide feature */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="mt-6 group flex flex-col md:flex-row items-stretch gap-8 md:gap-12 p-7 md:p-8 rounded-xl bg-noir-surface-1 border border-noir-line hover:border-noir-accent/40 transition-colors duration-200 overflow-hidden"
          >
            <div className="flex-1">
              <span className="noir-label text-noir-accent block mb-3">
                Infrastructure as Code
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-noir-text mb-3">
                AWS Ecosystem
              </h3>
              <p className="text-noir-text-mute leading-relaxed max-w-xl">
                Lambda, API Gateway, DynamoDB, S3, SQS, Cognito — wired together
                with CloudFormation and observable via CloudWatch.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
                {["CloudFormation", "S3 / CloudFront", "Cognito", "SQS"].map(
                  (label) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-noir-accent" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-noir-text-soft">
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Decorative architecture diagram pane */}
            <div
              aria-hidden
              className="flex-1 min-h-[180px] md:min-h-[220px] rounded-lg bg-noir-surface-dim border border-noir-line relative overflow-hidden"
            >
              <div className="absolute inset-0 grid-overlay opacity-60" />
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 220"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="aws-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g stroke="url(#aws-line)" strokeWidth="1" fill="none">
                  <path d="M30 60 L150 60 L150 110 L370 110" />
                  <path d="M30 110 L120 110 L120 160 L370 160" />
                  <path d="M30 160 L90 160 L90 60 L370 60" />
                </g>
                <g fill="#00e5ff">
                  <circle cx="30" cy="60" r="3" />
                  <circle cx="30" cy="110" r="3" />
                  <circle cx="30" cy="160" r="3" />
                  <circle cx="370" cy="60" r="3" />
                  <circle cx="370" cy="110" r="3" />
                  <circle cx="370" cy="160" r="3" />
                </g>
                <g fill="#00e5ff" opacity="0.6">
                  <circle cx="150" cy="60" r="2" />
                  <circle cx="120" cy="110" r="2" />
                  <circle cx="90" cy="160" r="2" />
                </g>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-noir-surface-1/50 via-transparent to-transparent" />
            </div>
          </motion.article>

          {/* Remaining: Git + Vercel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <BentoMiniCard
              icon={gitIcon}
              title="Git"
              description="Branch hygiene, atomic commits, and clean history."
              index={3}
            />
            <BentoMiniCard
              icon={vercelIcon}
              title="Vercel"
              description="Edge deployment and serverless functions for Next.js."
              index={4}
            />
          </div>
        </CategoryBlock>
      </div>
    </section>
  );
}

function CategoryBlock({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? "" : "mb-16 md:mb-20"}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4 mb-8"
      >
        <h3
          className="font-display text-2xl md:text-3xl font-semibold text-noir-text"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="h-px flex-grow bg-noir-line" />
      </motion.div>
      {children}
    </section>
  );
}

function IconTile({
  src,
  size = "md",
}: {
  src: string;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "w-14 h-14" : "w-11 h-11";
  const inner = size === "lg" ? 32 : 24;
  return (
    <div
      className={`${dim} flex items-center justify-center rounded-lg bg-noir-surface-dim border border-noir-line group-hover:border-noir-accent/40 group-hover:bg-noir-accent/5 transition-colors duration-200`}
    >
      <Image
        src={src}
        alt=""
        width={inner}
        height={inner}
        className="object-contain"
      />
    </div>
  );
}

function FeatureCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group p-6 rounded-xl bg-noir-surface-1 border border-noir-line
                 hover:border-noir-accent/40 hover:-translate-y-0.5 hover:shadow-noir-glow
                 transition-[border-color,transform,box-shadow] duration-200"
    >
      <IconTile src={skill.icon} />
      <h3 className="font-display text-lg font-semibold text-noir-text mt-4 mb-2">
        {skill.name}
      </h3>
      <p className="text-sm text-noir-text-mute leading-relaxed">
        {skill.description}
      </p>
      {skill.tags && skill.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-1 rounded
                         bg-noir-surface-dim border border-noir-line text-noir-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

function CompactCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
      className="group p-5 rounded-xl bg-noir-surface-1 border border-noir-line
                 hover:border-noir-accent/40 transition-colors duration-200 h-full"
    >
      <IconTile src={skill.icon} />
      <h4 className="font-display text-base font-semibold text-noir-text mt-3 mb-1">
        {skill.name}
      </h4>
      <p className="text-xs text-noir-text-mute leading-relaxed">
        {skill.description}
      </p>
    </motion.article>
  );
}

function BentoMiniCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.2) }}
      className="group p-6 rounded-xl bg-noir-surface-1 border border-noir-line
                 hover:border-noir-accent/40 transition-colors duration-200 h-full"
    >
      <IconTile src={icon} />
      <h4 className="font-display text-lg font-semibold text-noir-text mt-3 mb-1">
        {title}
      </h4>
      <p className="text-xs text-noir-text-mute leading-relaxed">{description}</p>
    </motion.article>
  );
}
