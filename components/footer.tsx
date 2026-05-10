"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { SiLeetcode, SiWhatsapp } from "react-icons/si";

export function Footer() {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/abzaek", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/abzaek", label: "LinkedIn" },
    { icon: SiWhatsapp, href: "https://wa.me/251985045300", label: "WhatsApp" },
    { icon: SiLeetcode, href: "https://leetcode.com/abzaek", label: "LeetCode" },
    { icon: Mail, href: "mailto:me@abzaek.dev", label: "Email" },
  ];

  return (
    <footer className="relative py-16 bg-noir-surface-2 bg-grid border-t border-noir-line overflow-hidden">

      <div className="container max-w-container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-noir-accent">{"<"}</span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-noir-text">
                  Abdulazez Zeinu
                </h3>
                <span className="font-mono text-noir-accent">{"/>"}</span>
              </div>
              <p className="text-noir-text-mute text-sm">
                Developed with <span className="text-noir-accent">▮</span> by
                Abdulazez Zeinu.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center justify-center w-10 h-10 rounded
                             bg-noir-surface-1 border border-noir-line text-noir-text-mute
                             transition-colors duration-200
                             hover:border-noir-accent hover:text-noir-accent"
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-noir-text-faint">
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-2 flex justify-start lg:justify-end"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={handleScrollToContact}
              className="group relative px-8 py-5 rounded-lg bg-noir-surface-1 border border-noir-line
                         transition-[border-color,box-shadow] duration-200
                         hover:border-noir-accent/50 hover:shadow-noir-glow"
              aria-label="Scroll to contact section"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-noir-text group-hover:text-noir-accent transition-colors">
                  Let's Talk
                </span>
                <div className="flex items-center justify-center w-10 h-10 rounded
                                bg-noir-accent/10 border border-noir-accent/30 text-noir-accent
                                transition-transform duration-300 group-hover:-translate-y-1">
                  <ArrowUp className="w-5 h-5" />
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 h-px bg-noir-line"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </footer>
  );
}
