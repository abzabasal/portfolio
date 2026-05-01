"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { ProjectData } from "./projects-section";
// react-markdown ships non-ESModule typings; silence the import error
// @ts-ignore: react-markdown's type declaration is not a module
import ReactMarkdown from "react-markdown";

import { ProjectGallery } from "./project-gallery";

interface CaseStudyModalProps {
  project: ProjectData;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onNext,
  onPrev,
}: CaseStudyModalProps) {
  const [navDirection, setNavDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setNavDirection("next");
        onNext();
      }
      if (e.key === "ArrowLeft") {
        setNavDirection("prev");
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const slideVariants = {
    initial: (direction: "next" | "prev") => ({
      opacity: 0,
      y: direction === "next" ? 16 : -16,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" as const },
    },
    exit: (direction: "next" | "prev") => ({
      opacity: 0,
      y: direction === "next" ? -16 : 16,
      transition: { duration: 0.18, ease: "easeIn" as const },
    }),
  };

  const handleNext = () => {
    setNavDirection("next");
    onNext();
  };

  const handlePrev = () => {
    setNavDirection("prev");
    onPrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center px-3 md:px-12"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded
                   bg-noir-surface-1 border border-noir-line text-noir-text-mute
                   transition-colors duration-200
                   hover:border-noir-accent hover:text-noir-accent z-50"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded
                   bg-noir-surface-1 border border-noir-line text-noir-text-mute
                   transition-colors duration-200
                   hover:border-noir-accent hover:text-noir-accent z-50"
        aria-label="Next project"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1200px] h-[90vh] md:h-[85vh]
                   bg-noir-surface border border-noir-line rounded-lg overflow-hidden flex flex-col
                   shadow-noir-lift"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded
                     bg-noir-surface-1 border border-noir-line text-noir-text-mute
                     transition-colors duration-200
                     hover:border-noir-accent hover:text-noir-accent"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait" initial={false} custom={navDirection}>
          <motion.div
            key={project.id}
            custom={navDirection}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex flex-col"
          >
            <div className="relative px-6 md:px-10 py-6 md:py-7 border-b border-noir-line bg-noir-surface-dim z-20 shrink-0">
              <div className="flex items-start md:items-center justify-between gap-6 flex-col md:flex-row">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-6 bg-noir-accent/60" />
                    <span className="noir-label text-noir-accent">
                      Case Study
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-noir-text leading-tight">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-noir-text-mute max-w-2xl leading-relaxed">
                    {project.caseStudy.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="noir-chip-neutral">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="noir-btn-primary shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live site
                </a>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
              <div className="w-full md:w-[40%] h-full overflow-y-auto px-6 md:px-10 py-8 bg-noir-surface border-r border-noir-line">
                <article className="prose prose-invert prose-sm md:prose-base max-w-none
                                    prose-headings:font-display prose-headings:tracking-tight prose-headings:text-noir-text
                                    prose-h1:text-2xl prose-h1:mb-4
                                    prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                                    prose-p:text-noir-text-mute prose-p:leading-relaxed
                                    prose-strong:text-noir-text prose-strong:font-semibold
                                    prose-li:text-noir-text-mute prose-li:my-1
                                    prose-a:text-noir-accent prose-a:no-underline hover:prose-a:underline">
                  <ReactMarkdown>
                    {project.caseStudy.markdownContent ||
                      project.caseStudy.description}
                  </ReactMarkdown>
                </article>
              </div>

              <div className="w-full md:w-[60%] h-[420px] md:h-full bg-noir-surface-dim relative overflow-hidden">
                <ProjectGallery images={project.caseStudy.images} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
