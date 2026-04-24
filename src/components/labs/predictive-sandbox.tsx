'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  BrainCircuit, 
  RefreshCcw,
  Layers,
  LineChart,
  PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';

export function PredictiveSandbox() {
  const t = useTranslations('Labs.forecaster');
  const [isComputing, setIsComputing] = useState(false);
  const [dataDensity, setDataDensity] = useState([70]);
  const [complexity, setComplexity] = useState([85]);
  const [variance, setVariance] = useState([20]);
  
  const [results, setResults] = useState({
    accuracy: 94.2,
    risk: 12.4,
    impact: 420000
  });

  const runCalculation = () => {
    setIsComputing(true);
    setTimeout(() => {
      const baseAcc = 85 + (dataDensity[0] / 10);
      const FinalAcc = Math.min(99.9, baseAcc - (variance[0] / 10) + (complexity[0] / 20));
      const riskLevel = variance[0] * 0.8 + (100 - dataDensity[0]) * 0.2;
      const financialImpact = (dataDensity[0] * 5000) + (complexity[0] * 1000);

      setResults({
        accuracy: FinalAcc,
        risk: riskLevel,
        impact: financialImpact
      });
      setIsComputing(false);
    }, 1500);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Control Panel */}
      <div className="space-y-8 glass-panel p-8 lg:p-10 rounded-[2.5rem] border-white/5 bg-background/20 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.015] rotate-12 pointer-events-none">
            <Layers size={250} />
        </div>
        
        <div className="space-y-1.5">
            <h3 className="text-2xl font-black font-headline tracking-tighter">{t('title')}</h3>
            <p className="text-[10px] font-medium text-primary/60 italic uppercase tracking-wider">{t('subtitle')}</p>
        </div>

        <div className="space-y-10">
            <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('param1')}</label>
                    <span className="text-sm font-black text-primary font-mono">{dataDensity}%</span>
                </div>
                <Slider 
                    value={dataDensity} 
                    onValueChange={setDataDensity} 
                    max={100} 
                    step={1} 
                    className="cursor-pointer"
                />
            </div>

            <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('param2')}</label>
                    <span className="text-sm font-black text-primary font-mono">{complexity}%</span>
                </div>
                <Slider 
                    value={complexity} 
                    onValueChange={setComplexity} 
                    max={100} 
                    step={1} 
                    className="cursor-pointer"
                />
            </div>

            <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('param3')}</label>
                    <span className="text-sm font-black text-amber-500 font-mono">{variance}%</span>
                </div>
                <Slider 
                    value={variance} 
                    onValueChange={setVariance} 
                    max={100} 
                    step={1} 
                    className="cursor-pointer"
                />
            </div>
        </div>

        <Button 
            onClick={runCalculation} 
            disabled={isComputing}
            className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[11px] tracking-[0.2em] uppercase transition-all active:scale-95 shadow-2xl shadow-primary/10"
        >
            {isComputing ? (
              <div className="flex items-center gap-2.5">
                <RefreshCcw size={14} className="animate-spin" />
                {t('btnCalculating')}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Zap size={14} />
                {t('btnCalculate')}
              </div>
            )}
        </Button>
      </div>

      {/* Output Visualization */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div 
                animate={{ scale: isComputing ? 0.98 : 1 }}
                className="glass-panel p-6 rounded-2xl border-white/5 bg-emerald-500/[0.03] space-y-3"
            >
                <div className="flex justify-between items-center">
                    <Target className="text-emerald-500/70" size={24} />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-30">Precision Gate</span>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('results.accuracy')}</p>
                    <p className="text-4xl font-black font-headline text-emerald-500/90 tracking-tighter">{results.accuracy.toFixed(2)}%</p>
                </div>
            </motion.div>

            <motion.div 
                animate={{ scale: isComputing ? 0.98 : 1 }}
                className="glass-panel p-6 rounded-2xl border-white/5 bg-amber-500/[0.03] space-y-3"
            >
                <div className="flex justify-between items-center">
                    <AlertTriangle className="text-amber-500/70" size={24} />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-30">Risk Factor</span>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t('results.risk')}</p>
                    <p className="text-4xl font-black font-headline text-amber-500/90 tracking-tighter">{results.risk.toFixed(1)}%</p>
                </div>
            </motion.div>
        </div>

        <motion.div 
            animate={{ scale: isComputing ? 0.99 : 1 }}
            className="glass-panel p-8 rounded-[2rem] border-white/5 bg-primary/[0.02] space-y-6 relative overflow-hidden"
        >
            <div className="flex justify-between items-center relative z-10">
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">{t('results.impact')}</p>
                    <h4 className="text-4xl font-black font-headline tracking-tighter">
                        ${(results.impact / 1000).toFixed(1)}K <span className="text-sm opacity-30 uppercase ml-2 tracking-widest">ROI / QTR</span>
                    </h4>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary/60">
                    <TrendingUp size={24} />
                </div>
            </div>

            <div className="h-32 w-full flex items-end gap-1.5 relative z-10">
                {[40, 65, 45, 90, 55, 75, 45, 60, 85, 95].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: isComputing ? `${h * 0.5}%` : `${h}%` }}
                        transition={{ delay: i * 0.05, type: 'spring', damping: 12 }}
                        className="flex-grow bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-md"
                    />
                ))}
            </div>
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(138,43,226,0.05),transparent)] pointer-events-none" />
        </motion.div>

        <div className="glass-panel p-8 rounded-2xl border-white/5 bg-background/10 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-muted-foreground/80">
                <BrainCircuit size={16} className="text-primary/70" />
                Network Architecture Logic
            </h4>
            <p className="text-xs text-muted-foreground/70 leading-relaxed font-medium">
                The simulation utilizes a Feed-Forward Neural Network architecture with Dropout layers to mitigate variance. The accuracy peak is derived from the convergence of data density and hyper-parameter optimization logic I developed for Collective RCM.
            </p>
        </div>
      </div>
    </div>
  );
}
