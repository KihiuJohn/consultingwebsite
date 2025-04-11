import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"

export default function BlogPage() {
  // Sample blog posts - would be fetched from a database in a real application
  const blogPosts = [
    {
      id: 1,
      title: "5 Essential Leadership Skills for the Post-Pandemic Workplace",
      slug: "essential-leadership-skills-post-pandemic",
      excerpt:
        "Discover the key leadership skills that have become essential in navigating the challenges of the post-pandemic workplace environment.",
      date: "April 15, 2025",
      author: "Dr. Sarah Johnson",
      category: "Leadership",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "How Data Analytics is Transforming Business Decision Making",
      slug: "data-analytics-transforming-business-decisions",
      excerpt:
        "Explore how organizations are leveraging data analytics to drive informed decision-making and gain competitive advantages in today's market.",
      date: "April 8, 2025",
      author: "Michael Chen",
      category: "Data Analytics",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "The Future of Work: Trends Shaping the Modern Workplace",
      slug: "future-of-work-trends",
      excerpt:
        "An in-depth look at the emerging trends that are reshaping how we work, from remote collaboration to AI-powered productivity tools.",
      date: "March 30, 2025",
      author: "Dr. James Wilson",
      category: "Workplace Trends",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Building Resilient Teams in Uncertain Times",
      slug: "building-resilient-teams",
      excerpt:
        "Learn strategies for developing team resilience and adaptability to thrive amidst uncertainty and rapid change.",
      date: "March 22, 2025",
      author: "Emily Nguyen",
      category: "Team Management",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "Effective Communication Strategies for Remote Teams",
      slug: "communication-strategies-remote-teams",
      excerpt:
        "Discover practical communication approaches that help remote teams stay connected, aligned, and productive.",
      date: "March 15, 2025",
      author: "Robert Kiyosaki",
      category: "Communication",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "Sustainable Business Practices: A Competitive Advantage",
      slug: "sustainable-business-practices",
      excerpt:
        "How implementing sustainable business practices can create long-term value and provide a competitive edge in today's market.",
      date: "March 8, 2025",
      author: "Dr. Lisa Green",
      category: "Sustainability",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  // Featured post is the first one
  const featuredPost = blogPosts[0]
  const regularPosts = blogPosts.slice(1)

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-brand-blue">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, trends, and expert perspectives on training, consulting, and professional development.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-brand-blue">Featured Article</h2>
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <div className="mb-2">
                    <span className="inline-block bg-brand-blue/10 text-brand-blue text-sm font-medium px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-brand-blue">{featuredPost.title}</h3>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>

                  <div className="flex items-center gap-4 mb-6 mt-auto">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-brand-green" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-brand-green" />
                      <span>{featuredPost.date}</span>
                    </div>
                  </div>

                  <Button asChild className="w-fit bg-brand-blue hover:bg-brand-blue/90">
                    <Link href={`/blog/${featuredPost.slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Regular Posts */}
          <h2 className="text-2xl font-bold mb-8 text-brand-blue">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="flex flex-col h-full border-t-4 border-t-brand-green">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <span className="inline-block bg-brand-green/10 text-brand-green text-xs font-medium px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-brand-blue">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-brand-green" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm ml-auto">
                      <Calendar className="h-4 w-4 text-brand-green" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full border-brand-blue text-brand-blue">
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-brand-blue">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay updated with our latest articles, training programs, and industry insights.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit" className="bg-brand-green hover:bg-brand-green/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
