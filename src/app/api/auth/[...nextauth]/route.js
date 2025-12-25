import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

// Temporary in-memory user
const tempUsers = [
  {
    id: "1",
    name: "Test User",
    email: "test@care.xyz",
    password: bcrypt.hashSync("password123", 10),
  }
];

const handler = NextAuth({
providers: [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      await dbConnect();

      const user = await User.findOne({ email: credentials.email.toLowerCase() });
      if (!user) return null;

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        contact: user.contact,
        nid: user.nid,
      };
    }
  }),
],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };