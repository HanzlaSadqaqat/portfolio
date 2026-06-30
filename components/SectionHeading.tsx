"use client";

import { motion } from "framer-motion";
import { WordReveal, ease } from "@/components/ui/AnimationWrappers";

export default function SectionHeading({
  number,
  title,
  subtitle,
  align = "left",
}: {
  number: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center mx-auto" : ""}>
      {/* Label + animated accent line */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
      >
        <span className="text-xs font-semibold text-accent-primary tracking-widest uppercase">
          {number}
        </span>
        <motion.span
          className="h-px bg-accent-primary/40 flex-1 max-w-[60px]"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        />
      </motion.div>

      {/* Title — word-clip reveal */}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight leading-tight">
        <WordReveal text={title} delay={0.1} />
      </h2>

      {/* Subtitle fade */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.25, ease }}
        className={`text-text-secondary text-sm md:text-base ${centered ? "max-w-xl mx-auto" : "max-w-xl"}`}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
