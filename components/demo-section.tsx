import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageCircle, Phone } from "lucide-react"

export function DemoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Ready to Transform Your HMO?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="mx-auto p-4 bg-[#1886CD]/10 rounded-2xl w-fit">
                <Calendar className="h-8 w-8 text-[#1886CD]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule a Demo</h3>
              <p className="text-gray-600 mb-4">
                See OctoHealth ERP in action with a personalized demo tailored to your HMO's needs.
              </p>
              <Button className="w-full bg-[#1886CD] hover:bg-[#1565A0] text-white shadow-lg hover:shadow-xl transition-all">
                <a href="mailto:info@octohealth.com">Book Demo</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="mx-auto p-4 bg-green-100 rounded-2xl w-fit">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
              <p className="text-gray-600 mb-4">
                Get answers about features, pricing, implementation, and how OctoHealth fits your workflow.
              </p>
              <Button className="w-full bg-[#1886CD] hover:bg-[#1565A0] text-white shadow-lg hover:shadow-xl transition-all">
                <a href="mailto:info@octohealth.com">Contact Us</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="mx-auto p-4 bg-purple-100 rounded-2xl w-fit">
                <Phone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Speak to an Expert</h3>
              <p className="text-gray-600 mb-4">
                Connect with our healthcare technology experts to discuss your specific requirements.
              </p>
              <Button className="w-full bg-[#1886CD] hover:bg-[#1565A0] text-white shadow-lg hover:shadow-xl transition-all">
                <a href="mailto:info@octohealth.com">Get in Touch</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
