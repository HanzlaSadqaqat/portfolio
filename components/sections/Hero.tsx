"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown, Play } from "lucide-react";
import type { Profile } from "@/lib/data";
import Container from "@/components/ui/Container";
import VideoModal from "@/components/VideoModal";

export type Stat = { label: string; value: string };

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ profile, stats }: { profile: Profile; stats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  // Auto-open once per session after animations settle
  useEffect(() => {
    if (!profile.videoUrl) return;
    const already = sessionStorage.getItem("videoPlayed");
    if (already) return;
    const t = setTimeout(() => {
      setVideoOpen(true);
      sessionStorage.setItem("videoPlayed", "1");
    }, 2000);
    return () => clearTimeout(t);
  }, [profile.videoUrl]);

  // Scroll progress while hero is in view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const rawY       = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const rawScale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);
  const blob1Y     = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const blob2Y     = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const y       = useSpring(rawY,       { stiffness: 80, damping: 20 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const scale   = useSpring(rawScale,   { stiffness: 80, damping: 20 });

  const titleWords = `Hi, I'm ${profile.name}`.split(" ");
  const ctaDelay = 0.1 + titleWords.length * 0.09 + 0.25;

  return (
    <>
      <section
        ref={ref}
        id="top"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Parallax decorative blobs */}
        <motion.div
          style={{ y: blob1Y }}
          className="absolute -top-24 right-0 w-[32rem] h-[32rem] bg-accent-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"
        />
        <motion.div
          style={{ y: blob2Y }}
          className="absolute bottom-0 -left-24 w-80 h-80 bg-accent-green/8 rounded-full blur-3xl -z-10 pointer-events-none"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Scroll-driven content wrapper */}
        <motion.div style={{ y, opacity, scale }} className="pt-32 pb-20 md:pt-44 md:pb-28">
          <Container>
            <div className="max-w-3xl">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="inline-flex items-center gap-2 text-xs font-medium text-accent-primary bg-accent-primary/10 px-3 py-1.5 rounded-full mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                Available for new opportunities
              </motion.div>

              {/* Title — word-by-word stagger reveal */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-5 leading-[1.08]">
                {titleWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ duration: 0.65, delay: 0.1 + i * 0.09, ease }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Role */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + titleWords.length * 0.09 + 0.05, ease }}
                className="text-xl md:text-2xl font-medium text-text-secondary mb-4"
              >
                {profile.role}
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + titleWords.length * 0.09 + 0.15, ease }}
                className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mb-10"
              >
                {profile.tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ctaDelay, ease }}
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

                {/* Show Showreel button only when a video URL is set */}
                {profile.videoUrl && (
                  <motion.button
                    onClick={() => setVideoOpen(true)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: ctaDelay + 0.1, ease }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium border border-accent-primary/40 text-accent-primary hover:bg-accent-primary hover:text-white transition group"
                  >
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-50" />
                      <Play size={14} className="relative fill-current" />
                    </span>
                    Watch Showreel
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-bg-line"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.07, ease }}
                >
                  <div className="text-3xl font-bold text-text-primary tabular-nums">{s.value}</div>
                  <div className="text-sm text-text-muted mt-1">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-dim"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* Video modal — rendered outside the parallax wrapper */}
      {profile.videoUrl && (
        <VideoModal
          url={profile.videoUrl}
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </>
  );
}
