export function BlogHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1886CD]/5 via-white to-[#EA3056]/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-[#1886CD]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-[#EA3056]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
            Africa Health Insurance{" "}
            <span className="text-[#1886CD] bg-gradient-to-r from-[#1886CD] to-[#EA3056] bg-clip-text text-transparent">
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
