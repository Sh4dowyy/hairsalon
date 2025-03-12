"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Phone, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isEmployee, setIsEmployee] = useState(false)

  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee")
    setIsEmployee(!!storedEmployee)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Beauty Style</span>
        </Link>
      </div>
      <nav className="flex flex-col space-y-4 mt-8">
        <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
          Главная
        </Link>
        <Link href="/services" className="text-lg font-medium transition-colors hover:text-primary">
          Услуги
        </Link>
        <Link href="/booking" className="text-lg font-medium transition-colors hover:text-primary">
          Запись
        </Link>
        <Link href="/gallery" className="text-lg font-medium transition-colors hover:text-primary">
          Галерея
        </Link>
        <Link href="/about" className="text-lg font-medium transition-colors hover:text-primary">
          О салоне
        </Link>
        <Link href="/reviews" className="text-lg font-medium transition-colors hover:text-primary">
          Отзывы
        </Link>
        <Link href="/contact" className="text-lg font-medium transition-colors hover:text-primary">
          Контакты
        </Link>
        {isEmployee && (
          <Link
            href="/admin/schedule"
            className="text-lg font-medium transition-colors hover:text-primary flex items-center"
          >
            <ShieldAlert className="mr-2 h-5 w-5" />
            Панель сотрудника
          </Link>
        )}
      </nav>
      <div className="mt-auto py-6">
        <div className="flex items-center mb-4">
          <Phone className="h-5 w-5 mr-2" />
          <span>+7 (123) 456-78-90</span>
        </div>
        <Button asChild className="w-full">
          <Link href="/booking">Записаться онлайн</Link>
        </Button>
      </div>
    </div>
  )
}

