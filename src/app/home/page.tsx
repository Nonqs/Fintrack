import IncomeForm from "@/components/Income"
import ExpenseForm from "@/components/Expense"
import Registers from "@/components/RegisterData"
import { Card } from "@nextui-org/react"
import { HomeChart } from "@/components/charts/HomeChart"

const registers = [
    { type: "income", date: "11/2/2004", value: 2000 },
    { type: "expense", date: "14/2/2004", value: 1000 },
    { type: "income", date: "18/2/2004", value: 3000 },
    { type: "income", date: "11/2/2004", value: 2000 },
    { type: "expense", date: "14/2/2004", value: 1000 },
    { type: "income", date: "18/2/2004", value: 3000 },
    { type: "income", date: "11/2/2004", value: 2000 },
    { type: "expense", date: "14/2/2004", value: 1000 },
    { type: "income", date: "18/2/2004", value: 3000 },
    { type: "income", date: "11/2/2004", value: 2000 },
    { type: "expense", date: "14/2/2004", value: 1000 },
    { type: "income", date: "18/2/2004", value: 3000 },
]

export default function Home() {


    return (
        <div className="w-full">
            <section className="w-full flex justify-center m-10">
                <Card className="w-1/5 h-10 flex justify-center align-middle text-center text-[#4ade80]">
                    <p>$5000000000000</p>
                </Card>
            </section>
            <section className="flex flex-col sm:flex-row w-full justify-center mb-10">
                <Card className="w-1/2 p-10 flex justify-center">
                    <IncomeForm />
                    <ExpenseForm />
                </Card>
                <div className="w-1/3 flex justify-center">
                    <Registers registers={registers} />
                </div>
            </section>
            <section className="h-[50vh] flex justify-center">
                <Card className="h-[40vh] w-1/2">
                    <HomeChart />
                </Card>
            </section>
        </div>

    )
}