import Link from "next/link";
import connectMongo from "@/lib/mongoose";
import Project from "@/models/Project";
import Automation from "@/models/Automation";
import BlogPost from "@/models/BlogPost";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Skill from "@/models/Skill";
import ContactMessage from "@/models/ContactMessage";
import { PageHeading, Card } from "@/components/admin/ui";

// Behind admin auth and always reflects live DB state — never statically prerender.
export const dynamic = "force-dynamic";

async function getStats() {
  await connectMongo();
  const [projects, automations, blogPosts, experience, education, skills, messages, unread] =
    await Promise.all([
      Project.countDocuments(),
      Automation.countDocuments(),
      BlogPost.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Skill.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
    ]);
  return { projects, automations, blogPosts, experience, education, skills, messages, unread };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "projects", value: stats.projects, href: "/admin/projects" },
    { label: "automations", value: stats.automations, href: "/admin/automations" },
    { label: "blog posts", value: stats.blogPosts, href: "/admin/blog" },
    { label: "skill groups", value: stats.skills, href: "/admin/skills" },
    { label: "experience", value: stats.experience, href: "/admin/experience" },
    { label: "education", value: stats.education, href: "/admin/education" },
  ];

  return (
    <div>
      <PageHeading title="Dashboard" subtitle="Overview of your portfolio content." />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="hover:border-accent-primary/40 transition cursor-pointer">
              <div className="text-3xl font-bold text-accent-primary mb-1">{c.value}</div>
              <div className="text-sm text-text-muted">{c.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      <Link href="/admin/messages">
        <Card className="hover:border-accent-primary/40 transition cursor-pointer flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-text-primary mb-1">Contact messages</div>
            <div className="text-xs text-text-muted">
              {stats.messages} total · {stats.unread} unread
            </div>
          </div>
          {stats.unread > 0 && (
            <span className="text-xs font-medium px-2.5 py-1 bg-accent-primary/10 text-accent-primary rounded-full">
              {stats.unread} new
            </span>
          )}
        </Card>
      </Link>
    </div>
  );
}
