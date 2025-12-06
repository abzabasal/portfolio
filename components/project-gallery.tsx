"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectGalleryProps {
  images: {
    src: string
    size: "hero" | "vertical" | "square" | "small"
  }[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Ensure we always have plenty of tiles to avoid blank gaps while looping
  const duplicated = images.length < 4 ? [...images, ...images, ...images, ...images] : [...images, ...images]

  // Split images into two columns for the opposing scroll effect
  const col1 = duplicated.filter((_, i) => i % 2 === 0)
  const col2 = duplicated.filter((_, i) => i % 2 !== 0)

  const handleImageClick = (index: number) => {
    // Find the original index in the raw images array to avoid confusion with duplicates
    const originalIndex = index % images.length
    setFocusedIndex(originalIndex)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (focusedIndex === null) return
    setFocusedIndex((prev) => (prev === null ? null : (prev + 1) % images.length))
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (focusedIndex === null) return
    setFocusedIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length))
  }

  return (
    <div className="w-full h-full bg-zinc-900/20 relative overflow-hidden flex flex-col border-l border-white/5 group/gallery">
      <GalleryKeyframes />
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />

      {/* Main Gallery Content */}
      <AnimatePresence mode="wait">
        {focusedIndex === null ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex gap-4 p-4 md:p-8 h-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Column 1 - Scrolls Down */}
            <div className="flex-1 relative h-full overflow-hidden">
              <InfiniteScrollColumn
                images={col1}
                direction="down"
                duration={32}
                isPaused={isPaused}
                onImageClick={(idx) => handleImageClick(idx * 2)}
              />
            </div>

            {/* Column 2 - Scrolls Up */}
            <div className="flex-1 relative h-full overflow-hidden">
              <InfiniteScrollColumn
                images={col2}
                direction="up"
                duration={36}
                isPaused={isPaused}
                onImageClick={(idx) => handleImageClick(idx * 2 + 1)}
              />
            </div>

            {/* Hover Controls Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs text-white/70 opacity-0 group-hover/gallery:opacity-100 transition-opacity pointer-events-none z-20">
              Hover to pause • Click to expand
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="focused"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 z-30 bg-zinc-950/90 backdrop-blur-xl flex flex-col"
          >
            {/* Toolbar */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
              <span className="text-sm text-zinc-400 font-medium">
                Image {focusedIndex + 1} of {images.length}
              </span>
              <button 
                onClick={() => setFocusedIndex(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Area */}
            <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 group/focus">
              <AnimatePresence mode="wait">
                <motion.div
                  key={focusedIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full max-w-5xl max-h-full rounded-lg overflow-hidden shadow-2xl border border-white/10"
                >
                  <Image
                    src={images[focusedIndex].src}
                    alt={`Gallery image ${focusedIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all opacity-0 group-hover/focus:opacity-100 -translate-x-4 group-hover/focus:translate-x-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all opacity-0 group-hover/focus:opacity-100 translate-x-4 group-hover/focus:translate-x-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails Strip */}
            <div className="h-20 border-t border-white/10 bg-black/40 p-2 flex gap-2 overflow-x-auto justify-center items-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setFocusedIndex(idx)}
                  className={cn(
                    "relative w-16 h-12 rounded-md overflow-hidden border transition-all flex-shrink-0",
                    focusedIndex === idx ? "border-white ring-2 ring-white/20" : "border-transparent opacity-50 hover:opacity-100"
                  )}
                >
                  <Image src={img.src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Global keyframes for smooth vertical looping
// (Using styled-jsx to keep it local to this component.)
// scroll-up: moves content upward; scroll-down: moves content downward.
/* eslint-disable @next/next/no-css-tags */
/* eslint-enable @next/next/no-css-tags */
export const GalleryKeyframes = () => (
  <style jsx global>{`
    @keyframes scroll-up {
      0% { transform: translateY(0%); }
      100% { transform: translateY(-50%); }
    }
    @keyframes scroll-down {
      0% { transform: translateY(-50%); }
      100% { transform: translateY(0%); }
    }
  `}</style>
)

function InfiniteScrollColumn({
  images,
  direction,
  duration,
  isPaused,
  onImageClick,
}: {
  images: any[]
  direction: "up" | "down"
  duration: number
  isPaused: boolean
  onImageClick: (index: number) => void
}) {
  const loopImages = [...images, ...images] // back-to-back stack to guarantee no gaps
  const animationName = direction === "down" ? "scroll-down" : "scroll-up"

  return (
    <div className="h-full overflow-hidden relative">
      <div
        className="flex flex-col gap-6 absolute w-full"
        style={{
          top: direction === "down" ? "-50%" : "0%",
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {loopImages.map((img, idx) => (
          <motion.div
            key={`${img.src}-${idx}`}
            className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer"
            whileHover={{ scale: 1.02, zIndex: 10 }}
            transition={{ duration: 0.3 }}
            onClick={() => onImageClick(idx % images.length)}
          >
            <div className="aspect-[3/4] relative">
              <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
              <Image
                src={img.src}
                alt={`Gallery image ${idx}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
