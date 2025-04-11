"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  Users,
  Menu,
  LogOut,
  PanelLeft,
  ImageIcon,
  Mail,
  Navigation,
  Palette,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    setIsMounted(true)
    // In a real app, check if user is authenticated
    // If not, redirect to login page
    // For demo purposes, we'll only redirect if we're on the admin root
    if (pathname === "/admin") {
      // Uncomment this in production
      // router.push('/admin/login')
    }
  }, [pathname, router])

  if (!isMounted) {
    return null
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Pages",
      href: "/admin/pages",
      icon: <FileText className="h-5 w-5" />,
      children: [
        { title: "Home", href: "/admin/pages/home" },
        { title: "About", href: "/admin/pages/about" },
        { title: "Training", href: "/admin/pages/training" },
        { title: "Consulting", href: "/admin/pages/consulting" },
        { title: "Contact", href: "/admin/pages/contact" },
      ],
    },
    {
      title: "Navigation",
      href: "/admin/navigation",
      icon: <Navigation className="h-5 w-5" />,
    },
    {
      title: "Blog",
      href: "/admin/blog",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Training Calendar",
      href: "/admin/training-calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Media",
      href: "/admin/media",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      title: "Email Settings",
      href: "/admin/email",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Theme",
      href: "/admin/theme",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const NavLink = ({ item, isChild = false }: { item: any; isChild?: boolean }) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
          isActive ? "bg-brand-blue text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground",
          isChild && "ml-6",
        )}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        {!isSidebarOpen && !isChild ? null : <span>{item.title}</span>}
      </Link>
    )
  }

  const Sidebar = () => (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-[70px]",
      )}
    >
      <div className="flex h-14 items-center border-b px-3">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          {isSidebarOpen ? (
            <span className="font-bold text-xl">Admin Panel</span>
          ) : (
            <span className="font-bold text-xl">AP</span>
          )}
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <div key={index}>
              <NavLink item={item} />
              {item.children && isSidebarOpen && (
                <div className="mt-1 grid gap-1">
                  {item.children.map((child: any, childIndex: number) => (
                    <NavLink key={childIndex} item={child} isChild />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          {isSidebarOpen && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium leading-none">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@expromsconsulting.com</p>
            </div>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/login">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )

  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="flex h-screen overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute left-4 top-3 z-50">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-4 md:p-6">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
