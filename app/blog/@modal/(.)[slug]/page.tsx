import { notFound } from "next/navigation";
import BlogModal from "@/components/blog/BlogModal";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { getBlogPostBySlug } from "@/lib/db-queries";

export const dynamic = "force-dynamic";

export default async function InterceptedBlogPostModal({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <BlogModal>
      <BlogPostContent post={post} />
    </BlogModal>
  );
}
