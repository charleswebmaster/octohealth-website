const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

export interface BlogPost {
  id: number
  attributes: {
    title: string
    content: string
    excerpt: string
    category: string
    featured_image?: {
      data?: {
        attributes: {
          url: string
        }
      }
    }
    status: "published" | "draft"
    slug: string
    publishedAt: string
    createdAt: string
    updatedAt: string
  }
}

export interface Category {
  id: number
  attributes: {
    name: string
    description?: string
    createdAt: string
    updatedAt: string
  }
}

// Fetch all published blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-posts?populate=*&filters[status][$eq]=published&sort=publishedAt:desc`,
    )
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-posts?populate=*&filters[slug][$eq]=${slug}&filters[status][$eq]=published`,
    )
    const data = await response.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`)
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Get posts count by category
export async function getPostsCountByCategory(categoryName: string): Promise<number> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blog-posts?filters[category][$eq]=${categoryName}&filters[status][$eq]=published`,
    )
    const data = await response.json()
    return data.meta?.pagination?.total || 0
  } catch (error) {
    console.error("Error fetching posts count:", error)
    return 0
  }
}
