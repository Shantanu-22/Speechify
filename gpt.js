
let btn = document.querySelector("#chatResponse");
let text = document.querySelector("#myTextarea");
let url = "https://api.openai.com/v1/engines/davinci/completions";

async function gptresponse() {
    
  try {
    let input = document.querySelector("#fname").value.trim();
    let response1 = await axios.get('gpt.json');
    const apiKey = response1.data.Api; 
    console.log(apiKey);
    const response = await axios.post(
      url,
      {
        prompt: input,
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response; // Return the response to be used later
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to be handled later
  }
}

btn.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    let response = await gptresponse();
    text.value = response.data.choices[0].text;
  } catch (err) {
    console.error("Error:", err);
  }
});
