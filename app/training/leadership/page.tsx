"use client"

import ProgramDetailTemplate from "@/app/program-detail-template"

export default function LeadershipTrainingPage() {
  const programData = {
    title: "Leadership Development Program",
    category: "Training",
    description:
      "Comprehensive leadership training designed to develop effective leaders at all organizational levels.",
    longDescription: [
      "The Leadership Development Program is a comprehensive training initiative designed to develop effective leaders at all organizational levels. This program provides participants with the knowledge, skills, and tools needed to lead teams successfully and drive organizational performance.",
      "Through a combination of interactive workshops, case studies, role-playing exercises, and personalized feedback, participants will develop a deeper understanding of leadership principles and practices. The program covers various aspects of leadership, including communication, motivation, delegation, conflict resolution, and team building.",
      "This program is suitable for emerging leaders, middle managers, and senior executives looking to enhance their leadership capabilities. Participants will have the opportunity to assess their leadership styles, identify areas for improvement, and develop personalized action plans for continued growth.",
    ],
    keyTopics: [
      "Leadership styles and their application in different contexts",
      "Effective communication and active listening",
      "Building and leading high-performing teams",
      "Motivation and employee engagement strategies",
      "Delegation and empowerment techniques",
      "Conflict resolution and negotiation skills",
      "Change management and leading through uncertainty",
      "Emotional intelligence in leadership",
    ],
    learningOutcomes: [
      "Identify and leverage your personal leadership style",
      "Enhance communication skills to effectively convey vision and expectations",
      "Develop strategies for building and maintaining high-performing teams",
      "Improve ability to motivate and engage team members",
      "Strengthen skills in delegation, feedback, and performance management",
      "Develop approaches for managing conflict and fostering collaboration",
      "Create a personal leadership development plan",
    ],
    duration: "5 Days (9:00 AM - 4:00 PM)",
    date: "July 10-14, 2025",
    location: "Kigali, Rwanda",
    trainer: "Emily Nguyen",
    price: "$1,800",
    image: "/placeholder.svg?height=600&width=800",
  }

  return <ProgramDetailTemplate {...programData} />
}
