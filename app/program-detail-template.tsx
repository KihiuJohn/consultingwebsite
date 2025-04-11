"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react"
import RegistrationModal from "@/components/registration-modal"

interface ProgramDetailProps {
  title: string
  category: string
  description: string
  longDescription: string[]
  keyTopics: string[]
  learningOutcomes: string[]
  duration: string
  date: string
  location: string
  trainer: string
  price: string
  image: string
}

export default function ProgramDetailTemplate({
  title,
  category,
  description,
  longDescription,
  keyTopics,
  learningOutcomes,
  duration,
  date,
  location,
  trainer,
  price,
  image,
}: ProgramDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="mb-4">
                <span className="inline-block bg-brand-blue/10 text-brand-blue text-sm font-medium px-3 py-1 rounded-full">
                  {category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand-blue" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-blue" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-blue" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand-blue" />
                  <span>Trainer: {trainer}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-brand-blue hover:bg-brand-blue/90" onClick={() => setIsModalOpen(true)}>
                  Register Now
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Request More Information</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg?height=600&width=800"}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Program Overview</h2>
              <div className="space-y-4">
                {longDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Key Topics</h2>
              <ul className="space-y-3">
                {keyTopics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">Learning Outcomes</h2>
              <ul className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-muted p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Program Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-muted-foreground">Price</h4>
                    <p className="text-2xl font-bold text-brand-blue">{price}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-muted-foreground">Duration</h4>
                    <p>{duration}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-muted-foreground">Date</h4>
                    <p>{date}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-muted-foreground">Location</h4>
                    <p>{location}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-muted-foreground">Trainer</h4>
                    <p>{trainer}</p>
                  </div>
                  <div className="pt-4">
                    <Button
                      className="w-full bg-brand-blue hover:bg-brand-blue/90"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Skills?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Join our {title} program and take the next step in your professional development journey.
          </p>
          <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90" onClick={() => setIsModalOpen(true)}>
            Register Now
          </Button>
        </div>
      </section>

      <RegistrationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        trainingTitle={title}
        trainingDate={date}
        trainingLocation={location}
      />
    </main>
  )
}
