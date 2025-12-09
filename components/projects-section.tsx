"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AwwwardsCard } from "./awwwards-card";
import { CaseStudyModal } from "./case-study-modal";
import { CursorSpotlight } from "./cursor-spotlight";

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

const projects: ProjectData[] = [
  {
    id: "1",
    title: "Reisearch",
    description:
      "A powerful real estate intelligence platform used by 50k+ professionals for comps, research, and investor-ready storytelling.",
    tags: [
      "Real Estate",
      "Data Visualization",
      "Serverless",
      "SaaS",
      "Python",
      "AWS",
      "React",
      "LightFM",
      "Golang",
    ],
    thumbnail: "/projects/reisearch/dashboard.png",
    caseStudy: {
      title: "Reisearch Platform",
      description:
        "A powerful, serverless real estate analytics platform trusted by 50k+ professionals to make data-driven decisions with market insights, comparables, and demographic data.",
      markdownContent: `
# Project Overview

Reisearch is a powerful real estate intelligence platform used by 50k+ professionals. It aggregates MLS, demographic, and social graph signals to deliver reliable comps, market analysis, and investor-ready presentations.

## Key Features

- **Market Dashboard:** Real-time KPIs, trend tracking, and presentation-ready views.
- **Comparable Analysis:** Hybrid recommendation engine (ML) with geospatial scoring for precise comps.
- **Demographic Insights:** Population, income, and lifestyle overlays for any location.
- **Investment Calculators:** ROI and cash flow projections tailored to deal types.
- **Collaboration:** Secure workspaces, messaging, and presentation templates for teams.

## Technical Implementation

- **Serverless Core:** AWS Lambda + API Gateway with DynamoDB single-table design, S3 pre-signed assets, SQS pipelines, and Cognito-authenticated JWT flows.
- **Data & ML:** LightFM hybrid recommender, geospatial proximity weighting, and social graph analysis for ranked results.
- **Frontend Experience:** React/Next.js with advanced data visualizations, map search, and responsive layouts.
- **Reliability:** Containerized workers, background training jobs, and structured logging/metrics.

## Impact

Reisearch powers 50k+ real estate professionals who need fast, accurate comps and market intelligence to close deals with confidence.
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
      liveUrl: "https://reisearch.com",
      githubUrl: "https://github.com/reisearch",
    },
  },
  {
    id: "2",
    title: "Amigos Gym",
    description:
      "An all-in-one management solution for modern fitness centers.",
    tags: [
      "Gym Management",
      "SaaS",
      "Dashboard",
      "Fintech",
      "Flask",
      "JavaScript",
      "CSS",
      "HTML",
    ],
    thumbnail: "/projects/amigos-gym/dashboard.png",
    caseStudy: {
      title: "Amigos Gym Management",
      description:
        "Streamlining gym operations with a comprehensive platform for member management, inventory tracking, and automated communications.",
      markdownContent: `
# Project Overview

Amigos Gym Management is a complete digital solution tailored for fitness centers. It simplifies day-to-day operations by integrating member management, financial tracking, and communication tools into a single, intuitive interface.

## Key Features

- **Centralized Dashboard:** Real-time insights into active members, revenue, and daily check-ins.
- **Member Management:** Detailed profiles, plan management, and attendance tracking.
- **Inventory Control:** Track equipment, supplements, and merchandise effortlessly.
- **Financial Suite:** Automated payment processing, invoicing, and revenue reporting.
- **Communication Hub:** Built-in bulk SMS and email notifications for announcements and reminders.

## Technical Implementation

Built with Flask for the backend, JavaScript for interactivity, and styled with CSS and HTML for responsive design. The platform ensures data security and high availability, integrating with payment gateways for seamless transactions.
      `,
      images: [
        { src: "/projects/amigos-gym/dashboard.png", size: "hero" },
        { src: "/projects/amigos-gym/membership-pans.png", size: "vertical" },
        { src: "/projects/amigos-gym/coaches-management.png", size: "square" },
        { src: "/projects/amigos-gym/payments.png", size: "hero" },
        { src: "/projects/amigos-gym/inventory.png", size: "square" },
        { src: "/projects/amigos-gym/bulk-sms.png", size: "vertical" },
      ],
      liveUrl: "https://amigosgym.com",
      githubUrl: "https://github.com/amigos-gym",
    },
  },
  {
    id: "3",
    title: "NeoCare",
    description:
      "A modern hospital management system for efficient patient care and administration.",
    tags: ["Healthcare", "Management System", "SaaS", "Next.js"],
    thumbnail: "/projects/neocare/delivery-summary.jpeg",
    caseStudy: {
      title: "NeoCare Hospital System",
      description:
        "A comprehensive digital solution for healthcare facilities, streamlining patient management, medical records, and administrative workflows.",
      markdownContent: `
# Project Overview

NeoCare is a robust hospital management system designed to modernize healthcare administration. It provides a seamless experience for physicians, nurses, and administrators to manage patient care, from admission to discharge.

## Key Features

- **Patient Records:** Centralized database for patient history, vitals, and treatment plans.
- **Physician Portal:** Dedicated interface for doctors to manage appointments, view lab results, and prescribe medications.
- **Lab & Investigation:** Integrated module for ordering and viewing laboratory investigations and results.
- **Resource Management:** efficient tracking of hospital resources, including beds and medical supplies.
- **Secure Access:** Role-based access control ensuring data privacy and compliance.

## Technical Implementation

The system is built with a focus on security and reliability. It features a responsive user interface for access on tablets and desktops, enabling healthcare providers to access critical information at the point of care.
      `,
      images: [
        { src: "/projects/neocare/delivery-summary.jpeg", size: "hero" },
        { src: "/projects/neocare/login-page.jpeg", size: "small" },
        { src: "/projects/neocare/prescription.jpeg", size: "vertical" },
        { src: "/projects/neocare/vital-sign.jpeg", size: "square" },
        { src: "/projects/neocare/investigation-results.jpeg", size: "hero" },
        { src: "/projects/neocare/lab-investigation.jpeg", size: "hero" },
        { src: "/projects/neocare/physician-details.jpeg", size: "vertical" },
        { src: "/projects/neocare/future-pan.jpeg", size: "hero" },
      ],
      liveUrl: "https://neocare.cloud.com.et",
      githubUrl: "#",
    },
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <CursorSpotlight containerRef={containerRef} />

      {/* Noise texture background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div ref={containerRef} className="container relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-400"
          >
            Immersive experiences built to sell the visual story
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Case Study Modal */}
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
