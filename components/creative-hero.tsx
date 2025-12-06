"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, FileText, ExternalLink } from "lucide-react"

export function CreativeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100])
  const parallaxOpacity = useTransform(scrollY, [0, 300], [1, 0.5])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let devicePixelRatio: number
    let animationId: number

    const setCanvasDimensions = () => {
      devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    window.addEventListener("mousemove", handleMouseMove)

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 2 + 1
        this.density = Math.random() * 30 + 1
        const hue = Math.random() * 60 + 270
        this.color = `hsla(${hue}, 70%, 60%, ${Math.random() * 0.05 + 0.08})`
      }

      update() {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance

        const maxDistance = 80
        const force = (maxDistance - distance) / maxDistance

        if (distance < maxDistance) {
          this.x -= forceDirectionX * force * this.density * 0.3
          this.y -= forceDirectionY * force * this.density * 0.3
        } else {
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 20
          }
          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 20
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    const particlesArray: Particle[] = []
    const gridSize = 28

    function init() {
      particlesArray.length = 0

      const canvasWidth = canvas.width / devicePixelRatio
      const canvasHeight = canvas.height / devicePixelRatio

      const startX = canvasWidth * 0.6
      const numX = Math.floor((canvasWidth - startX) / gridSize)
      const numY = Math.floor(canvasHeight / gridSize)

      for (let y = 0; y < numY; y++) {
        for (let x = 0; x < numX; x++) {
          const posX = startX + x * gridSize + gridSize / 2
          const posY = y * gridSize + gridSize / 2
          particlesArray.push(new Particle(posX, posY))
        }
      }
    }

    init()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()

        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 40) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(180, 120, 255, ${0.06 - distance / 800})`
            ctx.lineWidth = 0.3
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", init)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", init)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
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
    <div ref={containerRef} className="w-full h-full relative">
      <div className="absolute inset-0 bg-black" />

      <motion.div
        className="absolute top-0 right-0 w-[40%] h-full pointer-events-none"
        style={{ y: parallaxY, opacity: parallaxOpacity }}
      >
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[80vh] pt-16">
            {/* Left 60% - Single headline only */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
                <span className="block relative">
                  <span
                    className="text-transparent bg-clip-text animate-holographic"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #ec4899, #06b6d4, #ec4899, #06b6d4)",
                      backgroundSize: "300% 300%",
                    }}
                  >
                    Creative
                  </span>
                </span>
                <span className="block text-white mt-2">Developer</span>
              </h1>

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
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
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
      </div>
    </div>
  )
}
