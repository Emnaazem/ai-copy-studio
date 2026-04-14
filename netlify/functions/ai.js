
exports.handler = async (event) => {

  const { product, audience, tone } = JSON.parse(event.body);

  const prompt =
  `Write a marketing text:
  Product: ${product}
  Audience: ${audience}
  Tone: ${tone}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      result: data.choices[0].message.content
    })
  };
};
