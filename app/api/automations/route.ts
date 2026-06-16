import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Automation from "@/models/Automation";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();
  const automations = await Automation.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(automations);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const count = await Automation.countDocuments();
  const automation = await Automation.create({ ...body, order: count });
  return NextResponse.json(automation, { status: 201 });
}
