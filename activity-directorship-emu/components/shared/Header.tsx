import Link from "next/link"
import Image from "next/image"

const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
            <Link href='/' className="w-36">
            <Image src="/activity-directorship-emu-high-resolution-logo.png" alt={"Logo"} width={128} height={38} />
            </Link>
            <div className="flex w-32 justify-end gap-3">

            </div>
        </div>
    </header>
  )
}

export default Header
