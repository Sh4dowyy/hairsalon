"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("works")

  const workImages = [
    { id: 1, src: "/placeholder.svg?height=600&width=600", alt: "Naiste lõikus" },
    { id: 2, src: "/placeholder.svg?height=600&width=600", alt: "Juuste värvimine" },
    { id: 3, src: "/placeholder.svg?height=600&width=600", alt: "Soeng" },
    { id: 4, src: "/placeholder.svg?height=600&width=600", alt: "Meeste lõikus" },
    { id: 5, src: "/placeholder.svg?height=600&width=600", alt: "Pidulik soeng" },
    { id: 6, src: "/placeholder.svg?height=600&width=600", alt: "Keeruline värvimine" },
    { id: 7, src: "/placeholder.svg?height=600&width=600", alt: "Lõikus ja soeng" },
    { id: 8, src: "/placeholder.svg?height=600&width=600", alt: "Salgutamine" },
    { id: 9, src: "/placeholder.svg?height=600&width=600", alt: "Laste lõikus" },
  ]

  const interiorImages = [
    { id: 1, src: "/placeholder.svg?height=600&width=800", alt: "Salongi interjöör 1" },
    { id: 2, src: "/placeholder.svg?height=600&width=800", alt: "Salongi interjöör 2" },
    { id: 3, src: "/placeholder.svg?height=600&width=800", alt: "Salongi interjöör 3" },
    { id: 4, src: "/placeholder.svg?height=600&width=800", alt: "Salongi interjöör 4" },
    { id: 5, src: "/placeholder.svg?height=600&width=800", alt: "Salongi interjöör 5" },
    { id: 6, src: "/placeholder.svg?height=600&width=800", alt: "Salongi interjöör 6" },
  ]

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Galerii</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Meie tööde ja salongi interjööri fotod
            </p>
          </div>
        </div>

        <Tabs defaultValue="works" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="works">Meie tööd</TabsTrigger>
              <TabsTrigger value="interior">Salongi interjöör</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="works" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {workImages.map((image) => (
                <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interior" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {interiorImages.map((image) => (
                <div key={image.id} className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

