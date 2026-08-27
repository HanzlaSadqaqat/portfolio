import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { StaggerGrid, StaggerItem, FadeUp } from "@/components/ui/AnimationWrappers";

export default function Blog({ blogPosts }: { blogPosts: BlogPost[] }) {
  const latest = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="px-6 py-20 md:py-28 bg-bg-soft">
      <Container>
        <SectionHeading number="04 — Writing" title="Blog" subtitle="Notes on what I'm building and learning." />

        <StaggerGrid className="mt-12 space-y-3" stagger={0.08}>
          {latest.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerGrid>

        {blogPosts.length > 0 && (
          <FadeUp className="mt-8" delay={0.1}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:gap-2.5 transition-all"
            >
              View all posts <ArrowRight size={15} />
            </Link>
          </FadeUp>
        )}
      </Container>
    </section>
  );
}
