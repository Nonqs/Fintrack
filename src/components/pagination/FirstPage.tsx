"use client"
import { Chip, Divider, Input } from "@nextui-org/react";
import Accounts from "../Accounts";
import { useState } from "react";


export default function FirstPage() {

    const [accounts, setAccounts] = useState<string[]>([])

    const accountWidth = "w-3/4"

    const getName = (accountName: string) => {

        const newAccount = [...accounts, accountName]

        setAccounts(newAccount)

    }

    const handleChipClose = (index: number) => {

        const updatedAccounts = accounts.filter((_, i) => i !== index)
        setAccounts(updatedAccounts)
        
    }

    return (
        <div>
            <div className="flex justify-center items-center align-middle">
                <Accounts getName={getName} accountWidth={accountWidth} />
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
