"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AwwwardsCard } from "./awwwards-card";
import { CaseStudyModal } from "./case-study-modal";
import { SectionHeading } from "./section-heading";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  caseStudy: {
    title: string;
    description: string;
    markdownContent: string;
    images: {
      src: string;
      size: "hero" | "vertical" | "square" | "small";
    }[];
    liveUrl: string;
    githubUrl: string;
  };
}

const REISEARCH_LIVE = "https://reisearch.com";

const projects: ProjectData[] = [
  {
    id: "reisearch",
    title: "Reisearch Platform",
    description:
      "A real estate investment platform built by a small engineering team. 34 frontend modules, 16 Go microservices, 23+ DynamoDB tables, an AI Copilot, and a 9.6M-record market data pipeline. Several core modules are mine end to end.",
    tags: [
      "React 19",
      "TypeScript",
      "Go",
      "Python",
      "AWS",
      "DynamoDB",
      "Serverless",
    ],
    thumbnail: "/projects/reisearch/dashboard.png",
    caseStudy: {
      title: "Reisearch Platform",
      description:
        "An entire real estate investment platform architected and shipped end to end.",
      markdownContent: `
# Project Overview

Reisearch is a complete real estate investment platform built by a small engineering team. Investors use it to find comparable properties, study local markets, model deal economics, and visualize what a property could become after renovation.

## By the Numbers

- **34 feature modules** in the React 19 frontend.
- **16 Go microservices** behind the platform API.
- **23+ DynamoDB tables** designed for the access patterns the product actually needs.
- **9.6M housing market records** ingested into queryable form.
- **40% reduction** in infrastructure costs after the AWS architecture redesign.
- **30% reduction** in production bugs after introducing strict typing, hypothesis-based tests, and pre-commit gates.
- **25% increase** in user engagement after the redesign.

## My Ownership Inside the Platform

Several systems on the platform are mine end to end. Designed, shipped, maintained:

- **Comps Orchestration Pipeline (Go):** the 40-minute to 4-minute throughput rebuild.
- **AI Renovation Copilot (Python / FastAPI):** OpenAI plus Gemini, real-time streaming, itemized cost estimates.
- **Market Data Pipeline:** 9.6M housing records normalized into queryable DynamoDB tables at every geographic level.

I also contributed to the broader frontend module work, the API design, and the AWS architecture redesign. Plus mentorship of other engineers on Clean Architecture practices.

## Platform-Wide Implementation

- **Serverless Core:** AWS Lambda, API Gateway, DynamoDB single-table design, S3 pre-signed assets, SQS pipelines, Cognito JWT.
- **Data & ML:** LightFM hybrid recommender, geospatial proximity weighting, social graph signals.
- **Frontend Experience:** React 19 / Next.js with rich data visualizations, map search, responsive layouts.
- **Reliability:** Containerized workers, background training jobs, structured logging and metrics.

## Architecture Style

Clean Architecture throughout. Handlers, services, repositories. Business logic never touches HTTP or database code directly. Every function testable in isolation. The system can swap DynamoDB for Postgres without rewriting a single business rule.
      `,
      images: [
        { src: "/projects/reisearch/dashboard.png", size: "hero" },
        { src: "/projects/reisearch/comparables.png", size: "hero" },
        { src: "/projects/reisearch/marketplace.png", size: "hero" },
        { src: "/projects/reisearch/demographics.png", size: "square" },
        { src: "/projects/reisearch/folders.png", size: "square" },
        {
          src: "/projects/reisearch/messaging-fullscreen.png",
          size: "vertical",
        },
        { src: "/projects/reisearch/create-post.png", size: "hero" },
        { src: "/projects/reisearch/properties.png", size: "vertical" },
        { src: "/projects/reisearch/settings.png", size: "vertical" },
        { src: "/projects/reisearch/publish-property.png", size: "hero" },
        { src: "/projects/reisearch/notifications.png", size: "square" },
        { src: "/projects/reisearch/integration.png", size: "square" },
        { src: "/projects/reisearch/comparables-darkmode.png", size: "hero" },
        { src: "/projects/reisearch/presentation1.png", size: "vertical" },
        { src: "/projects/reisearch/presentation2.png", size: "vertical" },
        { src: "/projects/reisearch/presentation-templates.png", size: "hero" },
        { src: "/projects/reisearch/porfile.png", size: "vertical" },
        { src: "/projects/reisearch/subscription-plans.png", size: "square" },
        { src: "/projects/reisearch/messaging.png", size: "square" },
      ],
      liveUrl: REISEARCH_LIVE,
      githubUrl: "#",
    },
  },
  {
    id: "renovation-copilot",
    title: "Renovation Copilot",
    description:
      "An AI copilot that generates photorealistic renovation previews in 30 seconds. Streams results in real time. Produces line-item cost estimates. What used to take days, in a single conversation.",
    tags: [
      "OpenAI",
      "Google Gemini",
      "FastAPI",
      "SSE Streaming",
      "Python",
    ],
    thumbnail: "/projects/reisearch/create-post.png",
    caseStudy: {
      title: "Renovation Copilot",
      description:
        "An AI assistant that turns a fixer-upper photo into a renovation plan with photorealistic previews and itemized costs.",
      markdownContent: `
# The Problem

Investors couldn't visualize what a fixer-upper could become. Hiring designers cost thousands of dollars and took weeks. They were guessing on renovation budgets, and bad guesses meant bad deals.

# The Solution

I built an AI Copilot that turns a property photo and a few prompts into a complete renovation plan:

- **Photorealistic previews** generated via OpenAI and Google Gemini.
- **Real-time streaming** so the user sees output appear as it generates, instead of waiting for a long synchronous request.
- **Line-item cost estimates** broken down by room, material, and labor.

What used to be a multi-day, multi-person process became a 30-second AI conversation.

## Stack

- **Python / FastAPI** orchestrator with strict Pydantic schemas at every API boundary.
- **Server-Sent Events** for streaming model output to the React frontend.
- **OpenAI + Gemini** as the primary model providers, with prompt routing logic to choose the right model per task.
- **Cost-estimation engine** in Python, fed by a curated material/labor catalog.

## Why It Works

The product solves a real, measurable problem investors had. The AI part is just the implementation detail; the win is that someone can now stand on a property and price out a renovation in real time.
      `,
      images: [
        { src: "/projects/reisearch/create-post.png", size: "hero" },
        { src: "/projects/reisearch/properties.png", size: "vertical" },
        { src: "/projects/reisearch/publish-property.png", size: "hero" },
        { src: "/projects/reisearch/presentation1.png", size: "vertical" },
      ],
      liveUrl: REISEARCH_LIVE,
      githubUrl: "#",
    },
  },
  {
    id: "market-data-pipeline",
    title: "Market Data Pipeline",
    description:
      "9.6M housing market records ingested into queryable DynamoDB tables at every geographic level: ZIP, city, county, metro, state, national. Plus a chart-rendering Lambda that turns raw rows into investable visualizations.",
    tags: [
      "Pandas",
      "NumPy",
      "DynamoDB",
      "AWS Lambda",
      "ETL",
      "Python",
    ],
    thumbnail: "/projects/reisearch/marketplace.png",
    caseStudy: {
      title: "Market Data Pipeline",
      description:
        "A 9.6M-record housing data pipeline that turned raw government TSV files into a queryable analytics layer.",
      markdownContent: `
# The Problem

Investors were making decisions without market context. Redfin publishes housing statistics as raw TSV files. Useful for a data engineer, useless for a real estate professional.

# The Solution

A pipeline that ingests, normalizes, and partitions 9.6M housing records:

- **Geographic hierarchy:** ZIP, city, county, metro, state, national. Each level queryable independently.
- **DynamoDB single-table design** sized for the actual access patterns: "show me median list price for Phoenix metro over the last 12 months" returns in milliseconds.
- **Chart-rendering Lambda** that produces investor-ready visualizations on demand.
- **99.8% data accuracy** across 10+ scraping and ingestion sources, validated against ground-truth samples.

## Stack

- **Python + Pandas / NumPy** for ingestion, cleaning, and aggregation.
- **AWS Lambda** for the pipeline runner and the chart-rendering service.
- **DynamoDB** with thoughtful partition / sort key design and conditional writes.
- **SQS** for fan-out, idempotency, and retry semantics.

## Outcome

Investors went from blind to informed. The same data that used to require a data team to interpret became a single click in the platform.
      `,
      images: [
        { src: "/projects/reisearch/marketplace.png", size: "hero" },
        { src: "/projects/reisearch/demographics.png", size: "square" },
        { src: "/projects/reisearch/presentation1.png", size: "vertical" },
        { src: "/projects/reisearch/presentation2.png", size: "vertical" },
        { src: "/projects/reisearch/presentation-templates.png", size: "hero" },
      ],
      liveUrl: REISEARCH_LIVE,
      githubUrl: "#",
    },
  },
  {
    id: "comps-engine",
    title: "Comps Engine",
    description:
      "Scrapes 4 real estate sources at 99.8% data accuracy. Hybrid recommender with geospatial scoring tells investors what a property is actually worth.",
    tags: ["Go", "Workers", "LightFM", "Geospatial", "ETL"],
    thumbnail: "/projects/reisearch/comparables-darkmode.png",
    caseStudy: {
      title: "Comps Engine",
      description:
        "A scraping and ranking system that produces comparable-property analysis from four data sources.",
      markdownContent: `
# The Problem

Comparable-property analysis is the foundation of every real estate decision. The available comps tools either pulled from a single source (and missed half the market) or required hours of manual digging.

# The Solution

A Go-based comps engine:

- **Scrapes 4 real estate sources** in parallel using a worker pool. Concurrency tuned to respect rate limits while keeping latency low.
- **99.8% data accuracy** validated against ground-truth samples and refreshed continuously.
- **LightFM hybrid recommender** with geospatial proximity weighting and social-graph signals to rank "what's actually comparable" instead of naive distance matching.
- **Reusable ETL framework** so adding a new source is a small contract change, not a rewrite.

## Why Go

The original implementation was sequential Python. A 40-minute job became 4 minutes after I rebuilt the orchestration in Go with proper worker pools, channels, and DynamoDB-backed state. Same workload, 10x throughput.

## Outcome

Comps that used to take an investor an afternoon now run in seconds. The ranking quality is good enough that investors trust the top 5 results without manual review.
      `,
      images: [
        { src: "/projects/reisearch/comparables.png", size: "hero" },
        { src: "/projects/reisearch/comparables-darkmode.png", size: "hero" },
        { src: "/projects/reisearch/properties.png", size: "vertical" },
      ],
      liveUrl: REISEARCH_LIVE,
      githubUrl: "#",
    },
  },
  {
    id: "deal-monitor",
    title: "Deal Monitor",
    description:
      "Watches properties 24/7. Alerts the moment a price drops, a new listing matches your criteria, or a market signal changes. Built on Go workers, SQS queues, and scheduled crons.",
    tags: ["Go", "AWS SQS", "EventBridge", "Webhooks", "Cron"],
    thumbnail: "/projects/reisearch/notifications.png",
    caseStudy: {
      title: "Deal Monitor",
      description:
        "A 24/7 property-watching service that alerts investors when their criteria match.",
      markdownContent: `
# The Problem

Real estate moves fast. By the time an investor sees a price drop, the deal is gone. Manual checking doesn't scale past a handful of properties.

# The Solution

A monitoring service that runs around the clock:

- **Go workers** poll target sources on a tunable schedule, with backoff and jitter to stay polite.
- **AWS SQS** for fan-out, dead-letter handling, and at-least-once delivery semantics.
- **EventBridge cron rules** trigger heavier scans during high-signal hours.
- **Webhook + email + in-app** delivery so the alert reaches the investor wherever they actually are.
- **De-duplication and rate-limiting** so a single price drop doesn't generate 50 notifications.

## Architecture

Clean event flow: poller → queue → differ → alerter → delivery. Each stage independent, observable, and replayable. Every alert can be traced from delivered notification back to the exact source observation that triggered it.

## Outcome

Investors who set up monitors tend to act on the first alert they receive. The system has effectively replaced "checking listings every morning" for the investors who use it.
      `,
      images: [
        { src: "/projects/reisearch/notifications.png", size: "square" },
        { src: "/projects/reisearch/integration.png", size: "square" },
        { src: "/projects/reisearch/messaging.png", size: "square" },
      ],
      liveUrl: REISEARCH_LIVE,
      githubUrl: "#",
    },
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    setSelectedProject(projects[(currentIndex + 1) % projects.length]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    setSelectedProject(
      projects[(currentIndex - 1 + projects.length) % projects.length]
    );
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-noir-surface-2 bg-grid">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <SectionHeading title="Featured Projects" subtitle="Selected Work" />
          <p className="mt-4 text-noir-text-mute leading-relaxed">
            Five shipped systems under one roof. Reisearch is the platform.
            The other four are the modules that make it work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AwwwardsCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
