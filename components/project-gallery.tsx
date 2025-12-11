"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectGalleryProps {
  images: {
    src: string
    size: "hero" | "vertical" | "square" | "small"
  }[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        handleNext()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, handleNext])

  return (
    <div
      className="w-full h-full bg-zinc-900/20 relative overflow-hidden flex flex-col border-l border-white/5 group/gallery"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Image Display */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 group/focus overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full h-full max-w-5xl max-h-full rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm"
          >
            <Image
              src={images[currentIndex].src}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />

            {/* Image Counter Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs text-white/70">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Visible on Hover/Interaction */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="absolute left-4 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all opacity-0 group-hover/gallery:opacity-100 -translate-x-4 group-hover/gallery:translate-x-0 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all opacity-0 group-hover/gallery:opacity-100 translate-x-4 group-hover/gallery:translate-x-0 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails Strip */}
      <div className="h-24 border-t border-white/10 bg-black/40 p-3 flex gap-3 overflow-x-auto justify-center items-center backdrop-blur-md">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "relative w-20 h-14 rounded-md overflow-hidden border transition-all flex-shrink-0 group/thumb",
              currentIndex === idx
                ? "border-white ring-2 ring-white/20 scale-105"
                : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
            )}
          >
            <Image
              src={img.src}
              alt={`Go to image ${idx + 1}`}
              fill
              className="object-cover"
            />
            {/* Active Indicator Line */}
            {currentIndex === idx && (
              <motion.div
                layoutId="activeThumb"
                className="absolute bottom-0 left-0 right-0 h-1 bg-white"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
