import { CardFooter } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In a real application, you would fetch the blog post data based on the slug
  // For this example, we'll use hardcoded data
  const post = {
    title: "5 Essential Leadership Skills for the Post-Pandemic Workplace",
    slug: "essential-leadership-skills-post-pandemic",
    date: "April 15, 2025",
    author: "Dr. Sarah Johnson",
    authorTitle: "Leadership Development Specialist",
    category: "Leadership",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
      <p class="mb-4">The COVID-19 pandemic has fundamentally changed how we work, communicate, and lead. As organizations navigate the post-pandemic landscape, leaders must adapt and develop new skills to effectively guide their teams through continued uncertainty and change.</p>
      
      <p class="mb-4">In this article, we explore five essential leadership skills that have become increasingly important in the post-pandemic workplace.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-brand-blue">1. Emotional Intelligence</h2>
      
      <p class="mb-4">Emotional intelligence—the ability to recognize, understand, and manage our own emotions and recognize, understand, and influence the emotions of others—has always been important for effective leadership. However, in the post-pandemic workplace, it has become absolutely essential.</p>
      
      <p class="mb-4">Leaders with high emotional intelligence can better understand the challenges their team members face, provide appropriate support, and create psychologically safe environments where people feel comfortable expressing concerns and ideas.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-brand-blue">2. Adaptive Leadership</h2>
      
      <p class="mb-4">The pandemic demonstrated how quickly circumstances can change and how important it is for leaders to adapt their strategies and approaches accordingly. Adaptive leadership involves being flexible, embracing change, and helping teams navigate uncertainty.</p>
      
      <p class="mb-4">Adaptive leaders are comfortable with ambiguity and can make decisions with incomplete information. They're also willing to experiment, learn from failures, and adjust course as needed.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-brand-blue">3. Digital Fluency</h2>
      
      <p class="mb-4">As remote and hybrid work models become more common, leaders need to be digitally fluent. This means not only being comfortable with digital tools and platforms but also understanding how to leverage technology to enhance collaboration, communication, and productivity.</p>
      
      <p class="mb-4">Digital fluency also involves being aware of the challenges and limitations of digital communication and finding ways to overcome them to build strong team relationships and maintain organizational culture.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-brand-blue">4. Inclusive Leadership</h2>
      
      <p class="mb-4">The pandemic highlighted and, in many cases, exacerbated existing inequalities in the workplace. Inclusive leadership—creating environments where all team members feel valued, respected, and able to contribute—is more important than ever.</p>
      
      <p class="mb-4">Inclusive leaders actively seek diverse perspectives, address biases, and ensure that all team members have equal opportunities to participate and advance, regardless of their location, background, or personal circumstances.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-brand-blue">5. Well-being Advocacy</h2>
      
      <p class="mb-4">The pandemic brought employee well-being to the forefront of organizational priorities. Leaders now need to be advocates for well-being, recognizing the importance of physical, mental, and emotional health for individual and organizational success.</p>
      
      <p class="mb-4">This involves creating sustainable work practices, promoting work-life balance, and providing resources and support for team members experiencing challenges. It also means modeling healthy behaviors and boundaries.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-brand-blue">Conclusion</h2>
      
      <p class="mb-4">The post-pandemic workplace requires leaders who can navigate complexity, embrace change, and prioritize people. By developing these five essential skills—emotional intelligence, adaptive leadership, digital fluency, inclusive leadership, and well-being advocacy—leaders can effectively guide their teams through continued uncertainty and help their organizations thrive in the new world of work.</p>
      
      <p class="mb-4">At Expro Training & Consulting, we offer leadership development programs designed to help leaders build these critical skills. Contact us to learn more about how we can support your leadership journey in the post-pandemic era.</p>
    `,
    relatedPosts: [
      {
        id: 2,
        title: "Building Resilient Teams in Uncertain Times",
        slug: "building-resilient-teams",
        excerpt:
          "Learn strategies for developing team resilience and adaptability to thrive amidst uncertainty and rapid change.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: 3,
        title: "Effective Communication Strategies for Remote Teams",
        slug: "communication-strategies-remote-teams",
        excerpt:
          "Discover practical communication approaches that help remote teams stay connected, aligned, and productive.",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
  }

  return (
    <main className="flex flex-col min-h-screen">
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4 pl-0 hover:bg-transparent">
              <Link href="/blog" className="flex items-center gap-2 text-brand-blue">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="mb-4">
              <span className="inline-block bg-brand-blue/10 text-brand-blue text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-brand-blue">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-brand-green" />
                <span>{post.author}</span>
                {post.authorTitle && <span className="text-muted-foreground">({post.authorTitle})</span>}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-green" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-brand-green" />
                <span className="font-medium">Categories:</span>
                <Link
                  href={`/blog/category/${post.category.toLowerCase()}`}
                  className="text-brand-blue hover:underline"
                >
                  {post.category}
                </Link>
              </div>

              <div className="flex gap-4">
                <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" className="border-brand-green text-brand-green">
                  <Link href="/training-calendar">View Training Calendar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-brand-blue">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="flex flex-col h-full border-t-4 border-t-brand-green">
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-blue">{relatedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base">{relatedPost.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full border-brand-blue text-brand-blue">
                      <Link href={`/blog/${relatedPost.slug}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
