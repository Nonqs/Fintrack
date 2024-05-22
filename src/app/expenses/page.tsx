"use client"
import Accounts from "@/components/Accounts";
import ExpenseForm from "@/components/Expense";
import Registers from "@/components/RegisterData";
import ShowAccounts from "@/components/accountsAndTypes/ShowAccounts";
import ShowExpenses from "@/components/accountsAndTypes/ShowExpenses";
import { LinearChart } from "@/components/charts/LinearChart";
import { Card, Divider, Input, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Expenses() {
    
    const [typeName, setTypeName] = useState<string>("")
    const [registers, setRegisters] = useState([])
    const accountWidth = "w-2/3"

    const getName = (accountName: string) => {

    }

    useEffect(()=>{

        const getRegisters = async() =>{

            const res = await fetch("/api/expenses/register", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json()
            const newRegisters = data.map(transaction => ({
                ...transaction,
                type: 'expense'
              }));
            setRegisters(newRegisters)
            console.log(newRegisters)
        }

        getRegisters()
    }, [])

    const handleSubmiteTypes = async(e) => {

        e.preventDefault()

        const response = await fetch("api/expenses", {
            method: "POST",
            body: JSON.stringify({
                typeName
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            throw new Error('Failed to sign up')
        }
        const resJson = await response.json()
        setTypeName("")

    }

    return (
        <div>
            <div className="flex h-full justify-center align-middle mt-20 mb-10">
                <Card className="w-1/2 h-1/2 p-10 flex">
                    <ExpenseForm />
                    <div className="flex mt-10">
                        <Accounts getName={getName} accountWidth={accountWidth} />
                        <div className="w-1/3 ms-5">
                            <h4 className="text-[#f87171]">New expense type</h4>
                            <Divider className="mb-2 mt-1" />
                            <form onSubmit={handleSubmiteTypes}>
                                <div className="flex">
                                <Input onChange={(e)=>{setTypeName(e.target.value)}} variant="underlined" label="Type name" value={typeName}/>
                                    <button className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Card>
                <div className="w-1/3 flex justify-center">
                    <Registers registers={registers} />
                </div>
            </div>
            <div className="h-[50vh] flex justify-center">
                <Card className="w-1/2 h-[40vh]">
                    <LinearChart category={"expense"} />
                </Card>
                <section className="w-1/3 h-[40vh]">
                    <div className="flex w-full justify-center items-center flex-col">
                        <Tabs aria-label="Options">
                            <Tab className="w-full flex justify-center" key="photos" title="Accounts">
                                <div className="h-[33vh] w-2/3">
                                    <ShowAccounts />
                                </div>
                            </Tab>
                            <Tab className="w-full flex justify-center" key="music" title="Income Types">
                                <div className="h-[33vh] w-2/3">
                                    <ShowExpenses />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </section>
            </div>
        </div>
    )
}