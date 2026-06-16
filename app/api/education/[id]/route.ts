import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import Education from "@/models/Education";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  const body = await req.json();
  const edu = await Education.findByIdAndUpdate(params.id, body, { new: true });
  if (!edu) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(edu);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongo();
  await Education.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
