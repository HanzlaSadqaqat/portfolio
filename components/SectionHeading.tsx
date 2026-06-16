"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center mx-auto" : ""}
    >
      <div className="text-xs font-semibold text-accent-primary tracking-widest uppercase mb-3">
        {number}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight">
        {title}
      </h2>
      <p className={`text-text-secondary text-sm md:text-base ${align === "center" ? "max-w-xl mx-auto" : "max-w-xl"}`}>
        {subtitle}
      </p>
    </motion.div>
  );
}
