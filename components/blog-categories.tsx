import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, FileCheck, Users, Target, ArrowRight } from "lucide-react"
import Link from "next/link"

export function BlogCategories() {
  const categories = [
    {
      icon: TrendingUp,
      title: "Operations & Efficiency",
      description: "Streamline your HMO operations with proven strategies and best practices",
      articleCount: 24,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      title: "Claims & Fraud",
      description: "Advanced techniques for claims management and fraud prevention",
      articleCount: 18,
      color: "bg-red-100 text-red-600",
    },
    {
      icon: FileCheck,
      title: "Regulatory Compliance",
      description: "Stay compliant with evolving healthcare regulations across Africa",
      articleCount: 15,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Users,
      title: "Scaling & Growth",
      description: "Strategies for sustainable growth and market expansion",
      articleCount: 21,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Target,
      title: "Leadership & Strategy",
      description: "Executive insights and strategic planning for HMO leaders",
      articleCount: 12,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const recentArticles = [
    {
      title: "5 KPIs Every HMO Executive Should Track in 2024",
      category: "Leadership & Strategy",
      date: "Dec 8, 2024",
    },
    {
      title: "Implementing Digital-First Member Onboarding",
      category: "Operations & Efficiency",
      date: "Dec 5, 2024",
    },
    {
      title: "Understanding Ghana's New Health Insurance Regulations",
      category: "Regulatory Compliance",
      date: "Dec 3, 2024",
    },
    {
      title: "Pharmacy Benefits Management: A Complete Guide",
      category: "Operations & Efficiency",
      date: "Nov 30, 2024",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-[#343E8F] transition-colors">
                          {category.title}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {category.articleCount} articles
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center text-[#343E8F] hover:text-[#2a3270] font-medium transition-colors"
                    >
                      Explore Category
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Articles Sidebar */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h3>
            <div className="space-y-6">
              {recentArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      <Link href="#">{article.title}</Link>
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Card className="bg-gradient-to-br from-[#343E8F]/10 to-purple-50 border-[#343E8F]/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Never Miss an Update</h4>
                  <p className="text-sm text-gray-600 mb-4">Get weekly insights delivered to your inbox</p>
                  <Link
                    href="#newsletter"
                    className="inline-flex items-center text-[#343E8F] hover:text-[#2a3270] font-medium transition-colors"
                  >
                    Subscribe Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
