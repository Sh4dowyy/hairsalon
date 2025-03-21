"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"

interface Service {
  id: number
  name: string
  description: string | null
  price: string
  category: string
}

interface Employee {
  id: number
  name: string
  email: string
}

export default function ServicesPage() {
  const [category, setCategory] = useState("all")
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    // Check if employee is logged in
    const storedEmployee = localStorage.getItem('employee')
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee))
    }

    const fetchServices = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('services')
        .select('*')
      
      if (error) {
        console.error('Error fetching services:', error)
        return
      }

      if (data) {
        setServices(data)
      }
      setLoading(false)
    }

    fetchServices()
  }, [])

  const displayServices = category === "all" 
    ? services 
    : services.filter(service => service.category === category)

  if (loading) {
    return (
      <main className="flex flex-col min-h-screen py-12">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center items-center h-[50vh]">
            <p>Loading services...</p>
          </div>
        </div>
      </main>
    )
  }

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
          {employee && (
            <Button asChild variant="outline" className="gap-2">
              <Link href="/admin/services">
                <Edit className="h-4 w-4" />
                Muuda teenuseid
              </Link>
            </Button>
          )}
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

