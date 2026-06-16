import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();
  const projects = await Project.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const count = await Project.countDocuments();
  const project = await Project.create({ ...body, order: count });
  return NextResponse.json(project, { status: 201 });
}
