import Link from "next/link"
import MainNavDropdown from "@/components/main-nav-dropdown"
import MobileNav from "@/components/mobile-nav"

export default function SiteHeaderWithDropdown() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container mx-auto max-w-[1400px] flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-brand-blue">Expro MS</span>
        </Link>
        <div className="hidden md:block md:flex-1">
          <MainNavDropdown />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
