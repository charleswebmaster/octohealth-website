"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getCategories,
  getCategoryCount,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addCategory,
  updateCategory,
  deleteCategory,
  generateSlug,
  calculateReadTime,
  type BlogPost,
  type Category,
} from "@/lib/firebase"

interface BlogContextType {
  posts: BlogPost[]
  categories: Category[]
  loading: boolean
  addPost: (post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>
  deletePost: (id: string) => Promise<void>
  publishPost: (id: string) => Promise<void>
  addCategory: (name: string) => Promise<void>
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  getPublishedPosts: () => BlogPost[]
  getPostBySlug: (slug: string) => Promise<BlogPost | null>
  getCategoryCount: (categoryName: string) => Promise<number>
  refreshData: () => Promise<void>
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const refreshData = async () => {
    try {
      setLoading(true)
      const [allPosts, allCategories] = await Promise.all([getAllBlogPosts(), getCategories()])
      setPosts(allPosts)
      setCategories(allCategories)
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const handleAddPost = async (postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
    try {
      const slug = generateSlug(postData.title)
      const readTime = calculateReadTime(postData.content)
      await addBlogPost({
        ...postData,
        slug,
        readTime,
      })
      await refreshData()
    } catch (error) {
      console.error("Error adding post:", error)
      throw error
    }
  }

  const handleUpdatePost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      const updates = { ...postData }
      if (postData.title) {
        updates.slug = generateSlug(postData.title)
      }
      if (postData.content) {
        updates.readTime = calculateReadTime(postData.content)
      }
      await updateBlogPost(id, updates)
      await refreshData()
    } catch (error) {
      console.error("Error updating post:", error)
      throw error
    }
  }

  const handleDeletePost = async (id: string) => {
    try {
      await deleteBlogPost(id)
      await refreshData()
    } catch (error) {
      console.error("Error deleting post:", error)
      throw error
    }
  }

  const handlePublishPost = async (id: string) => {
    try {
      await updateBlogPost(id, { status: "Published" })
      await refreshData()
    } catch (error) {
      console.error("Error publishing post:", error)
      throw error
    }
  }

  const handleAddCategory = async (name: string) => {
    try {
      await addCategory({ name: name.trim(), count: 0 })
      await refreshData()
    } catch (error) {
      console.error("Error adding category:", error)
      throw error
    }
  }

  const handleUpdateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      await updateCategory(id, categoryData)
      await refreshData()
    } catch (error) {
      console.error("Error updating category:", error)
      throw error
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id)
      await refreshData()
    } catch (error) {
      console.error("Error deleting category:", error)
      throw error
    }
  }

  const getPublishedPosts = () => {
    return posts
      .filter((post) => post.status === "Published")
      .sort((a, b) => {
        const aTime = a.publishedAt?.toMillis() || a.createdAt.toMillis()
        const bTime = b.publishedAt?.toMillis() || b.createdAt.toMillis()
        return bTime - aTime
      })
  }

  const getPostBySlug = async (slug: string) => {
    return await getBlogPostBySlug(slug)
  }

  const getCategoryCountAsync = async (categoryName: string) => {
    return await getCategoryCount(categoryName)
  }

  const value: BlogContextType = {
    posts,
    categories,
    loading,
    addPost: handleAddPost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
    publishPost: handlePublishPost,
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    getPublishedPosts,
    getPostBySlug,
    getCategoryCount: getCategoryCountAsync,
    refreshData,
  }

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
