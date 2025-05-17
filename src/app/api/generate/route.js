export async function POST(req) {
    const { course, keywords, techstack } = await req.json();
  
    const prompt = `
  Generate 3 unique and creative Capstone Project Titles for a ${course} student.
  Use the following keywords: ${keywords || "any relevant keywords"}.
  Make sure each title includes a real-world system or app idea.
  
  Prefer using this tech stack: ${techstack || "any modern technologies"}.
  
  Format them as:
  1. ...
  2. ...
  3. ...
  `;
  
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      console.error("Groq API error:", data);
      return new Response("Error generating titles", { status: 500 });
    }
  
    return Response.json({ result: data.choices[0].message.content });
  }
  