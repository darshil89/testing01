import NextAuth from "next-auth/next";
import prisma from '../../../libs/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  provider: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email Id" },
        password: { label: "password", type: "password" },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter Username",
        },
      },
      async authorize(credentials) {
        const user = {
          id: 1,
          name: "Darshil Mahraur",
          email: "darshilmahraur3@gmail.com",
        };
        return user;
      },
    }),
  ],
  //   help in crack JWD tokens
  secret: process.env.SCERET,
  //   session have the strategy of jwtto encode all of our stuff throgh json web tokens
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
// we cant directly export default handler because we are in a route file , if we wanna to export something from route file by an http Request
export { handler as GET, handler as POST };
