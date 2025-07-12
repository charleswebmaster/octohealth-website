import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <>
      <section className="relative py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Run a Smarter HMO with <span className="text-[#343E8F]">Africa's Leading Health ERP</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Power your HMO with an all-in-one ERP that simplifies everything from claims and underwriting to
                  authorizations and pharmacy benefits.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#343E8F] hover:bg-[#2a3270] text-white text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <a href="mailto:info@octohealth.com">Request a Demo</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-[#343E8F] text-[#343E8F] hover:bg-[#343E8F] hover:text-white transition-all bg-white rounded-lg"
                >
                  Product Tour
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#343E8F]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#343E8F] font-bold text-sm">ISO</span>
                  </div>
                  <span className="text-sm text-gray-600">ISO Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#343E8F]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#343E8F] font-bold text-sm">AWS</span>
                  </div>
                  <span className="text-sm text-gray-600">AWS Hosted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#343E8F]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#343E8F] font-bold text-sm">24/7</span>
                  </div>
                  <span className="text-sm text-gray-600">Support</span>
                </div>
              </div>
            </div>

            {/* Single Dashboard Screenshot - Enlarged */}
            <div className="relative h-[600px] w-full">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white p-4">
                <Image
                  src="/images/dashboard.png"
                  alt="OctoHealth ERP Main Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain rounded-lg"
                  priority
                />
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#343E8F] rounded-full animate-bounce z-30"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse z-30"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
