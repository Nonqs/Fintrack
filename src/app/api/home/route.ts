import { prisma } from "@/libs/db"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"


const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {

    const token = await getToken({ req, secret })

    if (!token || !token.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let userId: number = token.id

    const [expenseRegisters, incomeRegisters] = await Promise.all([
        prisma.expense.findMany({
            where: {
                userId: userId
            },
            select: {
                date: true,
                amount: true
            }
        }),
        prisma.income.findMany({
            where: {
                userId: userId
            },
            select: {
                date: true,
                amount: true
            }
        })
    ])

    const registers = [
        ...expenseRegisters.map(register => ({ ...register, type: 'expense' })),
        ...incomeRegisters.map(register => ({ ...register, type: 'income' }))
    ]

    registers.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const accounts = await prisma.account.findMany({
        where:{
            userId
        },
        select:{
            cash: true
        }
    })
    console.log(registers)

    let totalCash = 0
    accounts.map(cash => { totalCash = totalCash + cash.cash } )
    
    return NextResponse.json({registers, totalCash})

}