"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, FileText, ExternalLink } from "lucide-react"

export function CreativeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundImageRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const offsetX = (x - centerX) * 0.03
      const offsetY = (y - centerY) * 0.03

      setMousePosition({ x: offsetX, y: offsetY })

      // Update background image parallax
      if (backgroundImageRef.current) {
        backgroundImageRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        {/* Pure black left 60% overlay */}
        <div className="absolute inset-0 left-0 right-[40%] bg-black z-5" />

        <div
          ref={backgroundImageRef}
          className="absolute top-0 right-0 w-[40%] h-full bg-cover bg-center transition-transform duration-100 ease-out"
          style={{
            backgroundImage: "url(/hero-atmospheric-bg.jpg)",
            opacity: 0.7,
          }}
        />

        {/* Gradient overlay for center area black fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      </div>

      <motion.div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[80vh] pt-16">
            {/* Left 60% - Single headline with staggered text animation */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
                <motion.span
                  className="block relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  <span
                    className="text-transparent bg-clip-text animate-holographic"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #ec4899, #06b6d4, #ec4899, #06b6d4)",
                      backgroundSize: "300% 300%",
                    }}
                  >
                    Creative
                  </span>
                </motion.span>
                <motion.span
                  className="block text-white mt-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                >
                  Developer
                </motion.span>
              </div>

              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Building immersive web experiences with cutting-edge technologies and pixel-perfect precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold text-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  View My Work
                  <ExternalLink className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right 40% - Profile photo and prominent social links */}
            <motion.div
              className="lg:col-span-2 flex flex-col items-center lg:items-end space-y-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Profile Avatar with glow */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />
                <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-white/10">
                  <img
                    src="/professional-developer-portrait-dark-background.png"
                    alt="Developer portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow effect */}
                    <div
                      className="absolute -inset-3 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ backgroundColor: link.glow }}
                    />

                    {/* Icon container - larger size */}
                    <div
                      className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${link.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <link.icon className="w-7 h-7 text-zinc-900" />
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
    </div>
  )
}
