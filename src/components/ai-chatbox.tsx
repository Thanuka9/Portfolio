'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, Trash2, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_KNOWLEDGE } from '@/lib/knowledge-base';

type Message = { role: 'user' | 'bot'; content: string; id: number };

const QUICK_PROMPTS = [
  'AI services?',
  'Show projects',
  'Tech stack?',
  'Book a call?',
];

const RAG_STEPS = [
  '🔍 Scanning knowledge base...',
  '🧠 Parsing context vectors...',
  '⚡ Synthesizing response...',
];

export function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [ragStatus, setRagStatus] = useState<string | null>(null);
  const msgCounterRef = useRef(1000);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextId = () => {
    msgCounterRef.current += 1;
    return msgCounterRef.current;
  };

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ai_inquisitor_v2_history');
    if (savedHistory) {
      try { setMessages(JSON.parse(savedHistory)); } catch { /* ignore */ }
    } else {
      setMessages([{
        role: 'bot',
        id: 1,
        content: "Hello! I'm Thanuka's AI assistant. I have full knowledge of his AI & Autonomous Systems work, Full-Stack Enterprise projects, and professional background. How can I help you today?"
      }]);
    }
  }, []);

  // Save history + scroll
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai_inquisitor_v2_history', JSON.stringify(messages.slice(-40)));
    }
    scrollToBottom();
  }, [messages, isTyping, ragStatus]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 80);
  };

  const buildResponse = useCallback((userMsg: string): string => {
    const q = userMsg.toLowerCase().trim();
    const kb = SITE_KNOWLEDGE;

    // ── Greetings (exact/very short) — checked first ──
    if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'yo' || q === 'sup') {
      return `Hey! I'm Thanuka's AI assistant. Here's what I know:\n\n🤖 **AI & Autonomous Systems** — multi-agent architectures, RAG, Voice AI\n🖥️ **Full-Stack Enterprise** — Flask, SQL platforms, 2FA, CI/CD on Azure/GCP\n📊 **Predictive Analytics** — RCM forecasting (R² > 0.90)\n📁 **6 flagship projects** — from AI Job Hunter to ReviewRadar AI\n\nWhat would you like to explore?`;
    }

    // ── Named project matchers (standalone — no "project" keyword needed) ──
    // These MUST come before the projects block so "tell me about AI Job Hunter" works
    if (q.includes('job hunter') || (q.includes('job') && q.includes('automation'))) {
      const p = kb.projects[0];
      return `**${p.title}** is Thanuka's autonomous talent acquisition system:\n• Reduces application time by **90%**\n• Uses **LangChain + FAISS** for RAG-based personalization\n• **Playwright** for intelligent browser automation\n• **Gemini 3.1** for CV-to-JD semantic matching\n\nTags: ${p.tags.join(' · ')}`;
    }
    if (q.includes('revops')) {
      const p = kb.projects[2];
      return `**${p.title}** is Thanuka's multi-agent B2B SaaS for healthcare auditing. It uses a **CEO → Engineering → ML Pod architecture** where specialized agents coordinate automatically.\n\nTech: ${p.tags.join(' · ')}`;
    }
    if (q.includes('careerforge') || q.includes('career forge')) {
      const p = kb.projects[4];
      return `**${p.title}** is a multi-agent career intelligence OS:\n• **Gemini 3.1 Live API** for real-time voice AI\n• Google Search Grounding for live market data\n• Multi-agent coordination for career path analysis\n\nTags: ${p.tags.join(' · ')}`;
    }
    if (q.includes('reviewradar') || q.includes('review radar')) {
      const p = kb.projects[5];
      return `**${p.title}** processes **7M+ product reviews** using ensemble ML:\n• **XGBoost + VADER + spaCy** for multi-model sentiment\n• End-to-end **ETL** pipeline automation\n• **PostgreSQL** for structured storage\n\nTags: ${p.tags.join(' · ')}`;
    }
    if (q.includes('collective intranet') || q.includes('intranet')) {
      const p = kb.projects[3];
      return `**${p.title}** is a secure enterprise platform Thanuka architected at Collective RCM:\n• Hybrid **SQL/NoSQL** (PostgreSQL + MongoDB)\n• **2FA + Role-Based Access Control**\n• Centralizes onboarding, training & performance tracking\n• Hosted on **Azure** with full **CI/CD**\n\nTags: ${p.tags.join(' · ')}`;
    }
    if (q.includes('medipredict') || (q.includes('predictive') && q.includes('healthcare'))) {
      const p = kb.projects[1];
      return `**${p.title}**\n\n${p.summary}\n\nTech: ${p.tags.join(' · ')}`;
    }

    // ── Projects overview (generic — no specific name mentioned) ──
    if (
      q.includes('project') ||
      q.includes('case study') ||
      q.includes('portfolio') ||
      q.includes('what have you built') ||
      q.includes('show me your work') ||
      q.includes('your work')
    ) {
      return `Thanuka has built **${kb.projects.length} flagship projects**:\n\n1. **AI Job Hunter** — 90% application time reduction via autonomous RAG\n2. **Predictive Healthcare Analytics** — R² > 0.90 financial forecasting\n3. **RevOps AI** — Multi-agent B2B SaaS for healthcare auditing\n4. **Collective Intranet** — Secure enterprise platform (Flask, 2FA, Azure)\n5. **CareerForge AI 3.0** — Voice AI + Google Search Grounding\n6. **ReviewRadar AI** — 7M+ review sentiment engine\n\nWhich would you like to explore in detail?`;
    }


    // ── AI & Autonomous Systems service ──
    if (q.includes('ai') && (q.includes('autonomous') || q.includes('agent') || q.includes('system'))) {
      const s = kb.services.aiAutonomousSystems;
      return `**${s.title}** is Thanuka's core specialty. He architects the next generation of business logic:\n\n${s.scope.map(i => `• ${i}`).join('\n')}\n\nWant to discuss a specific autonomous agent project?`;
    }

    // ── Full-Stack Enterprise service ──
    if ((q.includes('full') && q.includes('stack')) || (q.includes('enterprise') && q.includes('dev')) || q.includes('flask') || q.includes('2fa') || q.includes('ci/cd') || q.includes('cicd')) {
      const s = kb.services.fullStackEnterprise;
      return `**${s.title}** — ${s.tagline}\n\n**Scope:**\n${s.scope.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}\n\nHe's deployed production-grade enterprise platforms at Collective RCM and through independent consulting.`;
    }

    // ── Voice AI / Gemini Live ──
    if (q.includes('voice ai') || q.includes('gemini live') || q.includes('real-time voice')) {
      return `Thanuka has built **low-latency Voice AI simulations** using the **Gemini Live API**. One flagship example is **CareerForge AI 3.0** — a multi-agent career OS with real-time conversational intelligence, operating with sub-200ms latency.`;
    }

    // ── RAG & LangChain ──
    if (q.includes('rag') || q.includes('langchain') || q.includes('faiss') || q.includes('vector') || q.includes('retrieval')) {
      return `Thanuka architects **production-grade RAG pipelines** using:\n• **LangChain** for orchestration\n• **FAISS Vector Search** for semantic retrieval\n• **Gemini 3.1** as the reasoning LLM\n\nThese power systems like the AI Job Hunter (90% time reduction) and RevOps AI's automated auditing engine.`;
    }

    // ── Multi-agent / Pods ──
    if (q.includes('multi-agent') || q.includes('ml pod') || q.includes('ceo pod') || q.includes('revops')) {
      const p = kb.projects[2];
      return `**${p.title}** uses a **CEO → Engineering → ML Pod architecture** where specialized agents coordinate automatically for healthcare data auditing.\n\nThis design pattern is available as a consulting service — ideal for organizations with complex multi-step workflows.`;
    }

    // ── Google Search Grounding / Market Intelligence ──
    if (q.includes('market intelligence') || q.includes('search grounding') || q.includes('google search') || q.includes('discovery engine')) {
      return `Thanuka builds **Real-time Market Intelligence** systems using **Google Search Grounding** to give AI agents live awareness of industry data. Combined with **RAG-driven Discovery Engines**, these auto-personalize outputs at scale — a key feature in CareerForge AI 3.0.`;
    }

    // ── Agentic Auditing ──
    if (q.includes('agentic audit') || q.includes('operational bottleneck') || (q.includes('audit') && q.includes('ai'))) {
      return `**Agentic Auditing** is one of Thanuka's specialized offerings. He designs autonomous systems that:\n• Map existing workflows end-to-end\n• Identify inefficiencies and cost-draining processes\n• Generate prioritized remediation roadmaps\n\nThis approach reduced manual audit effort by **40%** at Collective RCM.`;
    }

    // ── Experience / Work History ──
    if (q.includes('experience') || q.includes('work history') || q.includes('collective rcm') || q.includes('current job') || q.includes('current role') || q.includes('where do you work')) {
      const [e1, e2] = kb.experience;
      return `**Current Role:** ${e1.role} @ ${e1.company} (${e1.period})\n→ ${e1.focus}\n\n**Also:** ${e2.role} (${e2.period})\n→ ${e2.focus}`;
    }

    // ── Tech Stack ──
    if (q.includes('tech stack') || q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('framework') || q.includes('tool') || q.includes('what do you use') || q.includes('what tech')) {
      return `Thanuka's technical arsenal:\n\n🤖 **AI/ML:** Gemini 3.1, LangChain, FAISS, Scikit-learn, Neural Networks\n🌐 **Web:** Next.js 15, React 19, Flask, FastAPI\n🗄️ **Data:** PostgreSQL, MongoDB, Redis, MySQL\n☁️ **Cloud:** Azure, GCP, Docker\n⚙️ **DevOps:** GitHub Actions, CI/CD, Playwright`;
    }

    // ── Education ──
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('master') || q.includes('msc') || q.includes('greenwich') || q.includes('study') || q.includes('qualification')) {
      const [e1, e2] = kb.education;
      return `**${e1.degree}**\n📍 ${e1.institution} (${e1.period})\nFocus: ${e1.focus}\n\n**${e2.degree}**\n📍 ${e2.institution} (${e2.period})\nFocus: ${e2.focus}`;
    }

    // ── Predictive Analytics / Healthcare ──
    if (q.includes('predictive') || q.includes('analytics') || q.includes('forecast') || q.includes('machine learning') || q.includes('ml') || q.includes('healthcare') || q.includes('rcm')) {
      return `Thanuka's predictive analytics work achieves **R² > 0.90** accuracy:\n\n• **Random Forest + Neural Networks** for payment behavior forecasting\n• **Scikit-learn** pipelines for Healthcare RCM optimization\n• **XGBoost** ensemble models for sentiment analysis at scale\n• Executive dashboards for C-suite KPI visibility`;
    }

    // ── Location ──
    if (q.includes('location') || q.includes('where are you') || q.includes('where is he') || q.includes('colombo') || q.includes('sri lanka') || q.includes('country') || q.includes('based')) {
      return `Thanuka is based in **Colombo, Sri Lanka** 🇱🇰 and works with global teams across the US, UK, and beyond. He's available for remote consulting worldwide.`;
    }

    // ── Services Overview ──
    if (q.includes('service') || q.includes('offer') || q.includes('what can you do') || q.includes('what do you do') || q.includes('help me with') || q.includes('what do you offer')) {
      return `Thanuka offers **4 core service domains**:\n\n1️⃣ **AI & Autonomous Systems** — Multi-agent architectures, RAG pipelines, Voice AI\n2️⃣ **Full-Stack Enterprise Development** — Flask/SQL platforms, 2FA, CI/CD on Azure/GCP\n3️⃣ **Predictive Analytics & Data Science** — RCM forecasting (R² > 0.90)\n4️⃣ **Data Engineering & Infrastructure** — ETL pipelines, Redis, distributed systems\n\nWhich area fits your needs?`;
    }

    // ── Pricing / Quote ──
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('quote') || q.includes('charge') || q.includes('fee') || q.includes('how much')) {
      return `Consulting engagements are scoped per project. For a custom estimate:\n\n1. Head to the **Strategic Inquiry** page\n2. Describe your requirements and timeline\n3. Thanuka will respond with a formal proposal within **24 hours**`;
    }

    // ── Book / Meeting / Contact ──
    if (q.includes('book') || q.includes('meeting') || q.includes('call') || q.includes('schedule') || q.includes('consult') || q.includes('contact') || q.includes('hire')) {
      return `Ready to connect? Here's how:\n\n📅 **Book a Strategy Call** → Head to the Strategic Inquiry page\n📧 **Email:** thanuka.ellepola@gmail.com\n📞 **Phone:** +94 77 670 5832\n🔗 **LinkedIn:** linkedin.com/in/thanuka-ellepola-a559b01aa\n\nHe typically responds within 24 hours.`;
    }

    // ── Who is / About (LAST generic catch — after all specific topics) ──
    if (
      q.includes('who is') ||
      q.includes('about thanuka') ||
      q.includes('about you') ||
      q.includes('about yourself') ||
      q.includes('tell me about you') ||
      q.includes('tell me about thanuka') ||
      q.includes('introduce yourself') ||
      q.includes('who are you')
    ) {
      return `**Thanuka Ellepola** is a Colombo-based **AI Architect & Data Scientist** with 5+ years at the intersection of enterprise technology and AI.\n\n🔹 **Currently:** Assistant Manager & Lead Architect @ Collective RCM\n🔹 **Pursuing:** MSc Business Analytics @ University of Colombo\n🔹 **Specialties:** Autonomous Agents, RAG Pipelines, Full-Stack Enterprise\n\nHe's available for strategic consulting. Want to hear about his projects or services?`;
    }

    // ── Off-topic ──
    if (q.includes('weather') || q.includes('joke') || q.includes('capital of') || q.includes('sport') || q.includes('game')) {
      return `My intelligence is scoped to Thanuka's professional world! 😄 I can tell you about:\n\n• His **Autonomous AI Agent** architectures\n• **Full-Stack Enterprise** platforms\n• His **RAG & LangChain** expertise\n• How to **book a consultation**\n\nWhich interests you?`;
    }

    // ── Dynamic Fallback ──
    const fallbacks = [
      `I don't have a precise match for that, but I can give detailed info on Thanuka's **AI & Autonomous Systems** work or his **Full-Stack Enterprise** projects. Which interests you?`,
      `Could you rephrase? I have deep context on his **multi-agent architectures**, **RAG pipelines**, **enterprise platforms**, and **consulting services**.`,
      `Try asking about a specific project (e.g. "Tell me about RevOps AI") or a service area. I'm ready!`
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }, []);

  const handleSend = useCallback(async (overrideInput?: string) => {
    const userMsg = (overrideInput ?? input).trim();
    if (!userMsg || userMsg.length > 600 || isTyping) return;

    // Use ref-based IDs — never stale, always unique across calls
    const userId = nextId();
    const botId = nextId();

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, id: userId }]);
    setIsTyping(true);

    // Run through RAG step animation
    for (const step of RAG_STEPS) {
      setRagStatus(step);
      await new Promise(r => setTimeout(r, 350 + Math.random() * 250));
    }

    const response = buildResponse(userMsg);
    setRagStatus(null);
    setIsTyping(false);

    // Typing simulation — stream word by word
    setMessages(prev => [...prev, { role: 'bot', content: '', id: botId }]);

    const words = response.split(' ');
    let accumulated = '';
    for (let i = 0; i < words.length; i++) {
      accumulated += (i === 0 ? '' : ' ') + words[i];
      const snap = accumulated;
      setMessages(prev => prev.map(m => m.id === botId ? { ...m, content: snap } : m));
      await new Promise(r => setTimeout(r, 18 + Math.random() * 10));
    }
  }, [input, isTyping, buildResponse]);

  const clearHistory = () => {
    localStorage.removeItem('ai_inquisitor_v2_history');
    setMessages([{ role: 'bot', id: Date.now(), content: "History cleared. I'm ready — what would you like to know about Thanuka's work?" }]);
  };

  // Render message content with basic markdown (bold)
  const renderContent = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-foreground">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* FAB Button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.5, stiffness: 200 }}
          className="relative flex items-center gap-3"
        >
          {/* "Ask AI" label pill — visible when chat is closed */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="label"
                initial={{ opacity: 0, x: 12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.9 }}
                transition={{ delay: 1.2, duration: 0.3 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-xl border border-primary/20 shadow-lg text-xs font-black tracking-wide text-primary whitespace-nowrap"
              >
                <Sparkles size={10} className="text-primary" />
                Ask AI
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Button
              onClick={() => setIsOpen(o => !o)}
              size="icon"
              aria-label="Toggle AI Assistant"
              className={cn(
                "w-16 h-16 rounded-full shadow-2xl transition-colors duration-300",
                isOpen
                  ? "bg-secondary/80 text-foreground backdrop-blur-xl border border-border/50"
                  : "bg-primary text-primary-foreground shadow-primary/30"
              )}
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.div>
                  : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageSquare size={22} /></motion.div>
                }
              </AnimatePresence>
            </Button>

            {/* Pulse badge */}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-28 right-4 sm:right-8 w-[min(420px,calc(100vw-2rem))] h-[580px] bg-background/98 backdrop-blur-3xl border border-primary/15 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] z-[100] flex flex-col overflow-hidden"
            style={{ boxShadow: '0 0 0 1px hsl(var(--primary)/0.08), 0 32px 64px -12px rgba(0,0,0,0.5)' }}
          >
            {/* Header */}
            <div className="p-5 border-b border-border/40 bg-gradient-to-r from-primary/8 to-transparent flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                    <Sparkles size={18} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight">AI Inquisitor</h3>
                  <div className="flex items-center gap-1.5">
                    <Zap size={9} className="text-primary" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">RAG-Powered · v2.0</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearHistory} className="w-8 h-8 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all" title="Clear History">
                <Trash2 size={14} />
              </Button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-grow overflow-y-auto p-5 space-y-4 scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--primary)/0.2) transparent' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                    msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  )}>
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={cn(
                    'px-4 py-3 rounded-2xl max-w-[82%] text-sm leading-relaxed whitespace-pre-line',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm font-medium'
                      : 'bg-secondary/40 border border-border/40 rounded-tl-sm text-foreground/90'
                  )}>
                    {renderContent(msg.content)}
                  </div>
                </motion.div>
              ))}

              {/* RAG thinking indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                    <Bot size={12} />
                  </div>
                  <div className="bg-secondary/40 border border-border/40 px-4 py-3 rounded-2xl rounded-tl-sm flex flex-col gap-2 min-w-[160px]">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
                      <Loader2 size={10} className="animate-spin" />
                      {ragStatus || 'Processing...'}
                    </div>
                    <div className="flex gap-1 px-0.5">
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[130px] right-6 w-8 h-8 bg-primary/80 text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-all z-10"
                >
                  <ChevronDown size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Quick Prompts */}
            <div className="px-5 pb-1 flex gap-2 overflow-x-auto shrink-0 hide-scrollbar">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  disabled={isTyping}
                  className="shrink-0 text-[10px] font-bold px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all disabled:opacity-40 whitespace-nowrap"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 pt-2 border-t border-border/40 bg-secondary/10 shrink-0">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about AI systems, projects, consulting..."
                  maxLength={600}
                  disabled={isTyping}
                  className="w-full bg-background/70 border border-border/50 rounded-xl py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all placeholder:text-muted-foreground/40 disabled:opacity-60"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/15 disabled:opacity-30 rounded-lg transition-all"
                >
                  <Send size={15} />
                </button>
              </div>
              <p className="text-[9px] text-muted-foreground/30 mt-2 text-center font-bold uppercase tracking-widest">
                Powered by RAG · Portfolio Intelligence Engine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
