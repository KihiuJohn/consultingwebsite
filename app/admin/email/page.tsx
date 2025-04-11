"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Save, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define schemas for email settings
const smtpSchema = z.object({
  host: z.string().min(1, "SMTP host is required"),
  port: z.string().min(1, "Port is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  encryption: z.enum(["none", "ssl", "tls"]),
  fromEmail: z.string().email("Please enter a valid email address"),
  fromName: z.string().min(1, "From name is required"),
})

const imapSchema = z.object({
  host: z.string().min(1, "IMAP host is required"),
  port: z.string().min(1, "Port is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  encryption: z.enum(["none", "ssl", "tls"]),
})

const emailTemplateSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Email body is required"),
})

const testEmailSchema = z.object({
  recipient: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export default function EmailSettingsPage() {
  const [activeTab, setActiveTab] = useState("smtp")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isTestEmailOpen, setIsTestEmailOpen] = useState(false)
  const { toast } = useToast()

  // SMTP Form
  const smtpForm = useForm<z.infer<typeof smtpSchema>>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      host: "smtp.gmail.com",
      port: "587",
      username: "info@expromsconsulting.com",
      password: "your-password-here",
      encryption: "tls",
      fromEmail: "info@expromsconsulting.com",
      fromName: "Expro MS Training & Consulting",
    },
  })

  // IMAP Form
  const imapForm = useForm<z.infer<typeof imapSchema>>({
    resolver: zodResolver(imapSchema),
    defaultValues: {
      host: "imap.gmail.com",
      port: "993",
      username: "info@expromsconsulting.com",
      password: "your-password-here",
      encryption: "ssl",
    },
  })

  // Email Templates Form
  const templatesForm = useForm<z.infer<typeof emailTemplateSchema>>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      subject: "Thank you for registering for {{training_title}}",
      body: `Dear {{name}},

Thank you for registering for {{training_title}} scheduled on {{training_date}} at {{training_location}}.

We're excited to have you join us for this training session. Below are the details of your registration:

- Training: {{training_title}}
- Date: {{training_date}}
- Location: {{training_location}}
- Payment Method: {{payment_method}}

If you have any questions or need to make changes to your registration, please contact us at info@expromsconsulting.com or call +254720090959.

We look forward to seeing you!

Best regards,
Expro MS Training & Consulting Team`,
    },
  })

  // Test Email Form
  const testEmailForm = useForm<z.infer<typeof testEmailSchema>>({
    resolver: zodResolver(testEmailSchema),
    defaultValues: {
      recipient: "",
      subject: "Test Email from Expro MS",
      message: "This is a test email from Expro MS Training & Consulting website.",
    },
  })

  async function onSubmitSMTP(values: z.infer<typeof smtpSchema>) {
    await handleSubmit(values, "SMTP settings")
  }

  async function onSubmitIMAP(values: z.infer<typeof imapSchema>) {
    await handleSubmit(values, "IMAP settings")
  }

  async function onSubmitTemplates(values: z.infer<typeof emailTemplateSchema>) {
    await handleSubmit(values, "Email template")
  }

  async function onSubmitTestEmail(values: z.infer<typeof testEmailSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(values)
    setIsSubmitting(false)

    toast({
      title: "Test Email Sent",
      description: `A test email has been sent to ${values.recipient}.`,
    })

    setIsTestEmailOpen(false)
  }

  async function handleSubmit(values: any, section: string) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(values)
    setIsSubmitting(false)

    toast({
      title: "Settings Saved",
      description: `The ${section} have been updated successfully.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Email Settings</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsTestEmailOpen(true)}>
            <Send className="mr-2 h-4 w-4" />
            Send Test Email
          </Button>
          <Button
            className="gap-2 bg-brand-blue hover:bg-brand-blue/90"
            disabled={isSubmitting}
            onClick={() => {
              switch (activeTab) {
                case "smtp":
                  smtpForm.handleSubmit(onSubmitSMTP)()
                  break
                case "imap":
                  imapForm.handleSubmit(onSubmitIMAP)()
                  break
                case "templates":
                  templatesForm.handleSubmit(onSubmitTemplates)()
                  break
              }
            }}
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="smtp" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="smtp">SMTP (Outgoing)</TabsTrigger>
          <TabsTrigger value="imap">IMAP (Incoming)</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        {/* SMTP Settings */}
        <TabsContent value="smtp">
          <Card>
            <CardHeader>
              <CardTitle>SMTP Settings</CardTitle>
              <CardDescription>Configure outgoing email server settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...smtpForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={smtpForm.control}
                      name="host"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Host</FormLabel>
                          <FormControl>
                            <Input placeholder="smtp.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={smtpForm.control}
                      name="port"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port</FormLabel>
                          <FormControl>
                            <Input placeholder="587" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={smtpForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="username@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={smtpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={smtpForm.control}
                    name="encryption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Encryption</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select encryption type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="ssl">SSL</SelectItem>
                            <SelectItem value="tls">TLS</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={smtpForm.control}
                      name="fromEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Email</FormLabel>
                          <FormControl>
                            <Input placeholder="noreply@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            The email address that will appear in the "From" field of outgoing emails.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={smtpForm.control}
                      name="fromName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company Name" {...field} />
                          </FormControl>
                          <FormDescription>
                            The name that will appear in the "From" field of outgoing emails.
                          </FormDescription>
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
                onClick={smtpForm.handleSubmit(onSubmitSMTP)}
              >
                {isSubmitting ? "Saving..." : "Save SMTP Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* IMAP Settings */}
        <TabsContent value="imap">
          <Card>
            <CardHeader>
              <CardTitle>IMAP Settings</CardTitle>
              <CardDescription>Configure incoming email server settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...imapForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={imapForm.control}
                      name="host"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IMAP Host</FormLabel>
                          <FormControl>
                            <Input placeholder="imap.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={imapForm.control}
                      name="port"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port</FormLabel>
                          <FormControl>
                            <Input placeholder="993" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={imapForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="username@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={imapForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={imapForm.control}
                    name="encryption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Encryption</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select encryption type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="ssl">SSL</SelectItem>
                            <SelectItem value="tls">TLS</SelectItem>
                          </SelectContent>
                        </Select>
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
                onClick={imapForm.handleSubmit(onSubmitIMAP)}
              >
                {isSubmitting ? "Saving..." : "Save IMAP Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Configure email templates for various notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...templatesForm}>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Registration Confirmation Email</h3>
                    <p className="text-sm text-muted-foreground">
                      This email is sent to users after they register for a training session.
                    </p>
                  </div>

                  <FormField
                    control={templatesForm.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          You can use placeholders like {"{{ training_title }}"} which will be replaced with actual
                          values.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={templatesForm.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Body</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[300px] font-mono" {...field} />
                        </FormControl>
                        <FormDescription>
                          Available placeholders: {"{{ name }}"}, {"{{ training_title }}"}, {"{{ training_date }}"},
                          {"{{ training_location }}"}, {"{{ payment_method }}"}
                        </FormDescription>
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
                onClick={templatesForm.handleSubmit(onSubmitTemplates)}
              >
                {isSubmitting ? "Saving..." : "Save Template"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Test Email Dialog */}
      <Dialog open={isTestEmailOpen} onOpenChange={setIsTestEmailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
            <DialogDescription>
              Send a test email to verify your email configuration is working correctly.
            </DialogDescription>
          </DialogHeader>
          <Form {...testEmailForm}>
            <form onSubmit={testEmailForm.handleSubmit(onSubmitTestEmail)} className="space-y-4">
              <FormField
                control={testEmailForm.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your-email@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter the email address where you want to receive the test email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={testEmailForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={testEmailForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsTestEmailOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Test Email"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

function Link({ href, children, ...props }: LinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
