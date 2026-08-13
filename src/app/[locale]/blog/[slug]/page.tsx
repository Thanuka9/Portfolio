import React from 'react';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, BookOpen, User, Tag, Sparkles, AlertCircle, Quote } from 'lucide-react';
import { Link, routing } from '@/i18n/routing';
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
  },
  'agentic-commerce-model-context-protocol': {
    title: 'Agentic Commerce on MCP: From Multilingual Intent to a Completed Checkout',
    category: 'AI Engineering',
    date: 'July 24, 2026',
    readTime: '7 min read',
    summary: 'A field report from the Kapruka Agent Challenge 2026 — building a shopping agent on the Model Context Protocol that parses English, Sinhala, and Tanglish intent into budget-aware cart plans and completes a real guest checkout.',
    sections: [
      {
        heading: 'Search is the wrong primitive',
        paragraphs: [
          'Every e-commerce site asks the same thing of a shopper: translate what you actually want into keywords, then reconcile the results yourself. If your intent is "a birthday hamper for my sister in Kandy, under 15,000 rupees, delivered Saturday", the search box gives you no help at all. You become the planner, the price optimiser, and the delivery validator.',
          'Kapruka Flow AI, built for the Kapruka Agent Challenge 2026, inverts that. The primitive is intent, not search. You describe the outcome; the agent produces complete, priced, delivery-validated cart plans that you can compare and check out.'
        ]
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
        ]
      },
      {
        heading: 'Which checkpoint ships',
        paragraphs: [
          'Two checkpoints came out of training: the Places365 base model and the Intel fine-tuned variant. The fine-tuned checkpoint is the deployment default because emission estimation is the product-facing task, and it performs materially better there.',
          'The base checkpoint is kept and documented rather than deleted. If a future use case needs scene classification without Intel-specific emission adaptation, retraining from scratch to recover it would be an expensive way to undo a decision that a stored artefact already handles.'
        ]
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
    title: 'From Loan Ledger to Risk Signal: A Reproducible Financial Analytics Pipeline',
    category: 'Data Science',
    date: 'August 5, 2026',
    readTime: '8 min read',
    summary: 'Turning a raw bank loan portfolio workbook into financial KPIs, macro-linked risk scores, and anomaly flags using a numbered, re-runnable script pipeline instead of an unordered pile of notebooks.',
    sections: [
      {
        heading: 'The raw workbook problem',
        paragraphs: [
          'Financial sector analysis rarely begins with a clean table. It begins with an Excel workbook: merged header cells, footnotes embedded in data rows, inconsistent date formats, and a column that is numeric for the first eight hundred rows and then contains the string "n/a".',
          'The temptation is to fix these by hand once and move on. That single decision is what makes an analysis irreproducible. Six weeks later, when a revised workbook arrives, nobody can reconstruct which manual edits were applied, and the whole exercise restarts.'
        ]
      },
      {
        heading: 'Profile before you clean',
        paragraphs: [
          'The pipeline runs a dedicated raw data profile step before any transformation. It reports null rates per column, distinct value counts, inferred types against declared types, and the specific rows where a numeric column fails to parse.',
          'This step produces no cleaned output at all, which is exactly the point. Its job is to make the shape of the mess explicit and version-controlled, so cleaning decisions can be justified against evidence rather than recalled from memory.'
        ]
      },
      {
        heading: 'Cleaning as a separate, testable stage',
        paragraphs: [
          'Extraction, cleaning, and transformation are three distinct scripts rather than one function. Extraction pulls the loan table out of Excel and writes an untouched Parquet copy. Cleaning applies typed coercion, null policy, and de-duplication. Transformation derives the analytical columns — tenure buckets, exposure bands, delinquency flags.',
          'Splitting them means a bug in the delinquency rule can be fixed and re-run in seconds without touching Excel parsing, and the intermediate outputs can be diffed to see exactly what changed.'
        ],
        code: {
          language: 'bash',
          snippet: `python scripts/01_import_inspect.py        # what is actually in the workbook
python scripts/01b_raw_data_profile.py     # null rates, type conflicts, bad rows
python scripts/02_clean_transform.py       # typed, deduplicated, derived columns
python scripts/03_create_macro_data.py     # annual macroeconomic series
python scripts/04_merge_loan_macro.py      # join on reporting year
python scripts/05_eda_financial_indicators.py
python scripts/06_risk_scoring_anomalies.py
python scripts/07_dashboard.py
python scripts/08_final_report.py

# or simply
python scripts/run_all.py`,
          caption: 'Numbered stages with a single orchestrator. Any stage can be re-run in isolation; run_all reproduces the entire analysis from the raw workbook.'
        }
      },
      {
        heading: 'Bringing macroeconomic context in',
        paragraphs: [
          'A loan portfolio read in isolation tells you what happened but not why. Delinquency rising by three points means something very different in a year of currency stability than in a year of double-digit inflation.',
          'The pipeline builds an annual macroeconomic dataset as its own artefact and joins it to the portfolio on reporting year. Keeping it separate matters: macro series get revised, and a revision should trigger a re-join rather than a re-clean of the loan data.'
        ]
      },
      {
        heading: 'KPIs that survive scrutiny',
        paragraphs: [
          'The indicator layer computes the metrics a credit committee actually asks about: non-performing exposure by sector and product, weighted average tenure, concentration by borrower segment, and vintage curves showing how each origination cohort performs as it ages.',
          'Every indicator is written to disk as a table alongside the chart, not embedded only in a figure. A number that exists only inside a PNG cannot be checked, and reviewers will ask you to check it.'
        ],
        callout: 'Vintage analysis is the single most informative view in a loan portfolio and the most frequently omitted. Aggregate delinquency mixes cohorts of different ages and will hide a deteriorating recent vintage behind a healthy mature book.'
      },
      {
        heading: 'Risk scoring and anomaly detection',
        paragraphs: [
          'Risk scoring combines the derived indicators into a comparable score across segments, which makes ranking possible without pretending the score is a probability of default. Anomaly detection runs alongside it and serves a different purpose entirely.',
          'Most anomalies flagged in a real portfolio are not exotic credit events. They are data defects — an exposure recorded in the wrong currency unit, a maturity date before origination, a duplicated facility. Catching those before they enter aggregate reporting is worth more than any modelling refinement downstream.'
        ]
      },
      {
        heading: 'Dashboards and reports as pipeline outputs',
        paragraphs: [
          'The last two stages generate an interactive dashboard and a final analytical report in Markdown and HTML. Both are pipeline outputs, regenerated from the same processed data as everything else.',
          'This closes the loop that usually breaks. When the dashboard is a separate manual build, it drifts from the analysis within one revision cycle. When it is stage seven of nine, it cannot.'
        ]
      },
      {
        heading: 'Why numbering the scripts matters',
        paragraphs: [
          'The numbered file names look like a trivial convention. They are the thing that makes the project handover-safe. Anyone opening the repository sees the execution order without reading documentation, and any stage can be located by its position in the analysis.',
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
          'For a forecast that will inform a policy discussion, that is disqualifying. The fix is not more discipline inside the notebook. It is a single entry point that runs the whole thing top to bottom.'
        ],
        code: {
          language: 'powershell',
          snippet: `python 00_run_final_pipeline.py

# deterministic outputs, every run:
#   outputs/FINAL_processed_model_data.csv
#   outputs/05_model_performance.csv
#   outputs/05_forecast_comparison.csv
#   dashboard/dashboard_macro_data.csv
#   report/CBSL_Exercise01_Report.{md,html,docx}`,
          caption: 'One command reproduces cleaned data, model metrics, forecast comparisons, dashboard feeds, and the written report.'
        }
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
          'The pipeline benchmarks several model families on the same prepared dataset and writes the comparison to disk. What makes the comparison meaningful is not the number of candidates but the evaluation protocol.',
          'A random train-test split on time series is meaningless — it lets the model train on the future. Evaluation uses rolling-origin backtesting, where the model is refit at each step on data available up to that point and scored on the next period only. Scores drop noticeably compared to a naive split, which is the point: they become believable.'
        ]
      },
      {
        heading: 'Diagnostics before dashboards',
        paragraphs: [
          'Before any forecast is published, the pipeline emits diagnostics: stationarity tests on the inputs, residual autocorrelation, and plots of error over time. Structure remaining in the residuals means the model has missed something systematic, and a headline accuracy number will not reveal it.',
          'Error over time is the most useful of these. A model with acceptable average error that degrades sharply in the most recent periods is a model about to fail in production, and only the time-resolved view exposes that.'
        ]
      },
      {
        heading: 'The reporting layer is part of the model',
        paragraphs: [
          'Forecasting work that ends at a metrics table does not get used. This pipeline treats output formatting as a first-class stage: dashboard-ready CSVs for Power BI, and a full report rendered to Markdown, HTML, and DOCX for readers who work in documents rather than tools.',
          'Generating all three from the same source removes the version drift that appears the moment someone copies a chart into a Word file by hand.'
        ]
      },
      {
        heading: 'What actually improves accuracy',
        paragraphs: [
          'Across this work the ranked drivers of forecast quality were consistent: correct handling of publication lag, appropriate aggregation when resampling, honest backtesting, and only then model selection.',
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
        ]
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
  const slugs = Object.keys(articlesData);
  const params: Array<{ locale: string; slug: string }> = [];

  routing.locales.forEach(locale => {
    slugs.forEach(slug => {
      params.push({ locale, slug });
    });
  });

  return params;
}
