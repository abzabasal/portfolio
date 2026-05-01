"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "./projects-section";

interface AwwwardsCardProps {
  project: ProjectData;
  index: number;
  onSelect: () => void;
}

export function AwwwardsCard({ project, index, onSelect }: AwwwardsCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative h-96 w-full text-left overflow-hidden rounded-lg
                 bg-noir-surface-1 border border-noir-line
                 transition-[border-color,transform,box-shadow] duration-300
                 hover:-translate-y-1 hover:border-noir-accent/40 hover:shadow-noir-glow
                 focus:outline-none focus-visible:border-noir-accent focus-visible:shadow-noir-glow"
      aria-label={`Open case study: ${project.title}`}
    >
      <img
        src={project.thumbnail || "/placeholder.svg"}
        alt=""
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover
                   opacity-50 saturate-50 transition-[opacity,filter,transform] duration-500 ease-out
                   group-hover:opacity-90 group-hover:saturate-100 group-hover:scale-[1.03]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-noir-bg via-noir-bg/85 to-noir-bg/30" />

      {/* Cyan accent edge that lights up on hover */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-noir-accent/0 group-hover:bg-noir-accent/60 transition-colors duration-300"
      />

      <div className="relative h-full p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-3">
          <span className="noir-label">
            {String(index + 1).padStart(2, "0")} / Case Study
          </span>
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full
                       border border-noir-line text-noir-text-soft
                       transition-colors duration-200
                       group-hover:border-noir-accent group-hover:text-noir-accent"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-2xl md:text-[28px] font-bold tracking-tight text-noir-text leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-noir-text-mute line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="noir-chip-neutral">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
