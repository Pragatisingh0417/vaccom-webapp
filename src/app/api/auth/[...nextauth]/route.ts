import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email });
        if (user && user.password === credentials?.password) {
          return { id: user._id, name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
