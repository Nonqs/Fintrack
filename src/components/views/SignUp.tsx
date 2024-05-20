"use client"
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "../icons/PasswordTogleIcon";
import { EyeFilledIcon } from "../icons/PasswordTogleView";
import { useRouter } from "next/navigation";


export default function SignUp() {

    const router = useRouter()

    const [isVisible, setIsVisible] = useState(false)
    const [validate, setValidate] = useState<boolean>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState("")


    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const hasMinLength = password.length >= 5
        const hasTwoNumbers = (password.match(/\d/g) || []).length >= 2

        if (!hasMinLength) {
            setError('Password must be at least 5 characters long.')
            setValidate(true)
            return
        }

        if (!hasTwoNumbers) {
            setError('Password must contain at least two numbers.')
            setValidate(true)
            return
        }

        setError('')
        setValidate(false)
        router.push("/auth/firstConfigurations")
    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex-col">
                <h4 className="w-full font-bold text-2xl text-center mt-2">Sign Up</h4>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardBody>
                    <Input
                        type="email"
                        size="sm"
                        label="Email"
                        isRequired
                        className="mb-8"
                        variant="underlined"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <Input
                        label="password"
                        isRequired
                        size="sm"
                        variant="underlined"
                        onChange={(e) => { setPassword(e.target.value), setValidate(false) }}
                        isInvalid={validate}
                        color={validate ? "danger" : "default"}
                        errorMessage={validate && error}
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
                    <button onSubmit={handleSubmit} className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black py-4">Sign Up</button>
                </CardFooter>
            </form>
        </Card>

    )
}