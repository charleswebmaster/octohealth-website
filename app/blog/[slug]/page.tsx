"use client"

import { BlogHeader } from "@/components/blog-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useBlog } from "@/contexts/blog-context"
import { notFound } from "next/navigation"

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { getPostBySlug } = useBlog()
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <main>
        <article className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#343E8F] hover:text-[#2a3270] mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="mb-8">
              <Badge className="bg-[#343E8F] text-white mb-4">{post.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
              <div className="flex items-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="mb-8">
              <p className="text-xl text-gray-600 italic border-l-4 border-[#343E8F] pl-6 mb-8">{post.excerpt}</p>
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-[#343E8F] prose-a:hover:text-[#2a3270]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-[#343E8F]/10 to-purple-50 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your HMO?</h3>
                <p className="text-gray-600 mb-6">
                  Discover how OctoHealth ERP can help you implement the strategies discussed in this article.
                </p>
                <Button className="bg-[#343E8F] hover:bg-[#2a3270] text-white">
                  <a href="mailto:info@octohealth.com">Request a Demo</a>
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
