"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative p-[2px] rounded-2xl overflow-hidden group">
        {/* Rotating gradient border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "conic-gradient(from var(--border-angle, 0deg), #ffffff, #71717a, #ffffff, #a1a1aa, #ffffff)",
            animation: "rotateBorder 8s linear infinite",
          }}
        />

        {/* Glow effect behind border */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: "conic-gradient(from var(--border-angle, 0deg), #ffffff, #71717a, #ffffff)",
            animation: "rotateBorder 8s linear infinite",
          }}
        />

        {/* Inner card with glassmorphism */}
        <div className="relative rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/30 overflow-hidden">
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 p-8">
            <h3 className="text-2xl font-bold mb-2 text-white">Send Me a Message</h3>

            <p className="text-zinc-400 mb-6 flex items-center gap-2 flex-wrap">
              Or reach me directly at{" "}
              <a
                href="mailto:abzaeko@gmail.com"
                className="inline-flex items-center gap-1.5 text-white hover:text-zinc-300 transition-colors font-medium group/email"
              >
                <Mail className="w-4 h-4" />
                <span className="underline underline-offset-2 decoration-zinc-500 group-hover/email:decoration-white transition-colors">
                  abzaeko@gmail.com
                </span>
              </a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  placeholder="Your Name"
                  required
                  className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Subject"
                  required
                  className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 resize-none focus:border-zinc-400/60 focus:ring-1 focus:ring-zinc-400/30 focus-visible:ring-zinc-400/30 focus-visible:ring-offset-0 focus-visible:border-zinc-400/60 transition-all duration-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 text-white hover:from-zinc-700 hover:via-zinc-600 hover:to-zinc-700 font-semibold border border-zinc-600/50 h-12 text-base transition-all duration-300 hover:border-zinc-500/70 hover:shadow-lg hover:shadow-zinc-500/10"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
