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

  const { course, keywords, techstack } = await req.json();

  const trimmedKeywords = (keywords || "").slice(0, 300);
  const trimmedTechstack = (techstack || "").slice(0, 200);

  const prompt = `
Generate 3 unique and creative Capstone Project Titles for a ${course} student.
Use the following keywords: ${trimmedKeywords || "any relevant keywords"}.
Prefer using this tech stack: ${trimmedTechstack || "any modern technologies"}.
Make sure each title includes a real-world system or app idea.

Format them as:
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
