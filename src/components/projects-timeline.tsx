'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Github, Target, FlaskConical, TrendingUp, Quote, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectsTimeline({
  title,
  subtitle,
  projects
}: {
  title: string;
  subtitle: string;
  projects: any[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100, damping: 20
  });

  return (
    <div className="space-y-24 pb-24 pt-10" ref={containerRef}>
      <header className="space-y-6 text-center flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-6xl font-black font-headline tracking-tighter leading-none"
        >
          {title} <span className="text-primary">Impacts.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground/80 max-w-3xl font-medium leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </header>

      <div className="relative space-y-32 mt-16">
        {/* Animated Timeline Path Context */}
        <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-primary/5 hidden md:block">
          <motion.div 
            style={{ height: lineHeight }} 
            className="w-full bg-gradient-to-b from-primary via-indigo-500 to-emerald-500 shadow-[0_0_25px_rgba(138,43,226,0.6)] relative"
          >
             <motion.div 
               animate={{ opacity: [0.3, 0.6, 0.3] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute inset-0 bg-primary/40 blur-[4px]" 
             />
          </motion.div>
        </div>

        {projects.map((project, index) => (
          <motion.div 
            key={project.title} 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative pl-0 md:pl-20 group"
          >
            {/* Animated Timeline Dot */}
            <motion.div 
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.2 }}
              className="absolute left-0 top-6 w-16 h-16 rounded-2xl glass-panel hidden md:flex items-center justify-center text-primary border-primary/20 bg-background/50 backdrop-blur-3xl z-10 
              group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500 shadow-3xl select-none font-black text-2xl font-headline"
            >
              {index + 1}
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10 transition-all duration-500 hover:bg-background/60 rounded-[3rem] p-4 lg:p-0 group-hover:lg:-ml-8 group-hover:lg:pl-8 group-hover:lg:-my-8 group-hover:lg:py-8">
              {/* Sidebar Content */}
              <div className="lg:col-span-6 space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 glass-panel rounded-3xl flex items-center justify-center shrink-0 border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl">
                    <project.icon size={40} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-black font-headline leading-tight tracking-tight group-hover:text-primary transition-colors">{project.title}</h2>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest">{project.role}</p>
                  </div>
                </div>

                <div className="space-y-10">
                   <div className="flex gap-6 group/item">
                     <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary transition-all">
                        <Target className="w-5 h-5 text-primary group-hover/item:text-primary-foreground" />
                     </div>
                      <div className="space-y-2">
                         <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover/item:text-foreground transition-colors">The Challenge</h3>
                         <p className="text-muted-foreground leading-relaxed font-medium text-sm">{project.challenge}</p>
                      </div>
                   </div>

                   <div className="flex gap-6 group/item">
                     <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary transition-all">
                        <FlaskConical className="w-5 h-5 text-primary group-hover/item:text-primary-foreground" />
                     </div>
                      <div className="space-y-2">
                         <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover/item:text-foreground transition-colors">The Solution</h3>
                         <p className="text-muted-foreground leading-relaxed font-medium text-sm">{project.solution}</p>
                      </div>
                   </div>

                   <div className="flex gap-6 group/item">
                     <div className="w-10 h-10 rounded-2xl bg-primary/30 flex items-center justify-center shrink-0 border border-primary/20 group-hover/item:bg-primary transition-all">
                        <TrendingUp className="w-5 h-5 text-primary group-hover/item:text-primary-foreground" />
                     </div>
                      <div className="space-y-2">
                         <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary group-hover/item:text-foreground transition-colors">The Impact</h3>
                         <p className="text-foreground leading-relaxed font-bold italic text-base">{project.impact}</p>
                      </div>
                   </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    {project.demo && (
                        <Button variant="outline" size="lg" asChild className="rounded-2xl border-primary/20 hover:bg-primary/10 font-bold h-14 px-8 group/btn">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={20} className="mr-2 group-hover/btn:scale-110 transition-transform" /> Live Case Study
                            </a>
                        </Button>
                    )}
                    {project.github && (
                        <Button variant="ghost" size="lg" asChild className="rounded-2xl font-bold h-14 px-8 hover:bg-background/80 group/btn">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github size={20} className="mr-2 group-hover/btn:scale-110 transition-transform" /> Repository
                            </a>
                        </Button>
                    )}
                </div>
              </div>

              {/* Main Content Card */}
              <div 
                style={{willChange: 'transform, opacity'}}
                className="lg:col-span-6 relative p-1 lg:p-1.5 rounded-[4rem] bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/40 transition-all duration-700 h-full max-h-[800px]"
              >
                <div className="bg-background/40 backdrop-blur-3xl rounded-[3.8rem] p-10 lg:p-16 h-full flex flex-col justify-between space-y-12">
                  <div className="space-y-8">
                    <Quote size={60} className="text-primary opacity-20" />
                    <p className="text-xl italic leading-tight text-foreground/90 font-medium tracking-tight relative z-10">
                      {project.summary}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-black text-xs uppercase tracking-[0.3em] text-primary">Technical Engine</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="px-5 py-2 rounded-xl glass-panel text-[11px] font-bold text-muted-foreground border-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
