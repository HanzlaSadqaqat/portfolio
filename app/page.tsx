import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Automations from "@/components/sections/Automations";
import Blog from "@/components/sections/Blog";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import type { SkillGroup } from "@/lib/data";
import {
  getProfile,
  getAbout,
  getSkills,
  getProjects,
  getAutomations,
  getBlogPosts,
  getExperience,
  getEducation,
} from "@/lib/db-queries";

// Content is managed from /admin and stored in MongoDB — always fetch fresh.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    profile,
    about,
    skills,
    projects,
    automations,
    blogPosts,
    experience,
    education,
  ] = await Promise.all([
    getProfile(),
    getAbout(),
    getSkills(),
    getProjects(),
    getAutomations(),
    getBlogPosts(),
    getExperience(),
    getEducation(),
  ]);

  const totalTech = skills.reduce(
    (acc: number, s: SkillGroup) => acc + s.items.length,
    0,
  );
  const stats = [
    { label: "Projects Shipped", value: `${projects.length}+` },
    { label: "AI Automations", value: `${automations.length}+` },
    { label: "Technologies", value: `${totalTech}+` },
    { label: "Blog Posts", value: `${blogPosts.length}+` },
  ];

  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <Navbar profile={profile} />
      <Hero profile={profile} stats={stats} />
      <MarqueeBanner />
      <About about={about} skills={skills} profile={profile} />
      <Projects projects={projects} />
      <Automations automations={automations} />
      <Blog blogPosts={blogPosts} />
      <Resume experience={experience} education={education} profile={profile} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </main>
  );
}
