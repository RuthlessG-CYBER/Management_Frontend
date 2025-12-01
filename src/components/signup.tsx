import { Button } from "./ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

const BASE_URL = `http://localhost:4040`

export function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async() => {
        try {
            const response = await axios.post(`${BASE_URL}/api/signup`, {
                name,
                email,
                password,
                role: "admin"
            });

            console.log("Signup Success:", response.data);
            toast.success("Signup successful!");

            navigate("/");

        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center 
    bg-[url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
    bg-cover bg-center bg-no-repeat">
                <Card className="w-full max-w-sm bg-gray-800 text-white shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] border-white">
                    <CardHeader>
                        <CardTitle>Signup to create an account</CardTitle>
                        <CardDescription className="text-stone-200">
                            Enter your email and password below to create an account
                        </CardDescription>
                        <CardAction>
                            <Button onClick={() => navigate("/")} className="font-bold text-white" variant="link">Log In</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label>Name</Label>
                                    <Input
                                        type="name"
                                        placeholder="Soumya Panda"
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
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
                                    </div>
                                    <Input
                                        placeholder="--------"
                                        type="password"
                                        required 
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button onClick={handleSignup} type="button" className="w-full bg-white text-black hover:text-white">
                            Signup
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Signup;

