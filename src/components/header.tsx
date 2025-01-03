import { MenuIcon } from "lucide-react"
import Image from "next/image"
import { Sidebar } from "./sidebar-sheet"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"
import Link from "next/link"

export const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Link href="/">
          <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}
