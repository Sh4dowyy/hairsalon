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
        name: "Женская стрижка",
        description: "Стрижка любой сложности с учетом структуры волос и пожеланий клиента",
        price: "от 1500 ₽",
      },
      { id: 2, name: "Укладка", description: "Укладка волос любой длины", price: "от 1000 ₽" },
      {
        id: 3,
        name: "Вечерняя прическа",
        description: "Создание вечерней прически для особого случая",
        price: "от 3000 ₽",
      },
    ],
    men: [
      { id: 4, name: "Мужская стрижка", description: "Классическая или модельная стрижка", price: "от 1000 ₽" },
      { id: 5, name: "Стрижка бороды", description: "Моделирование и стрижка бороды", price: "от 500 ₽" },
      {
        id: 6,
        name: "Комплекс (стрижка + борода)",
        description: "Стрижка волос и оформление бороды",
        price: "от 1400 ₽",
      },
    ],
    coloring: [
      { id: 7, name: "Окрашивание в один тон", description: "Окрашивание волос в один тон", price: "от 3000 ₽" },
      { id: 8, name: "Мелирование", description: "Частичное окрашивание прядей", price: "от 3500 ₽" },
      { id: 9, name: "Сложное окрашивание", description: "Омбре, шатуш, балаяж и другие техники", price: "от 5000 ₽" },
    ],
    children: [
      { id: 10, name: "Детская стрижка (до 7 лет)", description: "Стрижка для детей до 7 лет", price: "от 800 ₽" },
      {
        id: 11,
        name: "Детская стрижка (7-14 лет)",
        description: "Стрижка для детей от 7 до 14 лет",
        price: "от 1000 ₽",
      },
    ],
    care: [
      { id: 12, name: "Уход за волосами", description: "Профессиональный уход за волосами", price: "от 1500 ₽" },
      {
        id: 13,
        name: "Маска для волос",
        description: "Питательная маска для восстановления волос",
        price: "от 1000 ₽",
      },
      { id: 14, name: "Спа-процедуры для волос", description: "Комплексный уход за волосами", price: "от 2500 ₽" },
    ],
  }

  const allServices = Object.values(services).flat()

  const displayServices = category === "all" ? allServices : services[category as keyof typeof services]

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Наши услуги</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Полный спектр услуг для создания вашего идеального образа
            </p>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setCategory}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">Все услуги</TabsTrigger>
              <TabsTrigger value="women">Женские</TabsTrigger>
              <TabsTrigger value="men">Мужские</TabsTrigger>
              <TabsTrigger value="coloring">Окрашивание</TabsTrigger>
              <TabsTrigger value="children">Детские</TabsTrigger>
              <TabsTrigger value="care">Уход</TabsTrigger>
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

