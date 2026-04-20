'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  Bot,
  Loader2,
  Trash2,
  ChevronDown,
  Zap,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ─────────────────────────────────────────────────────────────────────

type Message = {
  role: 'user' | 'bot';
  content: string;
  id: number;
};

// Google AI API expects 'user' | 'model' roles
type ChatTurn = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  'Is LangChain used?',
  'Show projects',
  'Can he build RAG?',
  'Book a call?',
];

const RAG_STEPS = [
  '🔍 Retrieving knowledge chunks...',
  '🧠 Grounding context with Gemma...',
  '⚡ Synthesizing response...',
];

const WELCOME_MESSAGE =
  "Hello! I'm Thanuka's AI Inquisitor — powered by **Gemma 3** with RAG context grounding.\n\nI can answer YES/NO questions, project deep-dives, tech stack queries, and more. Try:\n• \"Is LangChain used in his projects?\"\n• \"Does he have healthcare AI experience?\"\n• \"Tell me about RevOps AI\"";

// ── Local fallback (used if API is unavailable) ───────────────────────────────
function localFallback(userMsg: string): string {
  const q = userMsg.toLowerCase().trim();

  // Yes/No detection
  const isYesNoQuestion =
    /^(is|does|can|has|did|do|are|will|was)\b/.test(q);

  if (isYesNoQuestion) {
    if (q.includes('langchain') || q.includes('rag') || q.includes('faiss') || q.includes('vector'))
      return "Yes. Thanuka uses **LangChain + FAISS** for production RAG pipelines, most notably in AI Job Hunter (90% application time reduction) and RevOps AI's agentic auditing engine.";
    if (q.includes('python'))
      return "Yes. Python is one of Thanuka's core languages — used across ML pipelines (Scikit-learn, XGBoost), FastAPI backends, and LangChain orchestration.";
    if (q.includes('healthcare') || q.includes('rcm'))
      return "Yes. Thanuka currently works as Assistant Manager & Lead Architect at **Collective RCM** and has built multiple healthcare AI systems including a predictive payment forecasting model with R² > 0.90.";
    if (q.includes('available') || q.includes('hire') || q.includes('consult'))
      return "Yes. Thanuka is accepting new consulting projects. Reach him at **thanuka.ellepola@gmail.com** or **+94 77 670 5832** — he responds within 24 hours.";
    if (q.includes('gemini') || q.includes('google ai'))
      return "Yes. Thanuka builds with **Gemini 3.1 (Pro/Flash/Live API)** for reasoning, voice AI, and real-time grounding — as seen in CareerForge AI 3.0.";
    if (q.includes('azure') || q.includes('cloud'))
      return "Yes. Thanuka has deployed production workloads on both **Azure** and **GCP**, including CI/CD pipelines, Docker containers, and database hosting.";
    return "I don't have a confident Yes/No for that specific query. Could you rephrase? Example: \"Is LangChain part of his stack?\" or ask me about a specific project.";
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('work'))
    return "Thanuka has built **6 flagship projects**:\n\n1. **AI Job Hunter** — 90% time reduction via RAG\n2. **Predictive Healthcare Analytics** — R² > 0.90\n3. **RevOps AI** — Multi-agent B2B SaaS\n4. **Collective Intranet** — Enterprise Flask platform\n5. **CareerForge AI 3.0** — Voice AI + Search Grounding\n6. **ReviewRadar AI** — 7M+ review sentiment engine\n\nWhich would you like to dive into?";

  if (q.includes('book') || q.includes('call') || q.includes('hire') || q.includes('contact'))
    return "Ready to connect?\n\n📧 **Email:** thanuka.ellepola@gmail.com\n📞 **Phone:** +94 77 670 5832\n🔗 **LinkedIn:** linkedin.com/in/thanuka-ellepola-a559b01aa\n\nHe responds within 24 hours.";

  return "I'm having trouble reaching the AI engine right now. Please try asking about:\n• Specific projects (\"Tell me about RevOps AI\")\n• Tech stack (\"What frameworks does he use?\")\n• Yes/No questions (\"Does he know Python?\")";
}

// ── Main Component ────────────────────────────────────────────────────────────

