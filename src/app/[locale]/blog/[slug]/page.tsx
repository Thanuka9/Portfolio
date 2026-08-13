import React from 'react';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, User, Tag, Sparkles, AlertCircle, Quote, Github } from 'lucide-react';
import { Link, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ArticleChart, type ArticleChartSpec } from '@/components/blog/article-chart';
import {
  ArticleStats,
  ArticleTable,
  type ArticleStat,
  type ArticleTableSpec,
} from '@/components/blog/article-blocks';

interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  code?: {
    language: string;
    snippet: string;
    caption?: string;
  };
  callout?: string;
  quote?: string;
  chart?: ArticleChartSpec;
  table?: ArticleTableSpec;
  stats?: ArticleStat[];
}

interface BlogPostContent {
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  /** Public repository the article draws on, surfaced as a link in the header. */
  repo?: { label: string; url: string };
  sections: ArticleSection[];
}

const articlesData: Record<string, BlogPostContent> = {
  'building-production-rag-pipelines-2026': {
    title: 'Building Production-Ready RAG Pipelines: Beyond Simple Vector Search',
    category: 'AI Engineering',
    date: 'May 18, 2026',
    readTime: '6 min read',
    summary: 'Moving past naive semantic search into advanced retrieval-augmented generation. Exploring hybrid indexing, query rewriting, reranking, and verification gates for enterprise deployment.',
    repo: { label: 'Thanuka9/Job-Hunter', url: 'https://github.com/Thanuka9/Job-Hunter' },
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
        ],
        table: {
          title: 'A production RAG stage map',
          headers: ['Stage', 'Job', 'Failure mode if skipped'],
          rows: [
            ['Ingest & chunk', 'Split CV / portfolio / docs into retrieval units', 'Lost context or giant noisy chunks'],
            ['Hybrid retrieve', 'BM25 + dense vectors for recall', 'Miss exact jargon or paraphrases'],
            ['Rerank', 'Cross-encoder compresses to top chunks', 'Noise floods the context window'],
            ['Ground & verify', 'Reject unsupported claims', 'Confident hallucinations ship'],
          ],
          caption: 'The same stage shape appears in Job Hunter: FAISS-backed persona retrieval, then an application agent that must answer only from retrieved career evidence.'
        }
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
          'The verification gate parses the LLM output, extracts key claims, and traces each claim back to the source chunks. If a claim lacks supporting evidence (low grounding score), the response is rejected, and the agent initiates a secondary retrieval loop to seek better context.',
          'Job Hunter applies the same discipline under a zero-hallucination policy: every application answer is synthesized from indexed CV, portfolio, and project exports rather than free-form invention. The pattern generalises to any high-stakes form or support workflow.'
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
        ],
        stats: [
          { label: 'Best R²', value: '0.9191', detail: 'Neural network, held-out test set' },
          { label: 'Lowest MAE', value: '0.00160', detail: 'Random Forest' },
          { label: 'Records', value: '28k+', detail: 'After preprocessing, 2022–2024' },
          { label: 'Models Compared', value: '4', detail: 'Linear, tree, forest, network' }
        ]
      },
      {
        heading: 'Choosing the right prediction target',
        paragraphs: [
          'The most important finding in this study is not which model won. It is that two of the three framings of the problem were not worth deploying at all.',
          'The same underlying dataset supports three plausible questions: how much of this specific bill will be paid, how will this provider perform overall, and what will total revenue be next period. Only the first is predictable to a useful standard. Aggregating away from the transaction destroys the very features — payer type, days since billing, prior payment history — that carry the signal.'
        ],
        table: {
          title: 'Explanatory power collapses as the prediction target aggregates',
          headers: ['Prediction scenario', 'Granularity', 'Test R²', 'Deployable'],
          rows: [
            ['Future Payment Prediction', 'Per transaction', '0.9191', 'Yes'],
            ['Provider-level prediction', 'Per provider', '0.2934', 'No'],
            ['Aggregate revenue forecasting', 'Per period', '0.1246', 'No']
          ],
          numeric: true,
          caption: 'Reported test-set results across the three scenarios explored in the study. The transaction-level framing is roughly three times more explanatory than the provider-level one and seven times more than aggregate forecasting.'
        },
        callout: 'Before comparing models, compare framings. A mediocre model on the right target beats a tuned model on the wrong one, and no amount of hyperparameter search recovers signal that aggregation has already destroyed.'
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
          'The empirical comparison shows a clear pattern: linear models leave substantial predictive performance unused, while nonlinear models capture the threshold-driven relationships between billing attributes and eventual payment fractions. Random Forest achieved the lowest absolute error (MAE = 0.0016033), suggesting it offers the highest account-level prediction stability. The Neural Network achieved the highest overall fit (R² = 0.9191).'
        ],
        chart: {
          type: 'bar',
          title: 'Test-set R² by model',
          xKey: 'model',
          yDomain: [0.7, 0.95],
          data: [
            { model: 'Linear Reg.', 'R²': 0.7409 },
            { model: 'Decision Tree', 'R²': 0.8929 },
            { model: 'Random Forest', 'R²': 0.9102 },
            { model: 'Neural Net', 'R²': 0.9191 }
          ],
          series: [{ key: 'R²', label: 'R²' }],
          caption: 'The jump from linear regression to any nonlinear model is worth roughly 15 points of R². The jump between the three nonlinear models is worth under 3. Most of the value came from abandoning linearity, not from tuning.',
          source: 'Chronological 80/20 hold-out evaluation reported in the paper'
        }
      },
      {
        heading: 'R² and MAE disagree, and the disagreement matters',
        paragraphs: [
          'Ranking by R² and ranking by mean absolute error produce different winners. The neural network explains the most variance, but the random forest is meaningfully more accurate on the average individual account — its MAE is roughly 58% of the network\'s.',
          'For a collections queue, MAE is the metric that maps onto the job. A specialist works one account at a time, so per-account error is what they experience. R² describes how well the model tracks the overall spread, which is a reporting concern rather than an operational one. This is why the paper recommends Random Forest for deployment despite the network posting the headline number.'
        ],
        chart: {
          type: 'bar',
          title: 'Mean absolute error by model (lower is better)',
          xKey: 'model',
          unit: '',
          data: [
            { model: 'Linear Reg.', MAE: 0.0060243 },
            { model: 'Decision Tree', MAE: 0.0019225 },
            { model: 'Random Forest', MAE: 0.0016033 },
            { model: 'Neural Net', MAE: 0.003795 }
          ],
          series: [{ key: 'MAE', label: 'MAE', color: 'hsl(160 84% 45%)' }],
          caption: 'Reversing the ranking: the neural network that led on R² sits third on absolute error, behind both tree-based models. Random Forest gives the lowest per-account error and therefore the most stable basis for prioritising individual balances.',
          source: 'Chronological 80/20 hold-out evaluation reported in the paper'
        },
        quote: 'Random Forest achieved the lowest absolute error (MAE = 0.0016033), providing the most stable basis for operational collections prioritization.'
      },
      {
        heading: 'Where the model is still weak',
        paragraphs: [
          'A scatter plot of predicted versus actual payments shows that large-balance accounts remain a difficult edge case. Normalized metrics stay strong because the target is a bounded fraction, but the same fractional error on a large balance translates into a much larger raw-dollar deviation.',
          'A production system should therefore never rank on predicted propensity alone. Combining propensity with claim size flags high-value outliers for senior specialist review, which keeps the model useful where it is reliable and keeps humans in the loop where it is not.'
        ]
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
        ],
        table: {
          title: 'Where each approach wins',
          headers: ['Dimension', 'Deterministic automation', 'Autonomous agent'],
          rows: [
            ['Input shape', 'Stable schemas / selectors', 'Messy DOM, prose, mixed tools'],
            ['Failure mode', 'Hard break on UI change', 'Slower, retryable reasoning'],
            ['Cost per run', 'Cheap and predictable', 'Higher token / compute cost'],
            ['Best fit', 'High-volume structured jobs', 'Unstructured recovery work'],
            ['Audit story', 'Exact replay of steps', 'Needs tool-call traces'],
          ],
          caption: 'Pick the cheaper instrument when the environment is stable; reserve agents for environments that rewrite themselves underneath you.'
        }
      },
      {
        heading: 'The multi-agent coordinator pattern',
        paragraphs: [
          'In complex tasks, a single agent can lose track of its goal. The best practice is the Coordinator-Worker pattern. We design multiple specialized agent pods:',
          '1. **CEO Agent**: Plans the task list, delegates steps to workers, and monitors progress.',
          '2. **Research Agent**: Scans database tables or reads external links.',
          '3. **Quality Assurance Agent**: Validates output format and checks for factual alignment before final output.'
        ],
        chart: {
          type: 'bar',
          title: 'Schematic cost vs resilience trade-off',
          illustrative: true,
          xKey: 'approach',
          yDomain: [0, 100],
          data: [
            { approach: 'RPA script', Resilience: 25, 'Relative cost': 15 },
            { approach: 'Hybrid tools', Resilience: 55, 'Relative cost': 40 },
            { approach: 'Multi-agent', Resilience: 85, 'Relative cost': 70 },
          ],
          series: [
            { key: 'Resilience', label: 'Resilience (schematic)' },
            { key: 'Relative cost', label: 'Relative cost (schematic)', color: 'hsl(38 92% 55%)' },
          ],
          caption: 'Not measurements — a sketch of the usual trade-off. Agents buy recovery under change; scripts buy cheap throughput when the world stays still.',
          source: 'Illustrative schematic only — not project telemetry'
        }
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'While agents are more computationally expensive and slower than deterministic scripts, their resilience to change makes them highly cost-effective for complex, unstructured enterprise processes.'
        ]
      }
    ]
  },
  'agentic-commerce-model-context-protocol': {
    title: 'Agentic Commerce on MCP: From Multilingual Intent to a Completed Checkout',
    category: 'AI Engineering',
    date: 'July 24, 2026',
    readTime: '9 min read',
    summary: 'A field report from the Kapruka Agent Challenge 2026 — building a shopping agent on the Model Context Protocol that parses English, Sinhala, and Tanglish intent into budget-aware cart plans and completes a real guest checkout.',
    repo: { label: 'Thanuka9/kapruka-flow-AI', url: 'https://github.com/Thanuka9/kapruka-flow-AI' },
    sections: [
      {
        heading: 'Search is the wrong primitive',
        paragraphs: [
          'Every e-commerce site asks the same thing of a shopper: translate what you actually want into keywords, then reconcile the results yourself. If your intent is "a birthday hamper for my sister in Kandy, under 15,000 rupees, delivered Saturday", the search box gives you no help at all. You become the planner, the price optimiser, and the delivery validator.',
          'Kapruka Flow AI, built for the Kapruka Agent Challenge 2026, inverts that. The primitive is intent, not search. You describe the outcome; the agent produces complete, priced, delivery-validated cart plans that you can compare and check out.'
        ],
        table: {
          title: 'What changes when intent replaces search',
          headers: ['Dimension', 'Traditional storefront', 'Kapruka Flow'],
          rows: [
            ['Primitive', 'Search → product → cart', 'Intent → plan → compare → checkout'],
            ['Matching', 'Keyword matching', 'Multilingual intent parsing (en / si / Tanglish)'],
            ['Output', 'A single cart', 'Four optimised plans'],
            ['Catalogue', 'Static browse', 'Live MCP search, enrich, validate, order'],
            ['Personalisation', 'Anonymous only', 'Accounts and order history shape future plans'],
            ['Transparency', 'AI hidden', 'Every MCP tool call visible in an activity feed']
          ],
          caption: 'The shift is not cosmetic. Each row moves work off the shopper and onto the agent, which is the only justification for putting a model in the path of a purchase at all.'
        }
      },
      {
        heading: 'Why MCP changes the integration story',
        paragraphs: [
          'The Model Context Protocol matters here for a boring but decisive reason: it turns a merchant catalogue into a typed, discoverable tool surface. Instead of scraping HTML or negotiating a bespoke partner API, the agent calls documented tools for product search, item enrichment, delivery validation, and order placement.',
          'That changes what you spend engineering effort on. Almost none of the build went into integration plumbing, and almost all of it went into the planning logic that sits above the tools. When the catalogue changes, the tool contract absorbs it.'
        ],
        callout: 'The public Kapruka MCP requires no API key, which means the agent can be demonstrated end to end by anyone — including judges — without credential provisioning. Removing auth friction from a demo is an underrated design decision.'
      },
      {
        heading: 'Parsing intent across three languages',
        paragraphs: [
          'Sri Lankan shoppers do not type in one language. They type in English, in Sinhala, and very often in Tanglish — Sinhala words written in Latin script, mixed freely with English. A model tuned only on clean English collapses on the third case, which is the most common one.',
          'The intent parser normalises across all three before any catalogue call happens. It extracts the same structured frame regardless of input language: recipient, occasion, product categories, budget ceiling, delivery city, and urgency. Everything downstream operates on that frame, so the planner never has to care which language the request arrived in.'
        ]
      },
      {
        heading: 'A deterministic planner beats a chatty model',
        paragraphs: [
          'The instinct in 2026 is to hand the whole problem to a large language model and let it call tools in a loop. I deliberately did not do that. Cart construction is a constrained optimisation problem: maximise relevance to the parsed intent while staying under a budget ceiling and respecting delivery constraints.',
          'That is a job for scoring and search, not for token sampling. The planner scores every candidate item against the intent frame, then fills the cart greedily against the budget with backtracking when a constraint is violated. The result is fast, reproducible, and free of the failure mode where the model invents a product that does not exist.'
        ],
        code: {
          language: 'python',
          snippet: `def build_plan(intent, candidates, budget, strategy):
    scored = sorted(
        (score_item(item, intent), item) for item in candidates
    )

    cart, spend = [], 0
    for relevance, item in reversed(scored):
        price = strategy.adjust(item.price)
        if spend + price > budget:
            continue                      # skip, keep filling
        if not delivery_ok(item, intent.city, intent.deadline):
            continue                      # validated via MCP, not guessed
        cart.append(item)
        spend += price

    return Plan(strategy.name, cart, spend, budget)`,
          caption: 'Cart construction as constrained search — deterministic, auditable, and impossible to hallucinate a SKU into.'
        }
      },
      {
        heading: 'Four plans instead of one cart',
        paragraphs: [
          'A single recommended cart forces a shopper to trust the agent blindly. Four plans invite a decision. Every request produces an Ideal plan balanced on relevance, a Cheaper plan that trades brand for budget headroom, a Premium plan that spends the full ceiling, and a Fast plan optimised for the earliest delivery date.',
          'Because the plans are generated from the same scored candidate pool, comparing them is cheap, and adjusting the budget slider re-optimises all four client-side in milliseconds. No round trip, no regeneration, no waiting on a model.'
        ],
        stats: [
          { label: 'Cart plans', value: '4', detail: 'Ideal · Cheaper · Premium · Fast' },
          { label: 'Languages', value: '3', detail: 'English, Sinhala, Tanglish' },
          { label: 'Catalogue', value: 'MCP', detail: 'Live search / enrich / validate / order' },
          { label: 'Auth for demo', value: 'None', detail: 'Public Kapruka MCP tools' },
        ],
        quote: 'Give a user one AI answer and they audit it. Give them four ranked options and they choose. Choice architecture is a trust mechanism.'
      },
      {
        heading: 'Making the agent auditable',
        paragraphs: [
          'Agentic systems fail in public when users cannot see what happened. The interface exposes a live MCP activity feed: every tool invocation, its arguments, and its result are visible while the plan is being assembled.',
          'This is not a debugging affordance that survived into production by accident. It is the product. When a shopper can watch the agent search the catalogue, enrich three candidate items, and validate delivery to their city, the plan stops being a black-box suggestion and becomes a traceable piece of work.'
        ]
      },
      {
        heading: 'What I would build next',
        paragraphs: [
          'The obvious extension is memory. Accounts and order history already personalise future plans, but the scoring function currently treats history as a static prior. Learning per-user weights from accepted and rejected plans would make the second visit meaningfully better than the first.',
          'The harder problem is negotiation. Real gift-buying involves trade-offs a shopper cannot articulate up front — they discover their preferences by seeing options. A planner that asks one well-chosen clarifying question, rather than assuming, would beat any amount of additional model capacity.'
        ]
      }
    ]
  },
  'multitask-deep-learning-scene-emission': {
    title: 'One Backbone, Three Heads: Multitask Learning for Scene and Emission Estimation',
    category: 'Data Science',
    date: 'June 20, 2026',
    readTime: '7 min read',
    summary: 'How a single ResNet-50 trunk can jointly predict Places365 scene categories, binary scene attributes, and a five-class carbon emission estimate — and what actually breaks when you fine-tune one head in isolation.',
    repo: {
      label: 'Thanuka9/Sustainable-Vision-Multitask-Scene-Emission-Estimation-Model',
      url: 'https://github.com/Thanuka9/Sustainable-Vision-Multitask-Scene-Emission-Estimation-Model',
    },
    sections: [
      {
        heading: 'Why one model instead of three',
        paragraphs: [
          'The Sustainable Vision project needed three predictions from a single photograph: which of the 365 Places categories the scene belongs to, which binary attributes describe it, and roughly how carbon-intensive the depicted environment is. The naive approach is three independently trained networks.',
          'That is wasteful and, more importantly, it throws away the strongest available signal. Carbon intensity is not a property you can read off pixels directly — it is inferred almost entirely from what the scene is. A highway, a coal plant, and a forest trail have wildly different emission profiles precisely because they are different scenes. Sharing a trunk lets the emission head borrow representations the scene head has already learned.'
        ]
      },
      {
        heading: 'The architecture: shared trunk, three heads',
        paragraphs: [
          'The backbone is a ResNet-50 pretrained on Places365. Above the pooled feature vector sit three independent heads: a 365-way softmax for scene category, a sigmoid layer for binary attribute prediction, and a five-way softmax for emission level running from very low to very high.',
          'Each head has its own loss, and the training objective is a weighted sum. Weighting matters more than the architecture. Left unweighted, the 365-way scene loss dominates the gradient and the emission head learns almost nothing.'
        ],
        code: {
          language: 'python',
          snippet: `class MultitaskResNet(nn.Module):
    def __init__(self, n_scenes=365, n_attrs=102, n_emission=5):
        super().__init__()
        backbone = resnet50(weights=Places365_Weights.DEFAULT)
        self.trunk = nn.Sequential(*list(backbone.children())[:-1])
        feat = backbone.fc.in_features

        self.scene_head    = nn.Linear(feat, n_scenes)
        self.attr_head     = nn.Linear(feat, n_attrs)
        self.emission_head = nn.Sequential(
            nn.Dropout(0.3), nn.Linear(feat, n_emission)
        )

    def forward(self, x):
        z = self.trunk(x).flatten(1)
        return self.scene_head(z), self.attr_head(z), self.emission_head(z)`,
          caption: 'Three heads over one trunk. The emission head gets dropout because its label set is the smallest and overfits first.'
        }
      },
      {
        heading: 'The label scarcity problem',
        paragraphs: [
          'Places365 gives you abundant scene labels. Nobody gives you abundant carbon emission labels for arbitrary photographs. This asymmetry is the central difficulty of the project, and it is a very common shape of problem in applied machine learning: the task you care about has the least data.',
          'The workable answer is to treat the emission head as a small supervised layer over a representation learned from the abundant task, and to accept that its confidence intervals are wider than the scene head. Pretending otherwise produces a model that looks precise and is not.'
        ],
        callout: 'When one head has orders of magnitude fewer labels than another, do not report their accuracies side by side without saying so. A 91% emission confidence and a 91% scene confidence are not the same claim.'
      },
      {
        heading: 'Fine-tuning without catastrophic forgetting',
        paragraphs: [
          'To adapt emission estimation to a narrower domain, the model was fine-tuned on the Intel Image Classification dataset. The critical constraint: fine-tuning touches only the emission head. The trunk and the scene head stay frozen.',
          'Unfreezing the trunk during a short fine-tune on a small, narrow dataset is the fastest way to destroy the Places365 representation that makes the whole architecture work. You gain a point of emission accuracy and lose the scene classifier entirely. Freezing is not a shortcut here; it is the correct decision.'
        ]
      },
      {
        heading: 'Reading the output honestly',
        paragraphs: [
          'A representative inference returns a top-5 scene distribution — street at 47.9%, downtown at 6.5%, and so on — alongside attribute probabilities and an emission estimate of medium at 91.6%.',
          'That 91.6% deserves scrutiny. A five-class softmax trained on limited labels is systematically overconfident, and the number reflects the model committing to a bucket rather than a calibrated probability that the true label is medium. Temperature scaling on a held-out split brings reported confidence much closer to observed accuracy, and costs nothing at inference time.'
        ],
        table: {
          title: 'Sample inference output (public README example)',
          headers: ['Head', 'Top prediction', 'Reported confidence'],
          rows: [
            ['Scene (Places365)', 'street', '47.91%'],
            ['Scene (2nd)', 'downtown', '6.50%'],
            ['Emission level', 'medium', '91.55%'],
          ],
          numeric: true,
          caption: 'Exact figures from the Sustainable Vision README sample run. The emission softmax looks precise; treat it as a class commitment until calibration is applied.',
        },
        chart: {
          type: 'bar',
          title: 'Sample scene top-2 vs emission confidence',
          xKey: 'label',
          yDomain: [0, 100],
          data: [
            { label: 'street', Confidence: 47.91 },
            { label: 'downtown', Confidence: 6.5 },
            { label: 'emission: medium', Confidence: 91.55 },
          ],
          series: [{ key: 'Confidence', label: 'Reported %' }],
          caption: 'Public sample output — not a held-out accuracy claim. Scene probability mass is spread; emission confidence is concentrated.',
          source: 'Sustainable Vision README inference example',
        },
      },
      {
        heading: 'Which checkpoint ships',
        paragraphs: [
          'Two checkpoints came out of training: the Places365 base model and the Intel fine-tuned variant. The fine-tuned checkpoint is the deployment default because emission estimation is the product-facing task, and it performs materially better there.',
          'The base checkpoint is kept and documented rather than deleted. If a future use case needs scene classification without Intel-specific emission adaptation, retraining from scratch to recover it would be an expensive way to undo a decision that a stored artefact already handles.'
        ],
        stats: [
          { label: 'Heads', value: '3', detail: 'Scene · attributes · emission' },
          { label: 'Emission classes', value: '5', detail: 'very_low → very_high' },
          { label: 'Backbone', value: 'ResNet-50', detail: 'Places365-pretrained trunk' },
          { label: 'Deploy ckpt', value: 'Intel FT', detail: 'Emission head only unfrozen' },
        ],
      },
      {
        heading: 'What generalises from this',
        paragraphs: [
          'Multitask learning is usually presented as an efficiency trick — fewer parameters, one deployment. In practice its real value is the transfer of representation from a data-rich task to a data-poor one that you could not train well in isolation.',
          'The design questions that actually determine success are unglamorous: how you weight the losses, which parameters you freeze during adaptation, and whether you report calibrated confidence. Get those right and a standard ResNet-50 is more than enough backbone.'
        ]
      }
    ]
  },
  'financial-sector-risk-analytics-pipeline': {
    title: 'Reproducible Financial Analytics: Designing Pipelines That Survive the Next Revision',
    category: 'Data Science',
    date: 'August 5, 2026',
    readTime: '8 min read',
    summary: 'A general methodology for turning messy financial source data into defensible indicators and risk signals — profiling before cleaning, separating pipeline stages, and generating every report from the same processed artefacts.',
    sections: [
      {
        heading: 'The raw workbook problem',
        paragraphs: [
          'Financial analysis rarely begins with a clean table. It begins with a spreadsheet: merged header cells, footnotes embedded in data rows, inconsistent date formats, and a column that is numeric for hundreds of rows and then contains the string "n/a".',
          'The temptation is to fix these by hand once and move on. That single decision is what makes an analysis irreproducible. Weeks later, when a revised file arrives, nobody can reconstruct which manual edits were applied, and the whole exercise restarts from scratch.',
          'Everything below is general practice rather than a description of any particular engagement. The techniques apply to any lending, treasury, or portfolio dataset that arrives as a human-maintained file.'
        ]
      },
      {
        heading: 'Profile before you clean',
        paragraphs: [
          'A well-built pipeline runs a dedicated profiling step before any transformation. It reports null rates per column, distinct value counts, inferred types against declared types, and the specific rows where a numeric column fails to parse.',
          'This step deliberately produces no cleaned output at all, which is exactly the point. Its job is to make the shape of the mess explicit and version-controlled, so cleaning decisions can be justified against recorded evidence rather than recalled from memory in a review meeting.'
        ]
      },
      {
        heading: 'Separate extraction, cleaning, and transformation',
        paragraphs: [
          'These three concerns should be distinct stages rather than one function. Extraction pulls the table out of the source file and writes an untouched columnar copy. Cleaning applies typed coercion, a documented null policy, and de-duplication. Transformation derives the analytical columns — tenure buckets, exposure bands, delinquency flags.',
          'Splitting them means a bug in a derived rule can be fixed and re-run in seconds without re-parsing the source file, and intermediate outputs can be diffed to see exactly what a change altered.'
        ],
        table: {
          title: 'A generic stage layout for a financial analytics pipeline',
          headers: ['Stage', 'Responsibility', 'Why it stands alone'],
          rows: [
            ['Inspect', 'Report what the source file actually contains', 'Source structure changes between deliveries'],
            ['Profile', 'Quantify nulls, type conflicts, unparseable rows', 'Cleaning decisions need recorded evidence'],
            ['Extract', 'Write an untouched machine-readable copy', 'Preserves an auditable baseline'],
            ['Clean', 'Typed coercion, null policy, de-duplication', 'The rules change more often than the parser'],
            ['Transform', 'Derive analytical columns and buckets', 'Business logic evolves independently'],
            ['Enrich', 'Join external context as its own artefact', 'External series get revised separately'],
            ['Analyse', 'Compute indicators and write them to disk', 'Numbers must be checkable, not just plotted'],
            ['Score', 'Composite ranking and anomaly detection', 'Two different questions, two different outputs'],
            ['Publish', 'Regenerate dashboard and written report', 'Prevents drift between analysis and deliverable']
          ],
          caption: 'A generic stage layout, not a specific project. The value is in the boundaries between stages rather than in any particular naming convention — though giving stages an explicit order makes handover dramatically easier.'
        }
      },
      {
        heading: 'Treat external context as its own artefact',
        paragraphs: [
          'A portfolio read in isolation tells you what happened but not why. A three-point rise in delinquency means something very different in a year of currency stability than in a year of double-digit inflation.',
          'Build the external context dataset as a separate artefact and join it on the reporting period. Keeping it separate matters because external series get revised on their own schedule, and a revision should trigger a re-join rather than a full re-clean of the primary data.'
        ]
      },
      {
        heading: 'Indicators that survive scrutiny',
        paragraphs: [
          'Whatever indicator set a given mandate calls for, two habits determine whether the numbers hold up under review. First, write every indicator to disk as a table alongside its chart. A number that exists only inside an image cannot be verified, and reviewers will ask you to verify it.',
          'Second, document the caveat next to the metric rather than in a footnote nobody reads. If a growth figure is derived from origination dates rather than audited balance movement, say so where the figure appears. If a composite score is an analytical prioritisation device rather than a regulatory capital model, state that plainly. Metrics travel; their caveats usually do not, unless you attach them.'
        ],
        callout: 'Vintage analysis is among the most informative views of any lending book and among the most frequently omitted. Aggregate delinquency mixes cohorts of different ages and will hide a deteriorating recent vintage behind a healthy mature one.'
      },
      {
        heading: 'Risk scoring and anomaly detection answer different questions',
        paragraphs: [
          'Risk scoring combines derived indicators into a comparable ranking across segments, which enables prioritisation without pretending the score is a probability of default. Anomaly detection runs alongside it and serves an entirely different purpose.',
          'In practice, most anomalies surfaced in a real portfolio are not exotic credit events. They are data defects — an exposure recorded in the wrong currency unit, a maturity date preceding origination, a duplicated facility. Catching those before they reach aggregate reporting is worth more than any modelling refinement downstream.'
        ]
      },
      {
        heading: 'Dashboards and reports belong inside the pipeline',
        paragraphs: [
          'The final stages should generate the dashboard and the written report from the same processed data as every other output, rather than being assembled by hand afterwards.',
          'This closes the loop that usually breaks. When a dashboard is a separate manual build, it drifts from the analysis within a single revision cycle. When it is a stage in the pipeline, it cannot.'
        ]
      },
      {
        heading: 'Ordering is the handover mechanism',
        paragraphs: [
          'Giving stages an explicit, visible order looks like a trivial convention. It is the thing that makes a project survivable by someone other than its author. Anyone opening the project sees the execution order without reading documentation, and any stage can be located by its position in the analysis.',
          'Reproducibility in financial analytics is not primarily a tooling problem. It is the discipline of making every transformation a committed, ordered, re-runnable artefact — including the boring ones.'
        ]
      }
    ]
  },
  'reproducible-macroeconomic-forecasting': {
    title: 'Reproducible Macroeconomic Forecasting: Pipelines Over Notebooks',
    category: 'Data Science',
    date: 'July 8, 2026',
    readTime: '6 min read',
    summary: 'Forecasting macro indicators is far less about exotic model architectures than about disciplined data preparation, honest out-of-sample evaluation, and an output layer a policy audience can actually consume.',
    sections: [
      {
        heading: 'The notebook trap',
        paragraphs: [
          'Macroeconomic forecasting work almost always starts in a notebook, and for exploration that is correct. The trap is that notebooks reward out-of-order execution. A cell run twice, a variable redefined halfway down, a chart produced from a dataframe that no longer exists in that form — and the result on screen can no longer be reproduced from the file.',
          'For a forecast that will inform a policy discussion, that is disqualifying. The fix is not more discipline inside the notebook. It is a single entry point that runs the whole thing top to bottom, writing a deterministic set of artefacts every time.',
          'The shape of that entry point matters less than the guarantee it provides: one command, run on a clean checkout, reproduces the cleaned dataset, the model metrics, the forecast comparison, the dashboard feed, and the written narrative — with no manual step in between.'
        ]
      },
      {
        heading: 'Feature construction for macro series',
        paragraphs: [
          'Macro indicators arrive at inconsistent frequencies, get revised after publication, and are strongly autocorrelated. Feature construction has to respect all three properties. Resampling to a common frequency needs an explicit aggregation rule per series — a rate is averaged, a flow is summed, and conflating them silently corrupts everything downstream.',
          'Lag features are where forecasting projects most often leak. If a series is published with a two-month reporting delay, a model that uses last month value is using information that would not have existed at prediction time. Every lag must be justified against the actual publication calendar, not against the index of the dataframe.'
        ],
        callout: 'Revision lag is the quiet killer of macro forecasting accuracy. A model validated on final revised data will systematically outperform its live counterpart, which only ever sees first prints.'
      },
      {
        heading: 'Model comparison without self-deception',
        paragraphs: [
          'A sound pipeline benchmarks several model families on the same prepared dataset and writes the comparison to disk. What makes the comparison meaningful is not the number of candidates but the evaluation protocol.',
          'A random train-test split on time series is meaningless — it lets the model train on the future. Evaluation uses rolling-origin backtesting, where the model is refit at each step on data available up to that point and scored on the next period only. Scores drop noticeably compared to a naive split, which is the point: they become believable.'
        ],
        table: {
          title: 'Evaluation choices that change the story',
          headers: ['Protocol', 'What it measures', 'Risk if used alone'],
          rows: [
            ['Random split', 'In-sample fit comfort', 'Leaks future into training'],
            ['Fixed hold-out tail', 'One future window', 'Sensitive to the chosen cut'],
            ['Rolling-origin', 'Repeated one-step honesty', 'More compute, still the baseline'],
            ['Revision-aware', 'Live first-print reality', 'Harder data plumbing'],
          ],
          caption: 'Generic methodology only — no engagement-specific series or scores. The ranking of protocols is the point, not any particular RMSE.',
        },
      },
      {
        heading: 'Diagnostics before dashboards',
        paragraphs: [
          'Before any forecast is published, the pipeline should emit diagnostics: stationarity tests on the inputs, residual autocorrelation, and plots of error over time. Structure remaining in the residuals means the model has missed something systematic, and a headline accuracy number will not reveal it.',
          'Error over time is the most useful of these. A model with acceptable average error that degrades sharply in the most recent periods is a model about to fail in production, and only the time-resolved view exposes that.'
        ],
        chart: {
          type: 'line',
          title: 'Schematic forecast error rising near the present',
          illustrative: true,
          xKey: 'origin',
          data: [
            { origin: 't−8', Error: 1.0 },
            { origin: 't−6', Error: 1.1 },
            { origin: 't−4', Error: 1.2 },
            { origin: 't−2', Error: 1.6 },
            { origin: 't−1', Error: 2.1 },
          ],
          series: [{ key: 'Error', label: 'Relative error (schematic)' }],
          caption: 'Invented shape only: average error can look fine while recent origins deteriorate. Always plot error against forecast origin before shipping a dashboard.',
          source: 'Illustrative schematic — not measured series',
        },
      },
      {
        heading: 'The reporting layer is part of the model',
        paragraphs: [
          'Forecasting work that ends at a metrics table does not get used. Treat output formatting as a first-class stage instead: a machine-readable feed for whatever BI tool the audience already lives in, and a rendered narrative document for readers who work in documents rather than tools.',
          'Generating every format from the same source removes the version drift that appears the moment someone copies a chart into a document by hand.'
        ]
      },
      {
        heading: 'What actually improves accuracy',
        paragraphs: [
          'The ranked drivers of forecast quality are consistent across this kind of work: correct handling of publication lag, appropriate aggregation when resampling, honest backtesting, and only then model selection.',
          'Swapping a linear model for gradient boosting moves the metric far less than fixing a leaked feature. The unglamorous stages carry the accuracy.'
        ]
      }
    ]
  },
  'statistical-rigor-before-machine-learning': {
    title: 'Statistical Rigor Before Machine Learning',
    category: 'Thought Leadership',
    date: 'June 6, 2026',
    readTime: '5 min read',
    summary: 'Gradient boosting will happily fit noise and report a confident number. A short case for running descriptive statistics, hypothesis tests, and dimensionality checks before reaching for a model.',
    sections: [
      {
        heading: 'The temptation to skip ahead',
        paragraphs: [
          'Modern tooling makes it possible to load a dataset and produce a trained model with a validation score in under five minutes. Nothing in that workflow forces you to look at the data first, and increasingly nobody does.',
          'The failures that follow are not modelling failures. They are failures to notice that a column is 60% missing, that two features are near-duplicates, or that the target is so imbalanced the reported accuracy is worse than always predicting the majority class.'
        ]
      },
      {
        heading: 'Descriptive statistics as a bug detector',
        paragraphs: [
          'Means, medians, standard deviations, and a histogram per column take minutes and catch a remarkable share of data defects. A median wildly separated from the mean flags skew or sentinel values. A standard deviation of zero flags a constant column that will contribute nothing. A distribution with a spike at exactly 999 flags a missing-value placeholder that will be silently treated as a real measurement.',
          'None of this requires sophistication. It requires looking.'
        ],
        table: {
          title: 'A minimum pre-model checklist',
          headers: ['Check', 'What you look for', 'Typical action'],
          rows: [
            ['Missingness', 'Columns >20–30% null', 'Impute policy or drop'],
            ['Sentinels', 'Spikes at 0 / −1 / 999', 'Map to proper nulls'],
            ['Constants', 'Zero variance features', 'Remove before modelling'],
            ['Class balance', 'Majority-class accuracy trap', 'Report baseline + F1/AUC'],
            ['Leakage', 'Post-outcome fields', 'Exclude from features'],
          ],
          caption: 'These checks are cheap insurance. Skip them and the first model score is usually a measurement of your pipeline bugs.',
        },
        quote: 'Every hour spent on exploratory statistics buys back a day of debugging a model that was never going to work.'
      },
      {
        heading: 'Hypothesis tests answer questions models cannot',
        paragraphs: [
          'A model tells you what predicts the target. A hypothesis test tells you whether an observed difference between two groups is distinguishable from noise. These are different questions, and stakeholders usually want the second one.',
          'A t-test comparing two numeric columns, a chi-square test on categorical association, and ANOVA across multiple groups cover a surprising proportion of real analytical requests. Reaching for a classifier to answer "is segment A different from segment B" is using the wrong instrument and produces a less defensible answer.'
        ]
      },
      {
        heading: 'PCA as a sanity check',
        paragraphs: [
          'Principal component analysis is usually introduced as dimensionality reduction. Its more valuable everyday use is diagnostic. If the first two components explain 98% of the variance across forty features, those features are largely redundant and any feature importance ranking over them will be unstable and misleading.',
          'Projecting onto the first two components also surfaces cluster structure and outliers that no summary table shows. It is a two-line check that changes how you interpret everything downstream.'
        ],
        chart: {
          type: 'bar',
          title: 'Schematic cumulative variance explained',
          illustrative: true,
          xKey: 'component',
          yDomain: [0, 100],
          data: [
            { component: 'PC1', Variance: 62 },
            { component: 'PC2', Variance: 86 },
            { component: 'PC3', Variance: 93 },
            { component: 'PC4', Variance: 97 },
          ],
          series: [{ key: 'Variance', label: 'Cumulative % (schematic)' }],
          caption: 'Invented numbers to show the diagnostic pattern: if two components already explain nearly everything, feature importance on the raw columns is unstable.',
          source: 'Illustrative schematic — not a dataset PCA',
        },
      },
      {
        heading: 'Clustering is exploratory, not conclusive',
        paragraphs: [
          'K-means will return exactly the number of clusters you request, on any dataset, including pure noise. The algorithm has no opinion about whether the structure it found is real.',
          'Cluster output is a hypothesis to test, never a finding to report. Validate against a held-out sample and against variables that were not used to fit, and if the segments do not persist, they were an artefact of the parameter choice.'
        ],
        callout: 'Building these checks into a reusable workbench — upload, profile, test, reduce, cluster — turns rigour from an act of individual discipline into the default path. That was the motivation behind the Streamlit statistical application in my portfolio.'
      },
      {
        heading: 'The discipline that survives',
        paragraphs: [
          'Model architectures churn constantly. The statistical fundamentals underneath them have not changed in decades and will outlast whatever framework is dominant next year.',
          'The practitioners whose work holds up are not the ones using the newest models. They are the ones who understood their data before they modelled it, and who can still explain why the answer is what it is.'
        ]
      }
    ]
  },
  'reviewradar-sentiment-ensemble-metrics': {
    title: 'ReviewRadar AI: Ensemble Sentiment That Actually Moves the Metric',
    category: 'Data Science',
    date: 'August 12, 2026',
    readTime: '7 min read',
    summary: 'An end-to-end Yelp review intelligence pipeline — from PostgreSQL ETL and VADER features to an enhanced sentiment ensemble that lifts accuracy from ~0.84 to 0.91 on published evaluation artefacts.',
    repo: { label: 'Thanuka9/reviewradar_ai', url: 'https://github.com/Thanuka9/reviewradar_ai' },
    sections: [
      {
        heading: 'Reviews are a warehouse problem first',
        paragraphs: [
          'Sentiment models get the attention; the unglamorous work that makes them usable is getting millions of review rows into a queryable warehouse with honest features. ReviewRadar AI is built around the Yelp Open Dataset: load raw JSON into PostgreSQL, map categories and geo, run EDA, then materialise review-, user-, and business-level feature tables.',
          'Only after that pipeline exists does training a classifier make sense. Skipping the warehouse step produces notebooks that cannot be re-run when the next dump arrives.'
        ],
        stats: [
          { label: 'Ensemble accuracy', value: '0.9106', detail: 'enhanced_sentiment_ensemble_v4' },
          { label: 'Ensemble F1', value: '0.9341', detail: 'Same evaluation artefact' },
          { label: 'Ensemble ROC-AUC', value: '0.9687', detail: 'Strong ranking quality' },
          { label: 'Prior pipeline F1', value: '~0.884', detail: 'v3.4 / v3.5 baselines' },
        ],
      },
      {
        heading: 'Feature construction that models can use',
        paragraphs: [
          'The feature stage combines lexical sentiment (VADER), TF-IDF terms, time features, geo clusters, rolling user rating averages, and one-hot category signals. That mix matters: a pure bag-of-words model misses reviewer habits; a pure rating model misses what the text actually said.',
          'Persisting a StandardScaler artefact alongside the feature tables keeps training and inference on the same numeric footing — a small detail that prevents silent train/serve skew.'
        ],
        callout: 'If your sentiment model cannot be retrained from a clean checkout of the warehouse scripts, you do not have a pipeline — you have a souvenir notebook.',
      },
      {
        heading: 'What the published metrics actually say',
        paragraphs: [
          'The evaluation artefact at evaluation_results/model_metrics.json compares three trained pipelines on the same evaluation surface. The v3.4 and v3.5 pipelines land near 0.84 accuracy and 0.88 F1. The enhanced ensemble v4 jumps to 0.9106 accuracy, 0.9341 F1, and 0.9687 ROC-AUC.',
          'That gap is the entire justification for the ensemble work. Incremental tweaks between v3.4 and v3.5 barely move the needle; the ensemble architecture is where the lift lives.'
        ],
        chart: {
          type: 'bar',
          title: 'Published sentiment metrics by pipeline',
          xKey: 'model',
          yDomain: [0.8, 1.0],
          data: [
            { model: 'v3.4', Accuracy: 0.8416, F1: 0.8844, 'ROC-AUC': 0.8886 },
            { model: 'v3.5', Accuracy: 0.8413, F1: 0.8842, 'ROC-AUC': 0.8883 },
            { model: 'ensemble v4', Accuracy: 0.9106, F1: 0.9341, 'ROC-AUC': 0.9687 },
          ],
          series: [
            { key: 'Accuracy', label: 'Accuracy' },
            { key: 'F1', label: 'F1', color: 'hsl(160 84% 45%)' },
            { key: 'ROC-AUC', label: 'ROC-AUC', color: 'hsl(38 92% 55%)' },
          ],
          caption: 'v3.4 and v3.5 are nearly identical. The ensemble is a different regime — roughly seven points of accuracy and five points of F1 over the prior pipelines.',
          source: 'Thanuka9/reviewradar_ai evaluation_results/model_metrics.json',
        },
        table: {
          title: 'Full metric table from model_metrics.json',
          headers: ['Model', 'Accuracy', 'Precision', 'Recall', 'F1', 'ROC-AUC'],
          rows: [
            ['sentiment_pipeline_v3.4', '0.8416', '0.8653', '0.9044', '0.8844', '0.8886'],
            ['sentiment_pipeline_v3.5', '0.8413', '0.8652', '0.9040', '0.8842', '0.8883'],
            ['enhanced_sentiment_ensemble_v4', '0.9106', '0.9235', '0.9449', '0.9341', '0.9687'],
          ],
          numeric: true,
          caption: 'Rounded for display; raw floats remain in the public JSON. Precision/recall/F1 move together on the ensemble — this is not an accuracy-only win on an imbalanced shortcut.',
        },
      },
      {
        heading: 'Why ensembles beat another single-model tweak',
        paragraphs: [
          'v3.4 to v3.5 shows what happens when you keep iterating inside one modelling frame: metrics stall. Ensembles help when different inductive biases disagree on hard reviews — short sarcasm, mixed sentiment, or sparse text — and a vote or stacked meta-learner can recover cases any single model systematically misses.',
          'The ROC-AUC jump to 0.9687 is especially useful for product ranking and triage: even when a hard threshold is tuned later, the ordering quality of positive vs negative intent is already strong.'
        ],
        quote: 'If two successive pipelines produce the same F1, stop polishing hyperparameters and change the hypothesis.',
      },
      {
        heading: 'What I would ship next',
        paragraphs: [
          'The public README already points at the natural extensions: topic models over the feature store, a Streamlit dashboard on the warehouse, and grounded summarisation over retrieved reviews rather than free-form generation.',
          'The metric story is already strong enough to support those layers. The constraint is productisation — making the warehouse refresh and the ensemble inference a single operable path — not inventing another model family.'
        ],
      },
    ],
  },
  'job-hunter-autonomous-rag-agent': {
    title: 'Job Hunter: An Autonomous RAG Agent That Applies With Evidence',
    category: 'AI Engineering',
    date: 'August 10, 2026',
    readTime: '7 min read',
    summary: 'How Job Hunter discovers roles, ranks them against a FAISS-backed career persona, and fills applications with Playwright — under a zero-hallucination policy that only synthesises from uploaded CV, portfolio, and project exports.',
    repo: { label: 'Thanuka9/Job-Hunter', url: 'https://github.com/Thanuka9/Job-Hunter' },
    sections: [
      {
        heading: 'The job market as an information asymmetry',
        paragraphs: [
          'Most "auto-apply" tools are scrapers with a mail-merge. They spray generic answers, burn reputation, and teach platforms to distrust automation. Job Hunter is built on the opposite premise: every claim in an application must be retrievable from the candidate\'s own artefacts.',
          'That constraint turns the product into a RAG system with a browser body — not a chatbot with a form filler bolted on.'
        ],
        stats: [
          { label: 'Retrieval store', value: 'FAISS', detail: 'CV · portfolio · GitHub exports' },
          { label: 'Browser agent', value: 'Playwright', detail: 'Dynamic DOM form filling' },
          { label: 'Rank threshold', value: '0–100', detail: 'Suitability gate before apply' },
          { label: 'Dashboard', value: 'Streamlit', detail: 'Mission control + RAG simulator' },
        ],
      },
      {
        heading: 'The intelligence engine',
        paragraphs: [
          'Documents are chunked with recursive character splitting (~500 tokens) and indexed into FAISS. When an application asks about ETL experience, the brain retrieves the most relevant segments of real history and only then drafts an answer.',
          'This is the same production RAG discipline as hybrid retrieval elsewhere in the portfolio: recall first, then constrain generation to evidence. The zero-hallucination policy is enforced by architecture, not by a prompt admonition.'
        ],
        table: {
          title: 'Autonomous workflow stages',
          headers: ['Stage', 'Component', 'Output'],
          rows: [
            ['Discovery', 'Board scrapers (Greenhouse / Lever / Workday, etc.)', 'Job pool'],
            ['Ranking', 'LLM suitability scorer', '0–100 score + discard below threshold'],
            ['Retrieval', 'FAISS persona index', 'Grounded context chunks'],
            ['Application', 'Playwright agent', 'Filled form + screenshots / JSONL log'],
            ['Learning', 'Prompt/context/response capture', 'Fine-tuning dataset seed'],
          ],
          caption: 'Public README workflow. Ranking before browser automation is what keeps the agent from wasting cycles on poor-fit roles.',
        },
      },
      {
        heading: 'Why ranking before applying matters',
        paragraphs: [
          'An unconstrained apply loop maximises volume and destroys signal. Job Hunter scores each description against the persona and only queues roles above a configurable threshold (the README example uses a minimum score of 50 on a 0–100 scale).',
          'That gate is product strategy disguised as ML: the scarce resource is not compute — it is the credibility of the applications that do get sent.'
        ],
        chart: {
          type: 'bar',
          title: 'Schematic funnel after suitability gating',
          illustrative: true,
          xKey: 'stage',
          data: [
            { stage: 'Discovered', Count: 100 },
            { stage: 'Score ≥ threshold', Count: 35 },
            { stage: 'Applied', Count: 28 },
            { stage: 'Logged FT rows', Count: 28 },
          ],
          series: [{ key: 'Count', label: 'Relative volume (schematic)' }],
          caption: 'Invented proportions to show the intended shape: most discovered roles never reach the browser agent. Tune the threshold; do not remove it.',
          source: 'Illustrative schematic — not live Job Hunter telemetry',
        },
      },
      {
        heading: 'Playwright as a tool, not a brain',
        paragraphs: [
          'The application agent uses Playwright for navigation and field detection, then maps inputs — text, select, radio — onto candidate data and RAG-grounded answers. Tricky preference questions fall back to configured policy rather than improvisation.',
          'Failures are first-class: captchas, validation errors, and screenshots land in a persistent log so a human can audit what the agent did instead of guessing from an empty confirmation page.'
        ],
        callout: 'Mission Control is not vanity UI. A live suitability chart and RAG answer simulator are how you debug an agent before it spends your reputation on a live portal.',
      },
      {
        heading: 'Self-learning without self-mythology',
        paragraphs: [
          'Every answered form question can append prompt, retrieved context, and response to a fine-tuning dataset. That is useful only if the upstream retrieval stays honest — otherwise you fine-tune the model to imitate its own hallucinations.',
          'The durable asset is the grounded application log, not the claim of autonomy. Autonomy is the loop; evidence is the product.'
        ],
      },
    ],
  },
  'revops-ai-multi-agent-rcm-auditing': {
    title: 'RevOps AI: Multi-Agent Pods for Healthcare RCM Auditing',
    category: 'AI Engineering',
    date: 'August 8, 2026',
    readTime: '7 min read',
    summary: 'A FastAPI + React B2B SaaS that combines autonomous agent pods, heuristic RCM data auditing, scikit-learn payment forecasting, and Monday.com board sync — engineered as collaborating CEO, Engineering, ML, and DevOps pods.',
    repo: { label: 'Thanuka9/RevOPs-AI', url: 'https://github.com/Thanuka9/RevOPs-AI' },
    sections: [
      {
        heading: 'Revenue ops fails on hygiene before prediction',
        paragraphs: [
          'Healthcare billing teams often ask for forecasting first. In practice, missing fields and inconsistent records destroy both audits and models. RevOps AI treats data hygiene as the primary product surface: ingest RCM rows, flag defects, then forecast payment timing on what survives.',
          'The platform is explicitly agentic in how it was built and operated — specialised pods collaborate on delivery — and operationally agentic in how audits and forecasts are orchestrated behind a JWT-secured API.'
        ],
        stats: [
          { label: 'API', value: 'FastAPI', detail: 'Async REST + JWT RBAC' },
          { label: 'UI', value: 'React + Vite', detail: 'Dashboards + landing' },
          { label: 'ML', value: 'sklearn', detail: 'Payment timing models' },
          { label: 'CRM bridge', value: 'Monday.com', detail: 'Board pull without CSV ritual' },
        ],
      },
      {
        heading: 'Agent pods as an operating model',
        paragraphs: [
          'The README describes an autonomous agile lifecycle: a PM agent shapes the blueprint, an Engineering pod ships FastAPI services and React surfaces, a Data/ML pod owns features and model persistence, DevOps/QA validates with pytest and GCP deploy, and a Marketing pod activates post-ship content.',
          'Whether or not every pod is a literal LLM loop, the architecture forces modular ownership. That is the useful lesson for multi-agent product work: specialise interfaces, not just prompts.'
        ],
        table: {
          title: 'Pod responsibilities',
          headers: ['Pod', 'Owns', 'Primary artefacts'],
          rows: [
            ['CEO / PM', 'Roadmap and prioritisation', 'Blueprints, status board'],
            ['Engineering', 'API + UI modules', 'FastAPI routes, React views'],
            ['Data / ML', 'Features + models', 'Training jobs, persisted estimators'],
            ['DevOps / QA', 'Stability + deploy', 'Pytest, Cloud Build, Docker'],
            ['Marketing', 'Post-deploy narrative', 'SEO / sales sequences'],
          ],
          caption: 'From the public RevOps AI methodology. The Founder’s Executive Suite monitors pod health as first-class system state.',
        },
      },
      {
        heading: 'Automated auditing before cash-flow stories',
        paragraphs: [
          'The auditor scans ingested records for missing fields, formatting defects, and billing inconsistencies, then routes rows to manual review or auto-approval via heuristic rules. That split is deliberate: not every defect needs a model, and not every model should touch dirty input.',
          'Monday.com integration pulls operational boards into the same engine so teams stop exporting CSVs as a weekly religion. Sync is a service module, not a side script.'
        ],
        callout: 'Prediction on unaudited RCM extracts is a spreadsheet with confidence intervals. Hygiene first is the only honest sequencing.',
      },
      {
        heading: 'Forecasting sits on top of the audit lane',
        paragraphs: [
          'Payment timing models use classical scikit-learn regressors — linear baselines and random forests — trained on historical billing features once records clear hygiene gates. Controllers get a cash-flow view that is only as trustworthy as the audit filter above it.',
          'This is the same framing lesson as the healthcare payment-propensity paper elsewhere on this site: choose an actionable target, then pick a model family that matches the error that operators feel.'
        ],
        chart: {
          type: 'bar',
          title: 'Schematic work mix on an RCM batch',
          illustrative: true,
          xKey: 'bucket',
          data: [
            { bucket: 'Auto-approved', Share: 55 },
            { bucket: 'Manual review', Share: 30 },
            { bucket: 'Blocked / invalid', Share: 15 },
          ],
          series: [{ key: 'Share', label: 'Share of rows (schematic %)' }],
          caption: 'Invented mix to show intent: most volume should clear heuristics; humans concentrate on the ambiguous middle; blocked rows never reach forecasting.',
          source: 'Illustrative schematic — not client audit telemetry',
        },
      },
      {
        heading: 'Shipping shape',
        paragraphs: [
          'Docker Compose keeps API and frontend coherent locally; pytest gates Cloud Build; GCP hosts the production topology. None of that is exotic — it is what makes an agentic build story survive contact with real users.',
          'The durable design bet is the combination: CRM sync + heuristic audit + classical ML + pod-visible operations. Remove any one and the platform collapses back into a dashboard demo.'
        ],
      },
    ],
  },
  'trainiq-multi-tenant-lms-local-ai': {
    title: 'TrainIQ: Multi-Tenant LMS Isolation with Local AI',
    category: 'AI Engineering',
    date: 'August 6, 2026',
    readTime: '8 min read',
    summary: 'How TrainIQ ships a Flask multi-tenant corporate LMS with three-layer data isolation, Stripe billing, a CEO platform console, and an Ollama-local AI suite — LearnIQ, AnalyticsIQ, ProctorIQ, and CreatorIQ — without cloud LLM keys.',
    repo: { label: 'Thanuka9/TrainIQ', url: 'https://github.com/Thanuka9/TrainIQ' },
    sections: [
      {
        heading: 'SaaS LMS is an isolation problem',
        paragraphs: [
          'A corporate learning platform fails the moment Tenant A can see Tenant B\'s exams, uploads, or score histories. TrainIQ is designed around that failure mode: every customer organisation is a tenant with its own office key, plan limits, and hard data boundaries.',
          'AI features are deliberately local via Ollama. Training content and learner performance should not have to leave the deployment perimeter to get tutoring or proctoring narratives.'
        ],
        stats: [
          { label: 'Isolation layers', value: '3', detail: 'Postgres · Mongo · Redis limits' },
          { label: 'Processes', value: '3', detail: 'web · platform · ops-worker' },
          { label: 'AI suite', value: 'Local', detail: 'Ollama / Gemma — no cloud keys' },
          { label: 'Tests', value: '350+', detail: 'Automated suite in README' },
        ],
      },
      {
        heading: 'Three layers of tenant isolation',
        paragraphs: [
          'PostgreSQL rows carry tenant_id on every core table. MongoDB GridFS uses a dedicated database per tenant (trainiq_t_<id>) so file blobs inherit isolation by construction. Redis enforces rate and plan limits that cannot be bypassed from the app tier alone.',
          'That layering matters because LMS workloads mix relational records with large binary uploads. One store cannot honestly cover both without either leaking files or overloading relational tables.'
        ],
        table: {
          title: 'Isolation map',
          headers: ['Layer', 'Mechanism', 'Protects'],
          rows: [
            ['PostgreSQL', 'tenant_id on core tables', 'Courses, exams, scores, billing'],
            ['MongoDB GridFS', 'Per-tenant database', 'Uploads and study materials'],
            ['Redis', 'Plan / rate limit keys', 'Abuse and cross-tenant quota bleed'],
            ['Auth scope', 'Office Key + roles / SSO', 'Login boundary per organisation'],
          ],
          caption: 'Public TrainIQ architecture. Isolation is a product requirement, not an afterthought middleware check.',
        },
      },
      {
        heading: 'Three processes, three audiences',
        paragraphs: [
          'Learners and tenant admins hit the web worker. Platform staff use a separate platform worker for cross-tenant ops, revenue, and support enter. Background schedulers and agent actions run on an ops-worker that consumes a Redis event bus when enabled.',
          'Splitting processes keeps a CEO console failure mode from taking down exams, and keeps long-running agent actions off the request path learners feel.'
        ],
        chart: {
          type: 'bar',
          title: 'Schematic responsibility split across processes',
          illustrative: true,
          xKey: 'process',
          data: [
            { process: 'web', 'Learner traffic': 80, 'Ops load': 10 },
            { process: 'platform', 'Learner traffic': 5, 'Ops load': 55 },
            { process: 'ops-worker', 'Learner traffic': 0, 'Ops load': 70 },
          ],
          series: [
            { key: 'Learner traffic', label: 'Learner traffic (schematic)' },
            { key: 'Ops load', label: 'Ops / agent load (schematic)', color: 'hsl(38 92% 55%)' },
          ],
          caption: 'Invented load sketch: keep learner UX on web, CEO tooling on platform, and asynchronous agent work on ops-worker.',
          source: 'Illustrative schematic — not production metrics',
        },
      },
      {
        heading: 'Local AI suite without API keys',
        paragraphs: [
          'LearnIQ summarises and chats against GridFS document text. AnalyticsIQ diagnoses weaknesses from score history. ProctorIQ produces trust scoring narratives. CreatorIQ drafts course outlines. Exam AI helps admins generate questions from topic prompts.',
          'Running these on Ollama (Gemma) is a product decision: enterprises evaluating an LMS often block outbound LLM traffic long before they block Docker. Local inference keeps the demo and the deployment story aligned.'
        ],
        callout: 'If your SaaS AI feature requires every customer to provision an OpenAI key on day one, you have narrowed the buyer set before the first course is uploaded.',
      },
      {
        heading: 'Billing and observability as product surfaces',
        paragraphs: [
          'Stripe powers trial-to-enterprise plan progression with checkout, webhooks, and a customer portal. Prometheus, Grafana, and Alertmanager cover the operational side that multi-tenant SaaS actually dies on — silent queue backups and database saturation.',
          'TrainIQ\'s lesson is compositional: isolation + process split + local AI + billing + observability. Any one demo feature is easy; the combination is what makes it a platform.'
        ],
      },
    ],
  },
  'monday-com-graphql-data-auditor': {
    title: 'Monday.com GraphQL Data Auditor: Local Hygiene Without Zapier',
    category: 'AI Engineering',
    date: 'August 4, 2026',
    readTime: '5 min read',
    summary: 'A Streamlit auditor that hits the Monday.com GraphQL API with cursor pagination, scans multiple boards for missing Files/Notes cells, and exports clickable CSV remediation lists — entirely on the operator’s machine.',
    repo: { label: 'Thanuka9/Monday', url: 'https://github.com/Thanuka9/Monday' },
    sections: [
      {
        heading: 'Missing cells are an operations tax',
        paragraphs: [
          'Monday.com boards accumulate empty Files and Notes columns the same way spreadsheets do: quietly, then all at once before an audit. Exporting every board to Excel and grepping for blanks does not scale past a handful of workspaces.',
          'The Monday.com Data Auditor is a deliberately small local Streamlit app: authenticate with an API key, select boards, paginate every item, and surface only the gaps that matter.'
        ],
        stats: [
          { label: 'UI', value: 'Streamlit', detail: 'Local operator console' },
          { label: 'API', value: 'GraphQL', detail: 'Monday.com v2023-10' },
          { label: 'Pagination', value: 'Cursor', detail: 'No silent row truncation' },
          { label: 'Export', value: 'CSV', detail: 'Clickable task URLs' },
        ],
      },
      {
        heading: 'Why GraphQL pagination is the real feature',
        paragraphs: [
          'Large boards will lie to you if you only fetch the first page. Cursor-based pagination is what makes the auditor trustworthy on thousands of items: every row is visited, or the run fails loudly.',
          'Pandas then keeps the scan in memory for instant column filters — for example, isolating tasks missing Files but not Notes — without another API round trip.'
        ],
        table: {
          title: 'Auditor loop',
          headers: ['Step', 'Mechanism', 'Operator outcome'],
          rows: [
            ['Authenticate', 'Monday API key (local only)', 'No third-party Zapier hop'],
            ['Select boards', 'Dynamic dropdown', 'Multi-board scan in one run'],
            ['Paginate items', 'GraphQL cursors', 'Complete coverage'],
            ['Detect gaps', 'Empty Files / Notes (etc.)', 'Actionable defect list'],
            ['Export', 'CSV + deep links', 'Remediation queue'],
          ],
          caption: 'Public README feature set. The product is completeness and locality, not another cloud automation subscription.',
        },
      },
      {
        heading: 'Clickable remediation beats abstract dashboards',
        paragraphs: [
          'Each finding generates a direct URL to the Monday.com task that needs updating. That sounds trivial until you watch a coordinator re-find items by name across boards.',
          'CSV export closes the loop for teams that still live in tickets and email: filter in the app, download the slice, assign the work.'
        ],
        chart: {
          type: 'bar',
          title: 'Schematic defect mix on a multi-board scan',
          illustrative: true,
          xKey: 'gap',
          data: [
            { gap: 'Missing Files', Count: 42 },
            { gap: 'Missing Notes', Count: 27 },
            { gap: 'Both missing', Count: 11 },
            { gap: 'Complete rows', Count: 120 },
          ],
          series: [{ key: 'Count', label: 'Rows (schematic)' }],
          caption: 'Invented counts to show the intended readout: most rows may be fine; the auditor exists to make the minority gaps impossible to ignore.',
          source: 'Illustrative schematic — not a live workspace export',
        },
      },
      {
        heading: 'Local by design',
        paragraphs: [
          'The app runs on the operator’s machine. API keys never need to be handed to a third-party automation vendor for a hygiene pass. That is both a security posture and a sales posture for teams already nervous about SaaS sprawl.',
          'RevOps AI later reuses the Monday.com integration idea inside a broader RCM platform; this auditor is the sharp tool that proved the sync + gap-detection loop before the larger system existed.'
        ],
        callout: 'The best internal tools are allowed to be narrow. A perfect Files/Notes auditor that finishes in one sitting beats a vague "AI workspace copilot" that never ships.',
      },
    ],
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
      canonical: `https://thanukaellepola.com/en/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://thanukaellepola.com/en/blog/${slug}`,
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
            {article.repo && (
              <a
                href={article.repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel border-primary/10 text-muted-foreground hover:text-primary hover:border-primary/30 text-xs font-bold tracking-wide transition-colors"
              >
                <Github size={12} />
                {article.repo.label}
              </a>
            )}
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

              {section.stats && <ArticleStats stats={section.stats} />}

              {section.chart && <ArticleChart spec={section.chart} />}

              {section.table && <ArticleTable spec={section.table} />}

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
  const slugs = Object.keys(articlesData);
  const params: Array<{ locale: string; slug: string }> = [];

  routing.locales.forEach(locale => {
    slugs.forEach(slug => {
      params.push({ locale, slug });
    });
  });

  return params;
}
