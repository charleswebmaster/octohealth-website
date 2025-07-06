import { BlogHeader } from "@/components/blog-header"
import { BlogHero } from "@/components/blog-hero"
import { FeaturedArticles } from "@/components/featured-articles"
import { BlogCategories } from "@/components/blog-categories"
import { NewsletterSection } from "@/components/newsletter-section"
import { ProductTieIn } from "@/components/product-tie-in"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <main>
        <BlogHero />
        <FeaturedArticles />
        <BlogCategories />
        <NewsletterSection />
        <ProductTieIn />
      </main>
      <Footer />
    </div>
  )
}
