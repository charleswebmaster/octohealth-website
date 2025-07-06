"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.jpeg" alt="OctoHealth Logo" width={180} height={40} className="h-11 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#343E8F] font-medium transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-[#343E8F] font-medium border-b-2 border-[#343E8F] pb-1">
              Blog
            </Link>
            <Link href="#newsletter" className="text-gray-700 hover:text-[#343E8F] font-medium transition-colors">
              Newsletter
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-[#343E8F] font-medium transition-colors">
              About OctoHealth
            </Link>
            <Button
              asChild
              className="bg-[#343E8F] hover:bg-[#2a3270] text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/">OctoHealth ERP</Link>
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-[#343E8F] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-[#343E8F] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="#newsletter"
                className="block px-3 py-2 text-gray-700 hover:text-[#343E8F] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Newsletter
              </Link>
              <Link
                href="#about"
                className="block px-3 py-2 text-gray-700 hover:text-[#343E8F] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About OctoHealth
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-[#343E8F] hover:bg-[#2a3270] text-white">
                  <Link href="/">OctoHealth ERP</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
