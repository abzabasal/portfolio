"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AwwwardsCard } from "./awwwards-card"
import { CaseStudyModal } from "./case-study-modal"
import { CursorSpotlight } from "./cursor-spotlight"

export interface ProjectData {
  id: string
  title: string
  description: string
  tags: string[]
  thumbnail: string
  caseStudy: {
    title: string
    description: string
    markdownContent: string
    images: {
      src: string
      size: "hero" | "vertical" | "square" | "small"
    }[]
    liveUrl: string
    githubUrl: string
  }
}

const projects: ProjectData[] = [
  {
    id: "1",
    title: "Reisearch",
    description: "A comprehensive real estate market research and analysis platform.",
    tags: ["Real Estate", "Data Visualization", "React", "SaaS"],
    thumbnail: "/projects/reisearch/dashboard.png",
    caseStudy: {
      title: "Reisearch Platform",
      description:
        "An advanced real estate analytics platform helping investors make data-driven decisions with market insights, comparables, and demographic data.",
      markdownContent: `
# Project Overview

Reisearch is a powerful tool designed for real estate professionals and investors. It aggregates data from multiple sources to provide comprehensive market analysis, property valuations, and investment insights.

## Key Features

- **Market Dashboard:** Real-time overview of market trends and key metrics.
- **Comparable Analysis:** Advanced tools to find and analyze property comparables.
- **Demographic Insights:** Detailed population, income, and lifestyle data for any location.
- **Investment Calculators:** ROI and cash flow projections for potential investments.

## Technical Implementation

Built with modern web technologies, the platform features interactive charts, map-based search, and complex data visualization components. The backend processes large datasets to deliver instant insights.
      `,
      images: [
        { src: "/projects/reisearch/dashboard.png", size: "hero" },
        { src: "/projects/reisearch/comparables.png", size: "hero" },
        { src: "/projects/reisearch/marketplace.png", size: "hero" },
        { src: "/projects/reisearch/demographics.png", size: "square" },
        { src: "/projects/reisearch/folders.png", size: "square" },
        { src: "/projects/reisearch/messaging-fullscreen.png", size: "vertical" },
        { src: "/projects/reisearch/create-post.png", size: "hero" },
        { src: "/projects/reisearch/properties.png", size: "vertical" },
        { src: "/projects/reisearch/settings.png", size: "vertical" },
        { src: "/projects/reisearch/publish-property.png", size: "hero" },
        { src: "/projects/reisearch/notifications.png", size: "square" },
        { src: "/projects/reisearch/integration.png", size: "square" },
        { src: "/projects/reisearch/comparables-darkmode.png", size: "hero" },
        { src: "/projects/reisearch/presentation1.png", size: "vertical" },
        { src: "/projects/reisearch/presentation2.png", size: "vertical" },
        { src: "/projects/reisearch/presentation-templates.png", size: "hero" },
        { src: "/projects/reisearch/porfile.png", size: "vertical" },
        { src: "/projects/reisearch/subscription-plans.png", size: "square" },
        { src: "/projects/reisearch/messaging.png", size: "square" },
      ],
      liveUrl: "https://reisearch.app",
      githubUrl: "https://github.com/reisearch",
    },
  },
  {
    id: "2",
    title: "Amigos Gym",
    description: "An all-in-one management solution for modern fitness centers.",
    tags: ["Gym Management", "SaaS", "Dashboard", "Fintech"],
    thumbnail: "/projects/amigos-gym/dashboard.png",
    caseStudy: {
      title: "Amigos Gym Management",
      description:
        "Streamlining gym operations with a comprehensive platform for member management, inventory tracking, and automated communications.",
      markdownContent: `
# Project Overview

Amigos Gym Management is a complete digital solution tailored for fitness centers. It simplifies day-to-day operations by integrating member management, financial tracking, and communication tools into a single, intuitive interface.

## Key Features

- **Centralized Dashboard:** Real-time insights into active members, revenue, and daily check-ins.
- **Member Management:** Detailed profiles, plan management, and attendance tracking.
- **Inventory Control:** Track equipment, supplements, and merchandise effortlessly.
- **Financial Suite:** Automated payment processing, invoicing, and revenue reporting.
- **Communication Hub:** Built-in bulk SMS and email notifications for announcements and reminders.

## Technical Implementation

The platform ensures data security and high availability. It features a responsive design for access on any device and integrates with payment gateways for seamless transactions.
      `,
      images: [
        { src: "/projects/amigos-gym/dashboard.png", size: "hero" },
        { src: "/projects/amigos-gym/membership-pans.png", size: "vertical" },
        { src: "/projects/amigos-gym/coaches-management.png", size: "square" },
        { src: "/projects/amigos-gym/payments.png", size: "hero" },
        { src: "/projects/amigos-gym/inventory.png", size: "square" },
        { src: "/projects/amigos-gym/bulk-sms.png", size: "vertical" },
      ],
      liveUrl: "https://amigosgym.com",
      githubUrl: "https://github.com/amigos-gym",
    },
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
  }

  const handlePrev = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    setSelectedProject(projects[prevIndex])
  }

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <CursorSpotlight containerRef={containerRef} />

      {/* Noise texture background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div ref={containerRef} className="container relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            Immersive experiences built to sell the visual story
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AwwwardsCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
