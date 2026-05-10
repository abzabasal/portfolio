"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const STAT_BLOCKS = [
  { value: "7", label: "Products Shipped" },
  { value: "4 yrs", label: "Pro Experience" },
  { value: "3", label: "Languages" },
  { value: "700+", label: "Problems Solved" },
];

const CHIPS = [
  { k: "EXPERIENCE", v: "4 YRS" },
  { k: "GPA", v: "3.9 / 4.0" },
  { k: "INSTITUTE", v: "AAiT" },
  { k: "STATUS", v: "OPEN_FOR_BUILDS" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container max-w-container-max relative z-10 px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="border-l-2 border-noir-accent pl-6 max-w-3xl mb-12"
        >
          <div className="font-mono text-[14px] text-noir-accent mb-3">
            [ SECTION_01 // OPERATOR_PROFILE ]
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-noir-text uppercase leading-[1.1]">
            Who I Am.
          </h2>
        </motion.header>

        {/* 12-col bento: 7 narrative + 5 stat panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Narrative card */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="group md:col-span-7 relative bg-noir-surface-1 border border-noir-line-strong p-6 md:p-8 transition-colors duration-300 hover:border-noir-accent-bright"
          >
            <BlueprintCorners />
            <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-noir-text-faint mb-2">
              MODULE_ID: 0xAB_BIO
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-noir-text mb-5">
              Recent grad. Already shipping.
            </h3>

            <div className="space-y-4 text-noir-text-soft leading-relaxed">
              <p>
                Selected from thousands as one of{" "}
                <span className="text-noir-accent font-semibold">
                  Africa's top engineering talents
                </span>{" "}
                through a competitive engineering fellowship that trains
                students to compete at the global level. Came out of it with
                700+ LeetCode and Codeforces problems solved and an
                internship at Eskalate, where I led a small team building a
                Go-based blog platform.
              </p>
              <p>
                Graduated with a{" "}
                <span className="text-noir-accent font-semibold">
                  3.9 / 4.0 GPA
                </span>{" "}
                from{" "}
                <span className="text-noir-accent font-semibold">
                  Addis Ababa Institute of Technology
                </span>
                , Ethiopia's premier engineering school.
              </p>
              <p>
                Now at Reisearch on a small engineering team building the
                real estate investment platform. My ownership: the comps
                orchestration system, the AI Renovation Copilot, and the
                9.6M-record market data pipeline. Designed those end to end.
                Plus contributions to the broader frontend, API, and AWS
                architecture work, and mentorship of other engineers on
                Clean Architecture practices.
              </p>
              <p className="font-display font-semibold text-noir-text">
                I don't just write code. I ship products that people use.
              </p>
            </div>

            {/* Decorative chips */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {CHIPS.map((c) => (
                <span
                  key={c.k}
                  className="font-mono text-[11px] tracking-[0.04em] bg-noir-surface-2 border border-noir-line text-noir-text-soft px-2 py-1"
                >
                  [ {c.k}: <span className="text-noir-accent">{c.v}</span> ]
                </span>
              ))}
            </div>
          </motion.article>

          {/* Stat panel */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 grid grid-cols-2 gap-px bg-noir-line-strong border border-noir-line-strong relative"
          >
            <BlueprintCorners />
            {STAT_BLOCKS.map((s) => (
              <div
                key={s.label}
                className="bg-noir-surface-1 p-5 md:p-6 flex flex-col justify-between min-h-[120px]"
              >
                <span className="font-display text-3xl md:text-4xl font-bold tracking-[-0.04em] text-noir-accent leading-none">
                  {s.value}
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-noir-text-faint mt-3">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function BlueprintCorners(): ReactNode {
  return (
    <>
      <span aria-hidden className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
      <span aria-hidden className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-noir-text-faint group-hover:border-noir-accent-bright transition-colors" />
    </>
  );
}
