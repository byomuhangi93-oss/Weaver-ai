export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: req.body.messages
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Error"
    });

  } catch(err){

    res.status(500).json({
      reply: "Server error"
    });

  }

}