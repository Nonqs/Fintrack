import Accounts from "@/components/Accounts";
import ExpenseForm from "@/components/Expense";
import Registers from "@/components/RegisterData";
import { Card, Divider, Input } from "@nextui-org/react";

const registers = [
    {type: "expense", date: "11/2/2004", value: 2000},
    {type: "expense", date: "18/2/2004", value: 3000},
    {type: "expense", date: "11/2/2004", value: 2000},
    {type: "expense", date: "18/2/2004", value: 3000},
    {type: "expense", date: "18/2/2004", value: 3000},
]


export default function Expenses(){


    return (
        <div className="flex h-full justify-center align-middle mt-20">
            <Card className="w-1/2 h-1/2 p-10 flex">
                <ExpenseForm />
                <div className="flex mt-10">
                    <Accounts />
                    <div className="w-1/3 ms-5">
                        <h4 className="text-[#f87171]">New expense type</h4>
                        <Divider className="mb-2 mt-1" />
                        <div className="flex">
                            <Input variant="underlined" label="Type name" />
                            <button className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
                        </div>
                    </div>
                </div>
            </Card>
            <div className="w-1/3 flex justify-center">
                <Registers registers={registers}/>
            </div>
        </div>
    )
}