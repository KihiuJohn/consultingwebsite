import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn more about Expro MS Training & Consulting Ltd and our mission to empower organizations across East
            Africa.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="About Expro MS"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">About Expro Training & Consulting Ltd</h2>
              <div className="prose max-w-none">
                <p className="text-lg mb-6">
                  The Expro Training & Consulting in East Africa is a renowned Training & Consulting company dedicated
                  to providing leadership development and training programs for individuals and organizations in East
                  Africa and the broader African region. Expro Training & Consulting focuses on equipping participants
                  with the knowledge, skills, and mindset required to excel in their roles and drive positive change in
                  their respective fields.
                </p>

                <div className="mt-8">
                  <Button asChild className="flex items-center gap-2">
                    <Link href="/company-profile.pdf" target="_blank">
                      <FileText className="h-4 w-4" />
                      View Company Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Programs and Offerings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Capacity Building Programs</h3>
              <p>
                Expro Training & Consulting offers comprehensive capacity building courses to individuals and
                organisations, helping them develop skills, knowledge, and resources to enhance performance and
                effectiveness. These courses cover a wide range of topics, including Project & Program Management,
                Communication & Soft Skills, Technical & Digital Skills, Financial & Business Development, Community &
                Social Development and technical skills.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Organisation Customized Training and Consultancy</h3>
              <p>
                Expro Training & Consulting offers customized training and consultancy programs tailored to the specific
                needs and challenges faced by organizations. These programs address training needs, organizational
                culture, team building and other aspects crucial for achieving business objectives.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Executive Training and Consultancy Programs</h3>
              <p>
                Designed for experienced leaders and executives, these programs focus on advanced training leadership
                strategies, organizational transformation, change management, and driving innovation. Participants gain
                insights into effective leadership training in complex and dynamic environments.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Leadership Development Programs</h3>
              <p>
                Expro Training & Consulting offers comprehensive leadership development programs tailored to various
                levels of leadership, from emerging leaders to senior executives. These programs cover a wide range of
                topics, including leadership theories, strategic thinking, decision making, communication, and team
                management.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Global Partnerships and Collaborations</h3>
              <p>
                Expro Training & Consulting collaborates with renowned global training and consultancy institutes and
                organizations to bring global best practices in training and consultancy development to Africa. These
                partnerships facilitate knowledge sharing, networking opportunities, and exposure to diverse leadership
                perspectives.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Women and Youth in Leadership Programs</h3>
              <p>
                Recognizing the importance of gender diversity in leadership, Expro Training & Consulting provides
                specialized programs aimed at empowering women and youth leaders. These programs focus on overcoming
                gender and age-related barriers, developing leadership competencies, and fostering inclusive leadership
                practices.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">New Trainings Programs Trends Research</h3>
              <p>
                Expro Training & Consulting conducts research on changing trainings trends and practices, aiming to
                contribute to the advancement of training knowledge and its application in the African context.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Coaching and Mentoring</h3>
              <p>
                Expro Training & Consulting offers coaching and mentoring services to provide personalized guidance and
                support to individuals seeking to enhance their leadership capabilities. These services are provided by
                experienced coaches who help participants identify their strengths, overcome challenges, and achieve
                their leadership goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
