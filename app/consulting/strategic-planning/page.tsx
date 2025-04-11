"use client"

import ProgramDetailTemplate from "@/app/program-detail-template"

export default function StrategicPlanningPage() {
  const programData = {
    title: "Strategic Planning Consulting",
    category: "Consulting",
    description:
      "Expert guidance to develop comprehensive strategic plans aligned with your organizational goals and vision.",
    longDescription: [
      "Our Strategic Planning Consulting service provides expert guidance to help organizations develop comprehensive strategic plans that are aligned with their goals and vision. We work closely with leadership teams to create actionable strategies that drive sustainable growth and competitive advantage.",
      "Our consultants bring extensive experience across various industries and use proven methodologies to facilitate the strategic planning process. We begin with a thorough assessment of your current situation, including market analysis, competitive positioning, and internal capabilities. Based on this assessment, we help you define clear strategic objectives and develop detailed action plans to achieve them.",
      "Throughout the engagement, we emphasize practical implementation and measurable outcomes. Our approach ensures that strategic plans are not just documents but living frameworks that guide decision-making and resource allocation. We also provide tools and processes for monitoring progress and making adjustments as needed.",
    ],
    keyTopics: [
      "Comprehensive organizational assessment",
      "Market and competitive analysis",
      "Vision and mission refinement",
      "Strategic objective setting",
      "Action planning and resource allocation",
      "Implementation roadmap development",
      "Performance measurement framework",
      "Strategy review and adjustment processes",
    ],
    learningOutcomes: [
      "Develop a clear and compelling organizational vision and mission",
      "Create a comprehensive strategic plan aligned with organizational goals",
      "Identify strategic priorities and resource requirements",
      "Establish measurable objectives and key performance indicators",
      "Implement effective monitoring and evaluation mechanisms",
      "Build organizational capacity for strategic thinking and execution",
      "Enhance ability to adapt strategies in response to changing conditions",
    ],
    duration: "4-8 Weeks (Customizable)",
    date: "Available Year-Round",
    location: "On-site or Virtual",
    trainer: "Senior Consulting Team",
    price: "Custom Quote",
    image: "/placeholder.svg?height=600&width=800",
  }

  return <ProgramDetailTemplate {...programData} />
}
