"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [0, 0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX, opacity }}
    />
  )
}
