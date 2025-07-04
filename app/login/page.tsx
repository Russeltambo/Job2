import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png"
import { LoginForm } from "@/components/forms/LoginForm";

export default function Login() {
    return (
        <div className="min-h-screen w-screen flex items-center
        justify-center">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center">
                <Image src={Logo} alt="Logo" width={50} className="flex items-center gap-2" /> 
                <h1 className="text-3xl font-bold">
                    Job<span className="text-primary">Russel</span>
                </h1>
                </Link>
                <LoginForm />
            </div>
        </div>
    );
}