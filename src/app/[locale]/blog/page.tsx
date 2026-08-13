'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Calendar, Clock, ArrowRight, Filter, Brain, Code, Stethoscope, Landmark, ShoppingBag, TrendingUp, Layers, Sigma, MessageSquareText, Bot, Zap, Server, Table2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'AI Engineering' | 'Data Science' | 'Thought Leadership';
  date: string;
  readTime: string;
  icon: React.ComponentType<any>;
  featured?: boolean;
}

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Engineering', 'Data Science', 'Thought Leadership'];

  const posts: BlogPost[] = [
    {
      slug: 'reviewradar-sentiment-ensemble-metrics',
      title: 'ReviewRadar AI: Ensemble Sentiment That Actually Moves the Metric',
      excerpt: 'Published evaluation metrics from model_metrics.json — an enhanced sentiment ensemble lifts accuracy from ~0.84 to 0.91 over prior pipelines on the Yelp review warehouse.',
      category: 'Data Science',
      date: 'August 12, 2026',
      readTime: '7 min read',
      icon: MessageSquareText,
      featured: true
    },
    {
      slug: 'job-hunter-autonomous-rag-agent',
      title: 'Job Hunter: An Autonomous RAG Agent That Applies With Evidence',
      excerpt: 'FAISS-backed career persona retrieval plus Playwright form filling under a zero-hallucination policy — rank first, then apply only with grounded answers.',
      category: 'AI Engineering',
      date: 'August 10, 2026',
      readTime: '7 min read',
      icon: Bot
    },
    {
      slug: 'revops-ai-multi-agent-rcm-auditing',
      title: 'RevOps AI: Multi-Agent Pods for Healthcare RCM Auditing',
      excerpt: 'FastAPI + React B2B SaaS combining heuristic RCM audits, sklearn payment forecasting, Monday.com sync, and specialised agent pods.',
      category: 'AI Engineering',
      date: 'August 8, 2026',
      readTime: '7 min read',
      icon: Zap
    },
    {
      slug: 'trainiq-multi-tenant-lms-local-ai',
      title: 'TrainIQ: Multi-Tenant LMS Isolation with Local AI',
      excerpt: 'Three-layer tenant isolation, Stripe billing, a CEO platform console, and an Ollama-local AI suite — without requiring cloud LLM keys.',
      category: 'AI Engineering',
      date: 'August 6, 2026',
      readTime: '8 min read',
      icon: Server
    },
    {
      slug: 'financial-sector-risk-analytics-pipeline',
      title: 'Reproducible Financial Analytics: Designing Pipelines That Survive the Next Revision',
      excerpt: 'A general methodology for turning messy financial source data into defensible indicators and risk signals — profiling before cleaning, separating pipeline stages, and generating every report from the same processed artefacts.',
      category: 'Data Science',
      date: 'August 5, 2026',
      readTime: '8 min read',
      icon: Landmark
    },
    {
      slug: 'monday-com-graphql-data-auditor',
      title: 'Monday.com GraphQL Data Auditor: Local Hygiene Without Zapier',
      excerpt: 'Streamlit + Monday GraphQL cursor pagination to find missing Files/Notes cells across boards and export clickable CSV remediation lists.',
      category: 'AI Engineering',
      date: 'August 4, 2026',
      readTime: '5 min read',
      icon: Table2
    },
    {
      slug: 'agentic-commerce-model-context-protocol',
      title: 'Agentic Commerce on MCP: From Multilingual Intent to a Completed Checkout',
      excerpt: 'A field report from the Kapruka Agent Challenge 2026 — building a shopping agent on the Model Context Protocol that parses English, Sinhala, and Tanglish intent into budget-aware cart plans and completes a real guest checkout.',
      category: 'AI Engineering',
      date: 'July 24, 2026',
      readTime: '7 min read',
      icon: ShoppingBag
    },
    {
      slug: 'reproducible-macroeconomic-forecasting',
      title: 'Reproducible Macroeconomic Forecasting: Pipelines Over Notebooks',
      excerpt: 'Forecasting macro indicators is far less about exotic model architectures than about disciplined data preparation, honest out-of-sample evaluation, and an output layer a policy audience can actually consume.',
      category: 'Data Science',
      date: 'July 8, 2026',
      readTime: '6 min read',
      icon: TrendingUp
    },
    {
      slug: 'multitask-deep-learning-scene-emission',
      title: 'One Backbone, Three Heads: Multitask Learning for Scene and Emission Estimation',
      excerpt: 'How a single ResNet-50 trunk can jointly predict Places365 scene categories, binary scene attributes, and a five-class carbon emission estimate — and what actually breaks when you fine-tune one head in isolation.',
      category: 'Data Science',
      date: 'June 20, 2026',
      readTime: '7 min read',
      icon: Layers
    },
    {
      slug: 'statistical-rigor-before-machine-learning',
      title: 'Statistical Rigor Before Machine Learning',
      excerpt: 'Gradient boosting will happily fit noise and report a confident number. A short case for running descriptive statistics, hypothesis tests, and dimensionality checks before reaching for a model.',
      category: 'Thought Leadership',
      date: 'June 6, 2026',
      readTime: '5 min read',
      icon: Sigma
    },
    {
      slug: 'building-production-rag-pipelines-2026',
      title: 'Building Production-Ready RAG Pipelines: Beyond Simple Vector Search',
      excerpt: 'Moving past naive semantic search into advanced retrieval-augmented generation. Exploring hybrid indexing, query rewriting, reranking, and verification gates for enterprise deployment.',
      category: 'AI Engineering',
      date: 'May 18, 2026',
      readTime: '6 min read',
      icon: Code
    },
    {
      slug: 'healthcare-rcm-payment-prediction',
      title: 'Machine Learning for Future Payment Prediction in Healthcare Revenue Cycle Management',
      excerpt: 'An industry case study comparing Linear Regression, Decision Tree, Random Forest, and Neural Networks on transaction-level billing data to predict payment propensity.',
      category: 'Data Science',
      date: 'April 29, 2026',
      readTime: '8 min read',
      icon: Stethoscope
    },
    {
      slug: 'autonomous-agents-vs-traditional-automation',
      title: 'Autonomous Agents vs. Traditional Automation: A Field Report',
      excerpt: 'Deconstructing the architectural differences between rigid deterministic scripting and dynamic agentic orchestration. A review of agentic behavior in production workflows.',
      category: 'Thought Leadership',
      date: 'March 14, 2026',
      readTime: '5 min read',
      icon: Brain
    }
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <div className="max-w-7xl mx-auto py-24 px-8 lg:px-12 animate-reveal">
      {/* Page Header */}
      <header className="space-y-6 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-black tracking-wider uppercase">
          <BookOpen size={12} />
          Intelligence Hub
        </div>
        <h1 className="text-4xl lg:text-7xl font-black font-headline tracking-tighter leading-none">
          Articles &amp; <span className="text-primary italic">Insights.</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed">
          Exploring the frontiers of enterprise AI, predictive modeling, and autonomous workflows. Practical field reports from engineering production systems.
        </p>
      </header>

      {/* Filters and Search controls */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between p-6 rounded-[2rem] glass-panel border-primary/10 mb-12">
        {/* Search */}
        <div className="relative flex-grow max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/30 border border-primary/5 focus:border-primary/30 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium placeholder-muted-foreground/60 outline-none focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-black uppercase tracking-wider mr-2">
            <Filter size={14} />
            Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.03]'
                  : 'bg-secondary/40 text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 rounded-[2.5rem] glass-panel border-primary/10">
          <p className="text-muted-foreground font-bold text-lg mb-2">No articles match your criteria.</p>
          <p className="text-sm text-muted-foreground/75">Try clearing filters or search terms.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured Post Card (only shown when 'All' is selected and search is empty) */}
          {featuredPost && selectedCategory === 'All' && !searchQuery && (
            <div className="group relative rounded-[2.5rem] glass-panel border-primary/10 hover:border-primary/20 transition-all overflow-hidden p-8 lg:p-12">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 pointer-events-none group-hover:bg-primary/8 transition-colors duration-500" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                      Featured Post
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground font-medium leading-relaxed max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-muted-foreground/80 pt-2">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-wider text-xs hover:gap-3 transition-all"
                    >
                      Read Full Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary group-hover:scale-110 duration-500 border border-primary/20">
                    <featuredPost.icon size={48} className="stroke-[1.5]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(selectedCategory !== 'All' || searchQuery ? filteredPosts : regularPosts).map((post, idx) => (
              <div
                key={post.slug}
                className="group relative rounded-[2.5rem] glass-panel border-primary/10 hover:border-primary/25 transition-all overflow-hidden p-8 flex flex-col justify-between"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 blur-[100px] rounded-full -ml-40 -mb-40 pointer-events-none group-hover:bg-primary/8 transition-colors duration-500" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-primary/70">
                      {post.category}
                    </span>
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary border border-primary/10">
                      <post.icon size={18} className="stroke-[1.5]" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-primary/5 mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary font-black uppercase tracking-wider text-[11px] hover:gap-2.5 transition-all"
                  >
                    Read <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
