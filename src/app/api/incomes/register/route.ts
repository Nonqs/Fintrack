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

    const account = await prisma.account.findFirst({
        where:{
            userId: userId,
            name: data.accountName
        },
        select:{
            id: true,
            cash: true
        }
    })

    const income = await prisma.incomeType.findFirst({
        where:{
            userId: userId,
            name: data.incomeName
        },
        select:{
            id: true
        }
    })  

    if(!income || !account) return 

    const amount = parseInt(data.amount)

    await prisma.income.create({
        data:{
            accountId: account.id,
            amount,
            incomeTypeId: income.id,
            userId: userId
        }
    })

    await prisma.account.update({
        where: {
            id: account.id
        },
        data: {
            cash: account.cash + amount  
        }
    })

    return NextResponse.json(data)

}

export async function GET(req: NextRequest) {

    const token = await getToken({ req , secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   
    let userId: number = token.id

    const registers = await prisma.income.findMany({
        where:{
            userId: userId
        },
        select:{
            date: true,
            amount: true
        }
    })

    return NextResponse.json(registers)

}