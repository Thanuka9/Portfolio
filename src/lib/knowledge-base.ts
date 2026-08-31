
export const SITE_KNOWLEDGE = {
  profile: {
    name: "Thanuka Ellepola",
    title: "Data Scientist at Central Bank of Sri Lanka",
    location: "Colombo, Sri Lanka",
    summary: "Data Scientist at the Central Bank of Sri Lanka with a background in data science, AI, analytics, and full-stack engineering.",
    email: "thanuka.ellepola@gmail.com",
    phone: "+94 77 670 5832",
    linkedin: "thanuka-ellepola",
    github: "Thanuka9"
  },
  projects: [],
  experience: [
    {
      role: "Data Scientist",
      company: "Central Bank of Sri Lanka",
      period: "Aug 2026 – Present",
      focus: "",
      confidential: true
    },
    {
      role: "Assistant Manager - Operations",
      company: "Collective RCM (Pvt) Ltd",
      period: "2019 – Aug 2026",
      focus: "Enterprise Architecture, Digital Transformation, and Strategic Leadership in Healthcare RCM."
    }
  ],
  education: [
    {
      degree: "Master of Business Analytics",
      institution: "University of Colombo",
      period: "2022 – 2025",
      focus: "Predictive analytics, ML, and business intelligence."
    },
    {
      degree: "Bachelor of Computer Systems & Networking",
      institution: "Greenwich University",
      period: "2019 – 2021",
      focus: "Computer networks, systems administration, and software development."
    }
  ],
  certifications: [
    {
      name: "Kapruka Agent Challenge 2026 — Builder (Certificate of Participation)",
      institution: "Kapruka Holdings PLC",
      year: "2026"
    },
    {
      name: "Google Data Analytics Professional Certificate",
      institution: "Google / Coursera",
      year: "2026"
    },
    {
      name: "Game Theory",
      institution: "Stanford University / Coursera",
      year: "2026"
    },
    {
      name: "CCNA (Cisco Certified Network Associate)",
      institution: "Cisco",
      year: "2023"
    }
  ],
  publications: [
    {
      title: "Machine Learning for Future Payment Prediction in Healthcare Revenue Cycle Management",
      summary: "A research paper on predicting future payments using machine learning models with healthcare RCM data."
    }
  ],
  skills: [
    "Python", "C", "HTML & PHP", "Java & JS", "React", "CSS", "Next.js", "Flask", "Laravel", "Tailwind CSS",
    "Gemini", "LangChain", "RAG & Vector DB", "Scikit-learn", "Neural Networks", "FastAPI", "Azure", "GCP", "Docker", "Playwright"
  ],
  services: {
    aiAutonomousSystems: {
      title: "AI & Autonomous Systems",
      tagline: "Technical expertise in AI systems and intelligent automation.",
      scope: [
        "Autonomous Agent Architectures",
        "RAG Pipelines and Vector Search",
        "Voice AI",
        "Search Grounding",
        "Intelligent Automation"
      ]
    },
    fullStackEnterprise: {
      title: "Full-Stack Enterprise Development",
      tagline: "Technical expertise in scalable application and platform engineering.",
      scope: [
        "Full-stack web development",
        "Authentication and role-based access control",
        "Backend APIs and database architecture",
        "SQL and PostgreSQL",
        "Cloud deployment and CI/CD"
      ]
    }
  }
};

export type KnowledgeBase = typeof SITE_KNOWLEDGE;