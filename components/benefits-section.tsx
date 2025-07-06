import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, TrendingUp } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Streamlined Claims Processing",
      description:
        "OctoHealth's advanced AI-driven tools enable rapid processing of all claim types, reducing manual human intervention, significantly increasing operational efficiency.",
    },
    {
      icon: Shield,
      title: "Robust Fraud Detection",
      description:
        "The platform's sophisticated fraud detection capabilities effectively identify and curb revenue loss, enhancing financial security.",
    },
    {
      icon: TrendingUp,
      title: "Enhanced Revenue",
      description:
        "Create new market fintech Credit, Logistics, and eCommerce companies in Africa in expanding their insurance products, increasing sales through integrated insurance products and growing customer base.",
    },
  ]

  return (
    <section className="py-20 bg-[#343E8F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Benefits Of Our AI-Powered Solutions</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-[#343E8F]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-[#343E8F]" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
