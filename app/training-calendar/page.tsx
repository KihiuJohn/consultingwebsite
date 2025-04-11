"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import RegistrationModal from "@/components/registration-modal"
import Pagination from "@/components/pagination"

export default function TrainingCalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState<{
    title: string
    date: string
    location: string
  } | null>(null)

  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page") || "1")
  const itemsPerPage = 6

  // Sample upcoming training events - would be fetched from a database in a real application
  const upcomingTrainings = [
    {
      id: 1,
      title: "Project Management Professional (PMP) Certification",
      date: "June 15-19, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      description:
        "Comprehensive preparation for the PMP certification exam with hands-on exercises and exam simulations.",
    },
    {
      id: 2,
      title: "Leadership Development Masterclass",
      date: "July 8-10, 2025",
      location: "Dar es Salaam, Tanzania",
      time: "9:00 AM - 4:00 PM",
      description:
        "Intensive leadership training focusing on strategic thinking, team management, and effective communication.",
    },
    {
      id: 3,
      title: "Data Analytics for Business Decision Making",
      date: "July 22-24, 2025",
      location: "Kampala, Uganda",
      time: "9:30 AM - 4:30 PM",
      description: "Learn how to leverage data analytics to drive informed business decisions and strategic planning.",
    },
    {
      id: 4,
      title: "Effective Communication Skills Workshop",
      date: "August 5-6, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      description: "Develop essential communication skills for professional success in diverse workplace environments.",
    },
    {
      id: 5,
      title: "Strategic Financial Management",
      date: "August 19-21, 2025",
      location: "Kigali, Rwanda",
      time: "9:00 AM - 4:00 PM",
      description:
        "Master financial management strategies to optimize organizational resources and drive sustainable growth.",
    },
    {
      id: 6,
      title: "Digital Transformation Strategies",
      date: "September 9-11, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      description: "Learn how to lead successful digital transformation initiatives in your organization.",
    },
    {
      id: 7,
      title: "Human Resources Management",
      date: "September 15-17, 2025",
      location: "Addis Ababa, Ethiopia",
      time: "9:00 AM - 4:30 PM",
      description:
        "Comprehensive training on modern HR practices, talent management, and employee engagement strategies.",
    },
    {
      id: 8,
      title: "Supply Chain Optimization",
      date: "September 23-25, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      description: "Learn strategies to optimize supply chain operations, reduce costs, and improve efficiency.",
    },
    {
      id: 9,
      title: "Agile Project Management",
      date: "October 7-9, 2025",
      location: "Virtual",
      time: "10:00 AM - 4:00 PM",
      description: "Master agile methodologies and learn how to implement them in your organization's projects.",
    },
    {
      id: 10,
      title: "Cybersecurity Fundamentals",
      date: "October 14-16, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      description: "Essential training on cybersecurity principles, threat detection, and protection strategies.",
    },
    {
      id: 11,
      title: "Marketing Strategy Development",
      date: "October 21-23, 2025",
      location: "Kigali, Rwanda",
      time: "9:00 AM - 4:00 PM",
      description:
        "Develop comprehensive marketing strategies to reach your target audience and achieve business goals.",
    },
    {
      id: 12,
      title: "Executive Leadership Summit",
      date: "November 4-6, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      description:
        "Exclusive summit for executives focusing on strategic leadership, innovation, and organizational growth.",
    },
    {
      id: 13,
      title: "Customer Experience Management",
      date: "November 11-13, 2025",
      location: "Kampala, Uganda",
      time: "9:30 AM - 4:30 PM",
      description: "Learn strategies to enhance customer experience and build lasting customer relationships.",
    },
    {
      id: 14,
      title: "Negotiation Skills Masterclass",
      date: "November 18-19, 2025",
      location: "Dar es Salaam, Tanzania",
      time: "9:00 AM - 4:00 PM",
      description:
        "Develop advanced negotiation skills for business deals, conflict resolution, and stakeholder management.",
    },
    {
      id: 15,
      title: "Sustainable Business Practices",
      date: "December 2-4, 2025",
      location: "Nairobi, Kenya",
      time: "9:00 AM - 5:00 PM",
      description:
        "Learn how to implement sustainable practices in your organization to reduce environmental impact and enhance brand reputation.",
    },
  ]

  // Calculate pagination
  const totalPages = Math.ceil(upcomingTrainings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTrainings = upcomingTrainings.slice(startIndex, endIndex)

  const handleRegisterClick = (training: (typeof upcomingTrainings)[0]) => {
    setSelectedTraining({
      title: training.title,
      date: training.date,
      location: training.location,
    })
    setIsModalOpen(true)
  }

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-brand-blue">Training Calendar</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with our upcoming training sessions and secure your spot in advance.
          </p>
          <div className="flex justify-center mt-8 gap-4">
            <Button asChild variant="outline" className="border-brand-blue text-brand-blue">
              <Link href="/training-calendar/past-sessions">View Past Sessions</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-brand-blue">Upcoming Training Sessions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTrainings.map((training) => (
              <Card key={training.id} className="h-full flex flex-col border-t-4 border-t-brand-blue">
                <CardHeader>
                  <CardTitle className="text-brand-blue">{training.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <CardDescription className="text-base">{training.description}</CardDescription>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-brand-green" />
                    <span>{training.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-brand-green" />
                    <span>{training.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-brand-green" />
                    <span>{training.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-brand-blue hover:bg-brand-blue/90"
                    onClick={() => handleRegisterClick(training)}
                  >
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/training-calendar" />
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-brand-blue">Need a Customized Training Schedule?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We can arrange specialized training sessions tailored to your organization's schedule and requirements.
          </p>
          <Button asChild size="lg" className="bg-brand-green hover:bg-brand-green/90">
            <Link href="/contact">Request Custom Training</Link>
          </Button>
        </div>
      </section>

      {selectedTraining && (
        <RegistrationModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          trainingTitle={selectedTraining.title}
          trainingDate={selectedTraining.date}
          trainingLocation={selectedTraining.location}
        />
      )}
    </main>
  )
}
