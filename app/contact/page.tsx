"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    alert("Sõnum saadetud! Võtame teiega peagi ühendust.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Kontakt</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Võtke meiega ühendust või külastage meie salongi
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Aadress</h3>
                    <p className="text-muted-foreground">Tartu Puistee 128</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Telefon</h3>
                    <p className="text-muted-foreground">+372 5821 2260</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">E-post</h3>
                    <p className="text-muted-foreground">nakrisstuudio@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Lahtiolekuajad</h3>
                    <p className="text-muted-foreground">E-R: 10:00 - 20:00</p>
                    <p className="text-muted-foreground">L-P: 10:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-6 w-6 text-primary flex-shrink-0 flex items-center justify-center">
                    <span className="font-bold">#</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Sotsiaalmeedia</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <Instagram className="h-6 w-6" />
                        <span className="sr-only">Instagram</span>
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <Facebook className="h-6 w-6" />
                        <span className="sr-only">Facebook</span>
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <Youtube className="h-6 w-6" />
                        <span className="sr-only">YouTube</span>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Kirjutage meile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nimi</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Sõnum</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Saada
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2091.5945467543837!2d26.736556677172815!3d58.37775997420436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb37b943374945%3A0x2f2f3c1aaa5c17f0!2sTartu%20puiestee%20128%2C%20Tartu%2C%2050304%20Tartu%20maakond!5e0!3m2!1set!2see!4v1710350184044!5m2!1set!2see"
                    width="100%"
                    height="100%"
                    className="border-0 w-full aspect-video"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

