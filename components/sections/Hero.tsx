"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import type { Profile } from "@/lib/data";
import Container from "@/components/ui/Container";

export type Stat = { label: string; value: string };

export default function Hero({ profile, stats }: { profile: Profile; stats: Stat[] }) {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] bg-accent-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 -left-24 w-72 h-72 bg-accent-green/10 rounded-full blur-3xl -z-10" />

      <Container>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-medium text-accent-primary bg-accent-primary/10 px-3 py-1.5 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-5 leading-[1.05]"
          >
            Hi, I&apos;m {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-text-secondary mb-4"
          >
            {profile.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mb-10"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-card border border-bg-border text-text-secondary rounded-full font-medium hover:border-accent-primary hover:text-accent-primary transition"
            >
              Download CV <Download size={14} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-card border border-bg-border text-text-secondary rounded-full font-medium hover:border-accent-primary hover:text-accent-primary transition"
            >
              Contact Me <Mail size={14} />
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-bg-line"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-text-primary">{s.value}</div>
              <div className="text-sm text-text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
