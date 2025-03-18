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
          <span className="text-xl font-bold">Nakris Stuudio</span>
        </Link>
      </div>
      <nav className="flex flex-col space-y-4 mt-8">
        <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
          Avaleht
        </Link>
        <Link href="/services" className="text-lg font-medium transition-colors hover:text-primary">
          Teenused
        </Link>
        <Link href="https://nakris-stuudio.salon.life" className="text-lg font-medium transition-colors hover:text-primary">
          Broneerimine
        </Link>
        {/* <Link href="/gallery" className="text-lg font-medium transition-colors hover:text-primary">
          Galerii
        </Link> */}
        <Link href="/about" className="text-lg font-medium transition-colors hover:text-primary">
          Meist
        </Link>
        <Link href="/contact" className="text-lg font-medium transition-colors hover:text-primary">
          Kontakt
        </Link>
        {isEmployee && (
          <Link
            href="/admin/schedule"
            className="text-lg font-medium transition-colors hover:text-primary flex items-center"
          >
            <ShieldAlert className="mr-2 h-5 w-5" />
            Töötaja paneel
          </Link>
        )}
      </nav>
      <div className="mt-auto py-6">
        <div className="flex items-center mb-4">
          <Phone className="h-5 w-5 mr-2" />
          <span>+372 5821 2260
          </span>
        </div>
        <Button asChild className="w-full">
          <Link href="https://nakris-stuudio.salon.life">Broneeri online</Link>
        </Button>
      </div>
    </div>
  )
}

