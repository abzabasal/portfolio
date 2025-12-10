"use client";

import { motion } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import ReactMarkdown from "react-markdown";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Reisearch",
    companyUrl: "https://reisearch.com",
    period: "Nov 2025 – Present · Phoenix, AZ",
    contributions: `
* Rebuilt a **Go-based comps orchestration system** into a high-throughput streaming pipeline with DynamoDB + SQS worker pools, cutting processing time from ~40 minutes to ~3–4 minutes.
* Designed and maintained **AWS integrations** (DynamoDB, S3, SQS, Cognito) and Clean Architecture services to validate, enrich, score, and persist multi-source real-estate comps data.
* Authored **architecture/orchestration docs**, introduced dependency-injection patterns, and mentored engineers for new property-service publishing workflows.
    `,
  },
  {
    title: "Fullstack Developer",
    company: "Nuclues Institute",
    companyUrl: "#",
    period: "Jul 2024 – Nov 2024 · Canada",
    contributions: `
* Optimized the **frontend component structure**, reducing unnecessary renders and improving asset loading for smoother navigation.
* Enhanced **backend performance** by refining API logic, improving database query efficiency, and streamlining key request/response workflows.
* Improved **accessibility and mobile usability** by refining responsive layouts and ensuring components met accessibility guidelines.
    `,
  },
  {
    title: "Software Engineer",
    company: "Eskalate",
    companyUrl: "#",
    period: "Jun 2024 – Sep 2024 · Addis Ababa, Ethiopia",
    contributions: `
* Led a team to build a **blog starter** with Go (Gin), Redis caching, and MongoDB following clean architecture principles.
* Integrated **AI automation** to generate and review blog content, boosting user engagement.
* Drove **performance optimizations** with concurrency and regular code reviews to maintain quality standards.
    `,
  },
  {
    title: "Fullstack Engineer",
    company: "NEO AI Technologies",
    companyUrl: "#",
    period: "Nov 2022 – Sep 2023",
    contributions: `
* Built and maintained **hospital and inventory management systems** with React and TypeScript, delivering scalable frontends.
* Integrated **Firebase/Firestore** for real-time data storage and synchronization.
    `,
  },
];

export function Timeline() {
  const isMobile = useMobile();

  return (
    <div className="relative">
      {!isMobile && (
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1">
          {/* Outer glow effect - subtle white glow */}
          <div className="absolute inset-0 w-8 -translate-x-[14px] bg-gradient-to-b from-white via-zinc-400 to-white blur-2xl opacity-20" />
          {/* Inner glow effect */}
          <div className="absolute inset-0 w-5 -translate-x-[8px] bg-gradient-to-b from-white via-zinc-300 to-white blur-lg opacity-30" />
          {/* Main beam - white to gray gradient */}
          <div className="absolute inset-0 w-1.5 -translate-x-[1px] bg-gradient-to-b from-white via-zinc-400 to-white rounded-full" />
        </div>
      )}

      <div className="space-y-16">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`relative z-10 flex items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <motion.div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:pl-12" : "md:pr-12"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 150 : -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth entrance
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Card with rotating gradient border */}
              <div className="relative group">
                <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,#ffffff,#a1a1aa,#ffffff,#a1a1aa,#ffffff)]"
                    style={{ animationDuration: "8s" }}
                  />
                </div>

                <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-zinc-400/10 to-white/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 overflow-hidden group-hover:border-white/30 transition-colors duration-300">
                  <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-zinc-400/[0.02] pointer-events-none" />

                  {/* Card header */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-white">
                      {experience.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-zinc-300 font-medium">
                        {experience.company}
                      </span>
                      <a
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                        aria-label={`Visit ${experience.company} website`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-zinc-300">
                      {experience.period}
                    </div>

                    <div className="mt-4 text-zinc-400 text-sm leading-relaxed prose prose-invert prose-sm max-w-none prose-ul:pl-4 prose-li:marker:text-white prose-strong:text-white prose-strong:font-semibold">
                      <ReactMarkdown>{experience.contributions}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {!isMobile && (
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.2,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 w-12 h-12 -translate-x-2.5 -translate-y-2.5 bg-white rounded-full blur-xl opacity-30" />
                  <div className="relative w-7 h-7 rounded-full bg-gradient-to-r from-white via-zinc-300 to-white flex items-center justify-center shadow-lg shadow-white/20">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
