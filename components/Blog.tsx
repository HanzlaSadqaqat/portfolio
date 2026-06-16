"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import { SectionHeading } from "./About";

export default function Blog({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <section id="blog" className="px-6 py-24 bg-bg-soft">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="04" title="Blog" subtitle="Notes on what I'm building and learning." />

        <div className="mt-10 space-y-3">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.url}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-start gap-4 p-5 bg-white border border-bg-border rounded-xl card-hover"
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
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-text-muted flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                  <span className="text-text-dim">·</span>
                  {post.tags.map((tag, ti) => (
                    <span key={tag} className="text-accent-primary">
                      {tag}
                      {ti < post.tags.length - 1 && (
                        <span className="text-text-dim ml-2">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
