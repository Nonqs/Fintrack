"use client"
import { Select, SelectItem, Input, Divider } from "@nextui-org/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";


export default function ExpenseForm() {

    const [accounts, setAccounts] = useState<string[]>([])
    const [expenses, setExpenses] = useState<string[]>([])

    const [accountName, setAccountName] = useState<string>("")
    const [expenseName, setExpenseName] = useState<string>("")
    const [amount, setAmount] = useState<string | number>("")

    useEffect(() => {

        const getAccounts = async () => {

            const response = await fetch("api/accounts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {
                throw new Error('Failed to sign up')
            }
            const resJson = await response.json()
            const accountNames = resJson.map((element: { name: string }) => element.name);
            setAccounts(accountNames)
            console.log(resJson)
        }

        const getIncomes = async () => {

            const response = await fetch("api/expenses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {
                throw new Error('Failed to sign up')
            }
            const resJson = await response.json()
            const expenseNames = resJson.map((element: { name: string }) => element.name)
            setExpenses(expenseNames)
            console.log(resJson)

        }

        getAccounts()
        getIncomes()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        const response = await fetch('/api/expenses/register', {
            method: 'POST',
            body: JSON.stringify({
                accountName,
                expenseName,
                amount
            })
        })

        setAmount("")
        setAccountName("")
        setExpenseName("")
    }

    return (
        <div>
            <Link href="/expenses">
                <div>
                    <h4 className="text-[#f87171] text-xl font-semibold">New Expense</h4>
                    <Divider className="mb-2 mt-1" />
                </div>
            </Link>
            <form onSubmit={onSubmit}>
                <div className="flex">
                    <div className="flex w-full">
                        <Select
                            size="sm"
                            variant={"underlined"}
                            label="Account"
                            className="max-w-xs w-3/5"
                            onChange={(e)=>{setAccountName(e.target.value)}}
                            isRequired
                        >
                            {accounts.map(account => (
                                <SelectItem key={account} value="income">{account}</SelectItem>
                            ))}
                        </Select>
                        <Select
                            size="sm"
                            variant={"underlined"}
                            label="Expense"
                            className="max-w-xs w-3/5"
                            onChange={(e)=>{setExpenseName(e.target.value)}}
                            isRequired
                        >
                            {expenses.map(expense => (
                                <SelectItem className="outline-0" key={expense} value={expense}>{expense}</SelectItem>
                            ))}
                        </Select>
                        <Input
                            type="number"
                            size="sm"
                            variant={"underlined"}
                            label="$"
                            className="w-3/5"
                            value={amount}
                            onChange={(e)=>{setAmount(e.target.value)}}
                            isRequired

                        />
                        <button className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}