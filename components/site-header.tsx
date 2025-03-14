import Link from "next/link"
import { Menu, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNav } from "@/components/mobile-nav"
import { AdminLink } from "@/components/admin-link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Beauty Style</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              Главная
            </Link>
            <Link href="/services" className="transition-colors hover:text-primary">
              Услуги
            </Link>
            <Link href="/booking" className="transition-colors hover:text-primary">
              Запись
            </Link>
            <Link href="/gallery" className="transition-colors hover:text-primary">
              Галерея
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              О салоне
            </Link>
            <Link href="/reviews" className="transition-colors hover:text-primary">
              Отзывы
            </Link>
            <Link href="/contact" className="transition-colors hover:text-primary">
              Контакты
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span className="text-sm">+7 (123) 456-78-90</span>
          </div>
          <AdminLink />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/booking">Записаться</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

