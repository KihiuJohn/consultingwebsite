"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/nav"

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    children: [
      { title: "Our Story", href: "/about#story" },
      { title: "Our Team", href: "/about#team" },
      { title: "Our Values", href: "/about#values" },
    ],
  },
  {
    title: "Training",
    href: "/training",
    children: [
      { title: "Leadership Development", href: "/training/leadership" },
      { title: "Capacity Building Programs", href: "/training#capacity-building" },
      { title: "Customized Training", href: "/training#customized" },
      { title: "Women and Youth Programs", href: "/training#women-youth" },
    ],
  },
  {
    title: "Executive Training",
    href: "/executive-training",
    children: [
      {
        title: "CEO Professional Development",
        href: "/executive-training/ceo-development",
        children: [
          { title: "Strategic Leadership", href: "/executive-training/ceo-development/strategic-leadership" },
          { title: "Executive Decision Making", href: "/executive-training/ceo-development/decision-making" },
        ],
      },
      {
        title: "Corporate Management",
        href: "/executive-training/corporate-management",
        children: [
          { title: "Change Management", href: "/executive-training/corporate-management/change-management" },
          { title: "Crisis Leadership", href: "/executive-training/corporate-management/crisis-leadership" },
        ],
      },
      {
        title: "Financial Leadership",
        href: "/executive-training/financial-leadership",
        children: [
          {
            title: "Strategic Financial Management",
            href: "/executive-training/financial-leadership/strategic-financial-management",
          },
          { title: "Financial Risk Management", href: "/executive-training/financial-leadership/risk-management" },
        ],
      },
    ],
  },
  {
    title: "Consulting",
    href: "/consulting",
    children: [
      { title: "Strategic Planning", href: "/consulting/strategic-planning" },
      { title: "Organizational Development", href: "/consulting#organizational-development" },
      { title: "Performance Improvement", href: "/consulting#performance-improvement" },
      { title: "Data Analytics", href: "/consulting#data-analytics" },
    ],
  },
  { title: "Training Calendar", href: "/training-calendar" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
]

interface NavItemProps {
  item: NavItem
  isChild?: boolean
  isOpen?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

function NavItemComponent({ item, isChild = false, isOpen, onMouseEnter, onMouseLeave }: NavItemProps) {
  const pathname = usePathname()
  const [showChildren, setShowChildren] = useState(false)
  const hasChildren = !!item.children?.length
  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

  // For handling nested dropdowns
  const handleMouseEnter = () => {
    if (hasChildren) {
      setShowChildren(true)
    }
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    if (hasChildren) {
      setShowChildren(false)
    }
    onMouseLeave?.()
  }

  if (!hasChildren) {
    return (
      <li
        className={cn("relative", isChild ? "w-full" : "flex")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link
          href={item.href || "#"}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
            isChild ? "w-full hover:bg-muted/50" : "hover:text-brand-blue",
            isActive && "text-brand-blue",
          )}
        >
          {item.title}
        </Link>
      </li>
    )
  }

  return (
    <li
      className={cn("relative", isChild ? "w-full" : "flex")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "flex cursor-pointer items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
          isChild ? "w-full justify-between hover:bg-muted/50" : "hover:text-brand-blue",
          isActive && "text-brand-blue",
        )}
      >
        <Link href={item.href || "#"} className="flex-grow">
          {item.title}
        </Link>
        {isChild ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>

      {/* Dropdown for top-level items */}
      {!isChild && (isOpen || showChildren) && (
        <div className="absolute left-0 top-full z-50 min-w-[280px] whitespace-nowrap rounded-md border bg-white p-1.5 shadow-md">
          <ul className="space-y-1">
            {item.children?.map((child) => (
              <NavItemComponent key={child.title} item={child} isChild />
            ))}
          </ul>
        </div>
      )}

      {/* Flyout for child items */}
      {isChild && showChildren && (
        <div className="absolute left-full top-0 z-50 min-w-[300px] whitespace-nowrap rounded-md border bg-white p-1.5 shadow-md">
          <ul className="space-y-1">
            {item.children?.map((child) => (
              <NavItemComponent key={child.title} item={child} isChild />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export default function MainNavDropdown({ className }: { className?: string }) {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenItem(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full bg-background" ref={navRef}>
      <div className="mx-auto max-w-[1400px] px-4 flex justify-end">
        <nav className={cn("flex h-14 items-center", className)}>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <NavItemComponent
                key={item.title}
                item={item}
                isOpen={openItem === item.title}
                onMouseEnter={() => setOpenItem(item.title)}
                onMouseLeave={() => setOpenItem(null)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
