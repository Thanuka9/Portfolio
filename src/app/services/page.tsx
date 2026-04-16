import React from 'react';
import { Sparkles, BarChart3, Globe, BrainCircuit, Database, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export const metadata = {
  title: 'Services & Value Proposition',
  description: 'Specialized services in AI Engineering, Data Science, and Full Stack Development tailored for business growth.',
}

const services = [
  {
    title: "AI & Autonomous Systems",
    icon: BrainCircuit,
    benefits: [
      "Automate repetitive operational tasks with intelligent agents",
      "Implement low-latency voice AI for customer interactions",
      "Build RAG systems to query your private documentation instantly",
      "Deploy Gemini-powered architectures for complex reasoning"
    ],
    description: "Moving beyond basic automation to building systems that reason, decide, and execute."
  },
  {
    title: "Predictive Analytics & Data Science",
    icon: BarChart3,
    benefits: [
      "Forecast revenue and cash flow with statistical accuracy",
      "Identify operational bottlenecks using ML-driven auditing",
      "Perform sentiment analysis on millions of customer reviews",
      "Visualize complex data into actionable executive dashboards"
    ],
    description: "Transforming your historical data into a strategic roadmap for the future."
  },
  {
    title: "Enterprise Full-Stack Development",
    icon: Globe,
    benefits: [
      "Secure internal platforms for employee onboarding and training",
      "High-performance dashboards with real-time data visualization",
      "Hybrid SQL/NoSQL database architectures for complex data",
      "Robust CI/CD pipelines for zero-downtime deployments"
    ],
    description: "Scalable, secure, and user-centric applications built for professional environments."
  }
];

export default function ServicesPage() {
  return (
    <div className="space-y-16 pb-16">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Sparkles size={36} /> Services & Strategic Value
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          I provide specialized technical expertise designed to solve specific business problems. My work focuses on measurable impact, scalability, and security.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {services.map((service, index) => (
          <Card key={service.title} className="overflow-hidden border-none bg-secondary/30">
            <div className="grid md:grid-cols-3">
              <div className="p-8 bg-primary/5 flex flex-col justify-center items-center text-center">
                <service.icon size={48} className="text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              <div className="md:col-span-2 p-8 space-y-6">
                <h3 className="font-semibold text-lg">Key Benefits for Your Business:</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowRight size={12} className="text-accent" />
                      </div>
                      <span className="text-muted-foreground text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <section className="bg-primary/5 p-12 rounded-3xl text-center space-y-6">
        <h2 className="text-3xl font-bold font-headline">Not sure where to start?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Let's have a 15-minute consultation to identify your biggest technical bottleneck and discuss how AI or data automation can solve it.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full">
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </section>
    </div>
  );
}
