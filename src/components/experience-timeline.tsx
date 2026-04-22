'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, Cpu, Code, BrainCircuit, BarChart3, CloudCog, Building, Rocket, CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';

export function ExperienceTimeline() {
  const t = useTranslations('Experience');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100, damping: 20
  });

  // Helper to extract nested translations
  const renderExperience = (key: 'exp1' | 'exp2') => {
    const sections = ['s1', 's2'];
    return {
      role: t(`${key}.role`),
      company: t(`${key}.company`),
      period: t(`${key}.period`),
      sections: sections.map(s => {
        const detailsCount = s === 's1' ? (key === 'exp1' ? 4 : 5) : 3;
        const details = [];
        for (let i = 1; i <= detailsCount; i++) {
          try {
            const detail = t(`${key}.${s}.d${i}`);
            if (detail) details.push(detail);
          } catch (e) {}
        }
        return {
          title: t(`${key}.${s}.title`),
          details
        };
      })
    };
  };

  const experienceData = [renderExperience('exp1'), renderExperience('exp2')];

  const technicalSkills = [
    {
      category: "AI & Machine Learning",
      icon: BrainCircuit,
      skills: ["Gemini 3.1 Pro", "LangChain", "RAG & Vector DB (FAISS/Pinecone)", "Scikit-learn", "Natural Language Processing"],
    },
    {
      category: "Full Stack & Backend",
      icon: Code,
      skills: ["Python (FastAPI, Flask)", "TypeScript / React 19 / Next.js", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      category: "Cloud & Infrastructure",
      icon: CloudCog,
      skills: ["Microsoft Azure", "GCP", "Docker & Kubernetes", "Git / GitHub Actions", "CI/CD Pipelines"],
    },
    {
      category: "Tools & Intelligence",
      icon: BarChart3,
      skills: ["Power BI", "Mermaid.js / Plotly", "Streamlit", "VADER Sentiment", "Pandas / NumPy"],
    }
  ];

  return (
    <div className="space-y-20 pb-20" ref={containerRef}>
      <header className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-7xl font-black font-headline tracking-tighter"
        >
          {t('pageTitle')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed"
        >
          {t('pageSubtitle')}
        </motion.p>
      </header>

      <div className="relative space-y-16">
        <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-primary/5 hidden md:block">
          <motion.div 
            style={{ height: lineHeight }} 
            className="w-full bg-gradient-to-b from-primary via-indigo-500 to-emerald-500 shadow-[0_0_25px_rgba(138,43,226,0.6)] relative"
          >
             <motion.div 
               animate={{ opacity: [0.3, 0.6, 0.3] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute inset-0 bg-primary/40 blur-[4px]" 
             />
          </motion.div>
        </div>

        {experienceData.map((exp, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="relative pl-0 md:pl-20 group"
          >
            <motion.div 
              className="absolute left-0 top-6 w-16 h-16 rounded-2xl glass-panel hidden md:flex items-center justify-center text-primary border-primary/20 bg-background/50 backdrop-blur-3xl z-10 
              group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl"
            >
               {index === 0 ? <Building size={24} /> : <Rocket size={24} />}
            </motion.div>

            <div className="glass-panel p-8 lg:p-12 rounded-[2.5rem] transition-all duration-500 group-hover:border-primary/30 bg-background/40">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{exp.role}</h2>
                  <p className="text-primary font-bold text-sm bg-primary/10 inline-block px-3 py-1 rounded-full">{exp.company}</p>
                </div>
                <div className="px-5 py-2 rounded-full bg-secondary text-foreground text-[10px] font-black uppercase tracking-widest border border-border/50">
                  {exp.period}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {exp.sections.map((section, idx) => (
                  <div key={idx} className="space-y-6">
                    <h3 className="text-xl font-bold font-headline text-primary/80">{section.title}</h3>
                    <ul className="space-y-4">
                      {section.details.map((detail, i) => (
                        <li key={i} className="flex gap-4 group/item">
                          <CheckCircle2 size={18} className="text-primary shrink-0 mt-1 opacity-50" />
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed font-medium text-base">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="space-y-12 pt-20">
        <h2 className="text-4xl font-black font-headline tracking-tight flex items-center gap-4">
          <Cpu className="text-primary" />
          {t('stack')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="glass-panel p-8 rounded-[2.5rem] space-y-6 group hover:bg-primary/5 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg bg-secondary/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border border-border/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </div>
  );
}
