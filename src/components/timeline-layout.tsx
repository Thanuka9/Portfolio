'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Code, CheckCircle2 } from "lucide-react";

export type TimelineItemProps = {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  icon?: any;
  bullets?: string[];
  link?: string;
};

export function TimelineLayout({
  title,
  subtitle,
  items,
  icon: HeaderIcon
}: {
  title: string;
  subtitle: string;
  items: TimelineItemProps[];
  icon?: any;
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
    <div className="space-y-20 pb-20 pt-10" ref={containerRef}>
      <header className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-6xl font-black font-headline tracking-tighter flex items-center gap-4"
        >
          {HeaderIcon && <HeaderIcon className="text-primary hidden sm:inline" size={48} />}
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </header>

      <div className="relative space-y-16 mt-16">
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

        {items.map((item, index) => {
          const ItemIcon = item.icon || Code;
          return (
            <motion.div 
              key={index} 
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
                group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500 shadow-3xl"
              >
                <ItemIcon size={24} />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.4)" }}
                className="glass-panel p-8 lg:p-12 rounded-[2.5rem] transition-all duration-500 group-hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all pointer-events-none">
                  <ItemIcon size={120} />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div className="space-y-2 z-10 relative">
                    <h2 className="text-2xl lg:text-3xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">{item.title}</h2>
                    <p className="text-primary font-bold text-base bg-primary/10 inline-block px-3 py-1 rounded-full">{item.subtitle}</p>
                  </div>
                  <div className="px-5 py-2 rounded-full bg-secondary text-foreground text-xs font-black shadow-inner self-start md:self-auto uppercase tracking-widest border border-border/50 z-10 relative">
                    {item.date}
                  </div>
                </div>

                <div className="z-10 relative space-y-6">
                  {item.description && (
                    <p className="text-muted-foreground leading-relaxed font-medium text-base mb-6 max-w-4xl group-hover:text-foreground transition-colors">
                      {item.description}
                    </p>
                  )}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-4">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-4 group/item">
                          <CheckCircle2 size={18} className="text-primary shrink-0 mt-1 opacity-50 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all" />
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed font-medium text-sm">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.link && (
                    <div className="pt-4">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold text-xs uppercase tracking-widest transition-colors">
                        View Details
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
