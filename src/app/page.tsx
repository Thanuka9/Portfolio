
"use client";

import React from 'react';
import Link from "next/link";
import { 
  ArrowRight, 
  Bot, 
  Code, 
  Database, 
  CheckCircle2, 
  Quote, 
  Target, 
  Zap,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
  BrainCircuit
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    title: "AI & Autonomous Agents",
    description: "Architecting multi-agent systems and RAG pipelines that reason, execute, and scale with enterprise-grade reliability.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Database,
    title: "Intelligence & Analytics",
    description: "Engineering predictive kernels and ML pipelines with R² > 0.90 accuracy, turning fragmented data into strategic foresight.",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Code,
    title: "Enterprise Solutions",
    description: "Designing high-security, full-stack platforms with hybrid SQL/NoSQL architectures and low-latency performance.",
    gradient: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-32 pb-32 overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col justify-center items-center min-h-[85vh] py-12 lg:py-24 text-center">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        
        <div className="space-y-12 relative z-10 w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel text-primary text-sm font-bold tracking-wider uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Strategic AI & Engineering Projects
          </motion.div>
          
          <div className="space-y-8 w-full">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-8xl font-black font-headline tracking-tighter leading-[0.85] text-center"
            >
              <span className="text-gradient block">Architecting</span>
              <span className="text-foreground/90 block">Enterprise</span>
              <span className="text-foreground block relative inline-block mx-auto">
                Intelligence.
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-1 left-0 h-1.5 bg-primary/20 -z-10 rounded-full"
                />
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8 flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-primary font-black uppercase tracking-[0.2em] text-xs md:text-sm">
                <span>AI Architect</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>Data Scientist</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>AI Engineer</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>Solutions Architect</span>
              </div>
              
              <p className="text-xl lg:text-2xl text-muted-foreground/80 max-w-3xl leading-relaxed font-medium mx-auto">
                Engineering high-performance intelligence for complex enterprise ecosystems. 
                I bridge the gap between cutting-edge AI research and mission-critical production systems.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full max-w-xl mx-auto"
          >
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 font-black h-16 rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-[0.98] text-lg">
              <Link href="/contact" className="flex items-center gap-3">
                Book a Strategy Call <Sparkles size={20} />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="flex-1 font-bold h-16 px-12 rounded-2xl border-2 border-primary/20 hover:bg-primary/10 transition-all group text-lg">
              <Link href="/projects" className="flex items-center gap-3">
                View Case Studies <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlights Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Predictive Accuracy", value: "90%", suffix: "+", icon: TrendingUp },
          { label: "Manual Effort Reduction", value: "40%", suffix: "+", icon: Zap },
          { label: "Data Points Processed", value: "7M", suffix: "+", icon: Database },
          { label: "Successful Projects", value: "15", suffix: "+", icon: Layers },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-[2rem] text-center space-y-2 hover:bg-primary/5 transition-colors border-primary/10"
          >
            <div className="flex justify-center mb-4">
               <stat.icon size={28} className="text-primary/60" />
            </div>
            <div className="text-3xl md:text-4xl font-black font-headline text-primary">{stat.value}{stat.suffix}</div>
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, i) => (
          <motion.div 
            key={pillar.title} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative p-10 rounded-[3rem] glass-panel transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 cursor-default"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]`} />
            <div className="w-20 h-20 glass-panel rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-10 border-primary/10 group-hover:scale-110">
              <pillar.icon size={40} />
            </div>
            <h3 className="text-2xl font-black font-headline mb-6 group-hover:text-primary transition-colors leading-tight">{pillar.title}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/90 transition-colors">{pillar.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Strategic Approach */}
      <section id="about">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative p-1 lg:p-2 rounded-[4rem] bg-gradient-to-br from-primary/30 via-primary/5 to-transparent shadow-2xl"
        >
          <Card className="border-none bg-background/60 backdrop-blur-3xl rounded-[3.8rem] overflow-hidden">
            <CardHeader className="p-12 lg:p-20 pb-0">
              <CardTitle className="text-2xl lg:text-4xl font-black font-headline flex items-center gap-6 tracking-tighter">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Target size={36} />
                </div>
                The Strategic Edge
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 lg:p-20 pt-10 grid lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
                  With over five years of leadership at the intersection of Healthcare and Technology, 
                  I don't just solve technical problems—I architect systems that redefine operational efficiency.
                </p>
                <div className="p-10 rounded-[2.5rem] bg-primary/5 border-2 border-primary/10 space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <BrainCircuit size={100} />
                  </div>
                  <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Signature Achievement</h4>
                  <p className="text-2xl leading-relaxed italic font-bold text-foreground">
                    "Engineered AI-driven forecasting kernels achieving R² &gt; 0.90, effectively reducing manual audit overhead by 40% across enterprise workflows."
                  </p>
                  <p className="text-base font-black opacity-60 tracking-tight">— Assistant Manager @ Collective RCM</p>
                </div>
              </div>
              <div className="space-y-8">
                <h4 className="font-black font-headline text-3xl mb-10 tracking-tight">Core Competencies</h4>
                {[
                  { label: "Autonomous AI Architectures", icon: Bot },
                  { label: "Predictive Analytics (RCM/Healthcare)", icon: TrendingUp },
                  { label: "Enterprise Full-Stack Ecosystems", icon: Layers },
                  { label: "Multi-Agent System Orchestration", icon: Cpu },
                  { label: "Mission-Critical Security & 2FA", icon: ShieldCheck }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.label} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 group cursor-default"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:rotate-12 transition-all duration-300">
                      <item.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="font-bold text-xl md:text-2xl text-muted-foreground group-hover:text-foreground transition-colors tracking-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="text-center space-y-6 mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-black font-headline tracking-tighter"
          >
            Verified <span className="text-primary italic">Impact</span>
          </motion.h2>
          <p className="text-xl text-muted-foreground font-medium uppercase tracking-widest">Feedback from the industry</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="glass-panel p-8 lg:p-12 rounded-[3rem] relative group hover:scale-[1.02] transition-all duration-500 hover:shadow-primary/5"
            >
              <div className="absolute top-0 right-0 p-10">
                <Quote size={100} className="text-primary/5 -rotate-12 transition-all group-hover:rotate-0 group-hover:text-primary/10" />
              </div>
              <p className="text-xl md:text-2xl italic leading-relaxed text-foreground/90 font-medium mb-12 relative z-10 font-headline">"{t.quote}"</p>
              <div className="flex items-center gap-6 pt-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-black text-2xl text-primary border-2 border-primary/10 shadow-inner group-hover:scale-110 transition-transform">
                  {t.author[0]}
                </div>
                <div>
                  <p className="font-black text-xl font-headline tracking-tight">{t.author}</p>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group p-1 lg:p-1.5 rounded-[3rem] bg-gradient-to-br from-primary via-primary/40 to-primary shadow-3xl"
        >
          <div className="bg-background/95 backdrop-blur-3xl rounded-[2.9rem] py-16 lg:py-24 px-8 text-center space-y-10 overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[180px] rounded-full pointer-events-none -z-10" />
            
            <header className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-black font-headline tracking-tighter leading-[0.9]">
                Ready to <span className="text-primary italic">Engineer</span> <br /> the Future?
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
                From autonomous AI pods to enterprise-scale platforms—let's build something that moves the needle.
              </p>
            </header>
            
            <div className="flex justify-center pt-8">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-black h-16 px-10 rounded-2xl shadow-3xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xl">
                <Link href="/contact" className="flex items-center gap-3">
                  Book Strategy <ArrowRight size={24} />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
