"use client"
import {Select, SelectItem, Input, Divider} from "@nextui-org/react";

const incomes = [
    "trabajo",
    "regalo",
    "rateada"
]

const accounts = [
    "banco",
    "efectivo",
    "mayita"
]

export default function ExpenseForm() {

    return (
        <div className="mt-10">
            <h4 className="text-[#6e2924] text-xl font-semibold">New Expense</h4>
            <Divider className="mb-2 mt-1" />
            <form>
                <div className="flex">
                    <div className="flex w-full">
                        <Select 
                        size="sm"
                        variant={"underlined"}
                        label="Account" 
                        className="max-w-xs w-3/5" >
                            {accounts.map(account =>(
                                <SelectItem key={account} value="income">{account}</SelectItem>
                            ))}
                        </Select>
                        <Select 
                         size="sm"
                         variant={"underlined"}
                         label="Income" 
                         className="max-w-xs w-3/5" 
                         >
                            {incomes.map(income =>(
                                <SelectItem className="outline-0" key={income} value={income}>{income}</SelectItem>
                            ))}
                         </Select>
                        <Input  
                        type="number"
                        size="sm"
                        variant={"underlined"}
                        label="$" 
                        className="w-3/5"
                         />
                         <button className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}