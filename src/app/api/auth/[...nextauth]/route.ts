import { prisma } from "@/libs/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials){

        if(!credentials) return null

        const userFound = await prisma.user.findUnique({
          where:{
            email: credentials.email
          }
        })

        if(!userFound) throw new Error("User not found")

        const comparePassword = await bcrypt.compare(credentials.password, userFound.password)

        if(!comparePassword) throw new Error("Incorrect password")

          return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email
          }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, user }) {
      
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  }
})

export { handler as GET, handler as POST };