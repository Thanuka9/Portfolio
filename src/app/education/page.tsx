'use client';

import React from 'react';
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <div className="space-y-12 pb-16">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <GraduationCap size={36} /> Education
        </h1>
        <p className="mt-2 text-muted-foreground">My academic background and qualifications.</p>
      </header>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <Card 
            key={edu.degree} 
            className="opacity-0 animate-fade-in transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader>
              <CardTitle>{edu.degree}</CardTitle>
              <CardDescription>{edu.institution} &middot; {edu.period}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
