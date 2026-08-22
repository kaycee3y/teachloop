import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a supportive but honest tutor grading a learner's explanation of a concept in their own words.
Return ONLY valid JSON, no prose, no markdown fences, matching this exact shape:
{
  "score": number (0 to 100),
  "hits": [string] (2 to 4 short phrases naming specific things the explanation got right, empty array if truly nothing),
  "gaps": [string] (1 to 4 short phrases naming specific things missing or wrong, empty array if the explanation is complete),
  "feedback": string (one encouraging sentence, specific to this explanation, not generic)
}
Grade on substance and understanding, not phrasing or length. A short but accurate explanation should score well.`;

export async function POST(req: Request) {
  const { summary, explanation } = await req.json();

  if (!explanation || typeof explanation !== "string" || explanation.trim().length < 10) {
    return NextResponse.json({ error: "Write a bit more before submitting." }, { status: 400 });
  }

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Concept summary the learner was taught:\n${summary}\n\nLearner's explanation in their own words:\n${explanation}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.4,
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";

  try {
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "The model returned malformed JSON, try again." }, { status: 502 });
  }
}