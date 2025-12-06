"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import ReactMarkdown from "react-markdown"
import { ExternalLink } from "lucide-react"

const experiences = [
  {
    title: "Senior Frontend Engineer",
    company: "Tech Innovations Inc.",
    companyUrl: "https://techinnovations.example.com",
    period: "January 2021 – Present",
    contributions: `
* **Led a team of 5 engineers** to rebuild the core SaaS dashboard, improving load times by 40%
* Architected a **component library** using React, TypeScript, and Storybook adopted across 3 product teams
* Implemented **real-time collaboration features** using WebSockets and optimistic UI patterns
* Mentored junior developers through code reviews and pair programming sessions
    `,
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Co.",
    companyUrl: "https://digitalsolutions.example.com",
    period: "March 2019 – December 2020",
    contributions: `
* Built **responsive web applications** serving 50k+ daily active users using React and TypeScript
* Collaborated with UX designers to implement **pixel-perfect designs** with a focus on accessibility (WCAG 2.1)
* Reduced bundle size by **35%** through code splitting and lazy loading strategies
* Integrated **CI/CD pipelines** with automated testing achieving 85% code coverage
    `,
  },
  {
    title: "Web Developer",
    company: "Creative Agency",
    companyUrl: "https://creativeagency.example.com",
    period: "June 2017 – February 2019",
    contributions: `
* Developed **20+ client websites** ranging from e-commerce to portfolio sites
* Implemented custom **WordPress themes and plugins** for content management flexibility
* Optimized site performance achieving **90+ Lighthouse scores** across all projects
    `,
  },
  {
    title: "Software Development Intern",
    company: "Startup Hub",
    companyUrl: "https://startuphub.example.com",
    period: "January 2016 – May 2017",
    contributions: `
* Assisted in developing **internal tools** using JavaScript and Node.js
* Learned modern web development practices including **Git workflows** and agile methodologies
* Contributed to **open-source projects** and documentation improvements
    `,
  },
]

export function Timeline() {
  const isMobile = useMobile()

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
            className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            <motion.div
              className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Card with rotating gradient border */}
              <div className="relative group">
                <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,#ffffff,#a1a1aa,#ffffff,#a1a1aa,#ffffff)] animate-spin-slow"
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
                    <h3 className="text-xl font-bold text-white">{experience.title}</h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-zinc-300 font-medium">{experience.company}</span>
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
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
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
  )
}
