"use client"

import type React from "react"

import { useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Expand } from "lucide-react"
import type { ProjectData } from "./projects-section"

interface AwwwardsCardProps {
  project: ProjectData
  index: number
  onSelect: () => void
}

export function AwwwardsCard({ project, index, onSelect }: AwwwardsCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 })
  const cardRef = useRef<HTMLDivElement>(null)

  const gradientId = useMemo(() => `gradient-${project.id}`, [project.id])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    setCursor({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onSelect}
      layoutId={`card-${project.id}`}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative h-96 cursor-pointer group"
    >
      {/* Animated rotating border */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.6)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.6)" />
            </linearGradient>
          </defs>
          <motion.polyline
            points="0,0 100,0 100,100 0,100 0,0"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
            initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
            animate={{
              strokeDashoffset: isHovered ? 0 : 400,
            }}
            transition={{ duration: 1.2, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Card container */}
      <motion.div className="relative w-full h-full" transition={{ type: "spring", stiffness: 260, damping: 26 }}>
        {/* Glass background with thumbnail */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <motion.img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-500 ease-out ${isHovered ? "grayscale-0 blur-0 scale-106" : "grayscale blur-[2px] scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.25 : 0 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.35),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.35),transparent_35%)]"
          />
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.35 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: `radial-gradient(360px at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(255,255,255,0.28), transparent 55%)`,
            }}
            className="absolute inset-0 mix-blend-screen"
          />
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.98 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(260px at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(135deg, rgba(236,72,153,0.18), rgba(59,130,246,0.18))`,
          }}
          className="pointer-events-none absolute inset-0 rounded-xl border border-white/10 mix-blend-screen"
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between rounded-xl">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/80">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">Deep Dive</span>
              <span className="h-px flex-1 bg-white/10" />
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: isHovered ? 1 : 0.75, x: 0 }}
                transition={{ duration: 0.25 }}
                className="text-white/70 flex items-center gap-2"
              >
                <span className="h-1.5 w-8 rounded-full bg-white/20 overflow-hidden">
                  <motion.span
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "0%" : "-100%" }}
                    transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
                    className="block h-full w-full bg-white/50"
                  />
                </span>
                Ready to expand
              </motion.span>
            </div>
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
            <p className="text-sm text-zinc-200/90 line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/15">
                {tag}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              backgroundImage: `radial-gradient(240px at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(255,255,255,0.3), transparent 65%), linear-gradient(115deg, rgba(236,72,153,0.22), rgba(59,130,246,0.22))`,
            }}
            className="pointer-events-none absolute left-5 right-5 bottom-5 rounded-2xl border border-white/25 backdrop-blur-2xl px-5 py-4 text-white shadow-2xl flex items-center justify-between gap-3 bg-white/12"
          >
            <div className="flex items-center gap-3 text-base font-semibold tracking-tight">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/18 border border-white/30 overflow-hidden">
                <motion.span
                  initial={{ scale: 0.9, rotate: -6, opacity: 0.8 }}
                  animate={{ scale: isHovered ? 1.05 : 0.95, rotate: isHovered ? 0 : -6, opacity: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut", repeat: isHovered ? Infinity : 0, repeatType: "reverse", repeatDelay: 0.9 }}
                  className="inline-flex"
                >
                  <Expand className="h-4.5 w-4.5" />
                </motion.span>
              </span>
              Expand this case
            </div>
            <div className="flex items-center gap-2 text-xs text-white/75">
              <span className="h-1 w-10 rounded-full bg-white/25 overflow-hidden">
                <motion.span
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "0%" : "-100%" }}
                  transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
                  className="block h-full w-full bg-white/60"
                />
              </span>
              Open here
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
