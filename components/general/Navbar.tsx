import Link from "next/link";
import Logo from "@/public/logo.png"
import Image from "next/image";
import {Button, buttonVariants} from "../ui/button"
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";


export async function Navbar() {
    const session = await auth();
    return (
      <nav className="flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="russel" width={40} height={40} />
          <h1 className="text-2xl font-bold">
            Job<span className="text-primary">Russel</span>
          </h1>
        </Link>
        
        {/* desktop navigation */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <Link className={buttonVariants({ size: "lg" })} href="/post-job">
            Post Job
          </Link>
          {session?.user ? (
            <p>User dropdown</p>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}>
                Login
              </Link>
          )}
        </div>
      </nav>
    );
}
