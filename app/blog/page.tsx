import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { StaggerGrid, StaggerItem } from "@/components/ui/AnimationWrappers";
import { getBlogPosts, getProfile } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = `Blog — ${profile.name}`;
  const description = `Notes on what ${profile.name} is building and learning — ${profile.role}.`;
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: { title, description, type: "website", url: "/blog" },
    twitter: { card: "summary", title, description },
  };
}

export default async function BlogIndexPage() {
  const [posts, profile] = await Promise.all([getBlogPosts(), getProfile()]);

  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <Navbar profile={profile} />
      <section className="px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <SectionHeading number="Writing" title="Blog" subtitle="Notes on what I'm building and learning." />

          <StaggerGrid className="mt-12 space-y-3" stagger={0.06}>
            {posts.map((post: any) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>
      <Footer profile={profile} />
    </main>
  );
}
