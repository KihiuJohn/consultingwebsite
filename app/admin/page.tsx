"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowUpRight, Calendar, Edit3, FileText, LayoutDashboard, MessageSquare, Users, ImageIcon } from "lucide-react"

// Sample data for charts
const visitData = [
  { name: "Jan", visits: 1200 },
  { name: "Feb", visits: 1900 },
  { name: "Mar", visits: 1500 },
  { name: "Apr", visits: 2400 },
  { name: "May", visits: 2800 },
  { name: "Jun", visits: 3200 },
  { name: "Jul", visits: 3800 },
]

const pageViewData = [
  { name: "Home", views: 4500 },
  { name: "About", views: 2300 },
  { name: "Training", views: 3100 },
  { name: "Consulting", views: 1800 },
  { name: "Blog", views: 2700 },
  { name: "Contact", views: 1500 },
]

const trafficSourceData = [
  { name: "Direct", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Referral", value: 20 },
  { name: "Social Media", value: 10 },
]

const COLORS = ["#8395D6", "#28A745", "#FFC107", "#DC3545"]

const recentActivities = [
  {
    id: 1,
    action: "Blog post published",
    title: "5 Essential Leadership Skills for 2025",
    user: "Admin User",
    time: "2 hours ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 2,
    action: "Training event added",
    title: "Strategic Management Workshop",
    user: "John Doe",
    time: "Yesterday",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 3,
    action: "Page content updated",
    title: "About Us page",
    user: "Jane Smith",
    time: "2 days ago",
    icon: <Edit3 className="h-4 w-4" />,
  },
  {
    id: 4,
    action: "New media uploaded",
    title: "Training session photos",
    user: "Robert Johnson",
    time: "3 days ago",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    id: 5,
    action: "Contact form submission",
    title: "Training inquiry from ABC Corp",
    user: "System",
    time: "4 days ago",
    icon: <MessageSquare className="h-4 w-4" />,
  },
]

const quickStats = [
  {
    title: "Total Page Views",
    value: "24,532",
    change: "+12.5%",
    icon: <LayoutDashboard className="h-4 w-4" />,
    positive: true,
  },
  {
    title: "Blog Readers",
    value: "3,642",
    change: "+8.2%",
    icon: <FileText className="h-4 w-4" />,
    positive: true,
  },
  {
    title: "Training Registrations",
    value: "142",
    change: "+24.3%",
    icon: <Calendar className="h-4 w-4" />,
    positive: true,
  },
  {
    title: "Contact Inquiries",
    value: "86",
    change: "-3.1%",
    icon: <MessageSquare className="h-4 w-4" />,
    positive: false,
  },
]

export default function AdminDashboard() {
  const router = useRouter()

  // Simulate authentication check
  useEffect(() => {
    // In a real app, check if user is authenticated
    // If not, redirect to login page
    // For now, we'll just leave this as a placeholder
    // router.push('/admin/login')
  }, [router])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    stat.positive ? "bg-brand-green/20" : "bg-destructive/20"
                  }`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`flex items-center ${stat.positive ? "text-brand-green" : "text-destructive"}`}>
                  {stat.change}
                  <ArrowUpRight className={`ml-1 h-3 w-3 ${!stat.positive && "rotate-180"}`} />
                </span>
                <span className="ml-2 text-muted-foreground">vs. last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="pages">Page Performance</TabsTrigger>
          <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Website Visits</CardTitle>
              <CardDescription>Monthly website visits over the past 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={visitData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" stroke="#8395D6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page Views by Section</CardTitle>
              <CardDescription>Distribution of page views across different sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pageViewData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#28A745" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{activity.icon}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.title}</p>
                    <div className="flex items-center pt-1 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Users currently active on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-green" />
                  <span className="text-sm font-medium">Currently Online</span>
                </div>
                <div className="text-2xl font-bold">24</div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Admin User",
                    role: "Admin",
                    status: "Active now",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "John Doe",
                    role: "Editor",
                    status: "Active now",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  {
                    name: "Jane Smith",
                    role: "Author",
                    status: "5m ago",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          user.status === "Active now" ? "bg-brand-green" : "bg-amber-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">{user.status}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">View all users</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
