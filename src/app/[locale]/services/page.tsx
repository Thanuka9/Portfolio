'use client';

import React from 'react';
import { 
  Sparkles, 
  BarChart3, 
  BrainCircuit, 
  Database, 
  ArrowRight, 
  Code2,
  ShieldCheck,
  Bot,
  Cpu,
  Search,
  Mic,
  Globe,
  Server,
  GitBranch,
  Key,
  LineChart,
  Activity,
  FileSearch,
  Layers,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('Services');

  const getBenefits = (serviceKey: string, count: number) => {
    const benefits = [];
    const icons = {
      s1: [Cpu, Search, Mic, Globe, BrainCircuit, Sparkles],
      s2: [Code2, Key, Server, Database, GitBranch],
      s3: [LineChart, Activity, FileSearch, Layers, Zap],
      s4: [Layers, Zap, Activity, Server, Database]
    };
    
    for (let i = 1; i <= count; i++) {
      try {
        const text = t(`${serviceKey}.b${i}`);
        if (text) {
          benefits.push({
            text,
            // @ts-ignore
            icon: icons[serviceKey]?.[i-1] || Sparkles 
          });
        }
      } catch (e) {}
    }
    return benefits;
  };

  const services = [
    {
      key: 's1',
      title: t('s1.title'),
      icon: Bot,
      description: t('s1.desc'),
      benefits: getBenefits('s1', 6),
      accent: "from-violet-500/20 to-cyan-500/20",
      accentBorder: "from-violet-500/40 to-cyan-500/20",
      number: "01",
      scope: t('s1.scope')
    },
    {
      key: 's2',
      title: t('s2.title'),
      icon: Code2,
      description: t('s2.desc'),
      benefits: getBenefits('s2', 5),
      accent: "from-primary/20 to-emerald-500/20",
      accentBorder: "from-primary/40 to-emerald-500/20",
      number: "02",
      scope: t('s2.scope')
    },
    {
      key: 's3',
      title: t('s3.title'),
      icon: BarChart3,
      description: t('s3.desc'),
      benefits: getBenefits('s3', 5),
      accent: "from-orange-500/20 to-rose-500/20",
      accentBorder: "from-orange-500/40 to-rose-500/20",
      number: "03",
      scope: t('s3.scope')
    },
    {
      key: 's4',
      title: t('s4.title'),
      icon: Database,
      description: t('s4.desc'),
      benefits: getBenefits('s4', 5),
      accent: "from-cyan-500/20 to-blue-500/20",
      accentBorder: "from-cyan-500/40 to-blue-500/20",
      number: "04",
      scope: t('s4.scope')
    }
  ];

  return (
    <div className="space-y-32 pb-24 animate-reveal">
      <header className="space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-bold tracking-wider uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {t('available')}
        </div>
        <h1 className="text-4xl lg:text-7xl font-black font-headline tracking-tighter leading-none">
          {t('pageTitle')}
        </h1>
        <p className="text-lg text-muted-foreground/80 max-w-3xl leading-relaxed font-medium">
          {t('pageSubtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div 
            key={service.title} 
            className={`group relative p-1 rounded-[3.5rem] bg-gradient-to-br ${service.accentBorder} hover:opacity-100 opacity-90 transition-all duration-700`}
          >
            <div className="bg-background/60 backdrop-blur-3xl rounded-[3.4rem] p-10 lg:p-14 h-full flex flex-col justify-between space-y-12">
              <div className="space-y-10">
                <div className="flex items-start justify-between">
                  <div className={`w-20 h-20 glass-panel rounded-3xl flex items-center justify-center border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl`}>
                    <service.icon size={36} />
                  </div>
                  <div className="text-6xl font-black opacity-[0.05] group-hover:opacity-[0.12] transition-opacity font-headline select-none">
                    {service.number}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{service.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{service.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <span className="w-4 h-px bg-primary/50"></span>
                  {service.scope}
                </h4>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4 group/item">
                      <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary transition-all duration-300 border border-primary/10">
                        <benefit.icon size={12} className="text-primary group-hover/item:text-primary-foreground transition-colors" />
                      </div>
                      <span className="text-muted-foreground font-medium text-sm leading-relaxed group-hover/item:text-foreground transition-colors">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Section */}
      <section className="relative group p-1 lg:p-2 rounded-[4rem] bg-gradient-to-br from-primary via-primary/50 to-primary/80 shadow-2xl">
        <div className="bg-background/95 backdrop-blur-3xl rounded-[3.8rem] py-20 lg:py-32 px-10 text-center space-y-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black font-headline tracking-tighter leading-none">
              {t('consultingTitle')}
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
              {t('consultingDesc')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-black h-20 px-12 rounded-3xl shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 text-base">
              <Link href="/contact" className="flex items-center gap-3">
                 {t('ctaBook')} <ArrowRight size={24} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="font-black h-20 px-12 rounded-3xl hover:bg-background/50 border-primary/20 text-base group">
              <Link href="/projects" className="flex items-center gap-2 text-foreground">
                {t('ctaExplore')} <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
