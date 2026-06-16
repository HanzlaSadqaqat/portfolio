import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Automations from "@/components/Automations";
import Blog from "@/components/Blog";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
  const [profile, about, skills, projects, automations, blogPosts, experience, education] =
    await Promise.all([
      getProfile(),
      getAbout(),
      getSkills(),
      getProjects(),
      getAutomations(),
      getBlogPosts(),
      getExperience(),
      getEducation(),
    ]);

  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <Navbar profile={profile} />
      <Hero profile={profile} />
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
