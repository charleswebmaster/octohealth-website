import { AlertTriangle, CheckCircle, Shield, TrendingUp, Users, Zap } from "lucide-react"

export function ProblemSolutionSection() {
  const challenges = [
    {
      icon: AlertTriangle,
      title: "Manual claims processing that delays reimbursements",
    },
    {
      icon: TrendingUp,
      title: "Operational inefficiencies draining time and resources",
    },
    {
      icon: Shield,
      title: "Regulatory compliance pressures that are hard to keep up with",
    },
    {
      icon: Users,
      title: "Fraud risks due to lack of visibility and control",
    },
    {
      icon: Zap,
      title: "Scaling limitations from disconnected or outdated systems",
    },
  ]

  const solutions = [
    "Automated, rules-based claims adjudication",
    "Real-time processing across all departments",
    "Audit-ready reporting tools for compliance confidence",
    "End-to-end provider and member management",
    "Custom dashboards to drive smarter, faster decisions",
    "Modular design to grow as you scale",
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Challenges */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Key Challenges Facing HMOs</h2>
              <p className="text-lg text-gray-600">
                African HMOs face unique operational challenges that traditional systems can't address effectively.
              </p>
            </div>
            <div className="space-y-3 mt-8">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <challenge.icon className="h-6 w-6 text-red-500 mt-1" />
                  </div>
                  <p className="text-gray-700 font-medium leading-snug">{challenge.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">The OctoHealth Solution</h2>
              <p className="text-lg text-gray-600">
                OctoHealth ERP is the all-in-one platform designed to streamline and secure your HMO operations:
              </p>
            </div>
            <div className="space-y-3 mt-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-[#1886CD]/5 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#1886CD] mt-1" />
                  </div>
                  <p className="text-gray-700 font-medium leading-snug">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
