import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Skill from "@/models/Skill";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();
  const skills = await Skill.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const count = await Skill.countDocuments();
  const skill = await Skill.create({ ...body, order: count });
  return NextResponse.json(skill, { status: 201 });
}
