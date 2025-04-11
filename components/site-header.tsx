import Link from "next/link"
import MainNav from "@/components/main-nav"
import MobileNav from "@/components/mobile-nav"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl text-brand-blue">Expro MS</span>
        </Link>
        <MainNav className="hidden md:flex" />
        <MobileNav />
      </div>
    </header>
  )
}
