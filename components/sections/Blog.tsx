"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";
import { StaggerGrid, StaggerItem, ease } from "@/components/ui/AnimationWrappers";

export default function Blog({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <section id="blog" className="px-6 py-20 md:py-28 bg-bg-soft">
      <Container>
        <SectionHeading number="04 — Writing" title="Blog" subtitle="Notes on what I'm building and learning." />

        <StaggerGrid className="mt-12 space-y-3" stagger={0.08}>
          {blogPosts.map((post) => (
            <StaggerItem key={post.title}>
              <motion.a
                href={post.url}
                whileHover={{ x: 4, transition: { duration: 0.2, ease } }}
                className="group flex items-start gap-4 p-5 bg-bg-card border border-bg-border rounded-2xl"
              >
                <div className="text-xs text-text-dim pt-1 shrink-0 hidden sm:block w-24">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <h3 className="text-base md:text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                      {post.title}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="text-text-muted group-hover:text-accent-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    />
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-text-muted flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                    <span className="text-text-dim">·</span>
                    {post.tags.map((tag, ti) => (
                      <span key={tag} className="text-accent-primary">
                        {tag}
                        {ti < post.tags.length - 1 && <span className="text-text-dim ml-2">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
