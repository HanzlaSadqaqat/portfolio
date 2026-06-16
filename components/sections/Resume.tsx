"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import type { Experience, Education, Profile } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";

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
          <motion.a
            href={profile.resumeUrl}
            download
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 transition"
          >
            <Download size={14} /> Download PDF
          </motion.a>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <div className="text-sm font-semibold text-text-primary mb-5 flex items-center gap-2">
            <Briefcase size={14} className="text-accent-primary" />
            <span>Experience</span>
          </div>
          <div className="relative pl-7 space-y-7 border-l border-bg-line">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[33px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-accent-primary" />
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="text-sm font-semibold text-text-primary mb-5 flex items-center gap-2">
            <GraduationCap size={14} className="text-accent-primary" />
            <span>Education</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 bg-bg-soft border border-bg-border rounded-2xl"
              >
                <h3 className="text-base font-semibold text-text-primary mb-1">{edu.degree}</h3>
                <div className="text-sm text-accent-primary mb-1">{edu.school}</div>
                <div className="text-xs text-text-dim">{edu.period}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
