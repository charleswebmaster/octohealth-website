import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function NewsletterSection() {
  return (
    <section id="newsletter-section" className="py-20 bg-gradient-to-r from-[#1886CD] to-[#EA3056]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto shadow-2xl border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join the Top African Health Insurance Leaders
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get weekly insights on HMO operations, regulatory updates, and industry best practices delivered to your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email address" className="flex-1" />
              <Button className="bg-[#1886CD] hover:bg-[#1565A0] shadow-lg hover:shadow-xl transition-all">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Join 1,000+ healthcare executives. Unsubscribe anytime.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
