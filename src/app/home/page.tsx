import IncomeForm from "@/components/Income"
import ExpenseForm from "@/components/Expense"
import Registers from "@/components/RegisterData"


export default function Home(){


    return (
        <div className="container">
            <section className="">
                Total
            </section>
            <section className="flex w-full">
                <div className="w-1/2">
                   <IncomeForm />
                    <div>
                    <ExpenseForm />
                    </div>
                </div>
                <div className="w-1/2 flex justify-center">
                    <Registers />
                </div>
            </section>

        </div>
    )
}