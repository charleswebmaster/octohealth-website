"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Upload, Eye, Save } from "lucide-react"
import { useBlog } from "@/contexts/blog-context"

export default function AdminDashboard() {
  const {
    posts,
    categories,
    addPost,
    updatePost,
    deletePost,
    publishPost,
    addCategory,
    updateCategory,
    deleteCategory,
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

  const handleAddPost = () => {
    if (newPost.title && newPost.content && newPost.category) {
      addPost({
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt,
        category: newPost.category,
        status: "Draft",
        image: newPost.image || "/images/blog-1.png",
        readTime: "5 min read", // This will be calculated in the context
      })
      setNewPost({ title: "", content: "", category: "", excerpt: "", image: "", status: "Draft" })
    }
  }

  const handleEditPost = (post: any) => {
    setEditingPost(post)
  }

  const handleSaveEdit = () => {
    if (editingPost) {
      updatePost(editingPost.id, editingPost)
      setEditingPost(null)
    }
  }

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(id)
    }
  }

  const handleViewPost = (post: any) => {
    setViewingPost(post)
  }

  const handlePublishPost = (id: number) => {
    publishPost(id)
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim())
      setNewCategory("")
    }
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
  }

  const handleSaveCategoryEdit = () => {
    if (editingCategory) {
      updateCategory(editingCategory.id, editingCategory)
      setEditingCategory(null)
    }
  }

  const handleDeleteCategory = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id)
    }
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
            <Button asChild className="bg-[#343E8F] hover:bg-[#2a3270]">
              <a href="/blog" target="_blank" rel="noreferrer">
                View Blog
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
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
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant="outline">{post.category}</Badge>
                          <span>{post.date}</span>
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
                                <span>{post.date}</span>
                                <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                                  {post.status}
                                </Badge>
                              </div>
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
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Content</label>
                                  <Textarea
                                    rows={10}
                                    value={editingPost.content}
                                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={handleSaveEdit} className="bg-[#343E8F] hover:bg-[#2a3270]">
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
              ))}
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
                  <Button onClick={handleAddCategory} className="bg-[#343E8F] hover:bg-[#2a3270]">
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
                                  <Button onClick={handleSaveCategoryEdit} className="bg-[#343E8F] hover:bg-[#2a3270]">
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

          <TabsContent value="media" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Media Library</h2>
              <Button className="bg-[#343E8F] hover:bg-[#2a3270]">
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Image {item}</span>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">blog-image-{item}.jpg</p>
                    <p className="text-xs text-gray-600">2.4 MB</p>
                    <div className="flex gap-1 mt-2">
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs text-red-600 bg-transparent">
                        Delete
                      </Button>
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
                    placeholder="Enter image URL"
                    value={newPost.image}
                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    placeholder="Write your post content here..."
                    rows={10}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleAddPost} className="bg-[#343E8F] hover:bg-[#2a3270]">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
