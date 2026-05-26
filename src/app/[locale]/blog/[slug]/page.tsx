import React from 'react';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, BookOpen, User, Tag, Sparkles, AlertCircle, Quote } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';

interface BlogPostContent {
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  sections: Array<{
    heading?: string;
    paragraphs: string[];
    code?: {
      language: string;
      snippet: string;
      caption?: string;
    };
    callout?: string;
    quote?: string;
  }>;
}

const articlesData: Record<string, BlogPostContent> = {
  'building-production-rag-pipelines-2026': {
    title: 'Building Production-Ready RAG Pipelines: Beyond Simple Vector Search',
    category: 'AI Engineering',
    date: 'May 18, 2026',
    readTime: '6 min read',
    summary: 'Moving past naive semantic search into advanced retrieval-augmented generation. Exploring hybrid indexing, query rewriting, reranking, and verification gates for enterprise deployment.',
    sections: [
      {
        heading: 'The Fallacy of Naive RAG',
        paragraphs: [
          'Many engineers begin their retrieval-augmented generation (RAG) journey by loading a few PDFs into a vector database, embedding them with a standard API, and querying them directly. While this works beautifully for simple demos, it fails spectacularly in production enterprise environments.',
          'In production, naive semantic search suffers from multiple flaws: poor retrieval recall due to bad chunking, out-of-context retrieval, lost-in-the-middle phenomena in LLM context windows, and hallucination loops. To build enterprise-grade systems, we must construct a highly engineered retrieval and verification lifecycle.'
        ]
      },
      {
        heading: '1. Multi-Stage Retrieval and Reranking',
        paragraphs: [
          'First-stage retrieval needs to be broad and fast. We combine traditional keyword search (BM25) with dense vector search (semantic similarity) using a hybrid index. By blending keyword precision with semantic understanding, we capture both specific jargon and conceptual matches.',
          'Once the top 50 documents are retrieved, we run them through a cross-encoder reranking model (like Cohere Rerank or BGE-Reranker). Reranking computes a direct attention-based similarity score between the user query and each document chunk, compressing our input to the top 5-10 highly relevant chunks and eliminating noise.'
        ]
      },
      {
        heading: '2. Query Rewriting and Expansion',
        paragraphs: [
          'Users rarely write optimal queries. A search query like "sales q3" is far too sparse. To solve this, we introduce an agentic query rewriter step before retrieval.',
          'The query rewriter analyzes conversation history, expands abbreviations, and generates 3 alternative phrasings of the query. We perform vector searches for all variants and merge the results using Reciprocal Rank Fusion (RRF).'
        ],
        code: {
          language: 'typescript',
          snippet: `// Example of Query Expansion Node in LangChain
async function queryExpanderNode(state: AgentState) {
  const llm = new ChatOpenAI({ modelName: "gpt-4o", temperature: 0 });
  const response = await llm.invoke([
    new SystemMessage("Expand the user query into 3 distinct search queries optimized for vector database retrieval. Return as a JSON array of strings."),
    new HumanMessage(state.latestQuery)
  ]);
  
  const expandedQueries = JSON.parse(response.content) as string[];
  return { ...state, searchQueries: [state.latestQuery, ...expandedQueries] };
}`,
          caption: 'Query rewrite module inside our agent pipeline'
        }
      },
      {
        heading: '3. Grounding and Verification Gates',
        paragraphs: [
          'Even with perfect retrieval, language models can hallucinate. To guarantee trust, we implement a post-generation verification gate.',
          'The verification gate parses the LLM output, extracts key claims, and traces each claim back to the source chunks. If a claim lacks supporting evidence (low grounding score), the response is rejected, and the agent initiates a secondary retrieval loop to seek better context.'
        ],
        callout: 'Grounding verification gates are the difference between a prototype that occasionally lies and an enterprise system with a guaranteed SLA for factual accuracy.'
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Scaling RAG is not about using a bigger LLM; it is about engineering the data flow. By incorporating hybrid search, rerankers, query rewriting, and grounding checks, you turn a fragile chatbot into a robust decision-support system.'
        ]
      }
    ]
  },
  'healthcare-rcm-payment-prediction': {
    title: 'Machine Learning for Future Payment Prediction in Healthcare Revenue Cycle Management',
    category: 'Data Science',
    date: 'April 29, 2026',
    readTime: '8 min read',
    summary: 'A focused industry research paper on transaction-level payment prediction in healthcare Revenue Cycle Management (RCM) comparing Linear Regression, Decision Trees, Random Forests, and Neural Networks on a chronological hold-out evaluation.',
    sections: [
      {
        heading: 'Executive Summary',
        paragraphs: [
          'This research paper focuses on Future Payment Prediction within Healthcare Revenue Cycle Management (RCM). The study addresses a core operational question: can historical, de-identified billing data be used to predict the fraction of an individual healthcare bill that will be paid within 90 days, and can that prediction improve revenue-cycle prioritization?',
          'Broader experiments showed much weaker explanatory power for provider-level prediction (R² = 0.2934) and aggregate revenue forecasting (R² = 0.1246). In contrast, the Future Payment Prediction scenario achieved outstanding results, reaching R² = 0.9191 with a neural network and R² = 0.9102 with a random forest, justifying its focus as the primary operational optimization model.'
        ]
      },
      {
        heading: 'Abstract',
        paragraphs: [
          'Healthcare revenue cycle teams routinely prioritize accounts receivable using retrospective reports and manual judgment, yet these approaches often fail to identify which patient balances are most likely to remain unpaid. This paper presents a focused industry case study on Future Payment Prediction in healthcare RCM using de-identified historical billing data from a multi-facility healthcare system. The task is formulated as a transaction-level regression problem: predicting the fraction of each bill expected to be paid within 90 days.',
          'Four commonly used machine learning models were compared on a chronological hold-out evaluation: Linear Regression, Decision Tree, Random Forest, and Neural Network. The reported test-set results show strong predictive performance, with Linear Regression achieving MAE = 0.0060243 (R² = 0.7409), Decision Tree achieving MAE = 0.0019225 (R² = 0.8929), Random Forest achieving MAE = 0.0016033 (R² = 0.9102), and Neural Network achieving MAE = 0.0037950 (R² = 0.9191). The findings indicate that nonlinear models substantially outperform linear baselines for transaction-level payment prediction, while Random Forest provides the most attractive balance between absolute error and predictive stability.'
        ],
        callout: 'Performance Summary: Random Forest provides the lowest absolute error (MAE = 0.00160), while the Neural Network achieves the highest overall fit (R² = 0.9191).'
      },
      {
        heading: 'Introduction & Operational Significance',
        paragraphs: [
          'Revenue Cycle Management is the financial backbone of healthcare delivery because it connects patient encounters to charge capture, claims processing, reimbursement, and final payment collection. In practice, however, many RCM teams still operate reactively: accounts are followed up after delays emerge, work queues are broad rather than risk-based, and scarce staff time is spent on balances that may have very different probabilities of recovery.',
          'This study argues that predictive analytics can shift RCM from retrospective monitoring to proactive intervention by using historical billing and payment patterns to anticipate future account behavior. Account-level payment prediction is immediately actionable in industry settings because it can support collections prioritization, patient outreach, payment-plan assignment, and near-term cash-flow planning without requiring radical workflow redesign.'
        ]
      },
      {
        heading: 'Data and Methodological Framework',
        paragraphs: [
          'The study used retrospective financial records from a medium-sized healthcare system spanning 2022–2024. The transaction-level Future Payment Prediction scenario retained over 28,000 usable records after preprocessing. All Protected Health Information (PHI) was removed in line with HIPAA Safe Harbor expectations, which requires the removal of 18 categories of identifiers to protect patient privacy.',
          'The prediction target is the fraction of each bill expected to be paid within 90 days of billing, making the task a transaction-level regression problem on a bounded, normalized target. Features include: total charges, payments made so far, days since billing, payer type, prior payment history, service type, and whether the account was insured or self-pay. To evaluate performance reliably and avoid look-ahead leakage, the data were split chronologically into an 80% training set and a 20% hold-out evaluation set.'
        ],
        code: {
          language: 'python',
          snippet: `# Hyperparameter configurations selected via Grid Search
decision_tree_params = {
    'max_depth': 15,
    'min_samples_split': 2
}

random_forest_params = {
    'n_estimators': 200,
    'max_depth': 20,
    'min_samples_split': 2
}

neural_network_params = {
    'hidden_layer_sizes': (50, 50),
    'activation': 'relu',
    'learning_rate_init': 0.01
}`,
          caption: 'Best configurations from the grid search and temporal cross-validation pipelines'
        }
      },
      {
        heading: 'Results & Performance Patterns',
        paragraphs: [
          'The empirical comparison shows a clear pattern: linear models leave substantial predictive performance unused, while nonlinear models capture the threshold-driven relationships between billing attributes and eventual payment fractions. Random Forest achieved the lowest absolute error (MAE = 0.0016033), suggesting it offers the highest account-level prediction stability. The Neural Network achieved the highest overall fit (R² = 0.9191).',
          'For RCM operations, a scatter plot of predicted versus actual payments indicates that large-balance accounts remain a difficult edge case where raw-dollar deviations can be large even when normalized metrics are strong. A production system should therefore combine predicted payment propensity with claim size to flag high-value outlier claims for senior specialist review.'
        ],
        quote: 'Random Forest achieved the lowest absolute error (MAE = 0.0016033), providing the most stable basis for operational collections prioritization.'
      },
      {
        heading: 'Ethical Deployment & Continuous Auditing',
        paragraphs: [
          'In production, the model should be used to trigger supportive financial actions rather than punitive ones. A low predicted payment fraction should activate tailored outreach, payment-plan offers, or financial counseling, not discriminatory billing treatment.',
          'The cleanest deployment path is a nightly batch pipeline that runs inference on open accounts, writes risk scores back into collections queues, and monitors error drift across payers and facilities over time.',
          'Additional project repositories can be found on my GitHub profile (https://github.com/Thanuka9) and professional publications are documented on LinkedIn (https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/).'
        ]
      },
      {
        heading: 'References',
        paragraphs: [
          '[1] ICTer 2026 Industry R&D Track, official call for papers.',
          '[2] Springer, Instructions for Using the Microsoft Word Proceedings Paper Template.',
          '[3] U.S. Department of Health and Human Services, Guidance Regarding HIPAA Privacy Rule De-identification.',
          '[4] Breiman, L.: Random Forests. Machine Learning 45(1), 5–32 (2001).',
          '[5] Pedregosa, F., et al.: Scikit-learn: Machine Learning in Python. Journal of Machine Learning Research 12, 2825–2830 (2011).'
        ]
      }
    ]
  },
  'autonomous-agents-vs-traditional-automation': {
    title: 'Autonomous Agents vs. Traditional Automation: A Field Report',
    category: 'Thought Leadership',
    date: 'March 14, 2026',
    readTime: '5 min read',
    summary: 'Deconstructing the architectural differences between rigid deterministic scripting and dynamic agentic orchestration. A review of agentic behavior in production workflows.',
    sections: [
      {
        heading: 'The Paradigm Shift',
        paragraphs: [
          'For decades, enterprise automation meant writing scripts. Whether it was RPA (Robotic Process Automation), cron jobs, or API integrations, traditional automation followed strict logical paths: "If X happens, do Y. Otherwise, do Z."',
          'While highly reliable for structured environments, this rigid approach breaks the moment it encounters unexpected inputs, layout changes, or unstructured text. Autonomous AI agents represent a massive shift: moving from instructions to goals.'
        ]
      },
      {
        heading: 'What is an Autonomous Agent?',
        paragraphs: [
          'An agent is an LLM wrapped in a loop that can reason, plan, select tools, and evaluate its own progress. Instead of telling the system *how* to do a task, we give it a *goal* ("Find the public pricing page on this website and extract the tier costs").',
          'The agent decides which pages to visit, handles captchas or cookie banners dynamically, parses the table, checks if the output matches the schema, and corrects itself if it hits an error.'
        ]
      },
      {
        heading: 'Architectural Comparison',
        paragraphs: [
          'Traditional automation relies on API integrations or rigid selector bindings (CSS/XPath) in browser automation. A small UI rewrite breaks the entire system.',
          'An agentic system uses vision models or LLMs to read the DOM semantically. If a button moves from the left column to the right, or the text changes from "Submit" to "Apply Now", the agent still understands the intent and clicks the element.'
        ]
      },
      {
        heading: 'The multi-agent coordinator pattern',
        paragraphs: [
          'In complex tasks, a single agent can lose track of its goal. The best practice is the Coordinator-Worker pattern. We design multiple specialized agent pods:',
          '1. **CEO Agent**: Plans the task list, delegates steps to workers, and monitors progress.',
          '2. **Research Agent**: Scans database tables or reads external links.',
          '3. **Quality Assurance Agent**: Validates output format and checks for factual alignment before final output.'
        ]
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'While agents are more computationally expensive and slower than deterministic scripts, their resilience to change makes them highly cost-effective for complex, unstructured enterprise processes.'
        ]
      }
    ]
  }
};

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `https://thanukaellepola.careers/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://thanukaellepola.careers/blog/${slug}`,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 lg:px-8 animate-reveal">
      {/* Back Button */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-12 font-bold group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Articles
      </Link>

      <article className="space-y-12">
        {/* Header Metadata */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-black tracking-wider uppercase">
              <Tag size={12} />
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-black font-headline tracking-tighter leading-tight text-foreground">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground font-medium leading-relaxed italic border-l-2 border-primary/30 pl-4 py-1 bg-primary/5 rounded-r-2xl">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-primary/5 text-sm font-bold text-muted-foreground/80">
            <span className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              Thanuka Ellepola
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-foreground leading-relaxed font-medium">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-xl lg:text-2xl font-black tracking-tight text-foreground pt-6 flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  {section.heading}
                </h2>
              )}
              
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-muted-foreground leading-relaxed text-base font-normal">
                  {p}
                </p>
              ))}

              {section.callout && (
                <div className="p-6 rounded-[2rem] glass-panel border-primary/20 bg-primary/5 flex items-start gap-4 my-6">
                  <AlertCircle className="text-primary shrink-0 w-6 h-6 mt-0.5" />
                  <p className="text-sm font-bold text-foreground leading-relaxed">
                    {section.callout}
                  </p>
                </div>
              )}

              {section.quote && (
                <div className="relative p-8 rounded-[2.5rem] glass-panel border-primary/10 my-8">
                  <Quote size={40} className="absolute -top-4 left-6 text-primary/10" />
                  <p className="text-lg italic font-headline font-bold text-primary leading-relaxed pl-6">
                    "{section.quote}"
                  </p>
                </div>
              )}

              {section.code && (
                <div className="space-y-2 my-6">
                  <div className="rounded-2xl border border-primary/10 overflow-hidden bg-[#0a0f1d] text-left">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-primary/5 bg-[#0e1428] text-xs font-bold text-muted-foreground/80">
                      <span>{section.code.language}</span>
                      <span className="text-[10px] uppercase tracking-wider text-primary">Neural Code Block</span>
                    </div>
                    <pre className="p-4 text-xs font-mono overflow-x-auto text-[#e2e8f0] leading-relaxed">
                      <code>{section.code.snippet}</code>
                    </pre>
                  </div>
                  {section.code.caption && (
                    <p className="text-xs text-muted-foreground/75 font-semibold text-center italic">
                      {section.code.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="pt-12 border-t border-primary/5 flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-bold group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All Articles
          </Link>
          <div className="text-xs font-bold text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.
          </div>
        </footer>
      </article>
    </div>
  );
}

// Generate static params for optimal statically generated pages in Next.js
export async function generateStaticParams() {
  const slugs = ['building-production-rag-pipelines-2026', 'healthcare-rcm-payment-prediction', 'autonomous-agents-vs-traditional-automation'];
  
  // Return arrays of params for each locale / slug combo
  const locales = ['en', 'es', 'zh'];
  const params: Array<{ locale: string; slug: string }> = [];
  
  locales.forEach(locale => {
    slugs.forEach(slug => {
      params.push({ locale, slug });
    });
  });
  
  return params;
}
