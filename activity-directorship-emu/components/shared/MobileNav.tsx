import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import NavItems from "./NavItems"



const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image src="/assets/icons/menu.svg" alt="Logo" width={24} height={24} className="cursor-pointer"/>
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
                    <Image src="/assets/activity-directorship-emu-high-resolution-logo.png" alt="Logo"  width={128} height={38}/>
                    <Separator className="border border-gray-50"/>
                    <NavItems />

                </SheetContent>
            </Sheet>

        </nav>
    )
}

export default MobileNav