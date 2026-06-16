import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Profile from "@/models/Profile";
import About from "@/models/About";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Automation from "@/models/Automation";
import BlogPost from "@/models/BlogPost";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import {
  profile as defaultProfile,
  about as defaultAbout,
  skills as defaultSkills,
  projects as defaultProjects,
  automations as defaultAutomations,
  blogPosts as defaultBlogPosts,
  experience as defaultExperience,
  education as defaultEducation,
} from "@/lib/data";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();

  await Profile.deleteMany({});
  await About.deleteMany({});
  await Skill.deleteMany({});
  await Project.deleteMany({});
  await Automation.deleteMany({});
  await BlogPost.deleteMany({});
  await Experience.deleteMany({});
  await Education.deleteMany({});

  await Profile.create(defaultProfile);
  await About.create(defaultAbout);
  await Skill.insertMany(defaultSkills.map((s, i) => ({ ...s, order: i })));
  await Project.insertMany(defaultProjects.map((p, i) => ({ ...p, order: i })));
  await Automation.insertMany(defaultAutomations.map((a, i) => ({ ...a, order: i })));
  await BlogPost.insertMany(defaultBlogPosts.map((b, i) => ({ ...b, order: i })));
  await Experience.insertMany(defaultExperience.map((e, i) => ({ ...e, order: i })));
  await Education.insertMany(defaultEducation.map((e, i) => ({ ...e, order: i })));

  return NextResponse.json({ ok: true, message: "Database seeded with default data" });
}
