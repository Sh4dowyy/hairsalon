"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const [category, setCategory] = useState("all")

  const services = {
    women: [
      {
        id: 1,
        name: "Naiste juukselõikus",
        description: "Professionaalne naiste juukselõikus vastavalt teie soovidele",
        price: "40€",
      },
      { 
        id: 2, 
        name: "Peapesu ja soeng", 
        description: "Peapesu ja lihtne soeng", 
        price: "25€" 
      },
      {
        id: 3,
        name: "Pidulik soeng",
        description: "Pidulik soeng erilisteks sündmusteks",
        price: "50€",
      },
      {
        id: 12,
        name: "Ravi koos lõikusega",
        description: "Professionaalne juuste ravi koos lõikusega",
        price: "55€",
      },
      {
        id: 13,
        name: "Ravi koos föönisoenguga",
        description: "Professionaalne juuste ravi koos föönisoenguga",
        price: "35€",
      },
      { 
        id: 16, 
        name: "Jukselõikus isa + laps", 
        description: "", 
        price: "45€" 
      },
      { 
        id: 17, 
        name: "Jukselõikus ja intensiiv hooldus", 
        description: "", 
        price: "55€" 
      },
      {
        id: 19,
        name: "Juuste väljakasvu EXPRESS värvimine",
        description: "Sisaldab hooldus",
        price: "60€ + värvigramm 0,30€ ",
      },
      { 
        id: 20, 
        name: "Jukselõikus ja värvimie", 
        description: "", 
        price: "90€" 
      },
      { 
        id: 21, 
        name: "Juustepesu ja kuivatus naistele", 
        description: "", 
        price: "25€" 
      },
    ],
    men: [
      { 
        id: 4, 
        name: "Meeste juukselõikus", 
        description: "Klassikaline meeste juukselõikus", 
        price: "30€" 
      },
      { 
        id: 5, 
        name: "Masinalõikus", 
        description: "Kiire ja lihtne masinalõikus", 
        price: "20€" 
      },
    ],
    coloring: [
      { 
        id: 7, 
        name: "Järelkasvu värvimine", 
        description: "Juuste järelkasvu värvimine", 
        price: "55€ + värvigramm 0,30€" 
      },
      { 
        id: 8, 
        name: "Värvimine", 
        description: "Juuste värvimine", 
        price: "65€ + värvigramm 0,30€" 
      },
      { 
        id: 9, 
        name: "Komplektteenus", 
        description: "Värvimine koos lõikusega", 
        price: "90€ + värvigramm 0,30€" 
      },
      {
        id: 10,
        name: "Triibutamine",
        description: "Salgutamine",
        price: "85€ + materjal",
      },
      {
        id: 18,
        name: "Juukselõikus ja triibutamine",
        description: "",
        price: "100€ + materjal",
      },
      {
        id: 14,
        name: "Triibutamine koos lõikusega",
        description: "Salgutamine",
        price: "115€ + materjal",
      },  
    ],
    children: [
      { 
        id: 11, 
        name: "Laste juukselõikus", 
        description: "Juukselõikus lastele", 
        price: "20€" 
      },
    ],
  }

  const allServices = Object.values(services).flat()

  const displayServices = category === "all" ? allServices : services[category as keyof typeof services]

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Teenused</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Täielik valik teenuseid teie täiusliku välimuse loomiseks
            </p>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setCategory}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">Kõik teenused</TabsTrigger>
              <TabsTrigger value="women">Naistele</TabsTrigger>
              <TabsTrigger value="men">Meestele</TabsTrigger>
              <TabsTrigger value="coloring">Värvimine</TabsTrigger>
              <TabsTrigger value="children">Lastele</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={category} className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayServices.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{service.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

