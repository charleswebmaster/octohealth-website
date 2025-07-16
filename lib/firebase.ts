import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  category: string
  status: "Published" | "Draft"
  image: string
  slug: string
  readTime: string
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt?: Timestamp
}

export interface Category {
  id: string
  name: string
  count: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, "blogPosts"), where("status", "==", "Published"), orderBy("publishedAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as BlogPost,
    )
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(
      collection(db, "blogPosts"),
      where("slug", "==", slug),
      where("status", "==", "Published"),
      limit(1),
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return null

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as BlogPost
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as BlogPost,
    )
  } catch (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
}

export async function addBlogPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<string> {
  try {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, "blogPosts"), {
      ...post,
      createdAt: now,
      updatedAt: now,
      publishedAt: post.status === "Published" ? now : null,
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding blog post:", error)
    throw error
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
  try {
    const docRef = doc(db, "blogPosts", id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
      publishedAt: updates.status === "Published" ? Timestamp.now() : null,
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    throw error
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "blogPosts", id))
  } catch (error) {
    console.error("Error deleting blog post:", error)
    throw error
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"))
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Category,
    )
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategoryCount(categoryName: string): Promise<number> {
  try {
    const q = query(
      collection(db, "blogPosts"),
      where("category", "==", categoryName),
      where("status", "==", "Published"),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.size
  } catch (error) {
    console.error("Error getting category count:", error)
    return 0
  }
}

export async function addCategory(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<string> {
  try {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, "categories"), {
      ...category,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding category:", error)
    throw error
  }
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<void> {
  try {
    const docRef = doc(db, "categories", id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error("Error updating category:", error)
    throw error
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "categories", id))
  } catch (error) {
    console.error("Error deleting category:", error)
    throw error
  }
}

// Utility function to generate slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Utility function to calculate read time
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}
