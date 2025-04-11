"use client"

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
import { Check, Copy, RefreshCw, Save } from "lucide-react"

const colorSchemaSchema = z.object({
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
})

const typographySchema = z.object({
  headingFont: z.string().min(1, {
    message: "Please enter a heading font.",
  }),
  bodyFont: z.string().min(1, {
    message: "Please enter a body font.",
  }),
  baseFontSize: z.string().min(1, {
    message: "Please enter a base font size.",
  }),
  lineHeight: z.string().min(1, {
    message: "Please enter a line height.",
  }),
})

const buttonStyleSchema = z.object({
  borderRadius: z.string().min(1, {
    message: "Please enter a border radius.",
  }),
  primaryButtonColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  secondaryButtonColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  buttonTextColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
})

export default function ThemePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("colors")
  const [copied, setCopied] = useState<string | null>(null)
  const { toast } = useToast()

  // Color Schema Form
  const colorForm = useForm<z.infer<typeof colorSchemaSchema>>({
    resolver: zodResolver(colorSchemaSchema),
    defaultValues: {
      primaryColor: "#8395D6",
      secondaryColor: "#28A745",
      accentColor: "#FFC107",
      backgroundColor: "#FFFFFF",
      textColor: "#333333",
    },
  })

  // Typography Form
  const typographyForm = useForm<z.infer<typeof typographySchema>>({
    resolver: zodResolver(typographySchema),
    defaultValues: {
      headingFont: "Inter, sans-serif",
      bodyFont: "Inter, sans-serif",
      baseFontSize: "16px",
      lineHeight: "1.5",
    },
  })

  // Button Style Form
  const buttonForm = useForm<z.infer<typeof buttonStyleSchema>>({
    resolver: zodResolver(buttonStyleSchema),
    defaultValues: {
      borderRadius: "0.375rem",
      primaryButtonColor: "#8395D6",
      secondaryButtonColor: "#28A745",
      buttonTextColor: "#FFFFFF",
    },
  })

  async function onSubmitColors(values: z.infer<typeof colorSchemaSchema>) {
    await handleSubmit(values, "Color scheme")
  }

  async function onSubmitTypography(values: z.infer<typeof typographySchema>) {
    await handleSubmit(values, "Typography")
  }

  async function onSubmitButtons(values: z.infer<typeof buttonStyleSchema>) {
    await handleSubmit(values, "Button styles")
  }

  async function handleSubmit(values: any, section: string) {
    setIsSubmitting(true)

    // Simulate API call to save theme settings
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(values)
    setIsSubmitting(false)

    toast({
      title: "Theme Updated",
      description: `The ${section} has been updated successfully.`,
    })
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)

    toast({
      title: "Copied to Clipboard",
      description: `${label} has been copied to clipboard.`,
    })
  }

  function resetToDefaults() {
    // Reset color form
    colorForm.reset({
      primaryColor: "#8395D6",
      secondaryColor: "#28A745",
      accentColor: "#FFC107",
      backgroundColor: "#FFFFFF",
      textColor: "#333333",
    })

    // Reset typography form
    typographyForm.reset({
      headingFont: "Inter, sans-serif",
      bodyFont: "Inter, sans-serif",
      baseFontSize: "16px",
      lineHeight: "1.5",
    })

    // Reset button form
    buttonForm.reset({
      borderRadius: "0.375rem",
      primaryButtonColor: "#8395D6",
      secondaryButtonColor: "#28A745",
      buttonTextColor: "#FFFFFF",
    })

    toast({
      title: "Theme Reset",
      description: "All theme settings have been reset to defaults.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Theme Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={resetToDefaults}>
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button
            className="gap-2 bg-brand-blue hover:bg-brand-blue/90"
            disabled={isSubmitting}
            onClick={() => {
              switch (activeTab) {
                case "colors":
                  colorForm.handleSubmit(onSubmitColors)()
                  break
                case "typography":
                  typographyForm.handleSubmit(onSubmitTypography)()
                  break
                case "buttons":
                  buttonForm.handleSubmit(onSubmitButtons)()
                  break
              }
            }}
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Theme"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors">Color Scheme</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="buttons">Button Styles</TabsTrigger>
        </TabsList>

        {/* Color Scheme */}
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Customize the color palette of your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...colorForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={colorForm.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Primary Color")}
                            >
                              {copied === "Primary Color" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>The main brand color (e.g., #8395D6).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={colorForm.control}
                      name="secondaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Secondary Color")}
                            >
                              {copied === "Secondary Color" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>The secondary brand color (e.g., #28A745).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={colorForm.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accent Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Accent Color")}
                            >
                              {copied === "Accent Color" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          <FormDescription>Used for highlights and call-to-actions.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={colorForm.control}
                      name="backgroundColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Background Color")}
                            >
                              {copied === "Background Color" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>The main background color of the website.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={colorForm.control}
                      name="textColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Text Color")}
                            >
                              {copied === "Text Color" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          <FormDescription>The main text color of the website.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Color Preview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-md" style={{ backgroundColor: colorForm.watch("backgroundColor") }}>
                        <h4 className="text-xl font-bold mb-2" style={{ color: colorForm.watch("textColor") }}>
                          Sample Heading
                        </h4>
                        <p style={{ color: colorForm.watch("textColor") }}>
                          This is a sample text to preview how your color scheme will look on the website.
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button
                            className="px-4 py-2 rounded-md text-white"
                            style={{ backgroundColor: colorForm.watch("primaryColor") }}
                          >
                            Primary Button
                          </button>
                          <button
                            className="px-4 py-2 rounded-md text-white"
                            style={{ backgroundColor: colorForm.watch("secondaryColor") }}
                          >
                            Secondary Button
                          </button>
                        </div>
                        <div
                          className="mt-4 p-3 rounded-md"
                          style={{ backgroundColor: colorForm.watch("accentColor") }}
                        >
                          <p className="text-white">Accent Color Block</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="h-10 w-10 rounded-md"
                            style={{ backgroundColor: colorForm.watch("primaryColor") }}
                          />
                          <div>
                            <p className="font-medium">Primary Color</p>
                            <p className="text-sm text-muted-foreground">{colorForm.watch("primaryColor")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div
                            className="h-10 w-10 rounded-md"
                            style={{ backgroundColor: colorForm.watch("secondaryColor") }}
                          />
                          <div>
                            <p className="font-medium">Secondary Color</p>
                            <p className="text-sm text-muted-foreground">{colorForm.watch("secondaryColor")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div
                            className="h-10 w-10 rounded-md"
                            style={{ backgroundColor: colorForm.watch("accentColor") }}
                          />
                          <div>
                            <p className="font-medium">Accent Color</p>
                            <p className="text-sm text-muted-foreground">{colorForm.watch("accentColor")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div
                            className="h-10 w-10 rounded-md border"
                            style={{ backgroundColor: colorForm.watch("backgroundColor") }}
                          />
                          <div>
                            <p className="font-medium">Background Color</p>
                            <p className="text-sm text-muted-foreground">{colorForm.watch("backgroundColor")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div
                            className="h-10 w-10 rounded-md"
                            style={{ backgroundColor: colorForm.watch("textColor") }}
                          />
                          <div>
                            <p className="font-medium">Text Color</p>
                            <p className="text-sm text-muted-foreground">{colorForm.watch("textColor")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={colorForm.handleSubmit(onSubmitColors)}
              >
                {isSubmitting ? "Saving..." : "Save Color Scheme"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Typography */}
        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Customize the fonts and text styles of your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...typographyForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={typographyForm.control}
                      name="headingFont"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heading Font</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Font family for headings (e.g., "Inter, sans-serif").</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={typographyForm.control}
                      name="bodyFont"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Font</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Font family for body text (e.g., "Inter, sans-serif").</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={typographyForm.control}
                      name="baseFontSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Font Size</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Base font size for the website (e.g., "16px").</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={typographyForm.control}
                      name="lineHeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Line Height</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Line height for text (e.g., "1.5").</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Typography Preview</h3>
                    <div
                      className="p-6 border rounded-md"
                      style={{
                        fontFamily: typographyForm.watch("bodyFont"),
                        fontSize: typographyForm.watch("baseFontSize"),
                        lineHeight: typographyForm.watch("lineHeight"),
                      }}
                    >
                      <h1
                        className="text-3xl font-bold mb-4"
                        style={{ fontFamily: typographyForm.watch("headingFont") }}
                      >
                        Heading Level 1
                      </h1>
                      <h2
                        className="text-2xl font-bold mb-3"
                        style={{ fontFamily: typographyForm.watch("headingFont") }}
                      >
                        Heading Level 2
                      </h2>
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ fontFamily: typographyForm.watch("headingFont") }}
                      >
                        Heading Level 3
                      </h3>
                      <p className="mb-4">
                        This is a paragraph of text that demonstrates how the body text will appear on your website. The
                        font family, size, and line height settings will affect how this text is displayed.
                      </p>
                      <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit
                        arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                      </p>
                      <ul className="list-disc pl-5 mb-4">
                        <li>This is a list item</li>
                        <li>This is another list item</li>
                        <li>This is a third list item</li>
                      </ul>
                      <blockquote className="border-l-4 pl-4 italic">
                        This is a blockquote that demonstrates how quoted text will appear on your website.
                      </blockquote>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={typographyForm.handleSubmit(onSubmitTypography)}
              >
                {isSubmitting ? "Saving..." : "Save Typography"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Button Styles */}
        <TabsContent value="buttons">
          <Card>
            <CardHeader>
              <CardTitle>Button Styles</CardTitle>
              <CardDescription>Customize the appearance of buttons on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...buttonForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={buttonForm.control}
                      name="borderRadius"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Border Radius</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Border radius for buttons (e.g., "0.375rem" or "6px").</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={buttonForm.control}
                      name="primaryButtonColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Button Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Primary Button Color")}
                            >
                              {copied === "Primary Button Color" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>Background color for primary buttons.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={buttonForm.control}
                      name="secondaryButtonColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Button Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Secondary Button Color")}
                            >
                              {copied === "Secondary Button Color" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>Background color for secondary buttons.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={buttonForm.control}
                      name="buttonTextColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Text Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="flex">
                                <Input {...field} />
                                <div
                                  className="h-10 w-10 border rounded-r-md flex-shrink-0"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(field.value, "Button Text Color")}
                            >
                              {copied === "Button Text Color" ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>Text color for buttons.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Button Preview</h3>
                    <div className="p-6 border rounded-md space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Primary Buttons</h4>
                        <div className="flex flex-wrap gap-4">
                          <button
                            className="px-4 py-2 font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("primaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                            }}
                          >
                            Primary Button
                          </button>
                          <button
                            className="px-4 py-2 font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("primaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                              opacity: 0.8,
                            }}
                          >
                            Hover State
                          </button>
                          <button
                            className="px-4 py-2 font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("primaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                              opacity: 0.6,
                            }}
                          >
                            Disabled State
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Secondary Buttons</h4>
                        <div className="flex flex-wrap gap-4">
                          <button
                            className="px-4 py-2 font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("secondaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                            }}
                          >
                            Secondary Button
                          </button>
                          <button
                            className="px-4 py-2 font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("secondaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                              opacity: 0.8,
                            }}
                          >
                            Hover State
                          </button>
                          <button
                            className="px-4 py-2 font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("secondaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                              opacity: 0.6,
                            }}
                          >
                            Disabled State
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Outline Buttons</h4>
                        <div className="flex flex-wrap gap-4">
                          <button
                            className="px-4 py-2 font-medium border-2"
                            style={{
                              borderColor: buttonForm.watch("primaryButtonColor"),
                              color: buttonForm.watch("primaryButtonColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                              backgroundColor: "transparent",
                            }}
                          >
                            Outline Primary
                          </button>
                          <button
                            className="px-4 py-2 font-medium border-2"
                            style={{
                              borderColor: buttonForm.watch("secondaryButtonColor"),
                              color: buttonForm.watch("secondaryButtonColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                              backgroundColor: "transparent",
                            }}
                          >
                            Outline Secondary
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Button Sizes</h4>
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            className="px-2 py-1 text-sm font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("primaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                            }}
                          >
                            Small
                          </button>
                          <button
                            className="px-4 py-2 font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("primaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                            }}
                          >
                            Medium
                          </button>
                          <button
                            className="px-6 py-3 text-lg font-medium"
                            style={{
                              backgroundColor: buttonForm.watch("primaryButtonColor"),
                              color: buttonForm.watch("buttonTextColor"),
                              borderRadius: buttonForm.watch("borderRadius"),
                            }}
                          >
                            Large
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-brand-blue hover:bg-brand-blue/90"
                disabled={isSubmitting}
                onClick={buttonForm.handleSubmit(onSubmitButtons)}
              >
                {isSubmitting ? "Saving..." : "Save Button Styles"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
