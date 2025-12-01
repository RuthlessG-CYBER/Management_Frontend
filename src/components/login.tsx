import { Button } from "./ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"


const BASE_URL = `https://management-backend-oskq.onrender.com`

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                email,
                password
            })

            console.log("Login Success:", response.data);
            toast.success("Login successful!");

            navigate("/home");
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Login failed. Please try again.");
        }
    }

    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center 
    bg-[url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
    bg-cover bg-center bg-no-repeat">
                <Card className="w-full max-w-sm bg-gray-800 text-white shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] border-white">
                    <CardHeader>
                        <CardTitle>Login to your account </CardTitle>
                        <CardDescription className="text-stone-200">
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button onClick={() => navigate("/signup")} className="font-bold text-white" variant="link">Sign Up</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="example@email.com"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label>Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        placeholder="---------"
                                        type="password"
                                        required 
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button onClick={handleLogin} type="submit" className="w-full bg-white text-black hover:text-white">
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Login;

