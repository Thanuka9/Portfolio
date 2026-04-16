
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
  Sparkles,
  Target,
  FlaskConical,
  Bot,
  Database,
  Cpu
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

const pillars = [
  {
    icon: Bot,
    title: "AI Engineering",
    description: "Building autonomous agent architectures and RAG pipelines that reason and execute complex tasks."
  },
  {
    icon: Code,
    title: "Full-Stack Dev",
    description: "Architecting scalable enterprise platforms with modern React 19, Next.js, and hybrid DB systems."
  },
  {
    icon: Database,
    title: "Data & ML",
    description: "Transforming raw data into predictive assets with statistical accuracy and automated ETL pipelines."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-24 animate-reveal">
      <section id="hero" className="space-y-8 pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold animate-slide-up">
          <Sparkles size={16} /> 
          <span>Available for New Projects</span>
        </div>
        <h1 className="text-4xl lg:text-7xl font-bold font-headline text-primary leading-[1.1] tracking-tight animate-slide-up [animation-delay:100ms]">
          Architecting <span className="text-accent">Intelligent</span> Systems for Modern Enterprises.
        </h1>
        <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed animate-slide-up [animation-delay:200ms]">
          I bridge the gap between complex business challenges and high-performance solutions through AI engineering, predictive analytics, and enterprise full-stack development.
        </p>
        <div className="flex flex-wrap gap-4 pt-6 animate-slide-up [animation-delay:300ms]">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95">
            <Link href="/contact">Book a Strategy Call</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bold h-14 px-8 rounded-xl border-border hover:bg-secondary transition-all">
            <Link href="/projects">View Case Studies</Link>
          </Button>
        </div>
      </section>

      <section id="pillars" className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12">
        {pillars.map((pillar, i) => (
          <div key={pillar.title} className="space-y-4 group animate-slide-up" style={{ animationDelay: `${400 + (i * 100)}ms` }}>
            <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
              <pillar.icon size={28} />
            </div>
            <h3 className="text-2xl font-bold">{pillar.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
          </div>
        ))}
      </section>

      <section id="about" className="animate-slide-up [animation-delay:800ms]">
        <Card className="border-none bg-secondary/30 shadow-none rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8 lg:p-12 pb-0">
            <CardTitle className="text-3xl font-headline flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                <Target size={20} />
              </div>
              My Strategic Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 lg:p-12 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over five years of experience leading digital transformation in high-stakes healthcare environments, I don't just write code—I design systems that solve operational bottlenecks.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As Assistant Manager at Collective RCM, I pioneered architectures that reduced manual effort by 40% and achieved R² > 0.90 in financial forecasting. I believe in <strong>results-first engineering</strong>.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-xl mb-4">Core Value Proposition</h4>
              {[
                "Autonomous Agent Architectures (Gemini 3.1)",
                "Predictive RCM & Healthcare Analytics",
                "Scalable Hybrid Database Systems (SQL + NoSQL)",
                "Full-Lifecycle Enterprise Product Strategy"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-muted-foreground group">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                    <CheckCircle2 size={14} className="text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="testimonials" className="py-20 border-y border-border/60 animate-slide-up [animation-delay:900ms]">
        <h2 className="text-3xl font-bold font-headline mb-16 text-center italic text-primary">Trusted by Enterprise Stakeholders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {testimonials.map((t, i) => (
            <div key={i} className="space-y-8 relative">
              <Quote className="absolute -top-10 -left-6 w-20 h-20 text-accent/10 -z-10" />
              <p className="text-xl italic leading-relaxed text-muted-foreground">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-accent">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-bold text-primary">{t.author}</p>
                  <p className="text-sm text-accent font-semibold">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="text-center py-20 lg:py-32 space-y-10 bg-accent rounded-[3rem] text-accent-foreground shadow-2xl animate-slide-up [animation-delay:1000ms]">
        <h2 className="text-4xl lg:text-6xl font-bold font-headline max-w-4xl mx-auto leading-tight">Ready to solve your next big data bottleneck?</h2>
        <p className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto">
          From custom AI agents to enterprise dashboards, let's build something significant together.
        </p>
        <div className="flex justify-center pt-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-16 px-12 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
            <Link href="/contact">
              Book a Strategy Call <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
