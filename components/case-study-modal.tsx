"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react"
import type { ProjectData } from "./projects-section"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

import { ProjectGallery } from "./project-gallery"

interface CaseStudyModalProps {
  project: ProjectData
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function CaseStudyModal({ project, onClose, onNext, onPrev }: CaseStudyModalProps) {
  const [navDirection, setNavDirection] = useState<"next" | "prev">("next")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") {
        setNavDirection("next")
        onNext()
      }
      if (e.key === "ArrowLeft") {
        setNavDirection("prev")
        onPrev()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, onNext, onPrev])

  const slideVariants = {
    initial: (direction: "next" | "prev") => ({
      opacity: 0,
      y: direction === "next" ? 32 : -32,
      rotateX: direction === "next" ? 8 : -8,
      scale: 0.94,
      filter: "blur(10px)",
    }),
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 22, stiffness: 320, mass: 0.8 },
    },
    exit: (direction: "next" | "prev") => ({
      opacity: 0,
      y: direction === "next" ? -28 : 28,
      rotateX: direction === "next" ? -6 : 6,
      scale: 0.93,
      filter: "blur(10px)",
      transition: { duration: 0.28, ease: "easeInOut" as const },
    }),
  }

  const handleNext = () => {
    setNavDirection("next")
    onNext()
  }

  const handlePrev = () => {
    setNavDirection("prev")
    onPrev()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Navigation Buttons - Outside Modal */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrev()
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-50 hidden md:flex border border-white/5 hover:border-white/20 backdrop-blur-sm"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-50 hidden md:flex border border-white/5 hover:border-white/20 backdrop-blur-sm"
        aria-label="Next project"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <motion.div
        layoutId={`card-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: 1400 }}
        className="relative w-[95vw] h-[90vh] md:w-[85vw] md:h-[85vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-white/10 transition-colors border border-white/10 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <AnimatePresence mode="wait" initial={false} custom={navDirection}>
          <motion.div
            key={project.id}
            custom={navDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex flex-col"
          >
            {/* Header Section */}
            <div className="relative px-8 py-7 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl z-20 flex justify-between items-start md:items-center gap-6 shrink-0">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-fuchsia-500/10" />
                <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
                <div className="absolute right-6 bottom-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />
              </div>

              <div className="relative flex-1">
                <motion.h2
                  key={project.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 24, stiffness: 260 }}
                  className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                >
                  {project.title}
                </motion.h2>
                <p className="mt-3 text-sm text-zinc-400 max-w-2xl">
                  Crafting a high-touch experience with thoughtful flows, resilient architecture, and a cinematic presentation layer.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-zinc-100 border border-white/15 shadow-[0_6px_24px_rgba(0,0,0,0.2)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex gap-3 hidden md:flex">
                <a
                  href={project.caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white text-black text-sm font-semibold shadow-[0_10px_35px_rgba(255,255,255,0.15)] transition-transform transition-colors duration-200 hover:-translate-y-[1px] hover:bg-zinc-50"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Experience
                </a>
                <a
                  href={project.caseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold hover:border-white/30 transition-colors backdrop-blur-sm"
                >
                  <Github className="w-4 h-4" />
                  Source
                </a>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Column: Markdown Content (40%) */}
              <div className="w-full md:w-[40%] h-full overflow-y-auto p-8 md:p-12 bg-zinc-950 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent border-r border-white/5">
                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-400 prose-strong:text-white prose-li:text-zinc-400">
                  <ReactMarkdown>{project.caseStudy.markdownContent || project.caseStudy.description}</ReactMarkdown>
                </div>

                {/* Mobile Links */}
                <div className="flex gap-3 mt-8 md:hidden">
                  <a
                    href={project.caseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-white text-black text-sm font-semibold rounded-lg shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Launch Experience
                  </a>
                  <a
                    href={project.caseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-lg border border-white/10"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Gallery (60%) */}
              <div className="w-full md:w-[60%] h-full bg-zinc-900/20 relative overflow-hidden">
                <ProjectGallery images={project.caseStudy.images} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
