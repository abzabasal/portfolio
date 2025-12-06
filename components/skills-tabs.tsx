"use client"

import { motion } from "framer-motion"

export type SkillCategory = "frontend" | "backend" | "devops"

interface SkillsTabsProps {
  activeCategory: SkillCategory
  onCategoryChange: (category: SkillCategory) => void
}

const categories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend / Full-stack" },
  { id: "devops", label: "DevOps / Tools" },
]

export function SkillsTabs({ activeCategory, onCategoryChange }: SkillsTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-3 mt-10"
    >
      {categories.map((category) => (
        <TabButton
          key={category.id}
          label={category.label}
          isActive={activeCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </motion.div>
  )
}

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none"
    >
      {/* Rotating gradient border for active state */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background: "conic-gradient(from 0deg, #a855f7, #ec4899, #3b82f6, #06b6d4, #a855f7)",
              padding: "2px",
            }}
          >
            <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-xl" />
          </div>
        </motion.div>
      )}

      {/* Glowing background for active state */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      )}

      {/* Inactive state background */}
      {!isActive && (
        <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300" />
      )}

      {/* Text */}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive ? "text-white" : "text-zinc-400 hover:text-white"
        }`}
      >
        {label}
      </span>
    </button>
  )
}
