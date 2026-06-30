"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import type { Profile } from "@/lib/data";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";

const sections = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Automations", href: "#automations" },
  { label: "Blog", href: "#blog" },
  { label: "Resume", href: "#resume" },
];

export default function Navbar({ profile }: { profile: Profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Page scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-md border-b border-bg-line" : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-primary origin-left"
      />

      <Container className="py-4 flex items-center justify-between">
        <motion.a
          href="#top"
          className="text-text-primary font-semibold text-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.name}
        </motion.a>

        {/* Desktop nav */}
        <motion.div
          className="hidden md:flex items-center gap-7 text-sm"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-text-secondary hover:text-accent-primary transition-colors"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          className="hidden md:flex items-center gap-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-full hover:bg-accent-primary/90 transition"
          >
            Let&apos;s Talk <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="text-text-secondary p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-bg-line bg-bg/95 backdrop-blur-md"
        >
          <div className="px-6 py-4 flex flex-col gap-3 text-sm">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="text-text-secondary hover:text-accent-primary transition-colors py-1"
              >
                {s.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-accent-primary text-white font-medium rounded-full mt-1"
            >
              Let&apos;s Talk <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
