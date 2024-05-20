"use client"
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "../icons/PasswordTogleIcon";
import { EyeFilledIcon } from "../icons/PasswordTogleView";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export default function Login() {

    const router = useRouter()

    const [isVisible, setIsVisible] = useState(false)
    const [validate, setValidate] = useState<boolean>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState("")


    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleSubmit = async (e) => {
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
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (res.error) return

        router.push("/home")
    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex-col">
                <h4 className="w-full font-bold text-2xl text-center mt-2">Login</h4>
            </CardHeader>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <CardBody className="w-2/3 flex flex-col items-center">
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
                    <article className="mb-4 w-full">
                        <Checkbox className="mt-8" color="success">Remember me</Checkbox>
                        <Link className="mt-5 w-full text-center" isBlock showAnchorIcon href="/auth/signup" color="primary">You don't have an account? Signup now</Link>
                    </article>
                </CardBody>
                <CardFooter className="flex justify-center" >
                    <button onSubmit={handleSubmit} className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black py-4">Sign Up</button>
                </CardFooter>
            </form>
        </Card>

    )
}