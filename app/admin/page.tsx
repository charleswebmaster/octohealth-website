"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye, Save, ExternalLink } from "lucide-react"
import { useBlog } from "@/contexts/blog-context"

export default function AdminDashboard() {
  const {
    posts,
    categories,
    loading,
    addPost,
    updatePost,
    deletePost,
    publishPost,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshData,
  } = useBlog()

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    excerpt: "",
    image: "",
    status: "Draft" as const,
  })

  const [editingPost, setEditingPost] = useState<any>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState("")
  const [viewingPost, setViewingPost] = useState<any>(null)

  useEffect(() => {
    refreshData()
  }, [])

  const handleAddPost = async () => {
    if (newPost.title && newPost.content && newPost.category) {
      try {
        await addPost({
          title: newPost.title,
          content: newPost.content,
          excerpt: newPost.excerpt,
          category: newPost.category,
          status: "Draft",
          image: newPost.image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
          slug: "",
          readTime: "",
        })
        setNewPost({ title: "", content: "", category: "", excerpt: "", image: "", status: "Draft" })
      } catch (error) {
        console.error("Error adding post:", error)
        alert("Error adding post. Please try again.")
      }
    }
  }

  const handleEditPost = (post: any) => {
    setEditingPost(post)
  }

  const handleSaveEdit = async () => {
    if (editingPost) {
      try {
        await updatePost(editingPost.id, editingPost)
        setEditingPost(null)
      } catch (error) {
        console.error("Error updating post:", error)
        alert("Error updating post. Please try again.")
      }
    }
  }

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id)
      } catch (error) {
        console.error("Error deleting post:", error)
        alert("Error deleting post. Please try again.")
      }
    }
  }

  const handleViewPost = (post: any) => {
    setViewingPost(post)
  }

  const handlePublishPost = async (id: string) => {
    try {
      await publishPost(id)
    } catch (error) {
      console.error("Error publishing post:", error)
      alert("Error publishing post. Please try again.")
    }
  }

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await addCategory(newCategory.trim())
        setNewCategory("")
      } catch (error) {
        console.error("Error adding category:", error)
        alert("Error adding category. Please try again.")
      }
    }
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
  }

  const handleSaveCategoryEdit = async () => {
    if (editingCategory) {
      try {
        await updateCategory(editingCategory.id, editingCategory)
        setEditingCategory(null)
      } catch (error) {
        console.error("Error updating category:", error)
        alert("Error updating category. Please try again.")
      }
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id)
      } catch (error) {
        console.error("Error deleting category:", error)
        alert("Error deleting category. Please try again.")
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1886CD] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Admin Dashboard</h1>
              <p className="text-gray-600">Manage your blog posts, categories, and media</p>
            </div>
            <Button asChild className="bg-[#1886CD] hover:bg-[#1565A0]">
              <a href="/blog" target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Blog
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
            <TabsTrigger value="new-post">New Post</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Blog Posts ({posts.length})</h2>
              <div className="flex gap-2">
                <Badge variant="outline">Published: {posts.filter((p) => p.status === "Published").length}</Badge>
                <Badge variant="secondary">Drafts: {posts.filter((p) => p.status === "Draft").length}</Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {posts.map((post) => {
                const publishedDate = post.publishedAt?.toDate() || post.createdAt.toDate()
                const formattedDate = publishedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })

                return (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <Badge variant="outline">{post.category}</Badge>
                            <span>{formattedDate}</span>
                            <Badge variant={post.status === "Published" ? "default" : "secondary"}>{post.status}</Badge>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleViewPost(post)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{post.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <Badge>{post.category}</Badge>
                                  <span>{formattedDate}</span>
                                  <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                                    {post.status}
                                  </Badge>
                                </div>
                                {post.image && (
                                  <img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                )}
                                <p className="text-gray-600 italic">{post.excerpt}</p>
                                <div className="prose max-w-none">
                                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Post</DialogTitle>
                              </DialogHeader>
                              {editingPost && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Title</label>
                                    <Input
                                      value={editingPost.title}
                                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <select
                                      className="w-full p-2 border border-gray-300 rounded-md"
                                      value={editingPost.category}
                                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                                    >
                                      {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                          {cat.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                                    <Textarea
                                      value={editingPost.excerpt}
                                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                                    <Input
                                      value={editingPost.image}
                                      onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                                      placeholder="https://example.com/image.jpg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2">
                                      Content (HTML supported for images: &lt;img src="url" alt="description" /&gt;)
                                    </label>
                                    <Textarea
                                      rows={10}
                                      value={editingPost.content}
                                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button onClick={handleSaveEdit} className="bg-[#1886CD] hover:bg-[#1565A0]">
                                      <Save className="h-4 w-4 mr-2" />
                                      Save Changes
                                    </Button>
                                    <Button variant="outline" onClick={() => setEditingPost(null)}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {post.status === "Draft" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePublishPost(post.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              Publish
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Categories ({categories.length})</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Add New Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button onClick={handleAddCategory} className="bg-[#1886CD] hover:bg-[#1565A0]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">
                          {posts.filter((p) => p.category === category.name && p.status === "Published").length}{" "}
                          published articles
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                            </DialogHeader>
                            {editingCategory && (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Category Name</label>
                                  <Input
                                    value={editingCategory.name}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={handleSaveCategoryEdit} className="bg-[#1886CD] hover:bg-[#1565A0]">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                  </Button>
                                  <Button variant="outline" onClick={() => setEditingCategory(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new-post" className="space-y-6">
            <h2 className="text-xl font-semibold">Create New Post</h2>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    placeholder="Enter post title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <Textarea
                    placeholder="Brief description of the post"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={newPost.image}
                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use external image URLs (e.g., Unsplash, Cloudinary, etc.)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Content (HTML supported for images: &lt;img src="url" alt="description" /&gt;)
                  </label>
                  <Textarea
                    placeholder="Write your post content here... You can use HTML tags including <img> for images."
                    rows={10}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For images in content, use: &lt;img src="https://example.com/image.jpg" alt="Description"
                    className="w-full rounded-lg my-4" /&gt;
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleAddPost} className="bg-[#1886CD] hover:bg-[#1565A0]">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
