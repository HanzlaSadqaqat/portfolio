"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import type { Experience, Education, Profile } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";
import { FadeUp, SlideInLeft, StaggerGrid, StaggerItem, ease } from "@/components/ui/AnimationWrappers";

export default function Resume({
  experience,
  education,
  profile,
}: {
  experience: Experience[];
  education: Education[];
  profile: Profile;
}) {
  return (
    <section id="resume" className="px-6 py-20 md:py-28">
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionHeading number="05 — Career" title="Resume" subtitle="My experience and education." />
          <FadeUp delay={0.2}>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition"
            >
              <Download size={14} /> Download PDF
            </a>
          </FadeUp>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <FadeUp className="text-sm font-semibold text-text-primary mb-5 flex items-center gap-2">
            <Briefcase size={14} className="text-accent-primary" />
            <span>Experience</span>
          </FadeUp>

          <div className="relative pl-7 space-y-7 border-l border-bg-line">
            {experience.map((job, i) => (
              <SlideInLeft key={i} delay={i * 0.1} className="relative">
                {/* Timeline dot */}
                <motion.span
                  className="absolute -left-[33px] top-1.5 w-3 h-3 rounded-full bg-bg border-2 border-accent-primary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.1 + 0.2, ease }}
                />
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                  <h3 className="text-base md:text-lg font-semibold text-text-primary">{job.role}</h3>
                  <span className="text-xs text-text-dim">{job.period}</span>
                </div>
                <div className="text-sm text-accent-primary font-medium mb-3">{job.company}</div>
                <ul className="space-y-1.5">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="text-text-secondary text-sm flex gap-2 leading-relaxed">
                      <span className="text-accent-primary shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </SlideInLeft>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <FadeUp className="text-sm font-semibold text-text-primary mb-5 flex items-center gap-2">
            <GraduationCap size={14} className="text-accent-primary" />
            <span>Education</span>
          </FadeUp>

          <StaggerGrid className="grid md:grid-cols-2 gap-4" stagger={0.1}>
            {education.map((edu, i) => (
              <StaggerItem key={i}>
                <div className="p-5 bg-bg-soft border border-bg-border rounded-2xl h-full">
                  <h3 className="text-base font-semibold text-text-primary mb-1">{edu.degree}</h3>
                  <div className="text-sm text-accent-primary mb-1">{edu.school}</div>
                  <div className="text-xs text-text-dim">{edu.period}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Container>
    </section>
  );
}
