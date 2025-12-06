"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { TechArtifactModal } from "@/components/tech-artifact-modal"

interface TechArtifactCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl: string
  repoUrl: string
  screenshots?: string[]
  accentColor?: "violet" | "cyan" | "magenta" | "purple-blue" | "aqua" | "lavender"
}

const colorMap = {
  violet: {
    glow: "from-violet-500/30 to-violet-600/20",
    border: "border-violet-400/50",
    chip: "from-violet-900/60 to-violet-800/40",
    chipBorder: "border-violet-400/50",
    gradient: "from-violet-200 via-violet-300 to-violet-400",
    scanGradient: "rgba(167, 139, 250, 0.3)",
  },
  cyan: {
    glow: "from-cyan-500/30 to-cyan-600/20",
    border: "border-cyan-400/50",
    chip: "from-cyan-900/60 to-cyan-800/40",
    chipBorder: "border-cyan-400/50",
    gradient: "from-cyan-200 via-cyan-300 to-cyan-400",
    scanGradient: "rgba(34, 211, 238, 0.3)",
  },
  magenta: {
    glow: "from-magenta-500/30 to-magenta-600/20",
    border: "border-magenta-400/50",
    chip: "from-magenta-900/60 to-magenta-800/40",
    chipBorder: "border-magenta-400/50",
    gradient: "from-magenta-200 via-magenta-300 to-magenta-400",
    scanGradient: "rgba(219, 39, 119, 0.3)",
  },
  "purple-blue": {
    glow: "from-purple-500/30 to-blue-600/20",
    border: "border-purple-400/50",
    chip: "from-purple-900/60 to-blue-800/40",
    chipBorder: "border-purple-400/50",
    gradient: "from-purple-200 via-blue-300 to-purple-400",
    scanGradient: "rgba(147, 112, 219, 0.3)",
  },
  aqua: {
    glow: "from-teal-500/30 to-teal-600/20",
    border: "border-teal-400/50",
    chip: "from-teal-900/60 to-teal-800/40",
    chipBorder: "border-teal-400/50",
    gradient: "from-teal-200 via-teal-300 to-teal-400",
    scanGradient: "rgba(32, 201, 201, 0.3)",
  },
  lavender: {
    glow: "from-purple-400/30 to-pink-400/20",
    border: "border-purple-300/50",
    chip: "from-purple-800/60 to-pink-700/40",
    chipBorder: "border-purple-300/50",
    gradient: "from-purple-100 via-pink-200 to-purple-300",
    scanGradient: "rgba(196, 181, 253, 0.3)",
  },
}

export function TechArtifactCard({
  title,
  description,
  tags,
  image,
  demoUrl,
  repoUrl,
  screenshots = [],
  accentColor = "violet",
}: TechArtifactCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scanPosition, setScanPosition] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(0)

  const colors = colorMap[accentColor]

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanPosition((prev) => (prev + 2) % 100)
    }, 50)

    const rotationInterval = setInterval(() => {
      setRotationAngle((prev) => (prev + 2) % 360)
    }, 30)

    return () => {
      clearInterval(scanInterval)
      clearInterval(rotationInterval)
    }
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="group cursor-pointer relative"
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r ${colors.glow}`}
          style={{ filter: "blur(20px)" }}
        />

        {/* Main glass card container with 3 stacked layers */}
        <div className="relative h-full">
          {/* Layer 3 - Back glass layer with depth */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-3xl border ${colors.border} opacity-50 transform -z-10`}
            style={{
              transform: isHovered ? "translateZ(-12px) scale(0.98)" : "translateZ(0) scale(1)",
              transition: "transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)",
            }}
          />

          {/* Layer 2 - Middle glass layer */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/8 via-white/4 to-transparent backdrop-blur-2xl border ${colors.border} transform`}
            style={{
              transform: isHovered ? "translateY(-6px)" : "translateY(0)",
              transition: "transform 0.35s cubic-bezier(0.23, 1, 0.320, 1)",
            }}
          />

          {/* Layer 1 - Front glass layer (interactive) */}
          <div
            className={`relative rounded-2xl bg-gradient-to-br from-white/10 to-white/3 backdrop-blur-xl border ${colors.border} overflow-hidden h-full flex flex-col shadow-2xl`}
            style={{
              transform: isHovered ? "translateY(-8px)" : "translateY(0)",
              transition: "transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)",
            }}
          >
            {/* Neon edge glow effect - glows on hover */}
            <div
              className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              style={{
                background: `conic-gradient(from ${scanPosition * 3.6}deg, transparent 40%, ${colors.scanGradient} 50%, transparent 60%)`,
              }}
            />

            {/* Diagonal scanning light - continuous animation */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
              style={{
                background: `linear-gradient(135deg, transparent 30%, ${colors.scanGradient} 50%, transparent 70%)`,
                animation: `scan 10s linear infinite`,
                opacity: 0.4,
              }}
            />

            {/* Image section with holographic effect */}
            <div className="relative overflow-hidden h-56 flex-shrink-0 group/img">
              <div
                className={`absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-20" />
              <motion.img
                src={image || `/placeholder.svg?height=400&width=600&query=${title} project interface`}
                alt={title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
              />
              {/* Holographic particle overlay */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                  zIndex: 15,
                }}
              />
            </div>

            {/* Content section */}
            <div className="p-6 flex-grow flex flex-col relative z-10">
              <motion.div className="relative mb-2" animate={{ y: isHovered ? -3 : 0 }} transition={{ duration: 0.3 }}>
                <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors.gradient}`}>
                  {title}
                </h3>
                <div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                  style={{
                    width: title.length * 6,
                    background: `linear-gradient(90deg, transparent, ${colors.scanGradient}, transparent)`,
                    filter: "blur(2px)",
                  }}
                />
              </motion.div>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tags.slice(0, 3).map((tag, index) => (
                  <motion.div
                    key={index}
                    className="relative group/chip"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.2, delay: index * 0.08 }}
                  >
                    {/* Microchip glow background */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} rounded-full opacity-0 group-hover/chip:opacity-100 blur transition duration-300`}
                    />

                    {/* Microchip element */}
                    <div
                      className={`relative px-3 py-1.5 bg-gradient-to-r ${colors.chip} backdrop-blur-sm border ${colors.chipBorder} rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-lg`}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shadow-glow"
                        style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.6)" }}
                      />
                      <span className="text-white/90">{tag}</span>
                      {/* Microchip visual accent */}
                      <div className="w-1 h-1 rounded-full bg-white/30 ml-0.5" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex justify-between gap-3 mt-auto pt-4 border-t border-white/10">
                <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full text-zinc-300 hover:text-white hover:bg-white/10 border ${colors.border} hover:${colors.border}`}
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </Link>
                <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${colors.gradient} hover:opacity-90 border ${colors.border} text-black font-semibold`}
                  >
                    Live
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <motion.div
              className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ rotate: isHovered ? rotationAngle : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 ${colors.border} flex items-center justify-center`}
                style={{ borderTopColor: "transparent" }}
              >
                <div className="w-1 h-1 rounded-full bg-white/60" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <TechArtifactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        screenshots={screenshots.length > 0 ? screenshots : [image]}
        demoUrl={demoUrl}
        repoUrl={repoUrl}
        tags={tags}
        accentColor={accentColor}
      />

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  )
}
