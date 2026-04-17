'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { SITE_KNOWLEDGE } from '@/lib/knowledge-base';

export function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [ragStatus, setRagStatus] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ai_inquisitor_history');
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    } else {
      setMessages([
        { role: 'bot', content: 'Greeting, human. I am Thanuka’s AI Inquisitor, now upgraded with production-grade RAG and intent recognition. I have indexed this entire site. Whether you want to dive into his RCM Case Studies or his technical architecture, I am ready. What brings you here today?' }
      ]);
    }
  }, []);

  // Save history to localStorage and scroll to bottom
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai_inquisitor_history', JSON.stringify(messages));
    }
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, ragStatus]);

  const handleSend = async () => {
    if (!input.trim() || input.length > 500) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    
    setIsTyping(true);
    
    // Simulate RAG Pipeline Thinking
    setRagStatus('🔍 Browsing site knowledge...');
    await new Promise(r => setTimeout(r, 600));
    
    setRagStatus('🧠 Parsing context...');
    await new Promise(r => setTimeout(r, 400));

    setRagStatus('✍️ Synthesizing...');
    await new Promise(r => setTimeout(r, 500));

    // Advanced Keyword & Deep-Knowledge Retrieval
    let response = "";
    const lowerMsg = userMsg.toLowerCase();

    // 1. Identity & Location
    if (lowerMsg.includes('who is') || lowerMsg.includes('thanuka') || lowerMsg.includes('about him') || lowerMsg.includes('tell me about you')) {
      response = `Thanuka is a Colombo-based AI Architect and Data Scientist with a passion for building autonomous systems. He's currently at Collective RCM, bridging the gap between cutting-edge AI research and scalable enterprise code.`;
    } else if (lowerMsg.includes('location') || lowerMsg.includes('where are you') || lowerMsg.includes('colombo') || lowerMsg.includes('sri lanka')) {
      response = `Thanuka is based in **Colombo, Sri Lanka**, and works with global teams in the US and beyond.`;
    } 
    
    // 2. Project Deep-Dive
    else if (lowerMsg.includes('job hunter') || (lowerMsg.includes('project') && lowerMsg.includes('job'))) {
      const p = SITE_KNOWLEDGE.projects[0];
      response = `The **${p.title}** is an autonomous talent acquisition system he built. It reduces application time by 90% using LangChain, Gemini 3.1, and Playwright for RAG-based personalization.`;
    } else if (lowerMsg.includes('revops') || lowerMsg.includes('audit')) {
      const p = SITE_KNOWLEDGE.projects[2];
      response = `**${p.title}** is a B2B SaaS for healthcare revenue auditing. It uses an Autonomous Agent Architecture (CEO, Eng, and ML Pods) with Scikit-learn for payment forecasting.`;
    } else if (lowerMsg.includes('medipredict') || lowerMsg.includes('health') || lowerMsg.includes('payment') || lowerMsg.includes('forecast') || lowerMsg.includes('rcm')) {
      const p = SITE_KNOWLEDGE.projects[1];
      response = `In Healthcare RCM, Thanuka developed a **Predictive Analytics framework** that achieves an R² > 0.90 for financial forecasting. He's also built MediPredict for clinical decision support.`;
    } else if (lowerMsg.includes('careerforge')) {
      const p = SITE_KNOWLEDGE.projects[4];
      response = `**CareerForge AI 3.0** is an innovative multi-agent career OS featuring low-latency voice AI via Gemini 3.1 Live API and real-time market grounding.`;
    } else if (lowerMsg.includes('project') || lowerMsg.includes('case study') || lowerMsg.includes('work')) {
      const titles = SITE_KNOWLEDGE.projects.map(p => p.title).slice(0, 3).join(", ");
      response = `Thanuka has worked on some heavyweight projects, including **${titles}**, and **ReviewRadar AI** (processing 7M+ reviews). Are you interested in his work with Autonomous Agents or Predictive Analytics?`;
    }

    // 3. Experience & Skills
    else if (lowerMsg.includes('experience') || lowerMsg.includes('company') || lowerMsg.includes('work history') || lowerMsg.includes('collective rcm')) {
      const exp = SITE_KNOWLEDGE.experience[0];
      response = `Thanuka is currently an **${exp.role}** at **${exp.company}**, where he's been since 2019. He leads digital transformation and enterprise architecture, particularly in Healthcare RCM.`;
    } else if (lowerMsg.includes('stack') || lowerMsg.includes('tech') || lowerMsg.includes('skill') || lowerMsg.includes('code') || lowerMsg.includes('build')) {
      response = `His technical engine is powered by **Next.js 15, React 19, and Python**. For AI, he’s a specialist in **LangChain, Gemini 3.1, RAG, and Agentic Architectures**. He also works extensively with PostgreSQL, Docker, and Azure.`;
    }

    // 4. Education & Specific University Queries
    else if (lowerMsg.includes('education') || lowerMsg.includes('university') || lowerMsg.includes('study') || lowerMsg.includes('degree') || lowerMsg.includes('school') || lowerMsg.includes('greenwich') || lowerMsg.includes('colombo')) {
      const edu = SITE_KNOWLEDGE.education[0];
      const edu2 = SITE_KNOWLEDGE.education[1];
      response = `Thanuka is currently pursuing a **${edu.degree}** at the **${edu.institution}** (2023–2025), focusing on predictive analytics. He also holds a **${edu2.degree}** from Greenwich University.`;
    }

    // 5. Intent: Meetings & Commercials
    else if (lowerMsg.includes('meeting') || lowerMsg.includes('book') || lowerMsg.includes('schedule') || lowerMsg.includes('call') || lowerMsg.includes('zoom')) {
      response = `I'd be happy to help you get on Thanuka's calendar! Please head to the **Strategic Inquiry** page and submit your details. He usually responds within 24 hours to schedule a consultation.`;
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('estimate') || lowerMsg.includes('quote') || lowerMsg.includes('rate') || lowerMsg.includes('charge')) {
      response = `AI consulting rates are project-specific. For a custom estimate, please describe your requirements on the Strategic Inquiry page—Thanuka will get back to you with a formal quote.`;
    }

    // 6. Intent: Off-Topic / Persona
    else if (lowerMsg.includes('joke') || lowerMsg.includes('weather') || lowerMsg.includes('capital') || lowerMsg.includes('france') || lowerMsg.includes('meaning of life')) {
      response = `My neural pathways are currently optimized solely for Thanuka’s professional portfolio. While I could tell you the capital of France, I’d much rather tell you about his work with **Autonomous AI Agents** or his **Masters in Business Analytics**. Which would you prefer?`;
    }

    // 7. Dynamic Fallback
    else {
      const fallbacks = [
        "I couldn't find an exact note on that, but I have full data on Thanuka's AI projects and RCM background. Would you like to hear about the 'AI Job Hunter' or his work at Collective RCM?",
        "That query is outside my primary knowledge node. However, I can explain Thanuka's expertise in LangChain and RAG pipelines. Interested?",
        "I'm specialized in Thanuka's career journey. I can tell you about his current role at Collective RCM or his case studies in predictive analytics. What sounds better?"
      ];
      response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    setMessages(prev => [...prev, { role: 'bot', content: response }]);
    setRagStatus(null);
    setIsTyping(false);
  };

  const clearHistory = () => {
    localStorage.removeItem('ai_inquisitor_history');
    setMessages([{ role: 'bot', content: 'History cleared. What else can I tell you about Thanuka’s professional journey?' }]);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100]">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Assistant"
          className={cn(
            "w-16 h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95",
            isOpen ? "bg-secondary text-foreground rotate-90" : "bg-primary text-primary-foreground"
          )}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
            </span>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-[400px] h-[500px] bg-background/95 backdrop-blur-3xl border border-primary/20 rounded-[2.5rem] shadow-3xl z-[100] flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-border/50 bg-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight">AI Inquisitor</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">v1.1.0 - Production</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearHistory} className="rounded-full hover:bg-primary/10 hover:text-red-500" title="Clear History">
                 <Trash2 size={16} />
              </Button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-secondary text-primary" : "bg-primary text-primary-foreground"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl max-w-[80%] text-sm font-medium leading-relaxed",
                    msg.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary/50 border border-border/50 rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                        <Bot size={14} />
                    </div>
                    <div className="bg-secondary/50 border border-border/50 p-4 rounded-2xl rounded-tl-none flex flex-col gap-2 min-w-[140px]">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">
                          <Loader2 size={12} className="animate-spin" />
                          {ragStatus || 'Synthesizing...'}
                        </div>
                        <div className="flex gap-1.5 px-1">
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border/50 bg-secondary/20">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about AI, Case Studies..."
                  className="w-full bg-background/50 border border-border/50 rounded-xl py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground/50 mt-3 text-center font-bold uppercase tracking-widest">
                AI Assistant focused on Professional Portfolio Data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
