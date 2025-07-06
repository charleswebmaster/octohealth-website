import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/logo.jpeg"
              alt="OctoHealth Logo"
              width={180}
              height={40}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="text-gray-400">
              Africa's leading Health ERP solution for HMOs and health insurers. Transforming healthcare operations
              across the continent.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@octohealth.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="#product" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Stay Connected</h3>
            <p className="text-gray-400 mb-4">Get the latest healthcare insights and product updates.</p>
            <div className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white focus:border-[#343E8F] placeholder:text-gray-500"
              />
              <Button className="bg-[#343E8F] hover:bg-[#2a3270] shadow-lg transition-all">Subscribe</Button>
            </div>

            {/* Social Media Icons */}
            <div>
              <h4 className="font-medium mb-3 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-[#343E8F] transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-[#343E8F] transition-colors group"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-[#343E8F] transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-[#343E8F] transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">© 2024 OctoHealth. All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
