
"use client";

import React from 'react';
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
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

import MagneticWrapper from '@/components/magnetic-wrapper';

export default function HomePage() {
  const tH = useTranslations('Hero');
  const tS = useTranslations('Stats');
  const tP = useTranslations('Pillars');
  const tA = useTranslations('About');
  const tT = useTranslations('Testimonials');
  const tC = useTranslations('CTA');

  const pillars = [
    {
      icon: Bot,
      title: tP('aiTitle'),
      description: tP('aiDesc'),
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Database,
      title: tP('intelTitle'),
      description: tP('intelDesc'),
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Code,
      title: tP('entTitle'),
      description: tP('entDesc'),
      gradient: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  const testimonials = [
    {
      quote: tT('t1Quote'),
      author: tT('t1Author'),
      company: tT('t1Company')
    },
    {
      quote: tT('t2Quote'),
      author: tT('t2Author'),
      company: tT('t2Company')
    }
  ];

  return (
    <div className="space-y-32 pb-32 overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col justify-center items-center min-h-[90vh] py-12 lg:py-24 text-center">

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
            {tH('available')}
          </motion.div>
          
          <div className="space-y-8 w-full">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-8xl font-black font-headline tracking-tighter leading-[0.85] text-center"
            >
              <span className="text-gradient block">{tH('title')}</span>
              <span className="text-foreground block relative inline-block mx-auto text-3xl md:text-5xl lg:text-6xl mt-4">
                {tH('subtitle')}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-2 left-0 h-2 bg-primary/20 -z-10 rounded-full"
                />
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8 flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px]">
                <span>{tH('roles.arch')}</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>{tH('roles.ds')}</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>{tH('roles.eng')}</span>
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span>{tH('roles.sol')}</span>
              </div>
              
              <p className="text-base lg:text-lg text-muted-foreground/80 max-w-3xl leading-relaxed font-medium mx-auto">
                {tH('description')}
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full max-w-xl mx-auto"
          >
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 font-black h-16 rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-[0.98] text-base">
              <Link href="/contact" className="flex items-center gap-3">
                {tH('ctaBook')} <Sparkles size={20} />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="flex-1 font-bold h-16 px-12 rounded-2xl border-2 border-primary/20 hover:bg-primary/10 transition-all group text-base">
              <Link href="/projects" className="flex items-center gap-3">
                {tH('ctaView')} <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlights Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: tS('accLabel'), value: "90%", suffix: "+", icon: TrendingUp },
          { label: tS('effLabel'), value: "40%", suffix: "+", icon: Zap },
          { label: tS('dataLabel'), value: "7M", suffix: "+", icon: Database },
          { label: tS('projLabel'), value: "15", suffix: "+", icon: Layers },
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
            <div className="text-2xl md:text-3xl font-black font-headline text-primary">{stat.value}{stat.suffix}</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
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
            <h3 className="text-xl font-black font-headline mb-6 group-hover:text-primary transition-colors leading-tight">{pillar.title}</h3>
            <p className="text-base text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/90 transition-colors">{pillar.description}</p>
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
                {tA('title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 lg:p-20 pt-10 grid lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  {tA('p1')}
                </p>
                <div className="p-10 rounded-[2.5rem] bg-primary/5 border-2 border-primary/10 space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <BrainCircuit size={100} />
                  </div>
                  <h4 className="text-primary font-bold uppercase tracking-[0.2em] text-sm">{tA('sigTitle')}</h4>
                  <p className="text-lg leading-relaxed italic font-bold text-foreground">
                    {tA('sigQuote')}
                  </p>
                  <p className="text-base font-black opacity-60 tracking-tight">{tA('sigAuthor')}</p>
                </div>
              </div>
              <div className="space-y-8">
                <h4 className="font-black font-headline text-3xl mb-10 tracking-tight">{tA('coreTitle')}</h4>
                {[
                  { label: tA('c1'), icon: Bot },
                  { label: tA('c2'), icon: TrendingUp },
                  { label: tA('c3'), icon: Layers },
                  { label: tA('c4'), icon: Cpu },
                  { label: tA('c5'), icon: ShieldCheck }
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
                    <span className="font-bold text-lg md:text-xl text-muted-foreground group-hover:text-foreground transition-colors tracking-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Verified Impact - Highlighted Section */}
      <section id="testimonials" className="relative">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 pointer-events-none -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative p-1 lg:p-2 rounded-[4rem] bg-gradient-to-br from-primary via-primary/20 to-transparent shadow-2xl"
        >
          <div className="bg-background/90 backdrop-blur-3xl rounded-[3.8rem] py-24 px-8 lg:px-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/3 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-4">
                  Industry Feedback
                </div>
                <h2 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter leading-none">
                  Verified <br /> <span className="text-primary italic">Impact.</span>
                </h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                  Direct testimony from industry leaders on the strategic value of engineered intelligence.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-secondary flex items-center justify-center text-xs font-black">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">Trusted by 10+ Enterprise Partners</span>
                </div>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="glass-panel p-10 rounded-[3rem] relative group hover:-translate-y-2 transition-all duration-500"
                  >
                    <Quote size={60} className="text-primary/10 absolute top-8 right-8" />
                    <p className="text-lg italic leading-relaxed text-foreground/90 font-medium mb-12 relative z-10 font-headline">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-5 pt-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shadow-xl">
                        {t.author[0]}
                      </div>
                      <div>
                        <p className="font-black text-lg font-headline tracking-tight">{t.author}</p>
                        <p className="text-primary font-bold text-xs uppercase tracking-widest">{t.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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
                {tC('title1')}<span className="text-primary italic">{tC('title2')}</span> <br /> {tC('title3')}
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
                {tC('desc')}
              </p>
            </header>
            
            <div className="flex justify-center pt-8">
              <MagneticWrapper>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-black h-16 px-10 rounded-2xl shadow-3xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xl">
                  <Link href="/contact" className="flex items-center gap-3">
                    {tC('btn')} <ArrowRight size={24} />
                  </Link>
                </Button>
              </MagneticWrapper>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
