import { Chip, Divider, Input } from "@nextui-org/react";
import { useState } from "react";


export default function SecondPage() {

    const [incomeName, setIncomeName] = useState<string>("")
    const [incomeType, setIncomeType] = useState<string[]>([])

    const handleSubmit = () =>{

        const newType = [...incomeType, incomeName]

        setIncomeType(newType)
        setIncomeName("")
    }

    const handleChipClose = (index: number) => {

        const updatedAccounts = incomeType.filter((_, i) => i !== index)
        setIncomeType(updatedAccounts)

    }

    return (
        <div>
            <div className="flex justify-center items-center align-middle">
                <div className="w-3/4 ms-5">
                    <h4 className="text-[#4ade80]">New income type</h4>
                    <Divider className="mb-2 mt-1" />
                    <div className="flex">
                        <Input onChange={(e) => { setIncomeName(e.target.value) }} variant="underlined" label="Type name" value={incomeName}/>
                        <button className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black" onClick={handleSubmit}>Enviar</button>
                    </div>
                </div>
            </div>
            <div>
                {incomeType.map((income, index) => (
                    <Chip key={index} className="ms-4 mt-4" color="success" onClose={() => handleChipClose(index)}>
                        {income}
                    </Chip>
                ))}
            </div>
        </div>
    )
}