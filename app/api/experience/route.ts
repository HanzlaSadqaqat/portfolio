import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Experience from "@/models/Experience";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();
  const experience = await Experience.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(experience);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const count = await Experience.countDocuments();
  const exp = await Experience.create({ ...body, order: count });
  return NextResponse.json(exp, { status: 201 });
}
