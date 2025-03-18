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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meie teenused</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Pakume laia valikut teenuseid teie täiusliku välimuse loomiseks
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <ServicePreview
              title="Naiste lõikused"
              description="Klassikalistest kuni loominguliste lõikusteni igal tasemel"
              icon={<Scissors className="h-10 w-10" />}
              href="/services?category=women"
            />
            <ServicePreview
              title="Meeste lõikused"
              description="Kaasaegsed ja klassikalised meeste lõikused"
              icon={<Scissors className="h-10 w-10" />}
              href="/services?category=men"
            />
            <ServicePreview
              title="Juuste värvimine"
              description="Lai valik juuksevärvimisteenuseid"
              icon={<Scissors className="h-10 w-10" />}
              href="/services?category=coloring"
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/services">
                Kõik teenused
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pakkumised ja eripakkumised</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Eripakkumised ja soodustused meie klientidele
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <PromotionCard
              title="20% soodustust esimesel külastusel"
              description="Uutele klientidele 20% soodustust kõikidelt teenustelt esimesel külastusel"
              imageUrl="/placeholder.svg?height=300&width=400"
              expiryDate="31.12.2025"
            />
            <PromotionCard
              title="Komplekt «Lõikus + värvimine»"
              description="Eripakkumine lõikuse ja värvimise komplektile"
              imageUrl="/placeholder.svg?height=300&width=400"
              expiryDate="31.12.2025"
            />
            <PromotionCard
              title="Õnnelikud tunnid"
              description="15% soodustust kõikidelt teenustelt esmaspäevast neljapäevani kell 10:00-13:00"
              imageUrl="/placeholder.svg?height=300&width=400"
              expiryDate="31.12.2025"
            />
          </div>
        </div>
      </section> */}

      {/* Reviews Preview
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meie klientide arvustused</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Mida meie kliendid meist räägivad</p>
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
                  "Suurepärane salong! Juuksur Anna tegi mulle suurepärase lõikuse ja värvimise. Olen tulemusega väga rahul!"
                </p>
                <div className="mt-4 font-medium">Helena K.</div>
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
                  "Olen käinud selles salongis juba üle aasta. Alati suurepärane teenindus ja tulemus. Soovitan kõigile!"
                </p>
                <div className="mt-4 font-medium">Maria D.</div>
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
                  "Professionaalne lähenemine ja tähelepanu detailidele. Meistrid pakuvad alati huvitavaid lahendusi."
                </p>
                <div className="mt-4 font-medium">Alexander V.</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/reviews">
                Kõik arvustused
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Booking CTA */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Broneeri online</h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Vali sobiv aeg ja broneeri aeg meie meistrite juurde online
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="https://nakris-stuudio.salon.life">
                <CalendarDays className="mr-2 h-5 w-5" />
                Broneeri online
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

