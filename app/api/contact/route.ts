import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Save to MongoDB so it shows up in the admin panel's "messages" tab.
    await connectMongo();
    await ContactMessage.create({ name, email, message });

    // ----------------------------------------------------------
    // ✉️  Optionally also plug in an email notification. A few options:
    //
    // 1. Resend (recommended, easy):
    //    import { Resend } from 'resend';
    //    const resend = new Resend(process.env.RESEND_API_KEY);
    //    await resend.emails.send({ ... });
    //
    // 2. Nodemailer (SMTP):
    //    const transporter = nodemailer.createTransport({ ... });
    //    await transporter.sendMail({ ... });
    //
    // 3. Forward to your email via a webhook (Formspree, Web3Forms).
    // ----------------------------------------------------------
    console.log("📬 New contact message saved:", { name, email });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
