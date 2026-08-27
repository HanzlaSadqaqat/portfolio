import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";

const mdComponents = {
  h1: (p: any) => <h2 className="text-xl md:text-2xl font-bold text-text-primary mt-10 mb-4" {...p} />,
  h2: (p: any) => <h2 className="text-xl md:text-2xl font-bold text-text-primary mt-10 mb-4" {...p} />,
  h3: (p: any) => <h3 className="text-lg font-semibold text-text-primary mt-8 mb-3" {...p} />,
  p: (p: any) => <p className="text-text-secondary leading-relaxed mb-5" {...p} />,
  a: (p: any) => (
    <a
      className="text-accent-primary underline underline-offset-2 hover:text-accent-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...p}
    />
  ),
  ul: (p: any) => <ul className="list-disc pl-5 space-y-1.5 text-text-secondary mb-5" {...p} />,
  ol: (p: any) => <ol className="list-decimal pl-5 space-y-1.5 text-text-secondary mb-5" {...p} />,
  li: (p: any) => <li className="leading-relaxed" {...p} />,
  blockquote: (p: any) => (
    <blockquote className="border-l-2 border-accent-primary pl-4 italic text-text-muted mb-5" {...p} />
  ),
  code: (p: any) => (
    <code className="px-1.5 py-0.5 rounded bg-bg-soft border border-bg-border text-accent-primary text-[0.85em] font-mono" {...p} />
  ),
  pre: (p: any) => (
    <pre className="bg-bg-soft border border-bg-border rounded-xl p-4 overflow-x-auto text-sm mb-5 [&_code]:bg-transparent [&_code]:border-0 [&_code]:p-0" {...p} />
  ),
  strong: (p: any) => <strong className="text-text-primary font-semibold" {...p} />,
  hr: () => <hr className="border-bg-border my-8" />,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article>
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full aspect-[16/9] object-cover rounded-xl mb-6 border border-bg-border"
        />
      )}
      <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock size={11} /> {post.readTime}
        </span>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">{post.title}</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-accent-primary/10 text-accent-primary">
            {tag}
          </span>
        ))}
      </div>
      <div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
