"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Github, Linkedin, FileText, ExternalLink, Sparkles } from "lucide-react"
import { SentientSphere } from "./3d-sphere"
// Particle interface
interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

export function CreativeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isHoveringText, setIsHoveringText] = useState(false)

  // Mouse position for parallax and magnetic effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations for mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Parallax transforms
  const parallaxX = useTransform(smoothMouseX, [-500, 500], [-20, 20])
  const parallaxY = useTransform(smoothMouseY, [-500, 500], [-20, 20])
  const parallaxXSlow = useTransform(smoothMouseX, [-500, 500], [-10, 10])
  const parallaxYSlow = useTransform(smoothMouseY, [-500, 500], [-10, 10])

  // Generate particles on mount
  useEffect(() => {
    const colors = [
      "rgba(236, 72, 153, 0.6)", // pink
      "rgba(6, 182, 212, 0.6)",  // cyan
      "rgba(168, 85, 247, 0.6)", // purple
      "rgba(59, 130, 246, 0.6)", // blue
      "rgba(251, 146, 60, 0.6)", // orange
    ]

    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setParticles(newParticles)
  }, [])

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      mouseX.set(x)
      mouseY.set(y)

      // Magnetic button effect
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const buttonCenterX = buttonRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top + buttonRect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
        )

        if (distance < 150) {
          const angle = Math.atan2(e.clientY - buttonCenterY, e.clientX - buttonCenterX)
          const pullStrength = Math.max(0, 1 - distance / 150) * 20
          const offsetX = Math.cos(angle) * pullStrength
          const offsetY = Math.sin(angle) * pullStrength

          buttonRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`
        } else {
          buttonRef.current.style.transform = "translate(0, 0) scale(1)"
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
      color: "from-zinc-400 to-zinc-200",
      glow: "rgba(161, 161, 170, 0.6)",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "from-blue-400 to-blue-500",
      glow: "rgba(59, 130, 246, 0.6)",
    },
    {
      icon: FileText,
      href: "/resume.pdf",
      label: "Resume",
      color: "from-emerald-400 to-emerald-500",
      glow: "rgba(52, 211, 153, 0.6)",
    },
  ]

  // Split text into characters for animation
  const creativeText = "Creative"
  const developerText = "Developer"

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black">

      {/* Particle System */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border-2 border-pink-500/30 rounded-full blur-sm"
        style={{ x: parallaxX, y: parallaxY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 left-40 w-24 h-24 border-2 border-cyan-500/30 blur-sm"
        style={{ x: parallaxXSlow, y: parallaxYSlow, rotate: 45 }}
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute animate-float-slow top-40 right-32 w-20 h-20 bg-purple-500/10 rounded-full blur-md"
        style={{ x: parallaxX, y: parallaxYSlow }}

      />
      <div className="absolute inset-0">
        <SentientSphere />
      </div>
      <motion.div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[80vh] pt-16">
            {/* Left 60% - Animated Text */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
                {/* "Creative" with character animation */}
                <motion.div
                  className="block relative"
                  onMouseEnter={() => setIsHoveringText(true)}
                  onMouseLeave={() => setIsHoveringText(false)}
                >
                  <div className="flex">
                    {creativeText.split("").map((char, index) => (
                      <motion.span
                        key={`creative-${index}`}
                        className={`inline-block animate-holographic text-transparent bg-clip-text ${isHoveringText ? "animate-glitch" : ""
                          }`}
                        style={{
                          backgroundImage: "linear-gradient(135deg, #ec4899, #06b6d4, #a855f7, #ec4899)",
                          backgroundSize: "300% 300%",
                          textShadow: "0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)",
                        }}
                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + index * 0.05,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}

                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* "Developer" with character animation */}
                <motion.div className="block mt-2">
                  <div className="flex">
                    {developerText.split("").map((char, index) => (
                      <motion.span
                        key={`developer-${index}`}
                        className="inline-block text-white"
                        style={{
                          textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                        }}
                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.7 + index * 0.05,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Building immersive web experiences with cutting-edge technologies and pixel-perfect precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <a
                  ref={buttonRef}
                  href="#projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 relative overflow-hidden group"
                  style={{ willChange: "transform" }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

                  <Sparkles className="w-5 h-5 animate-pulse" />
                  View My Work
                  <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right 40% - Profile and Social Links */}
            <motion.div
              className="lg:col-span-2 flex flex-col items-center lg:items-end space-y-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Profile Avatar with 3D tilt and glow */}
              <motion.div
                className="relative group perspective-1000"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse-glow" />
                <motion.div
                  className="relative w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    rotateY: 15,
                    rotateX: -10,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src="/professional-developer-portrait-dark-background.png"
                    alt="Developer portrait"
                    className="w-full h-full object-cover"
                  />
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </motion.div>

              {/* Social Links with enhanced animations */}
              <div className="flex items-center gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{ scale: 1.2, y: -8, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Animated glow ring */}
                    <motion.div
                      className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ backgroundColor: link.glow }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Icon container */}
                    <div
                      className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${link.color} shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                    >
                      <link.icon className="w-7 h-7 text-zinc-900 group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-zinc-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  )
}
