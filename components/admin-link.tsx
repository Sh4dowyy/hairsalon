"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminLink() {
  const [isEmployee, setIsEmployee] = useState(false)

  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee")
    setIsEmployee(!!storedEmployee)
  }, [])

  if (!isEmployee) return null

  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/admin/schedule" className="flex items-center">
        <ShieldAlert className="mr-2 h-4 w-4" />
        Панель сотрудника
      </Link>
    </Button>
  )
}

