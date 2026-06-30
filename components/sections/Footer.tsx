"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/data";
import Container from "@/components/ui/Container";

export default function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 py-10 border-t border-bg-line"
    >
      <Container className="flex flex-wrap items-center justify-between gap-4 text-xs text-text-muted">
        <div>© {year} {profile.name}. All rights reserved.</div>
        <div className="text-text-dim">Built with Next.js · Tailwind · Framer Motion</div>
      </Container>
    </motion.footer>
  );
}
