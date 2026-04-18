
export const SITE_KNOWLEDGE = {
  profile: {
    name: "Thanuka Ellepola",
    title: "AI Architect | Data Scientist",
    location: "Colombo, Sri Lanka",
    summary: "Architecting high-performance enterprise AI ecosystems and predictive platforms. Specialized in autonomous agents, generative AI, and full-stack development.",
    email: "thanuka.ellepola@gmail.com",
    phone: "+94 77 670 5832",
    linkedin: "thanuka-ellepola",
    github: "Thanuka9"
  },
  projects: [
    {
      title: "AI Job Hunter",
      role: "Lead AI Engineer & Architect",
      summary: "Autonomous system reducing application time by 90% through intelligent filtering and RAG-based personalization using LangChain and Gemini 3.1.",
      tags: ["LangChain", "Gemini 3.1", "FAISS", "Playwright", "RAG", "Python"]
    },
    {
      title: "Predictive Analytics for Healthcare Payment Forecasting",
      role: "Lead Data Scientist / Researcher",
      summary: "ML framework for RCM achieves R² > 0.90 for financial prioritization using Random Forest and Neural Networks.",
      tags: ["Scikit-learn", "Neural Networks", "Pandas", "Healthcare RCM", "Statistical Modeling"]
    },
    {
      title: "RevOps AI",
      role: "System Architect & Full Stack Developer",
      summary: "B2B SaaS with Autonomous Agent Architecture (CEO, Eng, ML Pods) for healthcare data auditing.",
      tags: ["FastAPI", "React", "Scikit-learn", "Docker", "GCP", "Agentic AI"]
    },
    {
      title: "Collective Intranet",
      role: "Full Stack Architect & Main Developer",
      summary: "Secure hybrid SQL/NoSQL platform centralizing onboarding, training, and performance tracking.",
      tags: ["Flask", "PostgreSQL", "MongoDB", "Redis", "Azure", "CI/CD"]
    },
    {
      title: "CareerForge AI 3.0",
      role: "Full Stack AI Engineer",
      summary: "Multi-agent career OS featuring low-latency voice AI via Gemini 3.1 Live API.",
      tags: ["React 19", "Gemini 3.1 Live API", "Web Audio API", "Google Search Grounding"]
    },
    {
      title: "ReviewRadar AI",
      role: "AI & Data Engineer",
      summary: "End-to-end sentiment intelligence platform processing 7M+ reviews with ensemble ML models.",
      tags: ["Python", "XGBoost", "PostgreSQL", "ETL", "VADER", "spaCy"]
    }
  ],
  experience: [
    {
      role: "Assistant Manager & Lead Architect",
      company: "Collective RCM (Pvt) Ltd",
      period: "2019 – Present",
      focus: "Enterprise Architecture, Digital Transformation, and Strategic Leadership in Healthcare RCM."
    },
    {
      role: "Independent Full Stack & AI Developer",
      company: "Technical Project Portfolio",
      period: "Ongoing",
      focus: "Advanced AI systems, RAG Innovation, and Scientific Research."
    }
  ],
  education: [
    {
      degree: "Master of Business Analytics",
      institution: "University of Colombo",
      period: "2023 – 2025 (Expected)",
      focus: "Predictive analytics, ML, and business intelligence."
    },
    {
      degree: "Bachelor of Computer Systems & Networking",
      institution: "Greenwich University",
      period: "2019 – 2021",
      focus: "Computer networks, systems administration, and software development."
    }
  ],
  skills: [
    "Gemini 3.1 (Pro/Flash/Live API)", "LangChain", "RAG & Vector DB (FAISS)", "Scikit-learn", "Neural Networks", "FastAPI", "Next.js", "Azure", "GCP", "Docker", "Playwright"
  ],
  services: {
    aiAutonomousSystems: {
      title: "AI & Autonomous Systems",
      tagline: "Architecting the next generation of business logic using multi-agent systems and real-time intelligence.",
      scope: [
        "Custom Autonomous Agent Architectures (CEO, Eng, & ML Pod pods)",
        "LangChain-orchestrated RAG Pipelines with FAISS Vector Search",
        "Low-latency Voice AI Simulations (Gemini Live API)",
        "Real-time Market Intelligence & Google Search Grounding",
        "Automated Discovery Engines with RAG-driven Personalization",
        "Agentic Auditing for identifying operational bottlenecks"
      ]
    },
    fullStackEnterprise: {
      title: "Full-Stack Enterprise Development",
      tagline: "Building resilient, high-performance platforms that scale with your operational complexity.",
      scope: [
        "Developed a full-stack web application using Flask, SQL, HTML, CSS, and JavaScript for internal enterprise operations",
        "Implemented authentication (2FA), role-based access control, and performance dashboards",
        "Designed backend APIs and optimized database architecture for scalability",
        "Integrated structured data storage using MySQL/PostgreSQL",
        "Managed high-availability hosting and automated CI/CD pipelines (GitHub Actions) for Azure/GCP"
      ]
    }
  }
};

export type KnowledgeBase = typeof SITE_KNOWLEDGE;
