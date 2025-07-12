"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  status: "Published" | "Draft"
  date: string
  image: string
  slug: string
  readTime: string
}

export interface Category {
  id: number
  name: string
  count: number
}

interface BlogContextType {
  posts: BlogPost[]
  categories: Category[]
  addPost: (post: Omit<BlogPost, "id" | "date" | "slug">) => void
  updatePost: (id: number, post: Partial<BlogPost>) => void
  deletePost: (id: number) => void
  publishPost: (id: number) => void
  addCategory: (name: string) => void
  updateCategory: (id: number, category: Partial<Category>) => void
  deleteCategory: (id: number) => void
  getPublishedPosts: () => BlogPost[]
  getPostBySlug: (slug: string) => BlogPost | undefined
  getCategoryCount: (categoryName: string) => number
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Claims Processing: How AI is Transforming African HMOs",
    content: `
      <p>Artificial Intelligence is revolutionizing the healthcare industry across Africa, with Health Maintenance Organizations (HMOs) leading the charge in adopting AI-powered claims processing systems. This transformation is not just about technology—it's about fundamentally changing how healthcare operations work.</p>
      
      <h2>The Current State of Claims Processing</h2>
      <p>Traditional claims processing in African HMOs has been plagued by manual workflows, lengthy approval times, and high error rates. On average, claims processing takes 7-14 days, with some complex cases extending to several weeks.</p>
      
      <h2>How AI is Changing the Game</h2>
      <p>AI-powered systems are reducing processing times from days to hours, with some automated claims being processed in real-time. Machine learning algorithms can now:</p>
      <ul>
        <li>Automatically validate claims against policy terms</li>
        <li>Detect fraudulent patterns in real-time</li>
        <li>Prioritize urgent cases for immediate processing</li>
        <li>Generate automated responses for standard claims</li>
      </ul>
      
      <h2>Real-World Impact</h2>
      <p>Leading African HMOs implementing AI solutions have reported:</p>
      <ul>
        <li>80% reduction in processing times</li>
        <li>45% decrease in operational costs</li>
        <li>90% improvement in accuracy rates</li>
        <li>Enhanced member satisfaction scores</li>
      </ul>
      
      <h2>Implementation Challenges</h2>
      <p>While the benefits are clear, implementing AI in claims processing comes with challenges including data quality issues, staff training requirements, and initial investment costs.</p>
      
      <h2>The Road Ahead</h2>
      <p>As AI technology continues to evolve, we can expect even more sophisticated applications in healthcare, including predictive analytics for member health outcomes and personalized treatment recommendations.</p>
    `,
    excerpt:
      "Discover how artificial intelligence is revolutionizing claims adjudication and reducing processing times by up to 80% for leading African HMOs.",
    category: "Operations & Efficiency",
    status: "Published",
    date: "Dec 15, 2024",
    image: "/images/blog-1.png",
    slug: "ai-claims-processing",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Regulatory Compliance in 2024: New NHIS Requirements Every HMO Must Know",
    content: `
      <p>The National Health Insurance Scheme (NHIS) has introduced significant regulatory changes for 2024 that every HMO must understand and implement. These changes affect everything from member enrollment to claims processing and reporting requirements.</p>
      
      <h2>Key Regulatory Changes</h2>
      <p>The most significant changes include new digital reporting requirements, enhanced member data protection protocols, and updated quality assurance standards.</p>
      
      <h2>Digital Reporting Requirements</h2>
      <p>All HMOs must now submit monthly digital reports through the new NHIS portal, including:</p>
      <ul>
        <li>Member enrollment statistics</li>
        <li>Claims processing metrics</li>
        <li>Provider network updates</li>
        <li>Financial performance indicators</li>
      </ul>
      
      <h2>Data Protection Protocols</h2>
      <p>Enhanced member data protection requirements now mandate:</p>
      <ul>
        <li>End-to-end encryption for all member data</li>
        <li>Regular security audits</li>
        <li>Staff training on data privacy</li>
        <li>Incident reporting procedures</li>
      </ul>
      
      <h2>Quality Assurance Standards</h2>
      <p>New quality metrics focus on member satisfaction, provider network adequacy, and clinical outcomes tracking.</p>
      
      <h2>Implementation Timeline</h2>
      <p>HMOs have until March 2024 to fully implement these changes, with phased compliance checks beginning in January.</p>
      
      <h2>Compliance Best Practices</h2>
      <p>To ensure smooth compliance, HMOs should establish dedicated compliance teams, invest in appropriate technology infrastructure, and maintain regular communication with NHIS officials.</p>
    `,
    excerpt:
      "A comprehensive guide to the latest National Health Insurance Scheme regulations and how to ensure your HMO remains compliant.",
    category: "Regulatory Compliance",
    status: "Published",
    date: "Dec 12, 2024",
    image: "/images/blog-2.png",
    slug: "nhis-compliance-2024",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "Scaling Your HMO: Lessons from Nigeria's Fastest-Growing Health Insurers",
    content: `
      <p>Nigeria's healthcare insurance sector has witnessed remarkable growth, with several HMOs achieving 300% growth rates while maintaining operational efficiency. This article examines the strategies and technologies that enabled this success.</p>
      
      <h2>The Growth Challenge</h2>
      <p>Scaling an HMO presents unique challenges including maintaining service quality, managing increased operational complexity, and ensuring regulatory compliance across expanded operations.</p>
      
      <h2>Technology as a Growth Enabler</h2>
      <p>Successful HMOs have leveraged technology in several key areas:</p>
      <ul>
        <li>Cloud-based infrastructure for scalability</li>
        <li>Automated workflows for efficiency</li>
        <li>Data analytics for decision-making</li>
        <li>Mobile applications for member engagement</li>
      </ul>
      
      <h2>Operational Excellence</h2>
      <p>Growing HMOs focus on:</p>
      <ul>
        <li>Standardizing processes across all locations</li>
        <li>Implementing quality management systems</li>
        <li>Developing comprehensive staff training programs</li>
        <li>Establishing performance monitoring frameworks</li>
      </ul>
      
      <h2>Strategic Partnerships</h2>
      <p>Successful scaling often involves strategic partnerships with healthcare providers, technology vendors, and other stakeholders to expand capabilities without proportional cost increases.</p>
      
      <h2>Financial Management</h2>
      <p>Effective financial management during growth phases includes careful cash flow management, strategic investment in technology, and maintaining adequate reserves for regulatory requirements.</p>
      
      <h2>Lessons Learned</h2>
      <p>Key lessons from successful HMO scaling include the importance of maintaining company culture, investing in staff development, and staying focused on member satisfaction throughout the growth process.</p>
    `,
    excerpt:
      "Learn the strategies and technologies that helped three Nigerian HMOs achieve 300% growth while maintaining operational efficiency.",
    category: "Scaling & Growth",
    status: "Published",
    date: "Dec 10, 2024",
    image: "/images/blog-3.png",
    slug: "scaling-hmo-lessons",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "5 KPIs Every HMO Executive Should Track in 2024",
    content: `
      <p>Key Performance Indicators (KPIs) are essential for measuring the success and efficiency of Health Maintenance Organizations. In 2024, with evolving healthcare landscapes and increased competition, tracking the right metrics has become more critical than ever.</p>
      
      <h2>1. Member Satisfaction Score (CSAT)</h2>
      <p>Member satisfaction directly impacts retention rates and word-of-mouth referrals. Track satisfaction through regular surveys, complaint resolution times, and Net Promoter Scores.</p>
      
      <h2>2. Claims Processing Time</h2>
      <p>The average time from claim submission to payment is a critical operational metric. Industry leaders maintain processing times under 48 hours for standard claims.</p>
      
      <h2>3. Medical Loss Ratio (MLR)</h2>
      <p>MLR measures the percentage of premium revenue spent on medical claims and quality improvement activities. Regulatory requirements typically mandate MLRs between 80-85%.</p>
      
      <h2>4. Provider Network Adequacy</h2>
      <p>Ensure adequate provider coverage by tracking provider-to-member ratios, geographic coverage, and specialty care availability.</p>
      
      <h2>5. Revenue Growth Rate</h2>
      <p>Monitor both premium revenue growth and diversification into new markets or product lines to ensure sustainable business expansion.</p>
      
      <h2>Implementation Best Practices</h2>
      <p>Establish regular reporting cycles, use dashboard visualization tools, and ensure all stakeholders understand the metrics and their targets.</p>
    `,
    excerpt:
      "Essential performance metrics that drive successful HMO operations and strategic decision-making in today's competitive healthcare market.",
    category: "Leadership & Strategy",
    status: "Published",
    date: "Dec 8, 2024",
    image: "/images/blog-1.png",
    slug: "hmo-kpis-2024",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Implementing Digital-First Member Onboarding",
    content: `
      <p>Digital transformation in healthcare has accelerated member expectations for seamless, digital-first experiences. Modern HMOs must adapt their onboarding processes to meet these evolving demands.</p>
      
      <h2>The Digital Imperative</h2>
      <p>Traditional paper-based onboarding processes are no longer sufficient. Members expect instant access, mobile-friendly interfaces, and real-time updates on their enrollment status.</p>
      
      <h2>Key Components of Digital Onboarding</h2>
      <ul>
        <li>Mobile-responsive enrollment forms</li>
        <li>Document upload capabilities</li>
        <li>Real-time eligibility verification</li>
        <li>Automated welcome communications</li>
        <li>Digital ID card generation</li>
      </ul>
      
      <h2>Implementation Strategy</h2>
      <p>Start with a pilot program, gather user feedback, and iterate based on member experience data. Ensure compliance with data protection regulations throughout the process.</p>
      
      <h2>Measuring Success</h2>
      <p>Track completion rates, time-to-enrollment, member satisfaction scores, and support ticket volume to measure the effectiveness of your digital onboarding process.</p>
    `,
    excerpt:
      "Transform your member experience with streamlined digital onboarding processes that reduce friction and improve satisfaction.",
    category: "Operations & Efficiency",
    status: "Published",
    date: "Dec 5, 2024",
    image: "/images/blog-2.png",
    slug: "digital-member-onboarding",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Understanding Ghana's New Health Insurance Regulations",
    content: `
      <p>Ghana's National Health Insurance Authority (NHIA) has introduced comprehensive regulatory updates that significantly impact how HMOs operate within the country's healthcare ecosystem.</p>
      
      <h2>Overview of Changes</h2>
      <p>The new regulations focus on improving service quality, enhancing member protection, and ensuring financial sustainability of health insurance providers.</p>
      
      <h2>Key Regulatory Updates</h2>
      <ul>
        <li>Enhanced capital requirements for new HMO licenses</li>
        <li>Mandatory quality assurance programs</li>
        <li>Updated provider credentialing standards</li>
        <li>New reporting and transparency requirements</li>
      </ul>
      
      <h2>Compliance Timeline</h2>
      <p>HMOs have a 6-month transition period to implement the new requirements, with regular compliance audits scheduled thereafter.</p>
      
      <h2>Impact on Operations</h2>
      <p>These changes will require significant operational adjustments, including system upgrades, staff training, and process reengineering.</p>
      
      <h2>Preparation Strategies</h2>
      <p>Successful compliance requires early preparation, stakeholder engagement, and investment in appropriate technology infrastructure.</p>
    `,
    excerpt:
      "Navigate Ghana's evolving healthcare regulatory landscape with this comprehensive guide to new NHIA requirements and compliance strategies.",
    category: "Regulatory Compliance",
    status: "Published",
    date: "Dec 3, 2024",
    image: "/images/blog-3.png",
    slug: "ghana-health-insurance-regulations",
    readTime: "9 min read",
  },
]

