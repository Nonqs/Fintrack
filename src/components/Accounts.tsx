import { Divider, Input } from "@nextui-org/react";

export default function Accounts(){
    return(
        <div className="w-3/5">
            <h4 className="text-[#4ade80]">Create new account</h4>
            <Divider className="mb-2 mt-1" />
            <div className="flex">
                <Input variant="underlined" label="Account name"/>
                <Input type="number" label="Initial cash" variant="underlined"></Input>
                <button className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black">Enviar</button>
            </div>
        </div>
    )
}