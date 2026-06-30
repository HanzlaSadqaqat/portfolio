"use client";

import { motion } from "framer-motion";
import { Zap, Target, Wrench, TrendingUp } from "lucide-react";
import type { Automation } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";
import { StaggerGrid, StaggerItem, ease } from "@/components/ui/AnimationWrappers";

export default function Automations({ automations }: { automations: Automation[] }) {
  return (
    <section id="automations" className="px-6 py-20 md:py-28">
      <Container>
        <SectionHeading
          number="03 — Case Studies"
          title="AI Automations"
          subtitle="Real workflows I've built and the impact they had."
        />

        <StaggerGrid className="space-y-5 mt-12" stagger={0.1}>
          {automations.map((a) => (
            <StaggerItem key={a.title}>
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2, ease } }}
                className="bg-bg-card border border-bg-border rounded-2xl p-6 md:p-7 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-full bg-accent-yellow/10 flex items-center justify-center shrink-0">
                    <Zap size={16} className="text-accent-yellow" />
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                    {a.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-5 text-sm">
                  <div>
                    <div className="text-xs font-semibold text-text-muted mb-2 flex items-center gap-1.5">
                      <Target size={12} className="text-accent-red" /> Problem
                    </div>
                    <p className="text-text-secondary leading-relaxed">{a.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-muted mb-2 flex items-center gap-1.5">
                      <Wrench size={12} className="text-accent-primary" /> Solution
                    </div>
                    <p className="text-text-secondary leading-relaxed">{a.solution}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-muted mb-2 flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-accent-green" /> Impact
                    </div>
                    <p className="text-accent-green leading-relaxed font-medium">{a.impact}</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-bg-line flex flex-wrap items-center gap-2">
                  <span className="text-xs text-text-dim font-medium">Stack:</span>
                  {a.stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 bg-bg-soft border border-bg-border rounded-full text-accent-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
