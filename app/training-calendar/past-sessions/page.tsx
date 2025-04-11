"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Award } from "lucide-react"
import Pagination from "@/components/pagination"

export default function PastSessionsPage() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page") || "1")

  // Sample past training events - would be fetched from a database in a real application
  const pastTrainings = [
    {
      id: 1,
      title: "Leadership Excellence Program",
      date: "March 10-12, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      participants: 24,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "A comprehensive leadership program focusing on strategic leadership, team management, and organizational development.",
      outcomes: [
        "Enhanced leadership capabilities for 24 senior managers",
        "Development of strategic thinking and decision-making skills",
        "Improved team management and communication strategies",
      ],
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      date: "February 15-17, 2025",
      location: "Kampala, Uganda",
      time: "9:30 AM - 4:30 PM",
      participants: 32,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "An intensive digital marketing training covering social media, SEO, content marketing, and digital advertising.",
      outcomes: [
        "Equipped 32 marketing professionals with advanced digital marketing skills",
        "Developed practical skills in social media management and content creation",
        "Created digital marketing strategies for various business contexts",
      ],
    },
    {
      id: 3,
      title: "Project Management Fundamentals",
      date: "January 20-24, 2025",
      location: "Dar es Salaam, Tanzania",
      time: "9:00 AM - 4:00 PM",
      participants: 28,
      image: "/placeholder.svg?height=300&width=500",
      description: "A foundational course on project management principles, methodologies, and best practices.",
      outcomes: [
        "Trained 28 professionals in project management fundamentals",
        "Introduced project planning, execution, monitoring, and control techniques",
        "Prepared participants for further project management certification",
      ],
    },
    {
      id: 4,
      title: "Financial Management for Non-Financial Managers",
      date: "December 5-7, 2024",
      location: "Kigali, Rwanda",
      time: "9:00 AM - 5:00 PM",
      participants: 22,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "A specialized course designed to help non-financial managers understand financial concepts and make informed decisions.",
      outcomes: [
        "Enhanced financial literacy for 22 non-financial managers",
        "Developed skills in budget management and financial analysis",
        "Improved decision-making capabilities based on financial data",
      ],
    },
    {
      id: 5,
      title: "Strategic HR Management",
      date: "November 12-14, 2024",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 4:00 PM",
      participants: 26,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "A comprehensive training on strategic human resource management, talent development, and organizational culture.",
      outcomes: [
        "Equipped 26 HR professionals with strategic HR management skills",
        "Developed strategies for talent acquisition, development, and retention",
        "Enhanced understanding of HR's role in organizational strategy",
      ],
    },
    {
      id: 6,
      title: "Data Analysis with Excel",
      date: "October 18-19, 2024",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      participants: 30,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "A hands-on workshop on data analysis using Microsoft Excel, covering formulas, pivot tables, and data visualization.",
      outcomes: [
        "Trained 30 professionals in advanced Excel data analysis techniques",
        "Developed skills in data cleaning, analysis, and visualization",
        "Enhanced decision-making capabilities through data-driven insights",
      ],
    },
  ]

  // Pagination settings
  const totalPages = 2 // Simulate having 2 pages of past sessions

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-brand-blue">Past Training Sessions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Review our previously conducted training programs and their outcomes.
          </p>
          <div className="flex justify-center mt-8 gap-4">
            <Button asChild variant="outline" className="border-brand-blue text-brand-blue">
              <Link href="/training-calendar">View Upcoming Sessions</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pastTrainings.map((training) => (
              <Card key={training.id} className="flex flex-col h-full border-t-4 border-t-brand-green">
                <div className="relative h-48 w-full">
                  <Image
                    src={training.image || "/placeholder.svg"}
                    alt={training.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-brand-green">{training.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <CardDescription className="text-base">{training.description}</CardDescription>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-brand-blue" />
                      <span>{training.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-brand-blue" />
                      <span>{training.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-brand-blue" />
                      <span>{training.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-brand-blue" />
                      <span>{training.participants} Participants</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-brand-green" />
                      Key Outcomes
                    </h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      {training.outcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/training-calendar/past-sessions" />
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-brand-blue">Interested in Our Training Programs?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Check out our upcoming training sessions or contact us for customized training solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
              <Link href="/training-calendar">View Upcoming Sessions</Link>
            </Button>
            <Button asChild variant="outline" className="border-brand-green text-brand-green">
              <Link href="/contact">Request Custom Training</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
