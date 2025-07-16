"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, FileCheck, Users, Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useBlog } from "@/contexts/blog-context"
import { useEffect, useState } from "react"

export function BlogCategories() {
  const { categories, getPublishedPosts, getCategoryCount } = useBlog()
  const [publishedPosts, setPublishedPosts] = useState([])
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const posts = getPublishedPosts()

    // Convert Firestore timestamps to serializable format
    const serializedPosts = posts.map((post) => ({
      ...post,
      createdAt: typeof post.createdAt === "number" ? post.createdAt : post.createdAt.toMillis(),
      updatedAt: typeof post.updatedAt === "number" ? post.updatedAt : post.updatedAt.toMillis(),
      publishedAt: post.publishedAt
        ? typeof post.publishedAt === "number"
          ? post.publishedAt
          : post.publishedAt.toMillis()
        : null,
    }))

    setPublishedPosts(serializedPosts.slice(0, 4))

    // Load category counts
    const loadCounts = async () => {
      const counts: Record<string, number> = {}
      for (const category of categories) {
        counts[category.name] = await getCategoryCount(category.name)
      }
      setCategoryCounts(counts)
      setLoading(false)
    }

    loadCounts()
  }, [categories, getPublishedPosts, getCategoryCount])

  const categoryIcons = {
    "Operations & Efficiency": TrendingUp,
    "Claims & Fraud": Shield,
    "Regulatory Compliance": FileCheck,
    "Scaling & Growth": Users,
    "Leadership & Strategy": Target,
  }

  const categoryColors = {
    "Operations & Efficiency": "bg-blue-100 text-blue-600",
    "Claims & Fraud": "bg-red-100 text-red-600",
    "Regulatory Compliance": "bg-green-100 text-green-600",
    "Scaling & Growth": "bg-purple-100 text-purple-600",
    "Leadership & Strategy": "bg-orange-100 text-orange-600",
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || TrendingUp
                const colorClass =
                  categoryColors[category.name as keyof typeof categoryColors] || "bg-gray-100 text-gray-600"
                const count = categoryCounts[category.name] || 0

                return (
                  <Card
                    key={category.id}
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-[#1886CD] transition-colors">
                            {category.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {count} {count === 1 ? "article" : "articles"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {category.name === "Operations & Efficiency" &&
                          "Streamline your HMO operations with proven strategies and best practices"}
                        {category.name === "Claims & Fraud" &&
                          "Advanced techniques for claims management and fraud prevention"}
                        {category.name === "Regulatory Compliance" &&
                          "Stay compliant with evolving healthcare regulations across Africa"}
                        {category.name === "Scaling & Growth" &&
                          "Strategies for sustainable growth and market expansion"}
                        {category.name === "Leadership & Strategy" &&
                          "Executive insights and strategic planning for HMO leaders"}
                      </p>
                      <Link
                        href={`/blog/category/${encodeURIComponent(category.name)}`}
                        className="inline-flex items-center text-[#1886CD] hover:text-[#1565A0] font-medium transition-colors"
                      >
                        Explore Category
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Recent Articles Sidebar with Thumbnails */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h3>
            <div className="space-y-6">
              {publishedPosts.length > 0 ? (
                publishedPosts.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                    <div className="flex">
                      {/* Thumbnail */}
                      <div className="w-24 h-20 flex-shrink-0">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={96}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <CardContent className="p-4 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 hover:text-[#1886CD] transition-colors text-sm leading-tight line-clamp-2">
                          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <span>{article.readTime}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600">No recent articles available.</p>
              )}
            </div>

            {/* View All Articles Link */}
            {publishedPosts.length > 0 && (
              <div className="mt-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-[#1886CD] hover:text-[#1565A0] font-medium transition-colors"
                >
                  View All Articles
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
