"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { ProjectData } from "./projects-section"
import { BentoGrid } from "./bento-grid"

interface CaseStudyModalProps {
  project: ProjectData
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        layoutId={`card-${project.id}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Neon frame effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto flex-1 relative z-10">
          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <h2 className="text-4xl font-bold text-white mb-2">{project.caseStudy.title}</h2>
            <p className="text-zinc-400">{project.caseStudy.description}</p>
          </div>

          {/* Bento Grid Gallery */}
          <div className="p-8">
            <BentoGrid images={project.caseStudy.images} />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 border-t border-white/10 bg-black/50 backdrop-blur px-8 py-6 flex justify-between items-center">
          <div className="flex gap-4">
            <a
              href={project.caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors cursor-pointer"
            >
              View Live
            </a>
            <a
              href={project.caseStudy.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              View Github
            </a>
          </div>
          <span className="text-sm text-zinc-500">Scroll to explore</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
