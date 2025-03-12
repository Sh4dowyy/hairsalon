"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock employee credentials - in a real app, this would be in a database
const EMPLOYEES = [
  { id: 1, email: "anna@beautystyle.ru", password: "password1", name: "Анна Иванова" },
  { id: 2, email: "maria@beautystyle.ru", password: "password2", name: "Мария Петрова" },
  { id: 3, email: "elena@beautystyle.ru", password: "password3", name: "Елена Сидорова" },
  { id: 4, email: "alex@beautystyle.ru", password: "password4", name: "Александр Козлов" },
]

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple authentication logic
    const employee = EMPLOYEES.find((emp) => emp.email === email && emp.password === password)

    setTimeout(() => {
      if (employee) {
        // In a real app, you would set a secure HTTP-only cookie or use a token
        // For this demo, we'll use localStorage
        localStorage.setItem(
          "employee",
          JSON.stringify({
            id: employee.id,
            name: employee.name,
            email: employee.email,
          }),
        )

        toast({
          title: "Успешный вход",
          description: `Добро пожаловать, ${employee.name}!`,
        })

        router.push("/admin/schedule")
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Вход для сотрудников</CardTitle>
          <CardDescription className="text-center">
            Введите свои учетные данные для доступа к панели управления
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

