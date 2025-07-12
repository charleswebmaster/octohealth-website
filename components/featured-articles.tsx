"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useBlog } from "@/contexts/blog-context"

export function FeaturedArticles() {
  const { getPublishedPosts } = useBlog()
  const publishedPosts = getPublishedPosts()
  const featuredArticles = publishedPosts.slice(0, 3) // Get the 3 most recent published posts

  if (featuredArticles.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep insights and actionable strategies from healthcare industry experts.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No published articles yet. Check back soon!</p>
          </div>
        </div>
      </section>
    )
  }

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
              key={article.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="text-xs bg-white/90">
                    {article.category}
                  </Badge>
                  <Badge className="bg-[#343E8F] text-white text-xs">Featured</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-[#343E8F] transition-colors">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </CardTitle>
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
                  href={`/blog/${article.slug}`}
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
