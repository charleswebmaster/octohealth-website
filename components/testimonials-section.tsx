import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "OctoHealth ERP transformed our claims processing from days to hours. The automated adjudication has reduced our operational costs by 40% while improving member satisfaction.",
      author: "Dr. Amina Hassan",
      title: "Chief Operations Officer",
      company: "HealthGuard HMO",
      rating: 5,
    },
    {
      quote:
        "The compliance reporting features have made our regulatory audits seamless. We can generate audit-ready reports in minutes instead of weeks.",
      author: "Michael Okafor",
      title: "Head of Compliance",
      company: "MediCare Plus",
      rating: 5,
    },
    {
      quote:
        "As a growing HMO, the modular design of OctoHealth ERP has allowed us to scale efficiently. We started with basic modules and expanded as we grew.",
      author: "Sarah Mensah",
      title: "CEO",
      company: "WellCare Africa",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Trusted by Healthcare Leaders</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how OctoHealth ERP is transforming HMO operations across Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg"
            >
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#1886CD] fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 italic">"{testimonial.quote}"</blockquote>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.title}</div>
                  <div className="text-sm text-[#1886CD] font-medium">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-[#1886CD]/10 to-[#EA3056]/10 rounded-2xl p-8 shadow-inner">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join <span className="text-[#1886CD]">2 African HMOs</span> Already Using OctoHealth ERP
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-[#1886CD]">2</div>
                <div className="text-sm text-gray-600">Active HMOs</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-[#1886CD]">100K+</div>
                <div className="text-sm text-gray-600">Members Served</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-[#1886CD]">40%</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-[#1886CD]">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
