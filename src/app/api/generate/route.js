export async function POST(req) {
    const { course, keywords } = await req.json();
  
    const prompt = `Generate 5 unique and creative Capstone project titles for ${course} students. Include these keywords if possible: ${keywords || 'none'}`;
  
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
      }),
    });
  
    const data = await response.json();
    return Response.json({ result: data.choices[0].message.content });
  }
  