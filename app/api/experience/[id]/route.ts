import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Experience from "@/models/Experience";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const exp = await Experience.findByIdAndUpdate(params.id, body, { new: true });
  if (!exp) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(exp);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  await Experience.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
