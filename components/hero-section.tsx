import Link from "next/link"
import Image from "next/image"
import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Ilusalong <span className="text-primary">Nakris Studio</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Loome kordumatu välimuse, mis rõhutab teie individuaalsust. Meie meistrid aitavad teil igas olukorras täiuslik välja näha.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/booking">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Broneeri online
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Meie teenused</Link>
              </Button>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=800&width=1200"
            width={650}
            height={500}
            alt="Ilusalong Nakris Studio"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}

