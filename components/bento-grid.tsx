"use client"

import { motion } from "framer-motion"
import { useState, useCallback } from "react"

interface BentoImage {
  src: string
  size: "hero" | "vertical" | "square" | "small"
}

interface BentoGridProps {
  images: BentoImage[]
}

export function BentoGrid({ images }: BentoGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getGridClasses = useCallback((size: string) => {
    switch (size) {
      case "hero":
        return "col-span-full row-span-2"
      case "vertical":
        return "col-span-1 row-span-2"
      case "square":
        return "col-span-1 row-span-1"
      case "small":
        return "col-span-1 row-span-1"
      default:
        return "col-span-1 row-span-1"
    }
  }, [])

  return (
    <motion.div layout className="grid grid-cols-3 gap-4 auto-rows-64">
      {images.map((image, index) => (
        <motion.div
          key={index}
          layout
          className={`${getGridClasses(image.size)} relative rounded-lg overflow-hidden group cursor-pointer`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.img
            src={image.src || "/placeholder.svg"}
            alt={`Gallery ${index}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              y: hoveredIndex === index ? -10 : 0,
            }}
          />

          {/* Overlay */}
          <motion.div
            animate={{
              opacity: hoveredIndex === index ? 1 : 0,
            }}
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
