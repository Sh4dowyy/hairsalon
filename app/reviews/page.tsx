"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewsPage() {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5,
  })

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Елена К.",
      date: "15.03.2025",
      rating: 5,
      text: "Отличный салон! Мастер Анна сделала мне прекрасную стрижку и окрашивание. Очень довольна результатом! Буду рекомендовать всем своим друзьям и знакомым.",
    },
    {
      id: 2,
      name: "Мария Д.",
      date: "10.03.2025",
      rating: 5,
      text: "Хожу в этот салон уже больше года. Всегда отличный сервис и результат. Рекомендую всем! Особенно нравится работа мастера Елены.",
    },
    {
      id: 3,
      name: "Александр В.",
      date: "05.03.2025",
      rating: 5,
      text: "Профессиональный подход и внимание к деталям. Мастера всегда предлагают интересные решения. Очень доволен стрижкой и оформлением бороды.",
    },
    {
      id: 4,
      name: "Ирина С.",
      date: "01.03.2025",
      rating: 4,
      text: "Хороший салон с приятной атмосферой. Мастер Мария сделала отличное окрашивание. Единственный минус - немного задержали по времени.",
    },
    {
      id: 5,
      name: "Дмитрий К.",
      date: "25.02.2025",
      rating: 5,
      text: "Отличное обслуживание, профессиональные мастера. Стрижка выполнена идеально. Буду постоянным клиентом.",
    },
    {
      id: 6,
      name: "Анна П.",
      date: "20.02.2025",
      rating: 5,
      text: "Прекрасный салон! Делала сложное окрашивание, результат превзошел все ожидания. Мастер Елена настоящий профессионал своего дела.",
    },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new review
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      date: new Date().toLocaleDateString("ru-RU"),
      rating: formData.rating,
      text: formData.review,
    }

    // Add to reviews
    setReviews([newReview, ...reviews])

    // Reset form
    setFormData({ name: "", review: "", rating: 5 })

    // Show success message
    alert("Спасибо за ваш отзыв!")
  }

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Отзывы</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Что говорят о нас наши клиенты</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Оставить отзыв</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Оценка</Label>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleRatingChange(i + 1)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${i < formData.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review">Отзыв</Label>
                    <Textarea
                      id="review"
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить отзыв
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

