import IncomeForm from "@/components/Income"
import ExpenseForm from "@/components/Expense"
import Registers from "@/components/RegisterData"
import { Card } from "@nextui-org/react"


export default function Home() {


    return (
        <div className="container">
            <section className="w-full flex justify-center m-10">
                <Card className="w-1/5 h-10 flex justify-center align-middle text-center text-[#4ade80]">
                    <p>$5000000000000</p>
                </Card>
            </section>
            <section className="flex flex-col sm:flex-row w-full justify-center">
                <Card className="w-1/2 h-1/2 p-10 flex justify-center">
                    <IncomeForm />
                    <ExpenseForm />
                </Card>
                <div className="w-1/3 flex justify-center">
                    <Registers />
                </div>
            </section>

        </div>
    )
}