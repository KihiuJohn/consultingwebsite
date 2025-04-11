"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

interface MainNavigationProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNavigation({ className, ...props }: MainNavigationProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn("flex h-16 items-center space-x-4 sm:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <div className="flex-1" />
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/docs" className="text-sm font-medium transition-colors hover:text-foreground/80">
          Documentation
        </Link>
        <Link href="/examples" className="text-sm font-medium transition-colors hover:text-foreground/80">
          Examples
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium transition-colors hover:text-foreground/80"
        >
          GitHub
        </Link>
        <ThemeToggle />
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Icons.menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[240px] sm:w-[300px] p-0">
          <SheetHeader className="text-left">
            <SheetTitle>{siteConfig.name}</SheetTitle>
            <SheetDescription>Navigate through the site.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2.5">
            <Link href="/docs" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Documentation
            </Link>
            <Link href="/examples" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Examples
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              GitHub
            </Link>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
