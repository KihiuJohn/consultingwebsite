import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "./sidebar"

export function AdminSidebar() {
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px] p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex">
        <Sidebar />
      </div>
    </>
  )
}
