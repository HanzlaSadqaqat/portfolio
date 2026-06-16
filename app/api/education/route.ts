import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Education from "@/models/Education";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();
  const education = await Education.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(education);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const count = await Education.countDocuments();
  const edu = await Education.create({ ...body, order: count });
  return NextResponse.json(edu, { status: 201 });
}
