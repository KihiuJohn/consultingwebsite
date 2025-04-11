"use client"

import ProgramDetailTemplate from "@/app/program-detail-template"

export default function StrategicLeadershipPage() {
  const programData = {
    title: "Strategic Leadership for Executives",
    category: "Executive Training",
    description:
      "Develop advanced strategic thinking capabilities and learn how to navigate complex business environments.",
    longDescription: [
      "The Strategic Leadership for Executives program is designed to equip senior leaders with the advanced strategic thinking capabilities needed to navigate today's complex and rapidly changing business landscape. This intensive program combines theoretical frameworks with practical applications to help executives develop a strategic mindset and enhance their leadership effectiveness.",
      "Throughout this program, participants will explore various strategic leadership models, analyze real-world case studies, and engage in interactive discussions and exercises. The program focuses on developing a comprehensive understanding of strategic thinking, decision-making, and implementation in the context of organizational leadership.",
      "Participants will learn how to identify emerging trends, assess competitive landscapes, and develop innovative strategies that drive sustainable growth and organizational success. The program also emphasizes the importance of aligning organizational culture, structure, and resources with strategic objectives.",
    ],
    keyTopics: [
      "Strategic thinking and analysis in complex environments",
      "Developing and communicating a compelling vision",
      "Strategic decision-making frameworks and processes",
      "Leading organizational change and transformation",
      "Building and leading high-performing executive teams",
      "Aligning organizational culture with strategic objectives",
      "Navigating global business challenges and opportunities",
      "Ethical considerations in strategic leadership",
    ],
    learningOutcomes: [
      "Develop advanced strategic thinking capabilities to navigate complex business environments",
      "Enhance ability to formulate and implement effective organizational strategies",
      "Strengthen decision-making skills in uncertain and ambiguous situations",
      "Improve capacity to lead organizational change and transformation initiatives",
      "Build skills in aligning teams and resources with strategic objectives",
      "Develop a personal leadership style that inspires and motivates others",
      "Create actionable strategic plans for your organization",
    ],
    duration: "3 Days (9:00 AM - 5:00 PM)",
    date: "June 15-17, 2025",
    location: "Nairobi, Kenya",
    trainer: "Dr. James Wilson",
    price: "$2,500",
    image: "/placeholder.svg?height=600&width=800",
  }

  return <ProgramDetailTemplate {...programData} />
}
