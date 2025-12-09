"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { SkillsTabs, type SkillCategory } from "@/components/skills-tabs";
import { SkillCard } from "@/components/skill-card";
import lambdaIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/64/Arch_AWS-Lambda_64.svg";
import dynamoDbIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Database/64/Arch_Amazon-DynamoDB_64.svg";
import sqsIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_App-Integration/Arch_64/Arch_Amazon-Simple-Queue-Service_64.svg";
import s3Icon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Storage/64/Arch_Amazon-S3-on-Outposts_Storage_64.svg";
interface Skill {
  name: string;
  description: string;
  color:
    | "violet"
    | "cyan"
    | "magenta"
    | "purple-blue"
    | "aqua"
    | "lavender"
    | "green"
    | "orange"
    | "blue"
    | "red"
    | "yellow";
  size?: "small" | "medium" | "large";
  icon: string;
}

const skillsData: Record<SkillCategory, Skill[]> = {
  frontend: [
    {
      name: "React",
      description: "Core framework for interactive dashboards",
      color: "cyan",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      description: "Full-stack framework for SEO-friendly experiences",
      color: "violet",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "TypeScript",
      description: "Type-safe development with enhanced reliability",
      color: "blue",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Tailwind CSS",
      description: "Rapid UI development with utility-first styling",
      color: "aqua",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Framer Motion",
      description: "Production-ready animations for React",
      color: "magenta",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
    },
    {
      name: "Three.js",
      description: "3D graphics and WebGL experiences",
      color: "lavender",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    },
  ],
  backend: [
    {
      name: "Serverless (Lambda + API Gateway)",
      description:
        "Event-driven TypeScript/Python services with Cognito JWT auth",
      color: "orange",
      size: "large",
      icon: lambdaIcon,
    },
    {
      name: "DynamoDB Single-Table",
      description: "GSI patterns, conditional writes, and high-volume queries",
      color: "blue",
      icon: dynamoDbIcon,
    },
    {
      name: "S3 & Pre-signed URLs",
      description:
        "Secure asset pipelines with MIME validation and versioned storage",
      color: "aqua",
      size: "large",
      icon: s3Icon,
    },
    {
      name: "SQS Pipelines",
      description: "Fan-out/fan-in queues for training jobs and messaging",
      color: "magenta",
      icon: sqsIcon,
    },
    {
      name: "Go",
      description: "High-performance backend services with concurrency",
      color: "cyan",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    },
    {
      name: "Python + LightFM",
      description: "Hybrid recommender systems with geospatial scoring",
      color: "yellow",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Node.js",
      description:
        "TypeScript services bundled with ESBuild and serverless workflows",
      color: "green",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
  ],
  devops: [
    {
      name: "Docker",
      description: "Containerization for consistent deployments",
      color: "blue",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Git",
      description: "Version control and collaborative development",
      color: "red",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub Actions",
      description: "CI/CD automation and workflows",
      color: "violet",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "AWS",
      description:
        "Cloud infrastructure with CloudFormation, Observability, and IAM",
      color: "orange",
      size: "large",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Vercel",
      description: "Edge deployment and serverless functions",
      color: "cyan",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    },
    {
      name: "Linux",
      description: "Server administration and shell scripting",
      color: "yellow",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    },
  ],
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("frontend");

  return (
    <section
      id="skills"
      className="py-32 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden"
    >
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technical Proficiency"
        />

        <SkillsTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="mt-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 auto-rows-fr"
            >
              {skillsData[activeCategory].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={
                    skill.size === "large"
                      ? "col-span-1 md:col-span-2"
                      : "col-span-1"
                  }
                >
                  <SkillCard
                    name={skill.name}
                    description={skill.description}
                    color={skill.color}
                    size={skill.size}
                    icon={skill.icon}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Noise texture background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </section>
  );
}
