
'use client';

import React from 'react';
import Link from "next/link";
import {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  ArrowRight,
  Zap,
  Users,
  TrendingUp
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const navItems = [
  {
    href: '/experience',
    icon: Briefcase,
    title: 'Work Experience',
    description: 'Explore my professional journey and key roles.'
  },
  {
    href: '/projects',
    icon: Code,
    title: 'Projects',
    description: 'See a collection of my technical and academic work.'
  },
  {
    href: '/education',
    icon: GraduationCap,
    title: 'Education',
    description: 'View my academic background and qualifications.'
  },
  {
    href: '/contact',
    icon: Mail,
    title: 'Contact Me',
    description: 'Get in touch for collaborations or inquiries.'
  }
];

const competencies = [
  {
    icon: Zap,
    title: "Technical Excellence",
    points: [
      "Advanced proficiency in Python and machine learning frameworks",
      "Exceptional database design and optimization skills",
      "Strong full-stack development capabilities",
      "Innovative approach to problem-solving"
    ]
  },
  {
    icon: Users,
    title: "Leadership & Communication",
    points: [
      "Effective team leadership and project management",
      "Clear communication of technical concepts to stakeholders",
      "Mentoring and training team members",
      "Strategic thinking and business acumen"
    ]
  },
  {
    icon: TrendingUp,
    title: "Professional Impact",
    points: [
      "Delivered measurable improvements in system efficiency",
      "Led successful digital transformation initiatives",
      "Contributed to academic research and publications",
      "Built scalable solutions for enterprise environments"
    ]
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section id="about">
        <Card className="opacity-0 animate-fade-in" style={{ animationDelay: '150ms' }}>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><Briefcase /> About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              I’m Thanuka Ellepola, an analytical and results-driven professional with over five years of experience at the intersection of healthcare operations, data science, and technology. As Assistant Manager at Collective RCM (Pvt) Ltd, I have played a pivotal role in leading teams, driving efficiency initiatives, and delivering high-impact solutions to real-world challenges in healthcare revenue cycle management.

              Beyond my management responsibilities, I’ve proactively designed and developed full-stack platforms—including the company’s internal intranet and analytics dashboard—leveraging my technical expertise in Python, SQL, Power BI, and modern web frameworks. I’m passionate about using data to drive smarter decision-making, and my work often blends hands-on coding, advanced analytics, and process improvement.

              My academic foundation includes a Master’s in Business Analytics (University of Colombo) and a Bachelor’s in Computer Systems & Networking. I recently completed a research project on predictive analytics for healthcare payment forecasting, utilizing statistical and machine learning models to deliver actionable insights.

              Whether it’s architecting data-driven solutions, building and deploying AI models, or mentoring teams, I thrive in roles that combine leadership, innovation, and continuous learning. My goal is to bridge the gap between business needs and modern technology—creating lasting, positive impact for organizations and their people.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="core-competencies">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>Core Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competencies.map((item, index) => (
            <Card 
              key={item.title} 
              className="opacity-0 animate-fade-in h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${300 + (index + 1) * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 list-inside">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">&#8226;</span>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section id="navigation-grid" className="pb-16">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center opacity-0 animate-fade-in" style={{ animationDelay: '450ms' }}>Explore My Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {navItems.map((item, index) => (
            <Link 
              href={item.href} 
              key={item.title} 
              className="group block opacity-0 animate-fade-in"
              style={{ animationDelay: `${450 + (index + 1) * 150}ms` }}
            >
              <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <item.icon className="w-8 h-8 text-primary" />
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
