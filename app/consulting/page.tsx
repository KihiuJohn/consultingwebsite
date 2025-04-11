import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ConsultingPage() {
  const consultingServices = [
    {
      title: "Strategic Planning",
      description: "Develop comprehensive strategic plans aligned with your organizational goals and vision.",
    },
    {
      title: "Organizational Development",
      description: "Enhance organizational effectiveness through structured development initiatives.",
    },
    {
      title: "Change Management",
      description: "Navigate complex organizational changes with expert guidance and support.",
    },
    {
      title: "Performance Improvement",
      description: "Identify and implement strategies to improve operational performance and efficiency.",
    },
    {
      title: "Leadership Coaching",
      description: "Provide personalized coaching to develop effective leadership capabilities.",
    },
    {
      title: "Data Analytics & Visualization",
      description: "Transform your data into actionable insights with advanced analytics and visualization.",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Consulting Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert consulting solutions to help your organization overcome challenges and achieve sustainable growth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Consulting Services"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Consulting Approach</h2>
              <p className="text-lg mb-6">
                At Expro MS, we take a collaborative approach to consulting. We work closely with your team to
                understand your unique challenges and develop tailored solutions that drive meaningful results.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <span>Comprehensive assessment of your current situation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <span>Collaborative development of tailored solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <span>Implementation support to ensure successful execution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                  <span>Ongoing evaluation and refinement of strategies</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Consulting Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Organization?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Our expert consultants are ready to help you navigate challenges and achieve your organizational goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/company-profile.pdf" target="_blank">
                Download Company Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
