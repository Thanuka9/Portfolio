'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Calendar, Clock, ArrowRight, Filter, Sparkles, Brain, Code, Stethoscope } from 'lucide-react';
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
      slug: 'building-production-rag-pipelines-2026',
      title: 'Building Production-Ready RAG Pipelines: Beyond Simple Vector Search',
      excerpt: 'Moving past naive semantic search into advanced retrieval-augmented generation. Exploring hybrid indexing, query rewriting, reranking, and verification gates for enterprise deployment.',
      category: 'AI Engineering',
      date: 'May 18, 2026',
      readTime: '6 min read',
      icon: Code,
      featured: true
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
