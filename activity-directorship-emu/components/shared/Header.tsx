import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href='/' className="w-36">
          <Image src="/logo.png" alt={"Logo"} width={128} height={38} />
        </Link>

        <SignedIn>
          <nav className="md:flex  hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="rounded-full">
          <SignedIn>
            <UserButton />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header
