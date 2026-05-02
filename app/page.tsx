"use client"

import { motion } from "framer-motion"
import { FloatingNav } from "@/components/floating-nav"
import { CreativeHero } from "@/components/creative-hero"
import { SectionHeading } from "@/components/section-heading"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { SkillsSection } from "@/components/skills-section"
import { NetworkSection } from "@/components/network-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-noir-bg text-noir-text overflow-x-hidden">
      <FloatingNav />

      <CreativeHero />

      <ServicesSection />

      <ProjectsSection />

      <section
        id="experience"
        className="py-32 bg-noir-bg relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-noise" />
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-noir-accent/[0.04] rounded-full blur-[60px] pointer-events-none" />

        <motion.div
          className="container max-w-container-max relative z-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-2xl">
            <SectionHeading title="Experience" subtitle="Career Journey" />
            <p className="mt-4 text-noir-text-mute leading-relaxed">
              Recent roles, with the architectural calls and measurable
              outcomes attached.
            </p>
          </div>

          <div className="mt-16">
            <Timeline />
          </div>
        </motion.div>
      </section>

      <SkillsSection />

      <NetworkSection />

      <section
        id="contact"
        className="py-32 bg-noir-surface-dim relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-noise" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-noir-accent/[0.05] rounded-full blur-[60px] pointer-events-none" />

        <motion.div
          className="container max-w-container-max relative z-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-2xl">
            <SectionHeading title="Get In Touch" subtitle="Let's Connect" />
            <p className="mt-4 text-noir-text-mute leading-relaxed">
              Currently open to senior full-stack and platform engineering
              roles. Happy to talk about a project, a team, or anything in
              between.
            </p>
          </div>

          <div className="mt-16 max-w-2xl">
            <ContactForm />
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
