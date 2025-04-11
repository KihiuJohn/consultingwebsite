import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-brand-blue">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team for inquiries about our training programs and consulting services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-blue">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-blue">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-brand-green">Kenya Office</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="text-sm">
                          <p>St. Georges House, 4th Floor, Parliament Road</p>
                          <p>P. O. Box 48564 - 00200</p>
                          <p>Nairobi, Kenya</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">+254720090959 / +254724402062</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <a href="mailto:info@expromsconsulting.com" className="text-sm hover:text-brand-blue">
                          info@expromsconsulting.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-brand-green">Rwanda Office</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="text-sm">
                          <p>KN 14 Avenue Plot 43</p>
                          <p>Kigali, Rwanda</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">+250724128627</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-brand-green">USA Office</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="text-sm">
                          <p>7741 Radcliffe Drive 53719</p>
                          <p>Madison, Wisconsin</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">+1-6089571534</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
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
      </section>
    </main>
  )
}
