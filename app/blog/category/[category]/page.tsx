"use client"

import { BlogHeader } from "@/components/blog-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getBlogPosts, type BlogPost } from "@/lib/firebase"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [categoryPosts, setCategoryPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const decodedCategory = decodeURIComponent(params.category)

  useEffect(() => {
    async function fetchCategoryPosts() {
      try {
        const allPosts = await getBlogPosts()
        const filteredPosts = allPosts.filter((post) => post.category === decodedCategory)
        setCategoryPosts(filteredPosts)
      } catch (error) {
        console.error("Error loading category posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryPosts()
  }, [decodedCategory])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <BlogHeader />
        <main>
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-600">Loading articles...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <main>
        <section className="py-16 bg-gradient-to-br from-[#1886CD]/5 via-white to-[#EA3056]/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#1886CD] hover:text-[#1565A0] mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-[#1886CD] text-white text-lg px-4 py-2">{decodedCategory}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">{decodedCategory} Articles</h1>
              <p className="text-xl text-gray-600">
                {categoryPosts.length} {categoryPosts.length === 1 ? "article" : "articles"} in this category
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {categoryPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No articles found in this category yet.</p>
                <Link href="/blog" className="text-[#1886CD] hover:text-[#1565A0] font-medium transition-colors">
                  Browse all articles →
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {categoryPosts.map((post) => {
                  const publishedDate = post.publishedAt?.toDate() || post.createdAt.toDate()
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
