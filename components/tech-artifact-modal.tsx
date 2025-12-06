"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

interface TechArtifactModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  screenshots: string[]
  demoUrl: string
  repoUrl: string
  tags: string[]
  accentColor?: "violet" | "cyan" | "magenta" | "purple-blue" | "aqua" | "lavender"
}

const colorMap = {
  violet: {
    borderGlow: "from-violet-500/20 via-violet-500/20 to-pink-500/20",
    borderColor: "border-violet-400/50",
  },
  cyan: {
    borderGlow: "from-cyan-500/20 via-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-400/50",
  },
  magenta: {
    borderGlow: "from-magenta-500/20 via-magenta-500/20 to-pink-500/20",
    borderColor: "border-magenta-400/50",
  },
  "purple-blue": {
    borderGlow: "from-purple-500/20 via-blue-500/20 to-purple-500/20",
    borderColor: "border-purple-400/50",
  },
  aqua: {
    borderGlow: "from-teal-500/20 via-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-400/50",
  },
  lavender: {
    borderGlow: "from-purple-400/20 via-pink-400/20 to-purple-400/20",
    borderColor: "border-purple-300/50",
  },
}

export function TechArtifactModal({
  isOpen,
  onClose,
  title,
  description,
  screenshots,
  demoUrl,
  repoUrl,
  tags,
  accentColor = "violet",
}: TechArtifactModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const colors = colorMap[accentColor]

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with deep blur and bokeh particles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full opacity-20"
                  style={{
                    background: `radial-gradient(circle, ${
                      i % 3 === 0
                        ? "rgba(139, 92, 246, 0.4)"
                        : i % 3 === 1
                          ? "rgba(34, 211, 238, 0.4)"
                          : "rgba(236, 72, 153, 0.4)"
                    } 0%, transparent 70%)`,
                    width: Math.random() * 300 + 100,
                    height: Math.random() * 300 + 100,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -80, 0],
                    x: [0, 50, 0],
                  }}
                  transition={{
                    duration: 15 + Math.random() * 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-3xl rounded-3xl border ${colors.borderColor} shadow-2xl overflow-hidden flex flex-col z-50`}
            >
              <div
                className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${colors.borderGlow} opacity-50 -z-10 blur-xl`}
              />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              >
                <X className="h-5 w-5" />
              </motion.button>

              {/* Floating hologram-style header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-8 border-b border-white/10 bg-gradient-to-b from-white/10 to-transparent"
              >
                <h2
                  className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 mb-2`}
                >
                  {title}
                </h2>
                <p className="text-zinc-300 text-sm max-w-2xl">{description}</p>
              </motion.div>

              {/* Gallery section */}
              <div className="flex-grow overflow-auto">
                <div className="p-8 space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative rounded-2xl overflow-hidden group/gallery"
                  >
                    {/* Glass surface effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl z-10 pointer-events-none" />
                    <div className={`absolute inset-0 border border-white/30 rounded-2xl z-10 pointer-events-none`} />

                    {/* Image with soft glow on hover */}
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      src={screenshots[currentImageIndex]}
                      alt={`${title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-auto rounded-2xl relative z-0"
                    />

                    {/* Navigation controls */}
                    {screenshots.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1, x: -4 }}
                          onClick={handlePrevious}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/30 text-white backdrop-blur-sm z-20 transition-all"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, x: 4 }}
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/30 text-white backdrop-blur-sm z-20 transition-all"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </motion.button>

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 border border-white/30 backdrop-blur-sm text-white text-sm font-medium z-20">
                          {currentImageIndex + 1} / {screenshots.length}
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-sm text-white/90 font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent flex gap-3 flex-wrap"
              >
                <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-fit">
                  <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white" size="lg">
                    <Github className="h-5 w-5 mr-2" />
                    View Code
                  </Button>
                </Link>
                <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-fit">
                  <Button
                    className={`w-full bg-gradient-to-r ${colors.borderGlow} hover:opacity-90 border-0 text-white font-semibold`}
                    size="lg"
                  >
                    View Live Site
                    <ArrowUpRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
