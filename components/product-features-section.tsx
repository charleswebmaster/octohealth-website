"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, CreditCard, Users, Pill, Phone, Activity, Smartphone, Globe, Cloud } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function ProductFeaturesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      id: "underwriting",
      title: "Underwriting",
      icon: FileText,
      description: "Comprehensive insurance product configuration and management",
      details: [
        "Configurable structure (plans, benefits) and coverage rules (limits, deductibles, co-pays, waiting periods, exclusions, etc.) of diverse health insurance products",
        "Wide range of health insurance products and all types of coverage including inpatient, outpatient, pharmacy, dental, optical and personal accidents",
        "Link medical information of claims to member benefits and automatic calculation of claims based on product rules and 'real time' update of member balances",
        "Supports pool allocations on any coverage, sub-coverage or based on medical conditions e.g. Chronic, Critical, etc.",
        "Comprehensive functionality for preparing and managing quotations, renewals and endorsements",
      ],
    },
    {
      id: "authorization",
      title: "Authorization",
      icon: Shield,
      description: "Advanced medical case management and utilization review",
      details: [
        "Captures information about medical cases (episodes of care) of the insured population together with all related incidents of care",
        "Offers utilization management functionality by supporting the process of review and authorization of medical services",
        "Works with WHO's International diagnoses coding standard (ICD10)",
        "Automatic calculation of authorizations according to product and provider contract rules",
        "Pre-authorizations with automatic creation of pre-invoices in order to reserve member balances through issuing the pre-authorization code with estimated cost validated against the different limits on the policy",
      ],
    },
    {
      id: "claims",
      title: "Claims Management",
      icon: CreditCard,
      description: "Fully automated claims processing and adjudication",
      details: [
        "Fully comprehensive claims lots assignment screen to both data entry staff or claims auditors for more flexible and smooth claims processing workflow",
        "Automatic adjudication of all types of health insurance claims including reimbursement and direct-billing",
        "Automatic calculation of the amount payable to the provider based on contracted prices and the insured member's share",
        "Powerful Review concept enabling manual review of specific invoices",
        "Claimants are able to track the status of their claims via the web or through the mobile app, as it is processed by the HMO's departments",
        "Works with international procedure coding standard (CPT4)",
      ],
    },
    {
      id: "providers",
      title: "Provider Management",
      icon: Users,
      description: "Comprehensive healthcare provider network management",
      details: [
        "Maintains a comprehensive database of healthcare providers of all types including hospitals, physicians, ambulatory centres, pharmacies, etc.",
        "Group healthcare providers under user-defined provider groups (networks) with different administrative procedures, coverage and reimbursement",
        "Sophisticated functionality for managing different types of provider contracts including rates for provider services and items",
        "Variety of contract price arrangements including fee schedules, flat rates, discounts, volume discounts and Admin fees",
        "Integrated One screen function for tariff implementation as well as mapping of the CPT list to the provider's own codes",
      ],
    },
    {
      id: "pharmacy",
      title: "Pharmacy Benefits",
      icon: Pill,
      description: "Complete pharmaceutical benefits management system",
      details: [
        "Full control over the prescribed drugs with relation to mode of dispense, adequate doses to be prescribed, minimum dispensable unit of each item, etc.",
        "Clinical information that assist the pre-authorization team to easily identify the indication, contra-indication and compatibility of any item with regard to each member coverage and health records",
        "The ability to create unlimited number of formularies each with a different coverage scheme, at the level of one drug versus the levels of Insurance company, policy, plan or member",
        "Medical rules implemented based on the item active ingredient",
        "Customizable business rules used upon the dispense of any pharmacy claim such as duplication of items, duplication of therapy, gender incompatibility, age incompatibility, dosage adequacy, etc.",
      ],
    },
    {
      id: "crm",
      title: "Customer Relationship Management",
      icon: Phone,
      description: "Complete customer lifecycle management",
      details: [
        "Leads management",
        "Contact management",
        "Email & SMS communications management",
        "Customer and leads dashboards",
        "Customer service management",
        "Customer survey and feedback management",
      ],
    },
    {
      id: "chronic",
      title: "Chronic Posting",
      icon: Activity,
      description: "Specialized chronic medication management",
      details: [
        "Fully integrated Chronic medications posting module to post monthly prescriptions for chronic patients allowing them to dispense their monthly chronic medications with only their enrolee/member ID",
        "Create new chronic file for the chronic members that contain their coverage specification, provider of choice to dispense from, the ICD code, the medications that is to be dispensed",
        "Validation rules to verify the accuracy and coherence of the chronic prescription with the policy exclusions, items coverage, etc.",
        "The ability to reverse or delete any of the files or suspend them as per the business needs at any given point of time",
        "Detailed chronic report for the whole portfolio or for a specific policy or member",
      ],
    },
    {
      id: "mobile",
      title: "Mobile App",
      icon: Smartphone,
      description: "iOS and Android apps for customers",
      details: [
        "iOS and Android apps for customers",
        "Ability to search and locate providers based on member's network",
        "Survey and feedback management",
        "Reimbursement claims management",
        "Virtual Member Card",
        "Authorizations and Claims statuses and details",
      ],
    },
  ]

  const standards = [
    {
      icon: Globe,
      title: "International Standards",
      description: "Built on global healthcare standards including ICD10 and CPT4 coding systems",
    },
    {
      icon: Shield,
      title: "Extensible RESTful API",
      description: "Easy integration to existing systems and extendable with third-party apps",
    },
    {
      icon: Cloud,
      title: "Cloud Based and Secure",
      description: "Hosted on Amazon AWS with role-based access controls and industry standard encryption",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isUserInteracting) {
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % features.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, isUserInteracting, features.length])

  // Handle manual tab selection
  const handleTabClick = (index: number) => {
    setActiveTab(index)
    setIsUserInteracting(true)
    setIsAutoPlaying(false)

    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => {
      setIsUserInteracting(false)
      setIsAutoPlaying(true)
    }, 10000)
  }

  // Scroll active tab into view without affecting page scroll
  useEffect(() => {
    if (tabsContainerRef.current && !isUserInteracting) {
      const activeTabElement = tabsContainerRef.current.children[activeTab] as HTMLElement
      if (activeTabElement) {
        // Only scroll the tabs container, not the entire page
        const container = tabsContainerRef.current
        const tabRect = activeTabElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
          activeTabElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          })
        }
      }
    }
  }, [activeTab, isUserInteracting])

  const ActiveFeatureIcon = features[activeTab].icon
  const ActiveFeatureTitle = features[activeTab].title
  const ActiveFeatureDescription = features[activeTab].description
  const ActiveFeatureDetails = features[activeTab].details

  return (
    <section id="product" className="py-20 bg-gradient-to-br from-white via-[#1886CD]/5 to-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Comprehensive <span className="text-[#1886CD]">Product Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every module designed specifically for African HMOs, with deep functionality to handle complex healthcare
            operations.
          </p>
        </div>

        <div className="w-full">
          {/* Horizontal scrollable tabs */}
          <div className="relative mb-8">
            <div
              ref={tabsContainerRef}
              className="flex overflow-x-auto scrollbar-hide gap-2 pb-4 bg-white shadow-lg rounded-xl p-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={() => setIsUserInteracting(true)}
              onMouseLeave={() => {
                setTimeout(() => setIsUserInteracting(false), 1000)
              }}
            >
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => handleTabClick(index)}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                    activeTab === index
                      ? "bg-[#1886CD] text-white shadow-md"
                      : "text-gray-600 hover:text-[#1886CD] hover:bg-[#1886CD]/10"
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    activeTab === index ? "bg-[#1886CD]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tab content */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#1886CD]/10 rounded-xl">
                  <ActiveFeatureIcon className="h-8 w-8 text-[#1886CD]" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{ActiveFeatureTitle}</CardTitle>
                  <CardDescription className="text-lg">{ActiveFeatureDescription}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {ActiveFeatureDetails.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#1886CD] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Standards Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Built on Industry Standards</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {standards.map((standard, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto p-4 bg-[#1886CD]/10 rounded-2xl w-fit">
                    <standard.icon className="h-10 w-10 text-[#1886CD]" />
                  </div>
                  <CardTitle className="text-xl">{standard.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{standard.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
