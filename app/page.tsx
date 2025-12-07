"use client"

import { FloatingNav } from "@/components/floating-nav"
import { CreativeHero } from "@/components/creative-hero"
import { SectionHeading } from "@/components/section-heading"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <FloatingNav />

      {/* Hero Section */}
      <CreativeHero />


      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Experience Section */}
      <section
        id="experience"
        className="py-32 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black relative overflow-hidden"
      >
        {/* Noise texture overlay matching other sections */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/3 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="container relative z-10">
          <SectionHeading title="Experience" subtitle="Career Journey" />

          <div className="mt-20">
            <Timeline />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-32 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 relative overflow-hidden"
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle glow accents */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-zinc-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's Connect" />

          <div className="mt-20 max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
