import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, MessageSquare, FileText } from "lucide-react"
import Image from "next/image"

// Custom Naira Icon Component
function NairaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 4v16" />
      <path d="M17 4v16" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M4 8h3" />
      <path d="M4 12h3" />
      <path d="M17 8h3" />
      <path d="M17 12h3" />
    </svg>
  )
}

export function AfricanAdvantageSection() {
  const advantages = [
    {
      icon: FileText,
      title: "NHIS Compliance",
      description:
        "Built specifically for African healthcare regulations and National Health Insurance Scheme requirements",
    },
    {
      icon: NairaIcon,
      title: "Multiple Currencies",
      description: "Native support for multiple African currencies with real-time exchange rate management",
    },
    {
      icon: MessageSquare,
      title: "SMS Integration",
      description: "Built-in SMS capabilities for member communications, perfect for African mobile-first markets",
    },
    {
      icon: MapPin,
      title: "Local Standards",
      description: "Supports ICD-10 and CPT codes with African healthcare provider network integration",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            The <span className="text-[#1886CD]">African Advantage</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built by Africans, for Africans. OctoHealth ERP understands the unique challenges and opportunities in
            African healthcare markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg"
            >
              <CardHeader>
                <div className="mx-auto p-4 bg-[#1886CD] rounded-2xl w-fit shadow-lg">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{advantage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto border border-[#1886CD]/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-[#1886CD]">Leading African HMOs</span>
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Join the growing network of African healthcare organizations that trust OctoHealth ERP to power their
              operations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-100">
              {/* Placeholder for client logos */}
              <div className="h-12 bg-white-200 rounded flex items-center justify-center">
               {/* <span className="text-gray-500 text-sm">Client Logo</span> */}
              </div>
              <div className="h-12 bg-black-200 rounded flex items-center justify-center">
                <Image
                  src="/images/bastion-logo.webp"
                  alt="Bastion Logo"
                  width={220}
                  height={58}
                  className="h-10 w-auto"
                />
              </div>
              <div className="h-12 bg-white-200 rounded flex items-center justify-center">
                <Image
                  src="/images/oceanic-health-logo.png"
                  alt="Oceanic Health"
                  width={220}
                  height={58}
                  className="h-10 w-auto"
                />
              </div>
              <div className="h-12 bg-white-200 rounded flex items-center justify-center">
                <Image
                  src="/images/delog-logo.png"
                  alt="Delog"
                  width={220}
                  height={58}
                  className="h-10 w-auto"
                />
              </div>
              <div className="h-12 bg-white-200 rounded flex items-center justify-center">
                {/* <span className="text-gray-500 text-sm">Client Logo</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