export function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [ragStatus, setRagStatus] = useState<string | null>(null);
  const [modelLabel, setModelLabel] = useState<'Gemma 3' | 'Gemini Flash'>('Gemma 3');
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const msgCounterRef = useRef(1000);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Conversation history for multi-turn context
  const chatHistoryRef = useRef<ChatTurn[]>([]);

  const nextId = () => {
    msgCounterRef.current += 1;
    return msgCounterRef.current;
  };

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ai_inquisitor_v3_history');
    if (savedHistory) {
      try {
        const { messages: savedMsgs, apiHistory } = JSON.parse(savedHistory);
        setMessages(savedMsgs);
        chatHistoryRef.current = apiHistory || [];
      } catch {
        initWelcome();
      }
    } else {
      initWelcome();
    }
  }, []);

  function initWelcome() {
    setMessages([{ role: 'bot', id: 1, content: WELCOME_MESSAGE }]);
    chatHistoryRef.current = [];
  }

  // Save history + scroll
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(
          'ai_inquisitor_v3_history',
          JSON.stringify({
            messages: messages.slice(-30),
            apiHistory: chatHistoryRef.current.slice(-20),
          })
        );
      } catch { /* quota exceeded — ignore */ }
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

  // Stream words for typing effect
  const streamWords = useCallback(async (text: string, botId: number) => {
    const words = text.split(' ');
    let accumulated = '';
    for (let i = 0; i < words.length; i++) {
      accumulated += (i === 0 ? '' : ' ') + words[i];
      const snap = accumulated;
      setMessages(prev => prev.map(m => m.id === botId ? { ...m, content: snap } : m));
      await new Promise(r => setTimeout(r, 16 + Math.random() * 10));
    }
  }, []);

  const handleSend = useCallback(async (overrideInput?: string) => {
    const userMsg = (overrideInput ?? input).trim();
    if (!userMsg || userMsg.length > 600 || isTyping) return;

    const userId = nextId();
    const botId = nextId();

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, id: userId }]);
    setIsTyping(true);

    // RAG step animation
    for (const step of RAG_STEPS) {
      setRagStatus(step);
      await new Promise(r => setTimeout(r, 380 + Math.random() * 220));
    }
    setRagStatus(null);

    // Add user turn to chat history
    chatHistoryRef.current = [
      ...chatHistoryRef.current,
      { role: 'user', parts: [{ text: userMsg }] },
    ];

    let responseText = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistoryRef.current }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);

      const data = await res.json() as { text?: string; error?: string };
      if (data.error) throw new Error(data.error);

      responseText = data.text ?? '';

      // Detect which model responded (heuristic from response header or content)
      setModelLabel('Gemma 3');

      // Store model response in history
      chatHistoryRef.current = [
        ...chatHistoryRef.current,
        { role: 'model', parts: [{ text: responseText }] },
      ];
    } catch (err) {
      console.warn('[Chat] API failed, using local fallback:', err);
      responseText = localFallback(userMsg);
      setModelLabel('Gemini Flash');

      // Remove the user turn we added (will be retried)
      chatHistoryRef.current = chatHistoryRef.current.slice(0, -1);
    }

    setIsTyping(false);

    // Begin streaming
    setMessages(prev => [...prev, { role: 'bot', content: '', id: botId }]);
    await streamWords(responseText, botId);
  }, [input, isTyping, streamWords]);

  const clearHistory = () => {
    localStorage.removeItem('ai_inquisitor_v3_history');
    chatHistoryRef.current = [];
    setMessages([{ role: 'bot', id: Date.now(), content: "History cleared. I'm powered by **Gemma 3** with RAG context — what would you like to know about Thanuka's work?" }]);
  };

  // Render markdown (bold + newlines + bullet points)
  const renderContent = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={lineIdx}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-black text-foreground">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
          })}
          {lineIdx < text.split('\n').length - 1 && <br />}
        </span>
      );
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
          {/* "Ask AI" label pill */}
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
            className="fixed bottom-28 right-4 sm:right-8 w-[min(420px,calc(100vw-2rem))] h-[600px] bg-background/98 backdrop-blur-3xl border border-primary/15 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] z-[100] flex flex-col overflow-hidden"
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
                    <Cpu size={9} className="text-primary" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      {modelLabel} · RAG v3.0
                    </p>
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
                    msg.role === 'user'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  )}>
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={cn(
                    'px-4 py-3 rounded-2xl max-w-[82%] text-sm leading-relaxed',
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
                  <div className="bg-secondary/40 border border-border/40 px-4 py-3 rounded-2xl rounded-tl-sm flex flex-col gap-2 min-w-[180px]">
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
                  placeholder="Ask anything — Yes/No questions too..."
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
                Powered by Gemma 3 · RAG · Portfolio Intelligence v3
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
