import { BlogHeader } from "@/components/blog-header"
import { BlogHero } from "@/components/blog-hero"
import { FeaturedArticles } from "@/components/featured-articles"
import { NewsletterSection } from "@/components/newsletter-section"
import { BlogCategories } from "@/components/blog-categories"
import { ProductTieIn } from "@/components/product-tie-in"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <main>
        <BlogHero />
        <FeaturedArticles />
        <NewsletterSection />
        <BlogCategories />
        <ProductTieIn />
      </main>
      <Footer />
    </div>
  )
}
