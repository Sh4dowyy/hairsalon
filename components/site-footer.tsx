import Link from "next/link"
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Beauty Style</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Салон красоты, где каждый клиент получает индивидуальный подход и высококачественные услуги.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-medium">Навигация</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Главная
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-primary">
                Услуги
              </Link>
              <Link href="/booking" className="text-muted-foreground hover:text-primary">
                Запись
              </Link>
              <Link href="/gallery" className="text-muted-foreground hover:text-primary">
                Галерея
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-medium">Информация</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                О салоне
              </Link>
              <Link href="/reviews" className="text-muted-foreground hover:text-primary">
                Отзывы
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Контакты
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Политика конфиденциальности
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-medium">Контакты</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>г. Москва, ул. Примерная, д. 123</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>+7 (123) 456-78-90</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@beautystyle.ru</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Beauty Style. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

