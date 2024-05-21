import { prisma } from "@/libs/db"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"


const secret = process.env.NEXTAUTH_SECRET

export async function POST(req: NextRequest) {

    const data = await req.json()
    console.log(data)

    const token = await getToken({ req , secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   
    let userId: number = token.id

    await prisma.expenseType.create({
        data:{
            name: data.typeName,
            icon: "i",
            userId: userId
        }
    })

    return NextResponse.json(data)

}


export async function GET() {

    const data = await prisma.expenseType.findMany({
        select:{
            name: true
        }
    })

    return NextResponse.json(data)

}