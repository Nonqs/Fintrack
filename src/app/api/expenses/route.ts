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

export async function GET(req: NextRequest) {

    const token = await getToken({ req , secret });

    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   
    let userId: number = token.id

    const data = await prisma.expenseType.findMany({
        where:{
            userId
        },
        select:{
            name: true,
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

    const expenseTypeId = await prisma.expenseType.findFirst({
        where: {
            name: data.actualName,
            userId
        },
        select:{
            id: true
        }
    })

    if(!expenseTypeId) return

    await prisma.expenseType.update({
        where: {
            id: expenseTypeId.id
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

    const expense = await prisma.expenseType.findFirst({
        where:{
            userId,
            name: data.name
        },
        select:{
            id:true
        }
    }) 

    await prisma.expense.deleteMany({
        where: { expensesTypeId: expense?.id}
    })

    await prisma.expenseType.delete({
        where:{
            id: expense?.id
        }
    }) 

    return NextResponse.json(data)

}

