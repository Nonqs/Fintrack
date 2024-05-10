import {
    Autocomplete,
    AutocompleteSection,
    AutocompleteItem
} from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/react";

const incomes = [
    "income",
    "trabajo",
    "regalo",
    "rateada"
]

const accounts = [
    "account",
    "banco",
    "efectivo",
    "mayita"
]

export default function IncomeForm() {

    return (
        <div className="bg-amber-300">
            <h4 className="text-[#175023] text-xl font-semibold">New income</h4>
            <form>
                <div className="flex border">
                    <div className="flex border-2 rounded-3xl overflow-hidden">
                        <select className="w-1/5">
                            {accounts.map(account =>(
                                <option key={account} value="income">{account}</option>
                            ))}
                        </select>
                        <input 
                        className="w-1/5" 
                        type="number"
                        placeholder="$"
                         />
                         <select className="w-1/5">
                            {incomes.map(income =>(
                                <option key={income} value={income}>{income}</option>
                            ))}
                         </select>
                         <button className="w-2/5 bg-slate-400">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}