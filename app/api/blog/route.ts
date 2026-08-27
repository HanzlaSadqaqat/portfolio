import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = base;
  let n = 2;
  while (
    await BlogPost.exists(excludeId ? { slug, _id: { $ne: excludeId } } : { slug })
  ) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

export async function GET() {
  await connectMongo();
  const posts = await BlogPost.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const base = slugify(body.slug || body.title || "");
  const slug = await uniqueSlug(base);
  const count = await BlogPost.countDocuments();
  const post = await BlogPost.create({ ...body, slug, order: count });
  return NextResponse.json(post, { status: 201 });
}
