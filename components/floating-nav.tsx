"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

  const navItems = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Close mobile menu if open
    if (isMobile) {
      setIsOpen(false);
    }

    // Get the target section
    const targetId = href.replace("#", "");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Calculate offset for fixed nav (64px = h-16)
      const navHeight = 64;
      const targetPosition = targetSection.offsetTop - navHeight;

      // Smooth scroll to section
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative bg-transparent">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-700/5 via-transparent to-zinc-600/5 pointer-events-none" />

          <div className="container mx-auto px-6">
            <div className="relative flex items-center justify-between h-16">
              <Link href="/" className="relative group">
                <span className="font-sans font-light text-xl tracking-tight">
                  <span
                    className="relative text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #d4d4d8, #ffffff, #e4e4e7)",
                      textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    Abdulazez
                  </span>
                </span>
                {/* Glow effect on hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-zinc-700/10 to-zinc-600/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Desktop Navigation */}
              {!isMobile && (
                <div className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.name}
                      {/* Hover underline effect */}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-zinc-400 to-white group-hover:w-3/4 transition-all duration-300" />
                    </Link>
                  ))}

                  {/* <Button
                    size="sm"
                    className="ml-4 relative overflow-hidden bg-gradient-to-r from-black via-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-black border border-zinc-700 rounded-full px-6 font-semibold shadow-lg shadow-zinc-800/25 hover:shadow-zinc-700/25 transition-all duration-300"
                  >
                    <span className="relative z-10 text-white">Resume</span>
                  </Button> */}
                </div>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-white/5"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full pt-16">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="block px-8 py-4 text-2xl font-medium text-white hover:text-zinc-300 transition-colors"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
            >
              <Button className="mt-6 bg-gradient-to-r from-black via-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-black border border-zinc-700 rounded-full px-8 py-6 text-lg font-semibold">
                Resume
              </Button>
            </motion.div> */}
          </div>
        </motion.div>
      )}
    </>
  );
}
