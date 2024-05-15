"use client"
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "../icons/PasswordTogleIcon";
import { EyeFilledIcon } from "../icons/PasswordTogleView";
import { useRouter } from "next/navigation";


export default function SignUp() {

    const router = useRouter()

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    const handleSubmit = () =>{

        router.push("/auth/firstConfigurations")
    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex-col">
                <h4 className="w-full font-bold text-2xl text-center mt-2">Sign Up</h4>
            </CardHeader>
            <CardBody>
                <Input
                    type="email"
                    size="sm"
                    label="Email"
                    isRequired
                    className="mb-8"
                    variant="underlined"
                />
                <Input
                    label="password"
                    isRequired
                    size="sm"
                    variant="underlined"
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
                <Checkbox className="mt-8" color="success">Remember me</Checkbox>
                <Link className="mt-5 w-full text-center" isBlock showAnchorIcon href="/auth/login" color="primary">You have an account? go to Login </Link>
            </CardBody>
            <CardFooter className="flex justify-center" >
                <button onClick={handleSubmit} className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black py-4">Sign Up</button>
            </CardFooter>
        </Card>

    )
}