const initialCategories: Category[] = [
  { id: 1, name: "Operations & Efficiency", count: 0 },
  { id: 2, name: "Claims & Fraud", count: 0 },
  { id: 3, name: "Regulatory Compliance", count: 0 },
  { id: 4, name: "Scaling & Growth", count: 0 },
  { id: 5, name: "Leadership & Strategy", count: 0 },
]

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)

  // Update category counts whenever posts change
  const updateCategoryCounts = (updatedPosts: BlogPost[]) => {
    const publishedPosts = updatedPosts.filter((post) => post.status === "Published")
    const updatedCategories = categories.map((category) => ({
      ...category,
      count: publishedPosts.filter((post) => post.category === category.name).length,
    }))
    setCategories(updatedCategories)
  }

  const addPost = (postData: Omit<BlogPost, "id" | "date" | "slug">) => {
    const newPost: BlogPost = {
      ...postData,
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      slug: generateSlug(postData.title),
      readTime: calculateReadTime(postData.content),
    }
    const updatedPosts = [...posts, newPost]
    setPosts(updatedPosts)
    updateCategoryCounts(updatedPosts)
  }

  const updatePost = (id: number, postData: Partial<BlogPost>) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            ...postData,
            slug: postData.title ? generateSlug(postData.title) : post.slug,
            readTime: postData.content ? calculateReadTime(postData.content) : post.readTime,
          }
        : post,
    )
    setPosts(updatedPosts)
    updateCategoryCounts(updatedPosts)
  }

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
    updateCategoryCounts(updatedPosts)
  }

  const publishPost = (id: number) => {
    const updatedPosts = posts.map((post) => (post.id === id ? { ...post, status: "Published" as const } : post))
    setPosts(updatedPosts)
    updateCategoryCounts(updatedPosts)
  }

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      name: name.trim(),
      count: posts.filter((post) => post.category === name.trim() && post.status === "Published").length,
    }
    setCategories([...categories, newCategory])
  }

  const updateCategory = (id: number, categoryData: Partial<Category>) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, ...categoryData } : category,
    )
    setCategories(updatedCategories)
  }

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const getPublishedPosts = () => {
    return posts
      .filter((post) => post.status === "Published")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getPostBySlug = (slug: string) => {
    return posts.find((post) => post.slug === slug && post.status === "Published")
  }

  const getCategoryCount = (categoryName: string) => {
    return posts.filter((post) => post.category === categoryName && post.status === "Published").length
  }

  // Initialize category counts on mount
  useState(() => {
    updateCategoryCounts(posts)
  })

  const value: BlogContextType = {
    posts,
    categories,
    addPost,
    updatePost,
    deletePost,
    publishPost,
    addCategory,
    updateCategory,
    deleteCategory,
    getPublishedPosts,
    getPostBySlug,
    getCategoryCount,
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
