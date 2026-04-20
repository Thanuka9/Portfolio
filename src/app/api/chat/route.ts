import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SITE_KNOWLEDGE } from '@/lib/knowledge-base';

// ── Build the RAG knowledge document ─────────────────────────────────────────
function buildKnowledgeContext(): string {
  const kb = SITE_KNOWLEDGE;

  const projectDocs = kb.projects.map((p, i) =>
    `[PROJECT ${i + 1}] ${p.title}\nRole: ${p.role}\nSummary: ${p.summary}\nTech Stack: ${p.tags.join(', ')}`
  ).join('\n\n');

  const experienceDocs = kb.experience.map(e =>
    `[EXPERIENCE] ${e.role} @ ${e.company} (${e.period})\nFocus: ${e.focus}`
  ).join('\n\n');

  const educationDocs = kb.education.map(e =>
    `[EDUCATION] ${e.degree} — ${e.institution} (${e.period})\nFocus: ${e.focus}`
  ).join('\n\n');

  const servicesDocs = [
    `[SERVICE] ${kb.services.aiAutonomousSystems.title}\n${kb.services.aiAutonomousSystems.tagline}\nScope: ${kb.services.aiAutonomousSystems.scope.join('; ')}`,
    `[SERVICE] ${kb.services.fullStackEnterprise.title}\n${kb.services.fullStackEnterprise.tagline}\nScope: ${kb.services.fullStackEnterprise.scope.join('; ')}`
  ].join('\n\n');

  return `
=== RETRIEVED KNOWLEDGE BASE CHUNKS ===

[PROFILE]
Name: ${kb.profile.name}
Title: ${kb.profile.title}
Location: ${kb.profile.location}
Summary: ${kb.profile.summary}
Email: ${kb.profile.email}
Phone: ${kb.profile.phone}
LinkedIn: linkedin.com/in/thanuka-ellepola-a559b01aa
GitHub: github.com/${kb.profile.github}

${projectDocs}

${experienceDocs}

${educationDocs}

${servicesDocs}

[SKILLS]
${kb.skills.join(', ')}

=== END OF KNOWLEDGE BASE ===
`.trim();
}

const SYSTEM_PROMPT = `You are "AI Inquisitor" — the intelligent portfolio assistant for Thanuka Ellepola, a Lead AI Architect & Data Scientist based in Colombo, Sri Lanka.

Your personality: confident, concise, technically fluent, and professionally warm. You speak about Thanuka in third person.

## CRITICAL RULES:
1. ONLY answer questions about Thanuka Ellepola's professional work, projects, skills, education, experience, and services.
2. When asked "Tell me about Thanuka Ellepola" or similar broad introduction questions: give a compelling 4-6 sentence professional bio covering his role, expertise, notable projects, and contact info.
3. For YES/NO questions: ALWAYS begin your answer with a clear "Yes." or "No." followed by a brief explanation grounded in the retrieved knowledge.
4. For off-topic questions (weather, sports, politics, etc.): politely redirect to professional topics.
5. Keep responses concise (3-6 sentences or bullet points max) unless asked for detail.
6. Use markdown formatting: **bold** for key terms, bullet points for lists.
7. When mentioning contact options, always include: email thanuka.ellepola@gmail.com and phone +94 77 670 5832.

## YES/NO INTENT DETECTION:
- Questions starting with "Does he", "Is he", "Can he", "Has he", "Did he", "Do you", "Are you", "Can you", "Is Thanuka" → MUST start response with "Yes." or "No."
- Questions like "Is LangChain used?", "Does he know Python?", "Is he available?" → MUST start with "Yes." or "No."

## INTRODUCTION INTENT DETECTION:
- "Tell me about Thanuka", "Who is Thanuka", "Introduce yourself", "What does he do" → Give a full professional bio.

## CONTEXT GROUNDING:
Use ONLY the provided knowledge base chunks to answer. Do not fabricate projects, metrics, or credentials.

${buildKnowledgeContext()}`;

// ── Parse the request body safely ─────────────────────────────────────────────
async function parseBody(req: NextRequest) {
  const body = await req.json() as {
    messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
  };
  return body;
}

// ── Call Gemini with a specific model name ────────────────────────────────────
async function callGemini(
  apiKey: string,
  modelName: string,
  messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.45,
      topK: 40,
      topP: 0.92,
      maxOutputTokens: 600,
    },
  });

  // Build history (all turns except the final user message)
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: m.parts,
  }));

  const chat = model.startChat({ history });

  // Send the last user message
  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.parts[0].text);
  return result.response.text();
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;

  // Parse body ONCE — req.body can only be consumed once
  try {
    const body = await parseBody(req);
    messages = body.messages;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  // Model cascade: try newest flash first, then pro as fallback
  const modelCascade = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
  ];

  let lastError: unknown = null;

  for (const modelName of modelCascade) {
    try {
      console.log(`[Chat API] Trying model: ${modelName}`);
      const text = await callGemini(apiKey, modelName, messages);
      console.log(`[Chat API] Success with: ${modelName}`);
      return NextResponse.json({ text, model: modelName });
    } catch (err) {
      console.warn(`[Chat API] Model ${modelName} failed:`, err);
      lastError = err;
      // Continue to next model in cascade
    }
  }

  // All models failed
  console.error('[Chat API] All models failed. Last error:', lastError);
  return NextResponse.json(
    { error: 'AI service temporarily unavailable. Please try again shortly.' },
    { status: 503 }
  );
}
