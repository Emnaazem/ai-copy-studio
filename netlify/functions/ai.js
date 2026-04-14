exports.handler = async (event) => {

  try {

    const { product, audience, tone } = JSON.parse(event.body);

    const prompt = `Write a marketing text:
Product: ${product}
Audience: ${audience}
Tone: ${tone}`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.HF_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
result: JSON.stringify(data)      })
    };

  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: "ERROR: " + e.message
      })
    };
  }
};
