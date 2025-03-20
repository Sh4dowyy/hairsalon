import Link from "next/link"
import { Phone } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Na'Kris Stuudio</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/services" className="transition-colors hover:text-primary">
              Teenused
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              Meist
            </Link>
            <Link href="/contact" className="transition-colors hover:text-primary">
              Kontakt
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="https://nakris-stuudio.salon.life">Broneeri aeg</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}