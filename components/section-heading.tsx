"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-8 bg-noir-accent/60" />
        <span className="noir-label text-noir-accent">{subtitle}</span>
      </motion.div>

      <motion.h2
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-noir-text"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
    </div>
  )
}
