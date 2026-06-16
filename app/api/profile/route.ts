import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Profile from "@/models/Profile";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();
  const profile = await Profile.findOne({}).lean();
  return NextResponse.json(profile ?? {});
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const profile = await Profile.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  return NextResponse.json(profile);
}
