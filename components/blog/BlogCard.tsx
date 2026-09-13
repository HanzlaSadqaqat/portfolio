"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import { ease } from "@/components/ui/AnimationWrappers";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div whileHover={{ x: 4, transition: { duration: 0.2, ease } }}>
      <Link
        href={`/blog/${post.slug}`}
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
          <div className="flex items-center gap-3 text-xs flex-wrap">
            {post.tags.map((tag, ti) => (
              <span key={tag} className="text-accent-primary">
                {tag}
                {ti < post.tags.length - 1 && <span className="text-text-dim ml-2">·</span>}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
