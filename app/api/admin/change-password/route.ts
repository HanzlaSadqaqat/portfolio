import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  await connectMongo();
  const user = await AdminUser.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return NextResponse.json({ ok: true });
}
