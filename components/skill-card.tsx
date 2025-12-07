"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useMemo, useRef } from "react"
import Image from "next/image"

interface SkillCardProps {
  name: string
  description: string
  color:
  | "violet"
  | "cyan"
  | "magenta"
  | "purple-blue"
  | "aqua"
  | "lavender"
  | "green"
  | "orange"
  | "blue"
  | "red"
  | "yellow"
  size?: "small" | "medium" | "large"
  icon?: string
}

const colorMap = {
  violet: {
    border: "border-violet-400/40",
    glow: "from-violet-500/20 to-violet-600/10",
    gradient: "from-violet-300 to-violet-200",
    hoverGlow: "rgba(167, 139, 250, 0.4)",
    iconGlow: "rgba(167, 139, 250, 0.6)",
  },
  cyan: {
    border: "border-cyan-400/40",
    glow: "from-cyan-500/20 to-cyan-600/10",
    gradient: "from-cyan-300 to-cyan-200",
    hoverGlow: "rgba(34, 211, 238, 0.4)",
    iconGlow: "rgba(34, 211, 238, 0.6)",
  },
  magenta: {
    border: "border-pink-400/40",
    glow: "from-pink-500/20 to-pink-600/10",
    gradient: "from-pink-300 to-pink-200",
    hoverGlow: "rgba(219, 39, 119, 0.4)",
    iconGlow: "rgba(219, 39, 119, 0.6)",
  },
  "purple-blue": {
    border: "border-purple-400/40",
    glow: "from-purple-500/20 to-blue-600/10",
    gradient: "from-purple-300 to-blue-200",
    hoverGlow: "rgba(147, 112, 219, 0.4)",
    iconGlow: "rgba(147, 112, 219, 0.6)",
  },
  aqua: {
    border: "border-teal-400/40",
    glow: "from-teal-500/20 to-teal-600/10",
    gradient: "from-teal-300 to-teal-200",
    hoverGlow: "rgba(32, 201, 201, 0.4)",
    iconGlow: "rgba(32, 201, 201, 0.6)",
  },
  lavender: {
    border: "border-purple-300/40",
    glow: "from-purple-400/20 to-pink-400/10",
    gradient: "from-purple-300 to-pink-200",
    hoverGlow: "rgba(196, 181, 253, 0.4)",
    iconGlow: "rgba(196, 181, 253, 0.6)",
  },
  green: {
    border: "border-green-400/40",
    glow: "from-green-500/20 to-green-600/10",
    gradient: "from-green-300 to-green-200",
    hoverGlow: "rgba(34, 197, 94, 0.4)",
    iconGlow: "rgba(34, 197, 94, 0.6)",
  },
  orange: {
    border: "border-orange-400/40",
    glow: "from-orange-500/20 to-orange-600/10",
    gradient: "from-orange-300 to-orange-200",
    hoverGlow: "rgba(251, 146, 60, 0.4)",
    iconGlow: "rgba(251, 146, 60, 0.6)",
  },
  blue: {
    border: "border-blue-400/40",
    glow: "from-blue-500/20 to-blue-600/10",
    gradient: "from-blue-300 to-blue-200",
    hoverGlow: "rgba(59, 130, 246, 0.4)",
    iconGlow: "rgba(59, 130, 246, 0.6)",
  },
  red: {
    border: "border-red-400/40",
    glow: "from-red-500/20 to-red-600/10",
    gradient: "from-red-300 to-red-200",
    hoverGlow: "rgba(239, 68, 68, 0.4)",
    iconGlow: "rgba(239, 68, 68, 0.6)",
  },
  yellow: {
    border: "border-yellow-400/40",
    glow: "from-yellow-500/20 to-yellow-600/10",
    gradient: "from-yellow-300 to-yellow-200",
    hoverGlow: "rgba(250, 204, 21, 0.4)",
    iconGlow: "rgba(250, 204, 21, 0.6)",
  },
}

export function SkillCard({ name, description, color, size = "small", icon }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const colors = colorMap[color]
  const gradientId = useMemo(() => `skill-gradient-${name.replace(/\s+/g, '-').toLowerCase()}`, [name])

  const sizeClass =
    size === "large"
      ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-1"
      : size === "medium"
        ? "col-span-1 md:col-span-1 lg:col-span-1 row-span-2"
        : "col-span-1"

  // 3D Tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        perspective: "1000px",
      }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${sizeClass}`}
    >
      {/* Animated border SVG */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.hoverGlow} />
              <stop offset="50%" stopColor={colors.iconGlow} />
              <stop offset="100%" stopColor={colors.hoverGlow} />
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

      {/* Radial glow on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${colors.hoverGlow} 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Card container with 3D transform */}
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative h-full backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/2 border ${colors.border} rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 overflow-hidden min-h-[180px]`}
      >
        {/* Dark noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Technology Icon */}
          {icon && (
            <motion.div animate={{ y: isHovered ? -3 : 0 }} transition={{ duration: 0.3 }} className="relative mb-3">
              <div className="absolute inset-0 blur-xl opacity-60" style={{ backgroundColor: colors.iconGlow }} />
              <Image
                src={icon || "/placeholder.svg"}
                alt={`${name} icon`}
                width={48}
                height={48}
                className="relative z-10 w-12 h-12 object-contain"
              />
            </motion.div>
          )}

          {/* Skill Name */}
          <motion.h3
            animate={{ y: isHovered ? -3 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors.gradient} mb-1`}
          >
            {name}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-sm text-zinc-300 line-clamp-2 px-2"
          >
            {description}
          </motion.p>

          {/* Subtle glow underline */}
          <motion.div
            animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`h-px bg-gradient-to-r ${colors.glow} mt-3 mx-auto w-2/3`}
            style={{ filter: "blur(2px)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
