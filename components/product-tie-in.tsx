import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ProductTieIn() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1886CD] to-[#EA3056]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Run a Smarter HMO with Africa's Leading Health ERP
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Power your HMO with an all-in-one ERP that simplifies everything from claims and underwriting to
              authorizations and pharmacy benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#1886CD] hover:bg-gray-100 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all"
              >
                <a href="mailto:info@octohealth.co">Request a Demo</a>
              </Button>
              <Button
                size="lg"
                className="text-lg px-8 py-3 bg-[#1886CD] hover:bg-[#1565A0] text-white transition-all shadow-lg hover:shadow-xl"
              >
                Product Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
