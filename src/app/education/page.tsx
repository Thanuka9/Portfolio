
import React from 'react';
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education & Academic Background',
  description: 'Explore the academic qualifications of Thanuka Ellepola, including a Master of Business Analytics from the University of Colombo and a Bachelor of Computer Systems & Networking.',
}

const education = [
  {
    degree: "Master of Business Analytics",
    institution: "University of Colombo",
    period: "2023 – 2025 (Expected)",
    description: "Focus on predictive analytics, machine learning, business intelligence, and real-world applications in healthcare finance. Thesis on 'Predictive Analytics for Payment Prediction in RCM' involved developing and comparing ML models.",
  },
  {
    degree: "Bachelor of Computer Systems & Networking",
    institution: "Greenwich University",
    period: "2019 – 2021",
    description: "Emphasis on computer networks, programming, and systems administration. Gained strong foundations in database management, software development, and networking protocols.",
  },
  {
    degree: "Advanced Diploma in Telecommunication System & Digital Networking",
    institution: "City & Guilds",
    period: "2017 – 2018",
    description: "Specialized in digital networking, telecom systems, and network troubleshooting.",
  },
  {
    degree: "G.C.E. Advanced & Ordinary Levels",
    institution: "School Qualification",
    period: "2011 & 2014",
    description: "Completed secondary education with G.C.E. Advanced Level in 2014 and Ordinary Level in 2011.",
  }
];


export default function EducationPage() {
  return (
    <div className="space-y-20 pb-20 animate-reveal">
      <header className="space-y-6 text-center flex flex-col items-center">
        <h1 className="text-3xl lg:text-7xl font-black font-headline tracking-tighter leading-none">
          Academic <span className="text-primary italic">Foundation.</span>
        </h1>
        <p className="text-2xl text-muted-foreground/80 max-w-3xl font-medium leading-relaxed">
          Bridging the gap between theory and practical impact through rigorous academic and technical qualification.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {education.map((edu, index) => (
          <div 
            key={edu.degree} 
            className="group relative p-1 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/30 transition-all duration-700 animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="bg-background/40 backdrop-blur-3xl rounded-[2.9rem] p-8 lg:p-12 h-full flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center shrink-0 border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl">
                <GraduationCap size={32} />
              </div>
              
              <div className="space-y-4 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h2 className="text-2xl lg:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{edu.degree}</h2>
                  <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 self-start md:self-auto">
                    {edu.period}
                  </span>
                </div>
                <p className="text-primary font-bold text-lg">{edu.institution}</p>
                <p className="text-muted-foreground leading-relaxed font-medium text-lg max-w-4xl">{edu.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
