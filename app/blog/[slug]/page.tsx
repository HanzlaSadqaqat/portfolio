import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import Container from "@/components/ui/Container";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { getBlogPostBySlug, getProfile } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};

  const profile = await getProfile();
  const description = post.metaDescription || post.excerpt;
  const url = `/blog/${post.slug}`;

  return {
    title: `${post.title} — ${profile.name}`,
    description,
    authors: [{ name: profile.name }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, profile] = await Promise.all([getBlogPostBySlug(params.slug), getProfile()]);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: profile.name },
    ...(post.coverImage ? { image: [post.coverImage] } : {}),
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `/blog/${post.slug}` },
  };

  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar profile={profile} />
      <section className="px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-primary transition mb-8"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <BlogPostContent post={post} />
        </Container>
      </section>
      <Footer profile={profile} />
    </main>
  );
}
