import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongo from "@/lib/mongoose";
import Profile from "@/models/Profile";
import About from "@/models/About";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Automation from "@/models/Automation";
import BlogPost from "@/models/BlogPost";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import AdminUser from "@/models/AdminUser";
import {
  profile,
  about,
  skills,
  projects,
  automations,
  blogPosts,
  experience,
  education,
} from "@/lib/data";

// One-time bootstrap endpoint. Run this once after deploying:
//   curl -X POST https://yoursite.com/api/admin/setup -H "x-setup-secret: <SETUP_SECRET>"
// It creates the admin login (from ADMIN_EMAIL/ADMIN_PASSWORD in .env) and
// fills empty content collections with the starter data from lib/data.ts.
// It never overwrites existing data, so it's safe to call more than once.
export async function POST(req: Request) {
  const secret = req.headers.get("x-setup-secret");
  if (!secret || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectMongo();
  const result: Record<string, string> = {};

  if ((await AdminUser.countDocuments()) === 0) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before running setup" },
        { status: 400 }
      );
    }
    const hash = await bcrypt.hash(password, 10);
    await AdminUser.create({ email, password: hash });
    result.adminUser = `created (${email})`;
  } else {
    result.adminUser = "skipped (already exists)";
  }

  if ((await Profile.countDocuments()) === 0) {
    await Profile.create(profile);
    result.profile = "seeded";
  } else result.profile = "skipped (exists)";

  if ((await About.countDocuments()) === 0) {
    await About.create(about);
    result.about = "seeded";
  } else result.about = "skipped (exists)";

  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany(skills.map((s, i) => ({ ...s, order: i })));
    result.skills = "seeded";
  } else result.skills = "skipped (exists)";

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany(projects.map((p, i) => ({ ...p, order: i })));
    result.projects = "seeded";
  } else result.projects = "skipped (exists)";

  if ((await Automation.countDocuments()) === 0) {
    await Automation.insertMany(automations.map((a, i) => ({ ...a, order: i })));
    result.automations = "seeded";
  } else result.automations = "skipped (exists)";

  if ((await BlogPost.countDocuments()) === 0) {
    await BlogPost.insertMany(blogPosts.map((b, i) => ({ ...b, order: i })));
    result.blogPosts = "seeded";
  } else result.blogPosts = "skipped (exists)";

  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany(experience.map((e, i) => ({ ...e, order: i })));
    result.experience = "seeded";
  } else result.experience = "skipped (exists)";

  if ((await Education.countDocuments()) === 0) {
    await Education.insertMany(education.map((e, i) => ({ ...e, order: i })));
    result.education = "seeded";
  } else result.education = "skipped (exists)";

  return NextResponse.json({ ok: true, result });
}
