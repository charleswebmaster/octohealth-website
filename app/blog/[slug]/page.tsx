"use client"

import { BlogHeader } from "@/components/blog-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getBlogPostBySlug } from "@/lib/firebase"
import { notFound } from "next/navigation"

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

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
                src={post.image || "/placeholder.svg"}
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

            {/* Enhanced content formatting for better readability */}
            <div className="prose prose-lg max-w-none">
              <div
                className="blog-content text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-[#1886CD]/10 to-[#EA3056]/10 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your HMO?</h3>
                <p className="text-gray-600 mb-6">
                  Discover how OctoHealth ERP can help you implement the strategies discussed in this article.
                </p>
                <Button className="bg-[#1886CD] hover:bg-[#1565A0] text-white">
                  <a href="mailto:info@octohealth.com">Request a Demo</a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />

      {/* Add custom CSS for better content formatting */}
      <style jsx global>{`
        .blog-content {
          line-height: 1.8;
          font-size: 18px;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #374151;
        }
        
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: #111827;
          line-height: 1.4;
        }
        
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 { font-size: 1.75rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content h4 { font-size: 1.25rem; }
        
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
          color: #374151;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #1886CD;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6B7280;
          background-color: #F9FAFB;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .blog-content img {
          margin: 2rem 0;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .blog-content a {
          color: #1886CD;
          text-decoration: underline;
        }
        
        .blog-content a:hover {
          color: #1565A0;
        }
        
        .blog-content strong {
          font-weight: 600;
          color: #111827;
        }
        
        .blog-content code {
          background-color: #F3F4F6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  )
}
