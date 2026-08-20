import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a curriculum designer. Break the given topic or notes into a short learning path of 3 to 5 nodes, ordered from foundational to advanced.
Return ONLY valid JSON, no prose, no markdown fences, matching this exact shape:
{
  "pathTitle": string,
  "nodes": [
    {
      "id": string,
      "title": string,
      "summary": string (2 to 3 sentences teaching the core idea, plain language),
      "questions": [
        { "question": string, "options": [string, string, string, string], "correctIndex": number }
      ],
      "explainPrompt": string (a prompt asking the learner to explain this node's concept in their own words)
    }
  ]
}
Each node must have exactly 3 questions.`;

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic || typeof topic !== "string" || topic.trim().length < 3) {
    return NextResponse.json({ error: "Give me a topic or some notes first." }, { status: 400 });
  }

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Topic or notes:\n${topic}` },
    ],
    response_format: { type: "json_object" },
    temperature: 0.5,
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";

  try {
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "The model returned malformed JSON, try again." }, { status: 502 });
  }
}
