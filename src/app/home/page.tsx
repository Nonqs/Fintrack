"use client"
import IncomeForm from "@/components/Income"
import ExpenseForm from "@/components/Expense"
import Registers from "@/components/RegisterData"
import { Button, Card, Tab, Tabs } from "@nextui-org/react"
import { HomeChart } from "@/components/charts/HomeChart"
import { useEffect, useState } from "react"

export default function Home() {

    const [registers, setRegisters] = useState([])
    const [cash, setCash] = useState()

    useEffect(() => {

        const getRegisters = async () => {

            const res = await fetch("/api/home", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json()
            setRegisters(data.registers)
            setCash(data.totalCash)
        }

        getRegisters()
    }, [])


    return (
        <div className="w-full">
            <section className="w-full flex justify-center items-center mt-10 mb-10">
                <Card className="w-1/6 h-10 flex justify-center align-middle text-center text-[#4ade80]">
                    <p>${cash}</p>
                </Card>
            </section>
            <section className="flex flex-col sm:flex-row w-full justify-center mb-10">
                <Card className="w-1/2 p-10 flex justify-center">
                    <article className="mb-10">
                    <IncomeForm />
                    </article>
                    <ExpenseForm/>
                </Card>
                <div className="w-1/3 flex justify-center">
                    <Registers registers={registers} />
                </div>
            </section>
            <section className="w-full h-[50vh] flex justify-center items-center">
                <div className="flex w-full flex-col items-center">
                    <Tabs aria-label="Options">
                        <Tab className="w-1/2" key="monthly" title="Monthly">
                            <Card className="h-[40vh] w-full">
                                <HomeChart data={registers} view={"monthly"} />
                            </Card>
                        </Tab>
                        <Tab className="w-1/2" key="annual" title="annual">
                            <Card className="h-[40vh] w-full">
                                <HomeChart data={registers} view={"annual"} />
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </div>

    )
}