import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedArticles() {
  const featuredArticles = [
    {
      title: "The Future of Claims Processing: How AI is Transforming African HMOs",
      excerpt:
        "Discover how artificial intelligence is revolutionizing claims adjudication and reducing processing times by up to 80% for leading African HMOs.",
      category: "Operations & Efficiency",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      featured: true,
    },
    {
      title: "Regulatory Compliance in 2024: New NHIS Requirements Every HMO Must Know",
      excerpt:
        "A comprehensive guide to the latest National Health Insurance Scheme regulations and how to ensure your HMO remains compliant.",
      category: "Regulatory Compliance",
      readTime: "12 min read",
      date: "Dec 12, 2024",
      featured: true,
    },
    {
      title: "Scaling Your HMO: Lessons from Nigeria's Fastest-Growing Health Insurers",
      excerpt:
        "Learn the strategies and technologies that helped three Nigerian HMOs achieve 300% growth while maintaining operational efficiency.",
      category: "Scaling & Growth",
      readTime: "10 min read",
      date: "Dec 10, 2024",
      featured: true,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Articles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep insights and actionable strategies from healthcare industry experts.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  {article.featured && <Badge className="bg-[#343E8F] text-white text-xs">Featured</Badge>}
                </div>
                <CardTitle className="text-xl group-hover:text-[#343E8F] transition-colors">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center text-[#343E8F] hover:text-[#2a3270] font-medium transition-colors"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
