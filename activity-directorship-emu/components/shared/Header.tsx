import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button";
import { SignedOut } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
            <Link href='/' className="w-36">
            <Image src="/activity-directorship-emu-high-resolution-logo.png" alt={"Logo"} width={128} height={38} />
            </Link>
            <div className="flex w-32 justify-end gap-3">
            </div>
            <div className="rounded-full">
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
