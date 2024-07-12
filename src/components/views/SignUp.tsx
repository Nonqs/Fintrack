"use client"
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { EyeSlashFilledIcon } from "../icons/PasswordTogleIcon";
import { EyeFilledIcon } from "../icons/PasswordTogleView";
import { signIn } from "next-auth/react";


export default function SignUp() {

    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
    const [validate, setValidate] = useState<boolean>()
    const [email, setEmail] = useState<string>()
    const [name, setName] = useState<string>()
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [error, setError] = useState("")


    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const toggleVisibilityConfirmPassword = () => {
        setIsVisibleConfirm(!isVisibleConfirm)
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

        if(confirmPassword === password){

            try {
                const response = await fetch("../api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        password
                    })
                })
    
                if (!response.ok) {
                    throw new Error('Failed to sign up')
                }
                const resJson = await response.json()
                console.log(resJson)
    
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: 'http://localhost:3000/auth/firstConfigurations'
                })
    
            } catch (error) {
                console.error('Error:', error)
                setError('Failed to sign up. Please try again.')
            }

        }else{
            setValidate(true)
            setError('Passwords do not match')
        }

    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex-col">
                <h4 className="w-full font-bold text-2xl text-center mt-2">Sign Up</h4>
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
                        type="text"
                        size="sm"
                        label="Name"
                        isRequired
                        className="mb-8"
                        variant="underlined"
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <Input
                        label="Password"
                        isRequired
                        size="sm"
                        className="mb-8"
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
                    <Input
                        label="Confirm Password"
                        isRequired
                        size="sm"
                        className="mb-8"
                        variant="underlined"
                        onChange={(e) => { setConfirmPassword(e.target.value), setValidate(false) }}
                        isInvalid={validate}
                        color={validate ? "danger" : "default"}
                        errorMessage={validate && error}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirmPassword}>
                                {isVisibleConfirm ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisibleConfirm ? "text" : "password"}
                    />
                    <article className="mb-4 w-full">
                        <Checkbox color="success">Remember me</Checkbox>
                    </article>
                    <Link className="w-full text-center" isBlock showAnchorIcon href="/auth/login" color="primary">You have an account? go to Login </Link>
                </CardBody>
                <CardFooter className="flex justify-center" >
                    <button onSubmit={handleSubmit} className="w-2/5 border-2 rounded-md transition-colors duration-300  hover:bg-slate-200 hover:text-black py-4">Sign Up</button>
                </CardFooter>
            </form>
        </Card>

    )
}