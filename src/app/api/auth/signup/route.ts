import { NextApiResponse } from "next"
import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/libs/db"
import  bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {

    const data = await request.json()

    const password = await bcrypt.hash(data.password, 10)

    const signUp = await prisma.user.create({
        data:{
            email: data.email,
            name: data.name,
            password
        }
    })

    console.log(data.email,data.password,)

    return NextResponse.json(data)
    
}