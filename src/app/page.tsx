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
  TrendingUp,
  Quote,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Data Science & AI Consulting | Thanuka Ellepola',
  description: 'Specialized consulting in AI Engineering, Full-Stack Development, and Healthcare Analytics. Helping businesses bridge the gap between complex data and actionable insights.',
}

const testimonials = [
  {
    quote: "Thanuka's ability to translate complex RCM data into predictive models transformed how we view our revenue flow. His technical leadership reduced our manual audit efforts by 40%.",
    author: "Senior Executive",
    company: "Collective RCM (Pvt) Ltd"
  },
  {
    quote: "A rare talent who understands both the deep mathematics of AI and the practicalities of full-stack engineering. He delivers systems that actually solve business bottlenecks.",
    author: "Technical Collaborator",
    company: "AI Innovation Lab"
  }
];

const valueProps = [
  {
    icon: Zap,
    title: "Strategic AI Implementation",
    description: "I don't just build models; I design autonomous systems that solve real-world operational bottlenecks, from talent acquisition to revenue forecasting."
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Decisions",
    description: "Leveraging predictive analytics with R² > 0.90 to transform raw healthcare data into actionable financial insights and improved cash flow."
  },
  {
    icon: Code,
    title: "Enterprise Architecture",
    description: "Building secure, scalable hybrid SQL/NoSQL platforms designed for production environments and complex business logic."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section id="hero" className="space-y-6 pt-8">
        <h1 className="text-4xl lg:text-6xl font-bold font-headline text-primary leading-tight">
          Turning Complex Business Challenges into <span className="text-accent">Intelligent Solutions.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          I am a Data Scientist and AI Engineer who helps organizations reduce inefficiencies and drive growth through autonomous systems, predictive analytics, and high-performance engineering.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
            <Link href="/contact">Book a Strategy Call</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold px-8">
            <Link href="/projects">View Case Studies</Link>
          </Button>
        </div>
      </section>

      <section id="value-propositions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop) => (
            <div key={prop.title} className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <prop.icon size={24} />
              </div>
              <h3 className="text-xl font-bold">{prop.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about">
        <Card className="border-none bg-secondary/50 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><Sparkles className="text-accent" /> My Approach</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                With over five years of experience at the intersection of healthcare operations and technology, I bridge the gap between business needs and modern AI.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As Assistant Manager at Collective RCM, I led digital transformation initiatives that fundamentally improved system efficiency. I believe in **People-First technology**—building systems that empower teams rather than replace them.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-lg mb-2">Why Work with Me?</h4>
              {[
                "Proven track record in Healthcare RCM & Analytics",
                "Expertise in Gemini 3.1 & Autonomous Agent Systems",
                "Full-stack proficiency (Python, React, SQL, NoSQL)",
                "Masters-level focus on Business Analytics"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="testimonials" className="py-12 border-y border-border/60">
        <h2 className="text-3xl font-bold font-headline mb-12 text-center italic text-primary">What Stakeholders Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="space-y-6 relative">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/10 -z-10" />
              <p className="text-lg italic leading-relaxed text-muted-foreground">"{t.quote}"</p>
              <div>
                <p className="font-bold text-primary">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="text-center py-20 space-y-8 bg-primary/5 rounded-3xl">
        <h2 className="text-4xl font-bold font-headline">Ready to solve your next big data challenge?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Whether you need a custom AI agent, a predictive analytics dashboard, or a full-stack platform, I'm here to help.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 px-10 rounded-full">
          <Link href="/contact">Let's Discuss Your Project <ArrowRight className="ml-2" /></Link>
        </Button>
      </section>
    </div>
  );
}
