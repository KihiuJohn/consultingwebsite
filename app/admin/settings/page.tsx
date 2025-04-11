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
import { Switch } from "@/components/ui/switch"
import { ImageIcon, Save } from "lucide-react"

const generalSettingsSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  siteDescription: z.string().min(10, {
    message: "Site description must be at least 10 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  logoUrl: z.string().url().optional(),
  faviconUrl: z.string().url().optional(),
})

const seoSettingsSchema = z.object({
  metaTitle: z
    .string()
    .min(5, {
      message: "Meta title must be at least 5 characters.",
    })
    .max(60, {
      message: "Meta title should not exceed 60 characters.",
    }),
  metaDescription: z
    .string()
    .min(50, {
      message: "Meta description must be at least 50 characters.",
    })
    .max(160, {
      message: "Meta description should not exceed 160 characters.",
    }),
  ogImage: z.string().url().optional(),
  googleAnalyticsId: z.string().optional(),
  enableIndexing: z.boolean().default(true),
})

const socialSettingsSchema = z.object({
  facebookUrl: z.string().url().optional(),
  twitterUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  youtubeUrl: z.string().url().optional(),
})

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  // General Settings Form
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "Expro MS Training & Consulting Ltd",
      siteDescription: "Your trusted partner in corporate training and consulting.",
      contactEmail: "info@expromsconsulting.com",
      contactPhone: "+254720090959",
      logoUrl: "/placeholder.svg?height=200&width=200",
      faviconUrl: "/favicon.ico",
    },
  })

  // SEO Settings Form
  const seoForm = useForm<z.infer<typeof seoSettingsSchema>>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      metaTitle: "Expro MS Training & Consulting Ltd",
      metaDescription:
        "Expro MS Training & Consulting Ltd is a renowned Training & Consulting company dedicated to providing leadership development and training programs for individuals and organizations in East Africa.",
      ogImage: "/placeholder.svg?height=600&width=1200",
      googleAnalyticsId: "UA-XXXXXXXXX-X",
      enableIndexing: true,
    },
  })

  // Social Settings Form
  const socialForm = useForm<z.infer<typeof socialSettingsSchema>>({
    resolver: zodResolver(socialSettingsSchema),
    defaultValues: {
      facebookUrl: "https://facebook.com/expromsconsulting",
      twitterUrl: "https://twitter.com/expromsconsulting",
      linkedinUrl: "https://linkedin.com/company/expromsconsulting",
      instagramUrl: "https://instagram.com/expromsconsulting",
      youtubeUrl: "https://youtube.com/channel/expromsconsulting",
    },
  })

  async function onSubmitGeneral(values: z.infer<typeof generalSettingsSchema>) {
    await handleSubmit(values, "General settings")
  }

  async function onSubmitSeo(values: z.infer<typeof seoSettingsSchema>) {
    await handleSubmit(values, "SEO settings")
  }

  async function onSubmitSocial(values: z.infer<typeof socialSettingsSchema>) {
    await handleSubmit(values, "Social media settings")
  }

  async function handleSubmit(values: any, section: string) {
    setIsSubmitting(true)

    // Simulate API call to save settings
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(values)
    setIsSubmitting(false)

    toast({
      title: "Settings Updated",
      description: `The ${section} have been updated successfully.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Website Settings</h1>
        <Button
          className="gap-2 bg-brand-blue hover:bg-brand-blue/90"
          disabled={isSubmitting}
          onClick={() => {
            switch (activeTab) {
              case "general":
                generalForm.handleSubmit(onSubmitGeneral)()
                break
              case "seo":
                seoForm.handleSubmit(onSubmitSeo)()
                break
              case "social":
                socialForm.handleSubmit(onSubmitSocial)()
                break
            }
          }}
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's basic information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form className="space-y-6">
                  <FormField
                    control={generalForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The name of your website as it appears in the browser title.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>A brief description of your website.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Primary contact email for your website.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Primary contact phone number.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo</FormLabel>
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
                                generalForm.setValue("logoUrl", "/placeholder.svg?height=200&width=200")
                              }}
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mt-4 h-20 w-20 relative rounded border overflow-hidden">
                            {field.value ? (
                              <div
                                className="h-full w-full bg-center bg-contain bg-no-repeat"
                                style={{ backgroundImage: `url(${field.value})` }}
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-muted">
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <FormDescription>Your website logo (recommended size: 200x200px).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="faviconUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon</FormLabel>
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
                                generalForm.setValue("faviconUrl", "/favicon.ico")
                              }}
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mt-4 h-10 w-10 relative rounded border overflow-hidden">
                            {field.value ? (
                              <div
                                className="h-full w-full bg-center bg-contain bg-no-repeat"
                                style={{ backgroundImage: `url(${field.value})` }}
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-muted">
                                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <FormDescription>Your website favicon (recommended format: .ico, 32x32px).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={generalForm.handleSubmit(onSubmitGeneral)}
              >
                {isSubmitting ? "Saving..." : "Save General Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your website for search engines</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...seoForm}>
                <form className="space-y-6">
                  <FormField
                    control={seoForm.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The title that appears in search engine results (recommended: 50-60 characters).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>
                          The description that appears in search engine results (recommended: 150-160 characters).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="ogImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Sharing Image (OG Image)</FormLabel>
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
                              seoForm.setValue("ogImage", "/placeholder.svg?height=600&width=1200")
                            }}
                          >
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-4 h-32 w-full relative rounded border overflow-hidden">
                          {field.value ? (
                            <div
                              className="h-full w-full bg-center bg-cover"
                              style={{ backgroundImage: `url(${field.value})` }}
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-muted">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <FormDescription>
                          The image that appears when your website is shared on social media (recommended size:
                          1200x630px).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="googleAnalyticsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Your Google Analytics tracking ID (e.g., UA-XXXXXXXXX-X or G-XXXXXXXXXX).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="enableIndexing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Search Engine Indexing</FormLabel>
                          <FormDescription>Allow search engines to index your website.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
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
                onClick={seoForm.handleSubmit(onSubmitSeo)}
              >
                {isSubmitting ? "Saving..." : "Save SEO Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Settings</CardTitle>
              <CardDescription>Connect your website to social media platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...socialForm}>
                <form className="space-y-6">
                  <FormField
                    control={socialForm.control}
                    name="facebookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Page URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={socialForm.control}
                    name="twitterUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter Profile URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={socialForm.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Page URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={socialForm.control}
                    name="instagramUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram Profile URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={socialForm.control}
                    name="youtubeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube Channel URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                onClick={socialForm.handleSubmit(onSubmitSocial)}
              >
                {isSubmitting ? "Saving..." : "Save Social Media Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
