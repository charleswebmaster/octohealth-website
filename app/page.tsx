import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { ProductFeaturesSection } from "@/components/product-features-section"
import { AfricanAdvantageSection } from "@/components/african-advantage-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <ProductFeaturesSection />
        <AfricanAdvantageSection />
        <TestimonialsSection />
        <NewsletterSection />
        <DemoSection />
      </main>
      <Footer />
    </div>
  )
}
