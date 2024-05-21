"use client"
import {
    Autocomplete,
    AutocompleteSection,
    AutocompleteItem
} from "@nextui-org/autocomplete";
import { Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export default function IncomeForm() {
    
    const [accounts, setAccounts] = useState<string[]>([])
    const [incomes, setIncomes] = useState<string[]>([])

    const [accountName, setAccountName] = useState<string>("")
    const [incomeName, setIncomeName] = useState<string>("")
    const [amount, setAmount] = useState<string | number>("")

    useEffect(()=>{
        
        const getAccounts = async() =>{

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

        const getIncomes = async() =>{

            const response = await fetch("api/incomes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {
                throw new Error('Failed to sign up')
            }
            const resJson = await response.json()
            const typeNames = resJson.map((element: { name: string }) => element.name);

            setIncomes(typeNames)
            console.log(resJson)

        }

        getAccounts()
        getIncomes()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()

        const response = await fetch('/api/incomes/register', {
            method: 'POST',
            body: JSON.stringify({
                accountName,
                incomeName,
                amount
            })
        })
        setAmount("")
        setAccountName("")
        setIncomeName("")
    }


    return (
        <div>
            <Link href={"/incomes"}>
                <div>
                    <h4 className="text-[#4ade80] text-xl font-semibold">New income</h4>
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
                            {accounts.map((account, index) => (
                                <SelectItem key={account} value="income">{account}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            size="sm"
                            variant={"underlined"}
                            label="Income"
                            className="max-w-xs w-3/5"
                            onChange={(e)=>{setIncomeName(e.target.value)}}
                            isRequired
                        >
                            {incomes.map((income, index) => (
                                <SelectItem className="outline-0" key={income} value={income}>{income}</SelectItem>
                            ))}
                        </Select>
                        <Input
                            type="number"
                            size="sm"
                            variant={"underlined"}
                            label="$"
                            className="w-3/5"
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