"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/octohealth-logo.jpeg"
                alt="OctoHealth Logo"
                width={180}
                height={40}
                className="h-11 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#1886CD] font-medium transition-colors">
              Home
            </Link>
            <Link href="#product" className="text-gray-700 hover:text-[#1886CD] font-medium transition-colors">
              Product
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#1886CD] font-medium transition-colors">
              Blog
            </Link>
            <Button asChild className="bg-[#1886CD] hover:bg-[#1565A0] text-white rounded-lg px-6">
              <a href="mailto:info@octohealth.co">Request Demo</a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-[#1886CD] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#product"
                className="block px-3 py-2 text-gray-700 hover:text-[#1886CD] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-[#1886CD] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-[#1886CD] hover:bg-[#1565A0] text-white">
                  <a href="mailto:info@octohealth.co">Request Demo</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
