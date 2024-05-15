"use client"
import { Chip, Divider, Input } from "@nextui-org/react";
import { useState } from "react";


export default function ThirdPage() {

    const [expenseName, setExpenseName] = useState<string>("")
    const [expenseType, setExpenseType] = useState<string[]>([])

    const handleSubmit = () => {

        const newType = [...expenseType, expenseName]
        setExpenseType(newType)
    }

    const handleChipClose = (index: number) => {

        const updatedAccounts = expenseType.filter((_, i) => i !== index)
        setExpenseType(updatedAccounts)

    }

    return (
        <div className="w-full">
            <div className="flex justify-center items-center align-middle">
                <div className="w-3/4 ms-5">
                    <h4 className="text-[#f87171]">New expense type</h4>
                    <Divider className="mb-2 mt-1" />
                    <div className="flex justify-center">
                        <Input variant="underlined" label="Type name" value={expenseName} />
                        <button onClick={handleSubmit} className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
                    </div>
                </div>
            </div>
            <div>
                {expenseType.map((expense, index) => (
                    <Chip key={index} className="ms-4 mt-4" color="success" onClose={() => handleChipClose(index)}>
                        {expense}
                    </Chip>
                ))}
            </div>
        </div>
    )
}