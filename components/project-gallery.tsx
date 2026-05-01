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

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [isPlaying, handleNext])

  return (
    <div
      className="w-full h-full bg-noir-surface-dim relative overflow-hidden flex flex-col group/gallery"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full h-full max-w-5xl max-h-full rounded-lg overflow-hidden border border-noir-line bg-noir-surface"
          >
            <Image
              src={images[currentIndex].src}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 60vw"
            />

            <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-noir-surface-1/90 border border-noir-line">
              <span className="font-mono text-[11px] tracking-wider text-noir-text-mute">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="absolute left-4 w-10 h-10 flex items-center justify-center rounded
                     bg-noir-surface-1 border border-noir-line text-noir-text-mute
                     transition-[opacity,colors,transform] duration-200
                     opacity-0 -translate-x-2 group-hover/gallery:opacity-100 group-hover/gallery:translate-x-0
                     hover:border-noir-accent hover:text-noir-accent z-20"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 w-10 h-10 flex items-center justify-center rounded
                     bg-noir-surface-1 border border-noir-line text-noir-text-mute
                     transition-[opacity,colors,transform] duration-200
                     opacity-0 translate-x-2 group-hover/gallery:opacity-100 group-hover/gallery:translate-x-0
                     hover:border-noir-accent hover:text-noir-accent z-20"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="h-24 border-t border-noir-line bg-noir-surface-dim p-3 flex gap-2 overflow-x-auto items-center">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "relative w-20 h-14 rounded-sm overflow-hidden border transition-all flex-shrink-0",
              currentIndex === idx
                ? "border-noir-accent opacity-100"
                : "border-noir-line opacity-50 hover:opacity-100 hover:border-noir-text-faint"
            )}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
