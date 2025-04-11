import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrainingPage() {
  const trainingPrograms = [
    {
      title: "Project & Program Management",
      description: "Learn essential skills for managing complex projects and programs effectively.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Communication & Soft Skills",
      description: "Develop crucial interpersonal and communication skills for professional success.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Technical & Digital Skills",
      description: "Master the latest technical and digital tools to stay competitive in today's market.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Financial & Business Development",
      description: "Gain insights into financial management and business growth strategies.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Leadership Development",
      description: "Enhance your leadership capabilities with our comprehensive leadership programs.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Community & Social Development",
      description: "Learn strategies for effective community engagement and social development initiatives.",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Training Programs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive training programs designed to enhance skills and drive professional growth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
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
                    <Link href={`/training/${program.title.toLowerCase().replace(/\s+/g, "-")}`}>Learn More</Link>
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
              <h2 className="text-3xl font-bold mb-6">Customized Training Solutions</h2>
              <p className="text-lg mb-6">
                We understand that every organization has unique training needs. Our team of experts works closely with
                you to develop customized training programs that address your specific challenges and objectives.
              </p>
              <p className="text-lg mb-6">
                Whether you need to upskill your entire workforce or provide specialized training for select teams, we
                have the expertise to deliver high-impact training solutions.
              </p>
              <Button asChild>
                <Link href="/contact">Request Custom Training</Link>
              </Button>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Customized Training"
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
