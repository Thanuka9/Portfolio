'use client';

import React from 'react';
import Link from "next/link";
import {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  ArrowRight
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

export default function HomePage() {
  const [year, setYear] = React.useState<number | string>('');

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="space-y-16">
      <section id="about">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><Briefcase /> About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              I’m Thanuka Ellepola, a passionate Data Scientist and Full Stack Developer with over five years of hands-on experience at the intersection of healthcare, business analytics, and technology. My journey has been defined by a drive to bridge the gap between operational needs and modern data solutions—leading teams, building full-stack platforms, and turning complex data into actionable insights.

              Currently, I serve as Assistant Manager and technical lead at Collective RCM (Pvt) Ltd, where I’ve architected and developed the company’s internal intranet and analytics dashboard, driving efficiency, transparency, and smarter decision-making across the organization. My work combines end-to-end technical expertise (Python, SQL, Power BI, modern web frameworks) with deep domain knowledge in healthcare revenue cycle management.

              My academic background includes a Master’s in Business Analytics (University of Colombo) and a Bachelor’s in Computer Systems & Networking, giving me a strong foundation in both business and technology. I’ve completed a thesis on predictive analytics for payment forecasting in healthcare, and I regularly build and deploy AI models—from GPT-powered assistants to chess and crypto prediction bots.

              Whether it’s solving operational bottlenecks with code, delivering data-driven strategy, or pioneering automation, I thrive on challenges that blend leadership, innovation, and continuous learning. I believe in using data and technology not just for efficiency, but to create lasting impact for people and organizations.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <section id="navigation-grid">
        <h2 className="text-2xl font-bold font-headline mb-6">Explore My Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {navItems.map((item) => (
            <Link href={item.href} key={item.title} className="group block">
              <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-lg">
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

      <footer className="text-center text-sm text-muted-foreground pt-8">
        <p>&copy; {year} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}
