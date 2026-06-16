import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const post = await BlogPost.findByIdAndUpdate(params.id, body, { new: true });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  await BlogPost.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
