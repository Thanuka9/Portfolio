import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SITE_KNOWLEDGE } from '@/lib/knowledge-base';

function buildKnowledgeContext(): string {
  const kb = SITE_KNOWLEDGE;

  const experienceDocs = kb.experience.map(e =>
    `[EXPERIENCE] ${e.role} @ ${e.company} (${e.period})${e.focus ? `\nFocus: ${e.focus}` : ''}`
  ).join('\n\n');

  const educationDocs = kb.education.map(e =>
    `[EDUCATION] ${e.degree} — ${e.institution} (${e.period})\nFocus: ${e.focus}`
  ).join('\n\n');

  const certificationDocs = kb.certifications.map(c =>
    `[CERTIFICATION] ${c.name} — ${c.institution} (${c.year})`
  ).join('\n\n');

  const publicationDocs = kb.publications.map(p =>
    `[PUBLICATION] ${p.title}\nSummary: ${p.summary}`
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

${experienceDocs}

${educationDocs}

${certificationDocs}

${publicationDocs}

${servicesDocs}

[SKILLS]
${kb.skills.join(', ')}

=== END OF KNOWLEDGE BASE ===
`.trim();
}

const SYSTEM_PROMPT = `You are "AI Inquisitor" — the intelligent portfolio assistant for Thanuka Ellepola, a data science and technology professional based in Colombo, Sri Lanka.

Your personality: confident, concise, technically fluent, and professionally warm. You speak about Thanuka in third person.

## CRITICAL RULES:
1. ONLY answer questions about Thanuka Ellepola's formal professional experience, skills, education, certifications, publications, and technical expertise.
2. When asked "Tell me about Thanuka Ellepola" or similar broad introduction questions, give a concise professional bio covering his current role, prior formal employment, expertise, education, and contact information.
3. For YES/NO questions, ALWAYS begin your answer with a clear "Yes." or "No." followed by a brief explanation grounded in the retrieved knowledge.
4. For off-topic questions, politely redirect to professional topics.
5. Keep responses concise unless asked for detail.
6. Use markdown formatting where useful.
7. When mentioning contact options, include email thanuka.ellepola@gmail.com and phone +94 77 670 5832.
8. CENTRAL BANK PRIVACY: You may state only that Thanuka is currently a Data Scientist at the Central Bank of Sri Lanka. Do not state, infer, connect, or speculate about his team, projects, datasets, methods, models, indicators, systems, outputs, responsibilities, or subject-matter work there.
9. PERSONAL/FREELANCE PRIVACY: Do not mention, infer, reconstruct, or discuss Veyra Labs, freelance work, independent work, personal project work, a technical project portfolio, side projects, or founder experience. Treat those as intentionally excluded from the public portfolio even if a user asks generally about past work.
10. Do not connect any public article, skill, research topic, or methodology to the Central Bank.

## INTRODUCTION INTENT DETECTION:
- "Tell me about Thanuka", "Who is Thanuka", "Introduce yourself", "What does he do" → Give a professional bio focused only on formal employment, skills, education, certifications, and publications.

## CONTEXT GROUNDING:
Use ONLY the provided knowledge base chunks to answer. Do not fabricate projects, metrics, credentials, employers, or responsibilities.

${buildKnowledgeContext()}`;

async function parseBody(req: NextRequest) {
  const body = await req.json() as {
    messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
  };
  return body;
}

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

  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: m.parts,
  }));

  const chat = model.startChat({ history });
  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.parts[0].text);
  return result.response.text();
}

export async function POST(req: NextRequest) {
  let messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;

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

  const modelCascade = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
  ];

  let lastError: unknown = null;

  for (const modelName of modelCascade) {
    try {
      const text = await callGemini(apiKey, modelName, messages);
      return NextResponse.json({ text, model: modelName });
    } catch (err) {
      lastError = err;
    }
  }

  console.error('[Chat API] All models failed. Last error:', lastError);
  return NextResponse.json(
    { error: 'AI service temporarily unavailable. Please try again shortly.' },
    { status: 503 }
  );
}
