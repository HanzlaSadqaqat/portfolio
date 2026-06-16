import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongo from "./mongoose";
import AdminUser from "@/models/AdminUser";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectMongo();
        const user = await AdminUser.findOne({ email: credentials.email });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
