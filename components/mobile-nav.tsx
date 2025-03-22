"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

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
        <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg z-50">
          <nav className="container py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/services"
                  className="block px-4 py-2 hover:bg-accent rounded-md"
                  onClick={closeMenu}
                >
                  Teenused
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="block px-4 py-2 hover:bg-accent rounded-md"
                  onClick={closeMenu}
                >
                  Galerii
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2 hover:bg-accent rounded-md"
                  onClick={closeMenu}
                >
                  Meist
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-4 py-2 hover:bg-accent rounded-md"
                  onClick={closeMenu}
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="https://nakris-stuudio.salon.life"
                  className="block px-4 py-2 hover:bg-accent rounded-md"
                  onClick={closeMenu}
                >
                  Broneeri aeg
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}