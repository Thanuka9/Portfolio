'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Activity, 
  Database, 
  Shield, 
  Zap, 
  Cpu, 
  Gauge, 
  Bot, 
  CheckCircle2, 
  Telescope,
  Binary,
  Compass,
  Rocket
} from 'lucide-react';
import { RAGSimulator } from '@/components/labs/rag-simulator';
import { PredictiveSandbox } from '@/components/labs/predictive-sandbox';
import { useTranslations } from 'next-intl';

export default function LabsPage() {
  const t = useTranslations('Labs');
  const [latency, setLatency] = useState(24);
  const [accuracy, setAccuracy] = useState(94.2);
  const [uptime, setUptime] = useState(99.99);

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setLatency(prev => prev + (Math.random() * 4 - 2));
      setAccuracy(prev => Math.min(99.9, Math.max(89.0, prev + (Math.random() * 0.2 - 0.1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-40 pb-40 pt-10 overflow-x-hidden">
      {/* Header Section */}
      <header className="space-y-12 relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[180px] -z-10 rounded-full" />
        
        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 text-primary border border-white/5 text-[9px] font-black uppercase tracking-[0.3em]"
            >
                <Activity size={14} className="animate-pulse" />
                {t('telemetry')}
            </motion.div>
            
            <div className="space-y-4">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black font-headline tracking-tighter leading-[0.8]"
                >
                    Neural <br />
                    <span className="text-primary italic">Playgrounds.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-xl text-muted-foreground/70 max-w-2xl leading-relaxed font-medium"
                >
                    {t('pageSubtitle')}
                </motion.p>
            </div>
        </div>

        {/* Mission Briefing Card */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 lg:p-12 rounded-[3rem] border-white/5 bg-background/20 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:scale-110 transition-transform duration-700">
                <Telescope size={250} />
            </div>
            
            <div className="grid lg:grid-cols-12 gap-10 relative z-10">
                <div className="lg:col-span-4 space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-white/5 flex items-center justify-center text-primary shadow-2xl">
                        <Rocket size={28} />
                    </div>
                    <h2 className="text-3xl font-black font-headline tracking-tighter uppercase">{t('missionBriefing.title')}</h2>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />)}
                        </div>
                        <span className="h-px flex-grow bg-white/5" />
                    </div>
                </div>
                <div className="lg:col-span-8 space-y-6">
                    <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed font-medium">
                        {t('missionBriefing.p1')}
                    </p>
                    <p className="text-base md:text-lg text-foreground/90 font-bold leading-relaxed border-l-2 border-primary/40 pl-6 italic max-w-2xl">
                        {t('missionBriefing.p2')}
                    </p>
                </div>
            </div>
        </motion.div>
      </header>

      {/* Realtime Metrics Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t('metrics.latency'), value: `${Math.abs(latency).toFixed(1)}ms`, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/5", desc: t('metrics.latencyDesc') },
          { label: t('metrics.confidence'), value: `${accuracy.toFixed(2)}%`, icon: BrainCircuit, color: "text-emerald-500", bg: "bg-emerald-500/5", desc: t('metrics.confidenceDesc') },
          { label: t('metrics.uptime'), value: `${uptime}%`, icon: Shield, color: "text-blue-500", bg: "bg-blue-500/5", desc: t('metrics.uptimeDesc') }
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-[2.5rem] glass-panel border-white/5 bg-background/20 backdrop-blur-3xl hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 p-10 opacity-5 scale-150 transition-transform group-hover:scale-[1.7] ${metric.color}`}>
                <metric.icon size={100} />
            </div>
            <div className="space-y-5 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${metric.bg} ${metric.color} border border-white/5`}>
                    <metric.icon size={22} />
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{metric.label}</p>
                    <p className={`text-4xl font-black font-headline tracking-tighter ${metric.color}`}>{metric.value}</p>
                </div>
                <p className="text-[10px] font-medium text-muted-foreground/60 leading-relaxed">{metric.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Lab Node 01: RAG Simulator */}
      <section className="space-y-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/5 pb-12">
            <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 border border-white/5 flex items-center justify-center text-primary/70">
                        <span className="font-black text-sm">01</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black font-headline tracking-tighter uppercase whitespace-nowrap">
                        {t('ragTitle')}
                    </h2>
                </div>
                <p className="text-sm md:text-lg text-muted-foreground/60 font-medium leading-relaxed">
                    {t('ragDesc')}
                </p>
            </div>
            <div className="flex items-center gap-5 text-[8.5px] font-black uppercase tracking-[0.3em] text-primary/60 bg-primary/[0.03] px-6 py-3 rounded-full border border-white/5">
                <Binary size={14} />
                Pinecone + Gemini 1.5 Pro Cluster
            </div>
        </div>
        
        <RAGSimulator />
      </section>

      {/* Lab Node 02: Predictive Sandbox */}
      <section className="space-y-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/5 pb-12">
            <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/5 border border-white/5 flex items-center justify-center text-amber-500/70">
                        <span className="font-black text-sm">02</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black font-headline tracking-tighter uppercase whitespace-nowrap">
                        {t('predictiveTitle')}
                    </h2>
                </div>
                <p className="text-sm md:text-lg text-muted-foreground/60 font-medium leading-relaxed">
                    {t('predictiveDesc')}
                </p>
            </div>
            <div className="flex items-center gap-5 text-[8.5px] font-black uppercase tracking-[0.3em] text-amber-500/60 bg-amber-500/[0.03] px-6 py-3 rounded-full border border-white/5">
                <Compass size={14} />
                Random Forest + Gradient Boosting
            </div>
        </div>

        <PredictiveSandbox />
      </section>

      {/* Strategic Value Final Callout */}
      <section className="relative h-[350px] flex items-center justify-center rounded-[3rem] overflow-hidden group border border-white/5">
          <div className="absolute inset-0 bg-primary/[0.03] -z-10 group-hover:bg-primary/[0.05] transition-colors duration-700" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.08),transparent)] pointer-events-none" />
          
          <div className="text-center space-y-8 px-6 relative z-10">
              <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-background/40 backdrop-blur-md border border-white/5 text-[8.5px] font-black uppercase tracking-[0.3em] text-primary/60">
                  Architecture Protocol Validated
              </div>
              <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter max-w-3xl mx-auto leading-none">
                  Engineering <span className="text-primary italic">Intelligence</span> Beyond the Sandbox.
              </h2>
              <p className="text-muted-foreground/50 font-medium max-w-xl mx-auto text-sm leading-relaxed">
                  These simulations represent the core architectural patterns I implement for enterprise clients to ensure data grounding, cost optimization, and predictive accuracy.
              </p>
          </div>
      </section>
    </div>
  );
}
