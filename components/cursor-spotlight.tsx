"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface CursorSpotlightProps {
  containerRef: React.RefObject<HTMLDivElement>
}

export function CursorSpotlight({ containerRef }: CursorSpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const spotlightRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setPosition({ x, y })
      }, 16) // ~60fps
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [containerRef])

  return (
    <motion.div
      ref={spotlightRef}
      animate={{
        x: position.x - 150,
        y: position.y - 150,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 90 }}
      className="absolute top-0 left-0 w-72 h-72 pointer-events-none z-0"
      style={{
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  )
}
