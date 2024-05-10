import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const registers = [
    {type: "income", date: "11/2/2004", value: 2000},
    {type: "expense", date: "14/2/2004", value: 1000},
    {type: "income", date: "18/2/2004", value: 3000}
]

export default function Registers() {

    return (
        <Card className="py-4 w-2/3">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Registers</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex justify-center align-middle">
                {registers.map(register =>(
                    <div className={`${register.type === "income" ?("text-[#175023]") :("text-[#6e2924]")} flex text-center items-center`}>
                        <small>{register.date}</small>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{register.type === "income" ?(` $${register.value}`) :(`$${register.value}`)}</p>
                    </div>
                ))}
            </CardBody>
        </Card>
    )
}