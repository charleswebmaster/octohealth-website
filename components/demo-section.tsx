import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageCircle, Phone } from "lucide-react"

export function DemoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Ready to Transform Your HMO?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question, a request, or want to explore how OctoHealth ERP can work for your organization?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="mx-auto p-4 bg-[#343E8F]/10 rounded-2xl w-fit">
                <Calendar className="h-8 w-8 text-[#343E8F]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule a Demo</h3>
              <p className="text-gray-600 mb-4">
                See OctoHealth ERP in action with a personalized demo tailored to your HMO's needs.
              </p>
              <Button className="w-full bg-[#343E8F] hover:bg-[#2a3270] shadow-lg hover:shadow-xl transition-all">
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
              <Button variant="outline" className="w-full bg-transparent">
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
              <Button variant="outline" className="w-full bg-transparent">
                <a href="mailto:info@octohealth.com">Get in Touch</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-white to-[#343E8F]/5 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-[#343E8F]/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request a Demo</h3>
            <p className="text-gray-600 mb-6">
              Ready to see how OctoHealth ERP can transform your HMO operations? Contact us today.
            </p>
            <Button
              size="lg"
              className="bg-[#343E8F] hover:bg-[#2a3270] text-white text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <a href="mailto:info@octohealth.com">Request Demo Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
