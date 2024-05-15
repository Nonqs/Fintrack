"use client"
import { Divider, Input } from "@nextui-org/react";
import { useState } from "react";

export default function Accounts({getName, accountWidth}) {

    const [accountName, setAccountName] = useState<string>()
    const [initialCash, setInitialCash] = useState<number | string>()

    const createAccount = () => {

        getName(accountName)
        setAccountName("")
        setInitialCash("")

    }

    return (
        <div className={`${accountWidth}`}>
            <h4 className="text-[#4ade80]">Create new account</h4>
            <Divider className="mb-4 mt-1" />
            <div className="flex">
                <Input className="w-3/5" onChange={(e) => { setAccountName(e.target.value) }} variant="underlined" label="Account name" value={accountName}/>
                <Input className="w-2/5" onChange={(e) => { setInitialCash(parseInt(e.target.value)) }} type="number" label="Initial cash" variant="underlined" value={initialCash}></Input>
                <button onClick={createAccount} className="border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
            </div>
        </div>
    )
}