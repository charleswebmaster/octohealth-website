export function BlogHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#343E8F]/5 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-[#343E8F]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
            Africa Health Insurance{" "}
            <span className="text-[#343E8F] bg-gradient-to-r from-[#343E8F] to-purple-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Expert analysis, industry trends, and actionable insights for HMO executives across Africa. Stay ahead with
            the knowledge that drives smarter healthcare operations.
          </p>
          <div className="text-sm text-gray-500">
            By OctoHealth - The leading knowledge platform for African HMO leaders
          </div>
        </div>
      </div>
    </section>
  )
}
