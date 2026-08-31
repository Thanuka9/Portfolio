
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
  projects: [
    {
      title: "AI Job Hunter",
      role: "Lead AI Engineer & Architect",
      summary: "Autonomous system reducing application time through intelligent filtering and RAG-based personalization using LangChain and Gemini.",
      tags: ["LangChain", "Gemini", "FAISS", "Playwright", "RAG", "Python"]
    },
    {
      title: "Predictive Analytics for Healthcare Payment Forecasting",
      role: "Lead Data Scientist / Researcher",
      summary: "Machine-learning framework for healthcare RCM payment forecasting using Random Forest and Neural Networks.",
      tags: ["Scikit-learn", "Neural Networks", "Pandas", "Healthcare RCM", "Statistical Modeling"]
    },
    {
      title: "RevOps AI",
      role: "System Architect & Full Stack Developer",
      summary: "B2B SaaS with an autonomous-agent architecture for healthcare data auditing.",
      tags: ["FastAPI", "React", "Scikit-learn", "Docker", "GCP", "Agentic AI"]
    },
    {
      title: "TrainIQ",
      role: "Full Stack Architect & Main Developer",
      summary: "Multi-tenant SaaS learning platform with courses, exams, AI-assisted features, billing, and an operations console.",
      tags: ["Flask", "PostgreSQL", "MongoDB", "Redis", "Ollama", "Stripe", "Docker", "CI/CD"]
    },
    {
      title: "CareerForge AI 3.0",
      role: "Full Stack AI Engineer",
      summary: "Multi-agent career platform featuring low-latency voice AI and real-time search grounding.",
      tags: ["React", "Gemini Live API", "Web Audio API", "Google Search Grounding"]
    },
    {
      title: "ReviewRadar AI",
      role: "AI & Data Engineer",
      summary: "End-to-end review intelligence platform with ETL, sentiment features, and machine-learning models.",
      tags: ["Python", "XGBoost", "PostgreSQL", "ETL", "VADER", "spaCy"]
    },
    {
      title: "Monday.com Data Auditor",
      role: "Full Stack Developer",
      summary: "Streamlit data-auditing application using Monday.com GraphQL data and CSV remediation exports.",
      tags: ["Python", "Streamlit", "Pandas", "Monday.com GraphQL"]
    },
    {
      title: "Kapruka Flow AI",
      role: "Solo Builder — Kapruka Agent Challenge 2026",
      summary: "Multilingual agentic commerce planner built on the Kapruka Model Context Protocol.",
      tags: ["FastAPI", "Next.js", "Model Context Protocol", "Agent Pipeline", "SQLite", "Vercel"]
    },
    {
      title: "Sustainable Vision",
      role: "Deep Learning Researcher",
      summary: "Multitask ResNet-50 for scene classification, attribute prediction, and carbon-emission estimation.",
      tags: ["PyTorch", "ResNet-50", "Multitask Learning", "Places365", "Transfer Learning", "Computer Vision"]
    }
  ],
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