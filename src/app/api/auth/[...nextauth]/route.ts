import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/libs/db"
import  bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text"},
        password: { label: "Password"}
      },
      async authorize(credentials, req){

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
          //name: userFound.name,
          email: userFound.email
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }