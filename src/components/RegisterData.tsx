import { Register } from "@/types";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import moment from "moment";


export default function Registers({ registers }: { registers: Register[] }) {

    return (
        <Card className="w-2/3 overflow-y-auto">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Registers</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex ">
                {registers.map((register, index) =>(
                    <div key={index} className={`${register.type === "income" ?("text-[#4ade80]") :("text-[#f87171]")} flex text-center items-center`}>
                        <small>{moment(register.date).format('YYYY-MM-DD')}</small>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{register.type === "income" ?(` $${register.amount}`) :(`$${register.amount}`)}</p>
                    </div>
                ))}
            </CardBody>
        </Card>
    )
}