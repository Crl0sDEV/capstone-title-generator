import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
});

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";

  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({
        error: "Limit reached. Please wait before generating again.",
        reset,
      }),
      { status: 429 }
    );
  }

  const { course, keywords, techstack, topic, sdg } = await req.json();

  const trimmedKeywords = (keywords || "").slice(0, 300);
  const trimmedTechstack = (techstack || "").slice(0, 200);
  const trimmedTopic = (topic || "").slice(0, 300);

  const prompt = `
Generate 3 unique and creative Capstone Project Titles for a ${course} student.

Context & Requirements:
- Keywords to include: ${trimmedKeywords || "any relevant keywords"}.
- Preferred Tech Stack: ${trimmedTechstack || "any modern technologies"}.
- Core Problem/Topic to Solve: ${trimmedTopic ? `"${trimmedTopic}"` : "Focus on a relevant real-world problem in the Philippines"}.
${sdg ? `- **Target SDG (Sustainable Development Goal)**: The solution MUST align with **"${sdg}"**.` : ""}

Instructions:
1. Make sure the titles directly address the "Core Problem" and "Target SDG" if provided.
2. Ensure each title includes a specific system, app, or platform idea (e.g., "Web-based...", "Mobile App for...").
3. Keep the tone professional and academic suitable for a Capstone Project.

Format them strictly as:
1. ...
2. ...
3. ...
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.7
    }),
  });

  const data = await response.json();
  return Response.json({ result: data.choices[0].message.content });
}