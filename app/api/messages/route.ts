import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import ContactMessage from "@/models/ContactMessage";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(messages);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const { id, read } = await req.json();
  const msg = await ContactMessage.findByIdAndUpdate(id, { read }, { new: true });
  return NextResponse.json(msg);
}
