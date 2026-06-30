"use client";

import { motion } from "framer-motion";

const items = [
  "MERN Stack",
  "Next.js 14",
  "AI Automation",
  "OpenAI",
  "Node.js",
  "MongoDB",
  "React",
  "LangChain",
  "TypeScript",
  "REST APIs",
  "Framer Motion",
  "Tailwind CSS",
  "Full Stack Dev",
  "Prompt Engineering",
];

const Dot = () => (
  <span className="w-1 h-1 rounded-full bg-accent-primary/50 shrink-0" />
);

export default function MarqueeBanner() {
  // Duplicate so the loop is seamless
  const repeated = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-bg-line bg-bg-soft py-3.5 select-none">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-soft to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-soft to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-text-muted"
          >
            <Dot />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
