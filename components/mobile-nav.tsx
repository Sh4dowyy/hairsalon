"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-700 focus:outline-none"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              href="/"
              className="text-lg font-medium hover:text-primary"
              onClick={closeMenu} // Close menu on link click
            >
              Avaleht
            </Link>
            <Link
              href="/services"
              className="text-lg font-medium hover:text-primary"
              onClick={closeMenu} // Close menu on link click
            >
              Teenused
            </Link>
            <Link
              href="https://nakris-stuudio.salon.life"
              className="text-lg font-medium hover:text-primary"
              onClick={closeMenu} // Close menu on link click
            >
              Broneerimine
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium hover:text-primary"
              onClick={closeMenu} // Close menu on link click
            >
              Meist
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium hover:text-primary"
              onClick={closeMenu} // Close menu on link click
            >
              Kontakt
            </Link>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <Phone className="h-5 w-5 mr-2" />
              <span>+372 5821 2260</span>
            </div>
            <Link
              href="https://nakris-stuudio.salon.life"
              className="block w-full text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark"
              onClick={closeMenu} // Close menu on link click
            >
              Broneeri online
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}