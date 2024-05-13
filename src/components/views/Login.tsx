"use client"
import { Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "../icons/PasswordTogleIcon";
import { EyeFilledIcon } from "../icons/PasswordTogleView";


export default function Login() {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Card className="w-full h-full bg-default-200">
            <CardHeader>
                <h4>Login</h4>
            </CardHeader>
            <CardBody>
                <Input
                    type="email"
                    size="sm"
                    label="Email"
                    isRequired
                    className="mb-5" />
                <Input
                    label="password"
                    isRequired
                    size="sm"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                />
            </CardBody>
            <CardFooter className="flex justify-center" >
                <button className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black py-4">Enviar</button>
            </CardFooter>
        </Card>

    )
}