"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getBlogPosts, type BlogPost } from "@/lib/firebase"

export function FeaturedArticles() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const blogPosts = await getBlogPosts()

        // Convert Firestore timestamps to serializable format before setting state
        const serializedPosts = blogPosts.slice(0, 3).map((post) => ({
          ...post,
          createdAt: post.createdAt.toMillis(),
          updatedAt: post.updatedAt.toMillis(),
          publishedAt: post.publishedAt ? post.publishedAt.toMillis() : null,
        }))

        setPosts(serializedPosts)
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading articles...</p>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
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
          {posts.map((post) => {
            // Format the date from milliseconds
            const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt)
            const formattedDate = publishedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })

            return (
              <Card
                key={post.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg?height=200&width=400&text=Blog+Image"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className="text-xs bg-white/90">
                        {post.category}
                      </Badge>
                      <Badge className="bg-[#1886CD] text-white text-xs">Featured</Badge>
                    </div>
                  </div>
                </Link>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-[#1886CD] transition-colors">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#1886CD]">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#1886CD] hover:text-[#1565A0] font-medium transition-colors"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
