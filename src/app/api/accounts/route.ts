import { prisma } from "@/libs/db";
import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET

export async function POST(req: NextRequest) {

    const data = await req.json()
    console.log(data)

    const token = await getToken({ req , secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   
    let userId: number = token.id

    await prisma.account.create({
        data:{
            cash: data.initialCash,
            name: data.accountName,
            icon: "a",
            userId: userId
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

    const data = await prisma.account.findMany({
        where:{
            userId
        },
        select:{
            name: true,
            cash: true,
        }
    }) 

    return NextResponse.json(data)

}

export async function PATCH(req: NextRequest) {

    const data = await req.json()
    console.log(data)

    const token = await getToken({ req, secret });

    if (!token || !token.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userId: number = token.id

    const account = await prisma.account.findFirst({
        where: {
            name: data.actualName,
            userId
        },
        select:{
            id: true
        }
    })

    if(!account) return

    await prisma.account.update({
        where: {
            id: account.id
        },
        data: {
            name: data.editName
        }
    })

    return NextResponse.json(data)

}

export async function DELETE(req: NextRequest) {

    const data = await req.json()

    const token = await getToken({ req , secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   
    let userId: number = token.id

    const account = await prisma.account.findFirst({
        where:{
            userId,
            name: data.name
        },
        select:{
            id:true
        }
    }) 

    await prisma.expense.deleteMany({
        where: { accountId: account?.id}
    })

    await prisma.income.deleteMany({
        where: { accountId: account?.id}
    })

    await prisma.account.delete({
        where:{
            id: account?.id
        }
    }) 

    return NextResponse.json(data)

}

