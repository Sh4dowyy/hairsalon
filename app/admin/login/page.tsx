"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  id: number
  email: string
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      
      // Query the employees table
      const { data: employee, error } = await supabase
        .from('employees')
        .select('id, email, name')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (error) {
        throw error
      }

      if (employee) {
        // Store employee data (excluding password)
        localStorage.setItem('employee', JSON.stringify({
          id: employee.id,
          name: employee.name,
          email: employee.email,
        }))

        toast({
          title: "Успешный вход",
          description: `Добро пожаловать, ${employee.name}!`,
        })

        router.push("/")
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при входе. Попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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

