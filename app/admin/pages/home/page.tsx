"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, ImageIcon, Save } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const heroSectionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  subtitle: z.string().min(5, {
    message: "Subtitle must be at least 5 characters.",
  }),
  carouselImages: z
    .array(
      z.object({
        url: z.string().url({ message: "Please enter a valid URL." }),
        alt: z.string(),
      }),
    )
    .min(1, {
      message: "At least one carousel image is required.",
    }),
})

const servicesSectionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  services: z
    .array(
      z.object({
        title: z.string().min(3, { message: "Title must be at least 3 characters." }),
        description: z.string().min(10, { message: "Description must be at least 10 characters." }),
        link: z.string().optional(),
      }),
    )
    .min(3, {
      message: "At least three services are required.",
    }),
})

const aboutSectionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  profileLink: z.string().url({ message: "Please enter a valid URL." }),
})

const mapSectionSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  mapEmbedUrl: z.string().url({ message: "Please enter a valid URL." }),
  officeAddress: z.string().min(10, {
    message: "Office address must be at least 10 characters.",
  }),
})

export default function HomePageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("hero")
  const { toast } = useToast()

  // Hero Section Form
  const heroForm = useForm<z.infer<typeof heroSectionSchema>>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: {
      title: "Welcome to Expro MS Training & Consulting Ltd",
      subtitle: "Your trusted partner in corporate training and consulting.",
      carouselImages: [
        { url: "/placeholder.svg?height=600&width=1200", alt: "Carousel image 1" },
        { url: "/placeholder.svg?height=600&width=1200", alt: "Carousel image 2" },
        { url: "/placeholder.svg?height=600&width=1200", alt: "Carousel image 3" },
      ],
    },
  })

  // Services Section Form
  const servicesForm = useForm<z.infer<typeof servicesSectionSchema>>({
    resolver: zodResolver(servicesSectionSchema),
    defaultValues: {
      title: "Our Services",
      services: [
        {
          title: "Training & Consultancy",
          description: "Empowering your workforce with top-notch training solutions.",
          link: "/training",
        },
        {
          title: "Data Analytics & Visualization",
          description: "Transforming data into actionable insights.",
          link: "/consulting",
        },
        {
          title: "Training Calendar",
          description: "Stay updated with our latest training sessions.",
          link: "/training-calendar",
        },
      ],
    },
  })

  // About Section Form
  const aboutForm = useForm<z.infer<typeof aboutSectionSchema>>({
    resolver: zodResolver(aboutSectionSchema),
    defaultValues: {
      title: "About Expro Training & Consulting Ltd",
      content:
        "The Expro Training & Consulting in East Africa is a renowned Training & Consulting company dedicated to providing leadership development and training programs for individuals and organizations in East Africa and the broader African region. Expro Training & Consulting focuses on equipping participants with the knowledge, skills, and mindset required to excel in their roles and drive positive change in their respective fields.",
      profileLink: "/company-profile.pdf",
    },
  })

  // Map Section Form
  const mapForm = useForm<z.infer<typeof mapSectionSchema>>({
    resolver: zodResolver(mapSectionSchema),
    defaultValues: {
      title: "Our Location",
      description:
        "Visit our headquarters in Nairobi, Kenya. We also have offices in Rwanda and the USA to serve our clients across the globe.",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176556154624!2d36.81984!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d0f3a3db8f%3A0xb8f9f0a63c0c0309!2sParliament%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1712789694!5m2!1sen!2ske",
      officeAddress: "St. Georges House, 4th Floor, Parliament Road\nP. O. Box 48564 - 00200\nNairobi, Kenya",
    },
  })

  async function onSubmitHero(values: z.infer<typeof heroSectionSchema>) {
    await handleSubmit(values, "Hero section")
  }

  async function onSubmitServices(values: z.infer<typeof servicesSectionSchema>) {
    await handleSubmit(values, "Services section")
  }

  async function onSubmitAbout(values: z.infer<typeof aboutSectionSchema>) {
    await handleSubmit(values, "About section")
  }

  async function onSubmitMap(values: z.infer<typeof mapSectionSchema>) {
    await handleSubmit(values, "Map section")
  }

  async function handleSubmit(values: any, section: string) {
    setIsSubmitting(true)

    // Simulate API call to save content
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(values)
    setIsSubmitting(false)

    toast({
      title: "Content Updated",
      description: `The ${section} has been updated successfully.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Home Page Content</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview Page
          </Button>
          <Button
            className="gap-2 bg-brand-blue hover:bg-brand-blue/90"
            disabled={isSubmitting}
            onClick={() => {
              switch (activeTab) {
                case "hero":
                  heroForm.handleSubmit(onSubmitHero)()
                  break
                case "services":
                  servicesForm.handleSubmit(onSubmitServices)()
                  break
                case "about":
                  aboutForm.handleSubmit(onSubmitAbout)()
                  break
                case "map":
                  mapForm.handleSubmit(onSubmitMap)()
                  break
              }
            }}
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="services">Services Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="map">Map Section</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit the hero section content and carousel images</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...heroForm}>
                <form className="space-y-6">
                  <FormField
                    control={heroForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The main heading displayed in the hero section.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={heroForm.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Subtitle</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>A brief description displayed below the title.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">Carousel Images</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentImages = heroForm.getValues("carouselImages")
                          heroForm.setValue("carouselImages", [...currentImages, { url: "", alt: "" }])
                        }}
                      >
                        Add Image
                      </Button>
                    </div>

                    <Accordion type="multiple" className="w-full">
                      {heroForm.watch("carouselImages").map((_, index) => (
                        <AccordionItem key={index} value={`image-${index}`}>
                          <AccordionTrigger className="text-sm">Image {index + 1}</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <FormField
                                control={heroForm.control}
                                name={`carouselImages.${index}.url`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <div className="flex gap-2">
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="flex-shrink-0"
                                        onClick={() => {
                                          // This would open a media browser in a real implementation
                                          heroForm.setValue(
                                            `carouselImages.${index}.url`,
                                            "/placeholder.svg?height=600&width=1200",
                                          )
                                        }}
                                      >
                                        <ImageIcon className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={heroForm.control}
                                name={`carouselImages.${index}.alt`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Alt Text</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Describe the image for accessibility.</FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="flex justify-between">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const currentImages = heroForm.getValues("carouselImages")
                                    if (currentImages.length > 1) {
                                      heroForm.setValue(
                                        "carouselImages",
                                        currentImages.filter((_, i) => i !== index),
                                      )
                                    }
                                  }}
                                  disabled={heroForm.watch("carouselImages").length <= 1}
                                >
                                  Remove
                                </Button>
                                {(field) => (
                                  <div className="h-20 w-32 relative rounded border overflow-hidden">
                                    {field.value ? (
                                      <div
                                        className="h-full w-full bg-center bg-cover"
                                        style={{ backgroundImage: `url(${field.value})` }}
                                      />
                                    ) : (
                                      <div className="h-full w-full flex items-center justify-center bg-muted">
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={heroForm.handleSubmit(onSubmitHero)}
              >
                {isSubmitting ? "Saving..." : "Save Hero Section"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Section</CardTitle>
              <CardDescription>Edit the services section content</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...servicesForm}>
                <form className="space-y-6">
                  <FormField
                    control={servicesForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">Services</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentServices = servicesForm.getValues("services")
                          servicesForm.setValue("services", [
                            ...currentServices,
                            { title: "", description: "", link: "" },
                          ])
                        }}
                      >
                        Add Service
                      </Button>
                    </div>

                    <Accordion type="multiple" className="w-full">
                      {servicesForm.watch("services").map((_, index) => (
                        <AccordionItem key={index} value={`service-${index}`}>
                          <AccordionTrigger className="text-sm">Service {index + 1}</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <FormField
                                control={servicesForm.control}
                                name={`services.${index}.title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={servicesForm.control}
                                name={`services.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={servicesForm.control}
                                name={`services.${index}.link`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Link (Optional)</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormDescription>URL to link to when clicking on this service.</FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const currentServices = servicesForm.getValues("services")
                                  if (currentServices.length > 3) {
                                    servicesForm.setValue(
                                      "services",
                                      currentServices.filter((_, i) => i !== index),
                                    )
                                  }
                                }}
                                disabled={servicesForm.watch("services").length <= 3}
                              >
                                Remove
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={servicesForm.handleSubmit(onSubmitServices)}
              >
                {isSubmitting ? "Saving..." : "Save Services Section"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Edit the about section content</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...aboutForm}>
                <form className="space-y-6">
                  <FormField
                    control={aboutForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={aboutForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[200px]" {...field} />
                        </FormControl>
                        <FormDescription>The main content of the about section.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={aboutForm.control}
                    name="profileLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Profile Link</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="flex-shrink-0"
                            onClick={() => {
                              // This would open a media browser in a real implementation
                              aboutForm.setValue("profileLink", "/company-profile.pdf")
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </Button>
                        </div>
                        <FormDescription>Link to the company profile PDF.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={aboutForm.handleSubmit(onSubmitAbout)}
              >
                {isSubmitting ? "Saving..." : "Save About Section"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Map Section */}
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Map Section</CardTitle>
              <CardDescription>Edit the map section content</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...mapForm}>
                <form className="space-y-6">
                  <FormField
                    control={mapForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mapForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mapForm.control}
                    name="mapEmbedUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Maps Embed URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The embed URL from Google Maps.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mapForm.control}
                    name="officeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-2">Map Preview</h3>
                    <div className="aspect-video rounded-md overflow-hidden">
                      <iframe
                        src={mapForm.watch("mapEmbedUrl")}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Map Preview"
                      ></iframe>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={mapForm.handleSubmit(onSubmitMap)}
              >
                {isSubmitting ? "Saving..." : "Save Map Section"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
