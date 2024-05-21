"use client"
import { Chip, Divider, Input } from "@nextui-org/react";
import Accounts from "../Accounts";
import { useState } from "react";


export default function FirstPage() {

    const [accounts, setAccounts] = useState<string[]>([])
    const [accountName, setAccountName] = useState<string>("")
    const [initialCash, setInitialCash] = useState<number | string>("")

    const accountWidth = "w-3/4"

    const getName = () => {
       
        const newAccount = [...accounts, accountName]

        setAccounts(newAccount)

        setAccountName("")
        setInitialCash("")
    }

    const handleChipClose = (index: number) => {

        const updatedAccounts = accounts.filter((_, i) => i !== index)
        setAccounts(updatedAccounts)

    }

    return (
        <div>
            <div className="flex justify-center items-center align-middle">
                <div className={`${accountWidth}`}>
                    <h4 className="text-[#4ade80]">Create new account</h4>
                    <Divider className="mb-4 mt-1" />
                    <div className="flex">
                        <Input className="w-3/5" onChange={(e) => { setAccountName(e.target.value) }} variant="underlined" label="Account name" value={accountName} />
                        <Input className="w-2/5" onChange={(e) => { setInitialCash(parseInt(e.target.value)) }} type="number" label="Initial cash" variant="underlined" value={initialCash}></Input>
                        <button onClick={getName} className="border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
                    </div>
                </div>
            </div>
            <div>
                {accounts.map((account, index) => (
                    <Chip key={index} className="ms-4 mt-4" color="success" onClose={() => handleChipClose(index)}>
                        {account}
                    </Chip>
                ))}
            </div>
        </div>
    )
}
