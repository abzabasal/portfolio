"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useMobile } from "@/hooks/use-mobile";

const NAV_ITEMS = [
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Network", href: "#network" },
  { name: "Contact", href: "#contact" },
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const isMobile = useMobile();

  // Scroll-spy: highlight nav link for the section currently in view
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => Boolean(s));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with the largest intersectionRatio that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (isMobile) setIsOpen(false);

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      const navHeight = 64;
      window.scrollTo({
        top: target.offsetTop - navHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50 bg-noir-bg/80 backdrop-blur-md border-b border-noir-line"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-container-max mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-xl tracking-tighter text-noir-text"
          >
            ABZ_<span className="text-noir-accent">CORE</span>
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <div className="flex items-center gap-8 font-display tracking-tight text-sm">
              {NAV_ITEMS.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={
                      isActive
                        ? "text-noir-accent border-b-2 border-noir-accent pb-1 transition-colors"
                        : "text-noir-text-mute hover:text-noir-text border-b-2 border-transparent pb-1 transition-colors"
                    }
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          )}

          {/* Right side: Hire Me CTA (desktop) or menu toggle (mobile) */}
          {!isMobile ? (
            <a
              href="#network"
              onClick={(e) => handleNavClick(e, "#network")}
              className="bg-noir-accent-soft text-black px-5 py-2 rounded-sm
                         font-mono font-bold uppercase tracking-[0.1em] text-[12px]
                         transition-transform duration-200 hover:scale-95"
            >
              Hire Me
            </a>
          ) : (
            <button
              type="button"
              className="text-noir-text-mute hover:text-noir-text p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-noir-bg/95 backdrop-blur-md ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center h-full pt-16 gap-2">
            {NAV_ITEMS.map((item, index) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <a
                    href={item.href}
                    className={`font-display block px-8 py-4 text-2xl font-semibold transition-colors ${
                      isActive ? "text-noir-accent" : "text-noir-text"
                    }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                </motion.div>
              );
            })}
            <motion.a
              href="#network"
              onClick={(e) => handleNavClick(e, "#network")}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }}
              transition={{ duration: 0.25, delay: NAV_ITEMS.length * 0.04 }}
              className="mt-4 bg-noir-accent-soft text-black px-8 py-3 rounded-sm
                         font-mono font-bold uppercase tracking-[0.1em] text-[12px]"
            >
              Hire Me
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  );
}
