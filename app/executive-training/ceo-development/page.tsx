import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CEODevelopmentPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">CEO Professional Development</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive leadership development program designed specifically for CEOs and senior executives.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
              <p className="text-lg mb-6">
                Our CEO Professional Development program is designed to enhance the leadership capabilities of chief
                executives and senior leaders. The program focuses on strategic thinking, decision-making, and
                organizational leadership in complex business environments.
              </p>
              <p className="text-lg mb-6">
                Participants will gain insights into effective leadership strategies, learn from real-world case
                studies, and develop actionable plans to drive organizational success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
                  <Link href="/training-calendar">View Upcoming Sessions</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Request Custom Program</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="CEO Development"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Program Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-brand-blue">Strategic Leadership</h3>
              <p className="mb-4">
                Develop advanced strategic thinking capabilities and learn how to navigate complex business
                environments.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/executive-training/ceo-development/strategic-leadership">Learn More</Link>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-brand-blue">Executive Decision Making</h3>
              <p className="mb-4">
                Enhance decision-making processes and develop frameworks for making effective decisions under
                uncertainty.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/executive-training/ceo-development/decision-making">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
