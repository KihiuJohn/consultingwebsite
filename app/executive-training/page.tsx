import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExecutiveTrainingPage() {
  const executivePrograms = [
    {
      title: "CEO Professional Development",
      description: "Comprehensive leadership development program designed specifically for CEOs and senior executives.",
      image: "/placeholder.svg?height=300&width=500",
      link: "/executive-training/ceo-development",
    },
    {
      title: "Corporate Management",
      description: "Advanced training in corporate strategy, change management, and organizational leadership.",
      image: "/placeholder.svg?height=300&width=500",
      link: "/executive-training/corporate-management",
    },
    {
      title: "Financial Leadership",
      description: "Strategic financial management and decision-making for executive financial officers.",
      image: "/placeholder.svg?height=300&width=500",
      link: "/executive-training/financial-leadership",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Executive Training Programs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced leadership development programs designed specifically for C-suite executives and senior management.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {executivePrograms.map((program, index) => (
              <Card key={index} className="h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">{program.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={program.link}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Executive Training?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-blue flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Tailored for Executives</h3>
                    <p>Programs specifically designed for the unique challenges faced by senior leadership.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-blue flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Expert Facilitators</h3>
                    <p>Learn from industry leaders and experienced executives with proven track records.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-blue flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Practical Application</h3>
                    <p>Real-world case studies and actionable strategies that can be immediately implemented.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-blue flex items-center justify-center text-white mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Networking Opportunities</h3>
                    <p>Connect with other executives and build valuable professional relationships.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
                  <Link href="/contact">Request Executive Training</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Executive Training"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
