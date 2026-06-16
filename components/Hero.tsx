"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import type { Profile } from "@/lib/data";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-accent-primary mb-4"
        >
          Available for new opportunities
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-tight text-text-primary"
        >
          Hi, I&apos;m {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl text-text-secondary mb-3 font-medium"
        >
          {profile.role}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mb-10"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-3 text-sm"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-primary text-white rounded-full font-medium hover:bg-accent-primary/90 transition"
          >
            View Projects <ArrowRight size={14} />
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-bg-border text-text-secondary rounded-full font-medium hover:border-accent-primary hover:text-accent-primary transition"
          >
            Download CV <Download size={14} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-bg-border text-text-secondary rounded-full font-medium hover:border-accent-primary hover:text-accent-primary transition"
          >
            Contact Me <Mail size={14} />
          </a>
        </motion.div>

        {/* Skill strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 pt-6 border-t border-bg-line text-xs text-text-dim flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          <span className="text-text-muted font-medium mr-1">Stack:</span>
          {["React", "Next.js", "Node", "MongoDB", "Express"].map((s, i) => (
            <span key={s} className="text-text-secondary">
              {s}
              {i < 4 && <span className="text-text-dim mx-2">·</span>}
            </span>
          ))}
          <span className="text-text-dim mx-2">|</span>
          {["OpenAI", "LangChain", "n8n", "Make"].map((s, i) => (
            <span key={s} className="text-accent-primary">
              {s}
              {i < 3 && <span className="text-text-dim mx-2">·</span>}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
