"use client"
import Accounts from "@/components/Accounts";
import IncomeForm from "@/components/Income";
import Registers from "@/components/RegisterData";
import ShowAccounts from "@/components/accountsAndTypes/ShowAccounts";
import ShowIncomes from "@/components/accountsAndTypes/ShowIncomes";
import { LinearChart } from "@/components/charts/LinearChart";
import { Card, Divider, Input, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Income() {

    const [typeName, setTypeName] = useState<string>("")
    const [registers, setRegisters] = useState([])
    const accountWidth = "w-2/3"

    const getName = (accountName: string) => {

    }

    const handleSubmiteTypes = async(e) => {

        e.preventDefault()

        const response = await fetch("api/incomes", {
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

    useEffect(()=>{

        const getRegisters = async() =>{

            const res = await fetch("/api/incomes/register", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json()
            const newRegisters = data.map(transaction => ({
                ...transaction,
                type: 'income'
              }));
            setRegisters(newRegisters)
        }

        getRegisters()
    }, [])

    return (
        <div>
            <div className="flex h-full justify-center align-middle mt-20 mb-10">
                <Card className="w-1/2 h-1/2 p-10 flex">
                    <IncomeForm />
                    <div className="flex mt-10">
                        <Accounts getName={getName} accountWidth={accountWidth} />
                        <div className="w-1/3 ms-5">
                            <h4 className="text-[#4ade80]">New income type</h4>
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
            <div className="h-[60vh] flex justify-center">
                <Card className="w-1/2 h-[40.5vh] justify-center">
                    <LinearChart category={"income"} />
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
                                    <ShowIncomes />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </section>
            </div>
        </div>
    )
}