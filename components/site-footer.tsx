import Link from "next/link"
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Na'Kris Stuudio</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ilusalong, kus iga klient saab individuaalse lähenemise ja kvaliteetse teeninduse.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/nakris_stuudio/" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              {/* <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a> */}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-medium">Navigeerimine</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Avaleht
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-primary">
                Teenused
              </Link>
              <Link href="https://nakris-stuudio.salon.life" className="text-muted-foreground hover:text-primary">
                Broneerimine
              </Link>
              {/* <Link href="/gallery" className="text-muted-foreground hover:text-primary">
                Galerii
              </Link> */}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-medium">Info</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                Meist
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Kontakt
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-medium">Kontakt</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Tartu Puiestee 128</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>+372 5821 2260</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>nakrisstuudio@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Na'Kris Stuudio. Kõik õigused kaitstud.</p>
        </div>
      </div>
    </footer>
  )
}

