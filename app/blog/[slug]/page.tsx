"use client"

import { BlogHeader } from "@/components/blog-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getBlogPostBySlug } from "@/lib/firebase"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const blogPost = await getBlogPostBySlug(params.slug)
        if (!blogPost) {
          notFound()
          return
        }
        setPost(blogPost)
      } catch (error) {
        console.error("Error loading blog post:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  // Function to format content with proper line breaks
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0)
      .map((paragraph, index) => (
        <p key={index} className="mb-6 text-lg leading-relaxed text-gray-800">
          {paragraph}
        </p>
      ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <BlogHeader />
        <main>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p className="text-gray-600">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  // Safely handle Firestore timestamp
  const publishedDate = post.publishedAt
    ? typeof post.publishedAt === "object"
      ? post.publishedAt.toDate()
      : new Date(post.publishedAt)
    : typeof post.createdAt === "object"
      ? post.createdAt.toDate()
      : new Date(post.createdAt)

  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <main>
        <article className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#1886CD] hover:text-[#1565A0] mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <Badge className="bg-[#1886CD] text-white mb-4">{post.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
              <div className="flex items-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={post.image || "/placeholder.svg?height=400&width=800&text=Blog+Image"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="mb-8">
              <p className="text-xl text-gray-600 italic border-l-4 border-[#1886CD] pl-6 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Enhanced content formatting with proper paragraph spacing */}
            <div className="prose prose-lg max-w-none">
              <div className="blog-content-formatted">{formatContent(post.content)}</div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-[#1886CD]/10 to-[#EA3056]/10 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your HMO?</h3>
                <p className="text-gray-600 mb-6">
                  Discover how OctoHealth ERP can help you implement the strategies discussed in this article.
                </p>
                <Button className="bg-[#1886CD] hover:bg-[#1565A0] text-white">
                  <a href="mailto:info@octohealth.co">Request a Demo</a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
