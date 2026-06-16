"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";

const statusStyles: Record<string, string> = {
  live: "bg-accent-green/10 text-accent-green",
  beta: "bg-accent-yellow/10 text-accent-yellow",
  wip: "bg-accent-cyan/10 text-accent-cyan",
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-6 py-20 md:py-28 bg-bg-soft">
      <Container>
        <SectionHeading
          number="02 — Work"
          title="Projects"
          subtitle="A selection of things I've built recently."
        />

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white border border-bg-border rounded-2xl overflow-hidden card-hover group"
            >
              <div className="px-5 py-4 border-b border-bg-line flex items-center justify-between">
                <span className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                  {project.name}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[project.status]}`}>
                  {project.status}
                </span>
              </div>

              <div className="p-5">
                <p className="text-text-secondary text-sm leading-relaxed mb-4 min-h-[3.5rem]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 bg-bg-soft border border-bg-border rounded-full text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 text-sm">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent-primary transition"
                    >
                      <Github size={14} /> Source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent-primary transition"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
