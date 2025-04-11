import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export default function MainNav({ className }: MainNavProps) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/training", label: "Training" },
    { href: "/consulting", label: "Consulting" },
    { href: "/training-calendar", label: "Training Calendar" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className={cn("flex items-center space-x-6 text-sm font-medium", className)}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="transition-colors hover:text-brand-blue text-foreground/80">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
