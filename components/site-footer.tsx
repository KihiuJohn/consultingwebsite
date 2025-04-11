import { Mail, Phone, Globe } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-muted">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-blue">Expro MS Training & Consulting Ltd</h3>
            <p className="text-muted-foreground">
              Your trusted partner in corporate training and consulting across East Africa.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-blue">Kenya Office</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>St. Georges House, 4th Floor, Parliament Road</p>
              <p>P. O. Box 48564 - 00200</p>
              <p>Nairobi, Kenya</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+254720090959 / +254724402062</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@expromsconsulting.com" className="hover:text-brand-blue">
                  info@expromsconsulting.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href="https://www.expromsconsulting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue"
                >
                  www.expromsconsulting.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-blue">Rwanda Office</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>KN 14 Avenue Plot 43</p>
              <p>Kigali, Rwanda</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+250724128627</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@expromsconsulting.com" className="hover:text-brand-blue">
                  info@expromsconsulting.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href="https://www.expromsconsulting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue"
                >
                  www.expromsconsulting.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-blue">USA Office</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>7741 Radcliffe Drive 53719</p>
              <p>Madison, Wisconsin</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1-6089571534</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@expromsconsulting.com" className="hover:text-brand-blue">
                  info@expromsconsulting.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href="https://www.expromsconsulting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue"
                >
                  www.expromsconsulting.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Expro MS Training & Consulting Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
