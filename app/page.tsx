import Link from "next/link"
import { CalendarDays, Scissors, Star, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { PromotionCard } from "@/components/promotion-card"
import { ServicePreview } from "@/components/service-preview"

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Services Preview */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Наши услуги</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Мы предлагаем широкий спектр услуг для создания вашего идеального образа
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <ServicePreview
              title="Женские стрижки"
              description="От классических до креативных стрижек любой сложности"
              icon={<Scissors className="h-10 w-10" />}
              href="/services?category=women"
            />
            <ServicePreview
              title="Мужские стрижки"
              description="Современные и классические стрижки для мужчин"
              icon={<Scissors className="h-10 w-10" />}
              href="/services?category=men"
            />
            <ServicePreview
              title="Окрашивание"
              description="Широкий спектр услуг по окрашиванию волос"
              icon={<Scissors className="h-10 w-10" />}
              href="/services?category=coloring"
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/services">
                Все услуги
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Акции и спецпредложения</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Специальные предложения и скидки для наших клиентов
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <PromotionCard
              title="Скидка 20% на первое посещение"
              description="Для новых клиентов скидка 20% на все услуги при первом посещении"
              imageUrl="/placeholder.svg?height=300&width=400"
              expiryDate="31.12.2025"
            />
            <PromotionCard
              title="Комплекс «Стрижка + окрашивание»"
              description="Специальная цена на комплекс услуг стрижка + окрашивание"
              imageUrl="/placeholder.svg?height=300&width=400"
              expiryDate="31.12.2025"
            />
            <PromotionCard
              title="Счастливые часы"
              description="Скидка 15% на все услуги с понедельника по четверг с 10:00 до 13:00"
              imageUrl="/placeholder.svg?height=300&width=400"
              expiryDate="31.12.2025"
            />
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Отзывы наших клиентов</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Что говорят о нас наши клиенты</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <p className="text-muted-foreground">
                  "Отличный салон! Мастер Анна сделала мне прекрасную стрижку и окрашивание. Очень довольна
                  результатом!"
                </p>
                <div className="mt-4 font-medium">Елена К.</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <p className="text-muted-foreground">
                  "Хожу в этот салон уже больше года. Всегда отличный сервис и результат. Рекомендую всем!"
                </p>
                <div className="mt-4 font-medium">Мария Д.</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <p className="text-muted-foreground">
                  "Профессиональный подход и внимание к деталям. Мастера всегда предлагают интересные решения."
                </p>
                <div className="mt-4 font-medium">Александр В.</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/reviews">
                Все отзывы
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Запишитесь онлайн</h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Выберите удобное время и запишитесь к нашим мастерам онлайн
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/booking">
                <CalendarDays className="mr-2 h-5 w-5" />
                Записаться онлайн
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

