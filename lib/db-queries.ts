// Server-only data layer for the public site.
// Reads content from MongoDB; falls back to the static defaults in
// lib/data.ts if the DB is empty or unreachable, so the site never breaks.
import connectMongo from "./mongoose";
import Profile from "@/models/Profile";
import About from "@/models/About";
import Skill from "@/models/Skill";
import Project, { IProject } from "@/models/Project";
import Automation, { IAutomation } from "@/models/Automation";
import BlogPost, { IBlogPost } from "@/models/BlogPost";
import Experience, { IExperience } from "@/models/Experience";
import Education, { IEducation } from "@/models/Education";
import {
  profile as defaultProfile,
  about as defaultAbout,
  skills as defaultSkills,
  projects as defaultProjects,
  automations as defaultAutomations,
  blogPosts as defaultBlogPosts,
  experience as defaultExperience,
  education as defaultEducation,
} from "./data";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    await connectMongo();
    return await fn();
  } catch (err) {
    console.error("DB query failed, using fallback data:", err);
    return fallback;
  }
}

export const getProfile = () =>
  safe(async () => {
    const doc = await Profile.findOne({}).lean();
    return doc ? (JSON.parse(JSON.stringify(doc)) as typeof defaultProfile) : defaultProfile;
  }, defaultProfile);

export const getAbout = () =>
  safe(async () => {
    const doc = await About.findOne({}).lean();
    return doc ? (JSON.parse(JSON.stringify(doc)) as typeof defaultAbout) : defaultAbout;
  }, defaultAbout);

export const getSkills = () =>
  safe(async () => {
    const docs = await Skill.find({}).sort({ order: 1 }).lean();
    return docs.length ? JSON.parse(JSON.stringify(docs)) : defaultSkills;
  }, defaultSkills as any);

export const getProjects = () =>
  safe(async () => {
    const docs = await Project.find({}).sort({ order: 1 }).lean<IProject[]>();
    return docs.length ? JSON.parse(JSON.stringify(docs)) : defaultProjects;
  }, defaultProjects as any);

export const getAutomations = () =>
  safe(async () => {
    const docs = await Automation.find({}).sort({ order: 1 }).lean<IAutomation[]>();
    return docs.length ? JSON.parse(JSON.stringify(docs)) : defaultAutomations;
  }, defaultAutomations as any);

export const getBlogPosts = () =>
  safe(async () => {
    const docs = await BlogPost.find({}).sort({ order: 1 }).lean<IBlogPost[]>();
    return docs.length ? JSON.parse(JSON.stringify(docs)) : defaultBlogPosts;
  }, defaultBlogPosts as any);

export const getExperience = () =>
  safe(async () => {
    const docs = await Experience.find({}).sort({ order: 1 }).lean<IExperience[]>();
    return docs.length ? JSON.parse(JSON.stringify(docs)) : defaultExperience;
  }, defaultExperience as any);

export const getEducation = () =>
  safe(async () => {
    const docs = await Education.find({}).sort({ order: 1 }).lean<IEducation[]>();
    return docs.length ? JSON.parse(JSON.stringify(docs)) : defaultEducation;
  }, defaultEducation as any);
