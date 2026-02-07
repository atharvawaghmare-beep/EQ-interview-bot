
import { MessageCircle, Code, Database, Brain, Users, Terminal } from "lucide-react";

export const ROLES = [
  {
    id: "software-dev",
    title: "Software Developer",
    icon: Code,
    description: "System design, algorithms, and full-stack development.",
    questions: [
      "Can you explain the difference between REST and GraphQL?",
      "How do you handle state management in complex React applications?",
      "Describe a challenging bug you fixed and your approach."
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: Database,
    description: "Statistical analysis, machine learning models, and data viz.",
    questions: [
      "Explain the bias-variance tradeoff.",
      "How do you handle missing data in a dataset?",
      "What is the difference between supervised and unsupervised learning?"
    ]
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    icon: Brain,
    description: "Model deployment, pipelines, and deep learning architectures.",
    questions: [
      "How would you optimize a transformer model for inference?",
      "Explain the vanishing gradient problem.",
      "What metrics do you use to evaluate a classification model?"
    ]
  },
  {
    id: "hr-round",
    title: "HR Round",
    icon: Users,
    description: "Behavioral questions, culture fit, and soft skills.",
    questions: [
      "Tell me about a time you had a conflict with a coworker.",
      "Where do you see yourself in 5 years?",
      "Why do you want to work for this company?"
    ]
  },
  {
    id: "aptitude",
    title: "Aptitude",
    icon: Terminal,
    description: "Logical reasoning, puzzles, and problem-solving speed.",
    questions: [
      "If you have a 3-gallon jug and a 5-gallon jug, how do you measure 4 gallons?",
      "The day before yesterday was three days after Saturday. What day is it today?",
      "Estimate the number of piano tuners in Chicago."
    ]
  }
];

export const MOCK_PERFORMANCE_DATA = [
  { name: 'Jan', score: 65, confidence: 60 },
  { name: 'Feb', score: 72, confidence: 65 },
  { name: 'Mar', score: 68, confidence: 62 },
  { name: 'Apr', score: 85, confidence: 78 },
  { name: 'May', score: 82, confidence: 80 },
  { name: 'Jun', score: 91, confidence: 88 },
];

export const SKILL_radar_DATA = [
  { subject: 'Technical', A: 120, fullMark: 150 },
  { subject: 'Communication', A: 98, fullMark: 150 },
  { subject: 'Confidence', A: 86, fullMark: 150 },
  { subject: 'Problem Solving', A: 99, fullMark: 150 },
  { subject: 'Cultural Fit', A: 85, fullMark: 150 },
  { subject: 'Clarity', A: 65, fullMark: 150 },
];
