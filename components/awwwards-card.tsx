"use client"

import type React from "react"

import { useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import type { ProjectData } from "./projects-section"

interface AwwwardsCardProps {
  project: ProjectData
  index: number
  onSelect: () => void
}

export function AwwwardsCard({ project, index, onSelect }: AwwwardsCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const gradientId = useMemo(() => `gradient-${project.id}-${Math.random()}`, [project.id])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const x = (e.clientY - rect.top - centerY) / 10
    const y = -(e.clientX - rect.left - centerX) / 10

    setRotation({ x, y })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
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
      className="relative h-96 cursor-pointer group"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d" as any,
      }}
    >
      {/* Animated rotating border */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.5)" />
            </linearGradient>
          </defs>
          <motion.polyline
            points="0,0 100,0 100,100 0,100 0,0"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.5"
            initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
            animate={{
              strokeDashoffset: isHovered ? 0 : 400,
            }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Card container */}
      <motion.div
        style={{
          rotateX: isHovered ? rotation.x : 0,
          rotateY: isHovered ? rotation.y : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full h-full"
      >
        {/* Glass background with thumbnail */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <motion.img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-500 ease-out ${isHovered ? "grayscale-0 blur-0 scale-105" : "grayscale blur-sm scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between rounded-xl">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-zinc-300 line-clamp-2">{project.description}</p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded bg-white/10 text-white/80 border border-white/10">
                {tag}
              </span>
            ))}
          </div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="self-start px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded transition-colors cursor-pointer"
          >
            View Case Study →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
