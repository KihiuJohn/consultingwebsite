"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/training", label: "Training" },
    { href: "/executive-training", label: "Executive Training" },
    { href: "/consulting", label: "Consulting" },
    { href: "/training-calendar", label: "Training Calendar" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="ml-auto">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 py-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-lg font-medium" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
