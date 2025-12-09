"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

export function Footer() {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/abzaek",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/abzaek",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/abzaek",
      label: "Twitter",
    },
    {
      icon: SiLeetcode,
      href: "https://leetcode.com/abzaek",
      label: "LeetCode",
    },
    {
      icon: Mail,
      href: "mailto:abzaek@ogmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="relative py-16 bg-gradient-to-t from-black via-zinc-950 to-zinc-900 overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle glow accents */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[200px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[150px] bg-zinc-400/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Asymmetrical grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Left Column - Branding & Social Links (spans 3 cols) */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Logo/Brand */}
            <div className="space-y-4">
              <h3
                className="text-2xl font-bold tracking-wider"
                style={{
                  textShadow:
                    "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)",
                }}
              >
                Abdulazez Zeinu
              </h3>
              <p className="text-zinc-400 text-lg">
                Developed with <span className="text-red-400">❤️</span> by
                Abdulazez Zeinu.
              </p>
            </div>

            {/* Glowing Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-2 rounded-full bg-white/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  {/* Icon container */}
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/50 group-hover:border-white/30 group-hover:bg-zinc-700/80 transition-all duration-300">
                    <link.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>

          {/* Right Column - Let's Talk CTA (spans 2 cols) */}
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={handleScrollToContact}
              className="group relative overflow-hidden"
              aria-label="Scroll to contact section"
            >
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-zinc-400/20 to-white/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-all duration-500" />

              {/* Button container */}
              <div className="relative px-10 py-6 rounded-2xl bg-zinc-900/90 border border-zinc-700/50 group-hover:border-white/30 backdrop-blur-sm transition-all duration-300">
                {/* Noise texture */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-[0.05] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <span
                    className="text-2xl md:text-3xl font-bold text-white group-hover:text-zinc-100 transition-colors"
                    style={{
                      textShadow: "0 0 30px rgba(255,255,255,0.2)",
                    }}
                  >
                    Let's Talk
                  </span>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <ArrowUp className="w-6 h-6 text-white transform group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Decorative line */}
        <motion.div
          className="mt-12 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        />
      </div>
    </footer>
  );
}
