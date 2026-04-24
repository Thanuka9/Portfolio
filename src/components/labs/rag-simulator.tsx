'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Terminal, 
  Cpu, 
  Search, 
  BrainCircuit, 
  Activity, 
  Database, 
  CheckCircle2, 
  Layers,
  Zap,
  Server,
  Network,
  Share2,
  Box,
  CircleDashed,
  Workflow,
  ShieldCheck,
  Target,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

type SimulationStep = 'idle' | 'input' | 'retrieval' | 'orchestration' | 'synthesis' | 'result';

export function RAGSimulator() {
  const t = useTranslations('Labs.simulator');
  const [step, setStep] = useState<SimulationStep>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-12));
  };

  const runSimulation = async () => {
    setLogs([]);
    setStep('input');
    addLog(t('logs.init'));
    addLog(t('logs.buffer'));
    
    await new Promise(r => setTimeout(r, 1000));
    setStep('retrieval');
    addLog(t('logs.search'));
    
    await new Promise(r => setTimeout(r, 1200));
    setStep('orchestration');
    addLog(t('logs.execution'));
    
    await new Promise(r => setTimeout(r, 1500));
    setStep('synthesis');
    addLog(t('logs.reasoning'));
    
    await new Promise(r => setTimeout(r, 1200));
    setStep('result');
    addLog(t('logs.completed'));
    addLog(t('logs.output'));
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const phases = [
    { id: 'input', icon: Terminal, label: t('steps.input'), color: 'text-blue-400' },
    { id: 'retrieval', icon: Search, label: t('steps.search'), color: 'text-cyan-400' },
    { id: 'orchestration', icon: Workflow, label: t('steps.execution'), color: 'text-purple-400' },
    { id: 'synthesis', icon: BrainCircuit, label: t('steps.reasoning'), color: 'text-emerald-400' },
    { id: 'result', icon: CheckCircle2, label: t('steps.output'), color: 'text-primary' },
  ];

  return (
    <div className="space-y-12">
      {/* Simulation Header with System Status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
            { label: "Processor Load", value: "12.4 GF", icon: Cpu, color: "text-blue-400" },
            { label: "Token Rate", value: "84.2 T/s", icon: Database, color: "text-emerald-400" },
            { label: "Inference", value: "1.2ms", icon: Zap, color: "text-yellow-400" },
            { label: "Confidence", value: "0.984", icon: Activity, color: "text-purple-400" }
        ].map((stat, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border-white/5 bg-background/20 flex items-center gap-4 hover:bg-white/5 transition-colors">
                <stat.icon size={18} className={stat.color} />
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                    <p className="text-sm font-black font-headline tracking-tight">{stat.value}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Visual Workflow Layer */}
        <div className="lg:col-span-8 glass-panel rounded-[2.5rem] p-8 lg:p-10 border-white/5 relative overflow-hidden bg-background/20 backdrop-blur-3xl min-h-[480px] flex flex-col justify-between">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
             
             {/* Progress Status Bar */}
             <div className="flex justify-between items-center w-full mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Active RAG Engine</span>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-secondary/10 border border-white/5 text-[9px] font-bold text-muted-foreground/80 uppercase tracking-widest">
                    Kernel: S-902-TR
                </div>
             </div>

             {/* Dynamic Stage Visualization */}
             <div className="relative flex flex-col items-center justify-center space-y-16 flex-grow">
                <div className="flex items-center justify-between w-full max-w-xl relative">
                    {/* Progress Connecting Line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 z-0" />
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ 
                            width: step === 'idle' ? '0%' : 
                                   step === 'input' ? '20%' : 
                                   step === 'retrieval' ? '40%' : 
                                   step === 'orchestration' ? '60%' : 
                                   step === 'synthesis' ? '80%' : '100%' 
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-primary z-0 shadow-[0_0_10px_#8a2be2]" 
                    />

                    {phases.map((p, idx) => {
                        const isActive = step === p.id;
                        const isPast = phases.findIndex(x => x.id === step) > idx || step === 'result';
                        const Icon = p.icon;

                        return (
                            <div key={p.id} className="relative z-10 flex flex-col items-center gap-3">
                                <motion.div 
                                    animate={{ 
                                        scale: isActive ? 1.2 : 1,
                                        backgroundColor: isPast || isActive ? 'rgba(138,43,226,0.05)' : 'rgba(255,255,255,0.01)',
                                        borderColor: isPast || isActive ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        color: isPast || isActive ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
                                    }}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-700"
                                >
                                    <Icon size={16} />
                                    {isActive && (
                                        <motion.div 
                                            layoutId="glow-ring" 
                                            className="absolute -inset-2 rounded-xl border border-primary/20 animate-pulse opacity-30 shadow-[0_0_15px_rgba(138,43,226,0.2)]" 
                                        />
                                    )}
                                </motion.div>
                                <span className={cn(
                                     "text-[9px] font-black uppercase tracking-[0.25em] transition-colors duration-700",
                                     isActive ? "text-primary" : "text-muted-foreground/20"
                                 )}>
                                     {p.label}
                                 </span>
                             </div>
                         )
                     })}
                 </div>

                {/* Animated Interactive Content Pane */}
                <div className="w-full max-w-md h-48 glass-panel rounded-[2rem] border-white/5 p-8 relative flex items-center justify-center overflow-hidden bg-background/10">
                    <AnimatePresence mode="wait">
                        {step === 'idle' && (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center space-y-8"
                            >
                                 <div className="space-y-4">
                                     <h4 className="text-xl font-black font-headline tracking-tight">System Ready for Query Integration</h4>
                                     <p className="text-xs text-muted-foreground font-medium max-w-sm mx-auto uppercase tracking-widest">Architectural simulation of localized RAG & Agentic workflows.</p>
                                 </div>
                                 <Button 
                                     onClick={runSimulation}
                                     className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-12 h-16 rounded-2xl shadow-3xl shadow-primary/40 group active:scale-95 transition-all text-base"
                                 >
                                    <Play size={20} className="mr-3 group-hover:scale-110" /> BEGIN AGENTIC TRACE
                                </Button>
                            </motion.div>
                        )}

                        {step === 'retrieval' && (
                            <motion.div 
                                key="retrieval"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full px-12"
                            >
                                <div className="grid grid-cols-4 gap-4">
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="h-8 bg-primary/10 rounded-lg border border-primary/20 relative"
                                        >
                                            <motion.div 
                                                animate={{ opacity: [0.2, 0.8, 0.2] }}
                                                transition={{ repeat: Infinity, duration: 1 + Math.random() }}
                                                className="absolute inset-0 bg-primary/20 rounded-lg" 
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                <p className="text-center mt-8 text-[9px] font-black uppercase text-primary tracking-widest animate-pulse">Scanning Vector Space...</p>
                            </motion.div>
                        )}

                        {step === 'orchestration' && (
                            <motion.div 
                                key="orchestration"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-2 gap-6 w-full"
                            >
                                {[
                                    { name: "Researcher", icon: Target, delay: 0 },
                                    { name: "Verifier", icon: ShieldCheck, delay: 0.2 },
                                    { name: "Architect", icon: Box, delay: 0.4 },
                                    { name: "Reasoner", icon: BrainCircuit, delay: 0.6 }
                                ].map((agent, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: agent.delay }}
                                        style={{ willChange: 'transform, opacity' }}
                                        className="flex items-center gap-3 p-3.5 glass-panel border-white/5 bg-background/5 rounded-2xl"
                                    >
                                        <agent.icon size={16} className="text-primary/70" />
                                        <span className="text-[9px] font-black uppercase tracking-tight">{agent.name} Agent</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {step === 'synthesis' && (
                            <motion.div 
                                key="synthesis"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6 w-full px-12"
                            >
                                <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5 }}
                                        className="h-full bg-primary shadow-[0_0_10px_#8a2be2]"
                                    />
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Synthesizing Grounded Logic</p>
                                    <div className="flex justify-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div key={i} animate={{ scaleY: [1, 2, 1] }} transition={{ repeat: Infinity, delay: i * 0.1 }} className="w-1 h-3 bg-primary/40 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'result' && (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto text-primary shadow-2xl">
                                    <CheckCircle2 size={28} />
                                </div>
                                <div className="space-y-2">
                                    <h5 className="font-black font-headline text-lg tracking-tight">Trace Terminated Successfully</h5>
                                    <p className="text-xs text-muted-foreground font-medium px-12 leading-relaxed">
                                        Agentic pipeline successfully integrated context from 12 nodes with 0.984 confidence.
                                    </p>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setStep('idle')}
                                    className="rounded-xl font-black text-[9px] tracking-[0.2em] uppercase text-primary hover:bg-primary/10"
                                >
                                    Relaunch Kernel
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
             </div>
        </div>

        {/* Real-time Telemetry Console */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel border-white/5 flex-grow flex flex-col bg-background/10 overflow-hidden relative rounded-[2rem]">
                 <div className="p-6 border-b border-white/5 bg-background/20 backdrop-blur-3xl flex items-center justify-between">
                     <div className="flex items-center gap-2.5">
                         <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                         <h3 className="font-black text-[10px] uppercase tracking-[0.3em] font-headline text-muted-foreground/80">Telemetry Trace</h3>
                     </div>
                     <Activity size={16} className="text-muted-foreground/20" />
                </div>
                <div ref={consoleRef} className="p-6 flex-grow font-mono text-[10px] space-y-4 overflow-y-auto max-h-[340px] custom-scrollbar bg-black/20 scroll-smooth">
                    {logs.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full space-y-3 opacity-10">
                            <Terminal size={32} />
                            <p className="text-[9px] font-black uppercase tracking-widest italic">Node Offline</p>
                        </div>
                    )}
                    {logs.map((log, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3 group"
                        >
                            <span className="text-primary font-black opacity-20 select-none">[{i}]</span>
                             <span className="text-muted-foreground/70 group-hover:text-foreground transition-colors leading-relaxed">{log}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border-white/5 bg-primary/[0.03] space-y-3">
                 <div className="flex justify-between items-end">
                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">Network Latency</p>
                    <p className="font-black font-headline text-primary/80 text-xs">0.4ms</p>
                 </div>
                 <div className="grid grid-cols-12 gap-0.5 h-1">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className={`rounded-full ${i < 4 ? 'bg-primary/60' : 'bg-primary/5'}`} />
                    ))}
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
