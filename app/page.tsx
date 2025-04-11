import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ImageCarousel from "@/components/image-carousel"
import { FileText, MapPin } from "lucide-react"

export default function Home() {
  // Sample carousel images - replace with your actual images
  const carouselImages = [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section with Image Carousel */}
      <section className="w-full">
        <ImageCarousel images={carouselImages} interval={5000} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-blue">
            Welcome to Expro MS Training & Consulting Ltd
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in corporate training and consulting.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="h-full border-t-4 border-t-brand-blue">
              <CardHeader>
                <CardTitle className="text-brand-blue">Training & Consultancy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Empowering your workforce with top-notch training solutions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full border-t-4 border-t-brand-green">
              <CardHeader>
                <CardTitle className="text-brand-green">Data Analytics & Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Transforming data into actionable insights.</CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full border-t-4 border-t-brand-blue">
              <CardHeader>
                <CardTitle className="text-brand-blue">Training Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Stay updated with our latest training sessions.</CardDescription>
                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                  >
                    <Link href="/training-calendar">View Calendar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-brand-blue">About Expro Training & Consulting Ltd</h2>
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              The Expro Training & Consulting in East Africa is a renowned Training & Consulting company dedicated to
              providing leadership development and training programs for individuals and organizations in East Africa
              and the broader African region. Expro Training & Consulting focuses on equipping participants with the
              knowledge, skills, and mindset required to excel in their roles and drive positive change in their
              respective fields.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-brand-green">Programs and Offerings:</h3>
            <ul className="space-y-4 list-disc pl-6">
              <li>
                <span className="font-medium">Capacity Building Programs:</span> Expro Training & Consulting offers
                comprehensive capacity building courses to individuals and organisations, helping them develop skills,
                knowledge, and resources to enhance performance and effectiveness. These courses cover a wide range of
                topics, including Project & Program Management, Communication & Soft Skills, Technical & Digital Skills,
                Financial & Business Development, Community & Social Development and technical skills.
              </li>
              <li>
                <span className="font-medium">Organisation Customized Training and Consultancy:</span> Expro Training &
                Consulting offers customized training and consultancy programs tailored to the specific needs and
                challenges faced by organizations. These programs address training needs, organizational culture, team
                building and other aspects crucial for achieving business objectives.
              </li>
              <li>
                <span className="font-medium">Executive Training and Consultancy Programs:</span> Designed for
                experienced leaders and executives, these programs focus on advanced training leadership strategies,
                organizational transformation, change management, and driving innovation. Participants gain insights
                into effective leadership training in complex and dynamic environments.
              </li>
              <li>
                <span className="font-medium">Leadership Development Programs:</span> Expro Training & Consulting offers
                comprehensive leadership development programs tailored to various levels of leadership, from emerging
                leaders to senior executives. These programs cover a wide range of topics, including leadership
                theories, strategic thinking, decision making, communication, and team management.
              </li>
              <li>
                <span className="font-medium">Global Partnerships and Collaborations:</span> Expro Training & Consulting
                collaborates with renowned global training and consultancy institutes and organizations to bring global
                best practices in training and consultancy development to Africa. These partnerships facilitate
                knowledge sharing, networking opportunities, and exposure to diverse leadership perspectives.
              </li>
              <li>
                <span className="font-medium">Women and Youth in Leadership Programs:</span> Recognizing the importance
                of gender diversity in leadership, Expro Training & Consulting provides specialized programs aimed at
                empowering women and youth leaders. These programs focus on overcoming gender and age-related barriers,
                developing leadership competencies, and fostering inclusive leadership practices.
              </li>
              <li>
                <span className="font-medium">New Trainings Programs Trends Research:</span> Expro Training & Consulting
                conducts research on changing trainings trends and practices, aiming to contribute to the advancement of
                training knowledge and its application in the African context.
              </li>
              <li>
                <span className="font-medium">Coaching and Mentoring:</span> Expro Training & Consulting offers coaching
                and mentoring services to provide personalized guidance and support to individuals seeking to enhance
                their leadership capabilities. These services are provided by experienced coaches who help participants
                identify their strengths, overcome challenges, and achieve their leadership goals.
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Button asChild className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90">
              <Link href="/company-profile.pdf" target="_blank">
                <FileText className="h-4 w-4" />
                View Company Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-brand-blue">Our Location</h2>
              <p className="text-lg mb-6">
                Visit our headquarters in Nairobi, Kenya. We also have offices in Rwanda and the USA to serve our
                clients across the globe.
              </p>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-6 w-6 text-brand-green mt-0.5" />
                <div>
                  <h3 className="font-semibold text-lg">Kenya Office</h3>
                  <p>St. Georges House, 4th Floor, Parliament Road</p>
                  <p>P. O. Box 48564 - 00200</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
              <Button asChild className="bg-brand-green hover:bg-brand-green/90">
                <Link
                  href="https://maps.google.com/?q=St.+Georges+House,+Parliament+Road,+Nairobi,+Kenya"
                  target="_blank"
                >
                  Get Directions
                </Link>
              </Button>
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176556154624!2d36.81984!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d0f3a3db8f%3A0xb8f9f0a63c0c0309!2sParliament%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1712789694!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Expro MS Training & Consulting Ltd Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
