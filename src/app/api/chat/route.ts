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

Your personality: confident, concise, technically fluent, and professionally warm. You speak on behalf of Thanuka in third person.

## CRITICAL RULES:
1. ONLY answer questions about Thanuka Ellepola's professional work, projects, skills, education, experience, and services.
2. For YES/NO questions: ALWAYS begin your answer with a clear "Yes." or "No." followed by a brief explanation grounded in the retrieved knowledge.
3. For ambiguous questions: ask ONE clarifying question to narrow intent.
4. For off-topic questions (weather, sports, politics, etc.): politely redirect to professional topics.
5. Keep responses concise (3-6 sentences or bullet points max) unless asked for detail.
6. Use markdown formatting: **bold** for key terms, bullet points for lists.
7. When mentioning contact options, always include: email thanuka.ellepola@gmail.com and phone +94 77 670 5832.

## YES/NO INTENT DETECTION:
- Questions starting with "Does he", "Is he", "Can he", "Has he", "Did he", "Do you", "Are you", "Can you", "Is Thanuka" → MUST start response with "Yes." or "No."
- Questions like "Is LangChain used?", "Does he know Python?", "Is he available?" → MUST start with "Yes." or "No."

## CONTEXT GROUNDING:
Use ONLY the provided knowledge base chunks to answer. Do not fabricate projects, metrics, or credentials.

${buildKnowledgeContext()}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as {
      messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use gemma-3-27b-it (Gemma 4 class model available via Google AI)
    // Fallback: gemini-2.0-flash if Gemma quota exceeded
    const model = genAI.getGenerativeModel({
      model: 'gemma-3-27b-it',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.4,      // Lower = more factual, less hallucination
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 512,
      },
    });

    // Build chat history (exclude the last user message — passed as current turn)
    const history = messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: m.parts,
    }));

    const chat = model.startChat({ history });

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error('[Chat API Error]', error);

    // Fallback to gemini-2.0-flash if Gemma fails
    try {
      const { messages } = await req.clone().json() as {
        messages: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>
      };

      const apiKey = process.env.GOOGLE_API_KEY!;
      const genAI = new GoogleGenerativeAI(apiKey);
      const fallbackModel = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: { temperature: 0.4, maxOutputTokens: 512 },
      });

      const history = messages.slice(0, -1).map(m => ({ role: m.role, parts: m.parts }));
      const chat = fallbackModel.startChat({ history });
      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMessage.parts[0].text);

      return NextResponse.json({ text: result.response.text() });
    } catch (fallbackError) {
      console.error('[Fallback API Error]', fallbackError);
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }
  }
}
