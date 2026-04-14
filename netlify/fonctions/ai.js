exports.handler = async (event) => {

  try {

    if(!process.env.OPENAI_API_KEY){
      return {
        statusCode:200,
        body: JSON.stringify({ result: "❌ API KEY NOT FOUND" })
      };
    }

    const { product, audience, tone } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model:"gpt-4o-mini",
        messages:[{role:"user",content:"Say hello"}]
      })
    });

    const data = await response.json();

    return {
      statusCode:200,
      body: JSON.stringify({
        result: JSON.stringify(data)
      })
    };

  } catch (e){
    return {
      statusCode:200,
      body: JSON.stringify({
        result: "ERROR: " + e.message
      })
    };
  }
};
