export async function POST(req) {
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
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400, 
        temperature: 0.7  
      }),
    });
  
    const data = await response.json();
    return Response.json({ result: data.choices[0].message.content });
  }
  