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
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, Stripe, and Prisma.",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    thumbnail: "/ecommerce-dashboard.png",
    caseStudy: {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
      markdownContent: `
# Project Overview

This e-commerce platform was built to provide a seamless shopping experience with high performance and scalability. We utilized **Next.js** for server-side rendering and **Stripe** for secure payments.

## Key Features

- **Real-time Inventory:** Updates instantly as purchases are made.
- **Secure Payments:** Integrated with Stripe for safe transactions.
- **Analytics Dashboard:** Comprehensive insights into sales and user behavior.

## Technical Challenges

One of the main challenges was ensuring data consistency across the distributed system. We implemented a robust event-driven architecture to handle inventory updates and order processing.

## Contribution

I was responsible for the backend architecture and the integration of the payment gateway. I also worked on the frontend performance optimization.
      `,
      images: [
        { src: "/ecommerce-dashboard.png", size: "hero" },
        { src: "/product-catalog-view.jpg", size: "vertical" },
        { src: "/modern-checkout-page.png", size: "square" },
        { src: "/ecommerce-dashboard.png", size: "hero" },
        { src: "/product-catalog-view.jpg", size: "vertical" },
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    tags: ["React", "Firebase", "Tailwind", "Redux"],
    thumbnail: "/task-management-dashboard.png",
    caseStudy: {
      title: "Task Management App",
      description:
        "Real-time collaborative task management with team workspaces, granular permissions, and advanced analytics.",
      markdownContent: `
# Project Overview

A collaborative tool designed to help teams stay organized and efficient. Built with **React** and **Firebase**, it offers real-time updates and seamless collaboration.

## Key Features

- **Real-time Collaboration:** See changes as they happen.
- **Team Workspaces:** Organize tasks by team or project.
- **Granular Permissions:** Control who can see and edit what.

## Technical Challenges

Implementing real-time synchronization was a complex task. We used Firebase's real-time database to ensure that all users see the same data at the same time.

## Contribution

I led the frontend development team and designed the user interface. I also implemented the real-time collaboration features.
      `,
      images: [
        { src: "/task-management-dashboard.png", size: "hero" },
        { src: "/team-collaboration-board.jpg", size: "vertical" },
        { src: "/task-details-view.jpg", size: "square" },
        { src: "/task-management-dashboard.png", size: "hero" },
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  },
  {
    id: "3",
    title: "AI Content Generator",
    description: "An AI-powered content generation tool using OpenAI GPT models.",
    tags: ["Next.js", "OpenAI", "Node.js", "MongoDB"],
    thumbnail: "/ai-content-generator-interface.png",
    caseStudy: {
      title: "AI Content Generator",
      description:
        "Intelligent content generation powered by GPT-4 with custom templates, batch processing, and content analytics.",
      markdownContent: `
# Project Overview

This tool leverages the power of **OpenAI's GPT-4** to generate high-quality content for various purposes. It includes custom templates and batch processing capabilities.

## Key Features

- **AI-Powered Generation:** High-quality content in seconds.
- **Custom Templates:** Tailor the output to your specific needs.
- **Batch Processing:** Generate multiple pieces of content at once.

## Technical Challenges

Integrating with the OpenAI API and handling rate limits were significant challenges. We implemented a queueing system to manage requests efficiently.

## Contribution

I developed the backend API and the integration with OpenAI. I also worked on the frontend interface for the content editor.
      `,
      images: [
        { src: "/ai-content-generator-interface.png", size: "hero" },
        { src: "/content-creation-editor.jpg", size: "vertical" },
        { src: "/generated-content-preview.jpg", size: "square" },
        { src: "/ai-content-generator-interface.png", size: "hero" },
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
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
