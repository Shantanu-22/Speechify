const apiKey = "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";
const apiEndpoint = "https://api.openai.com/v1/engines/davinci/completions";
const maxTokens = 100;

async function generateText(prompt) {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: maxTokens,
      }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error making API request:', error.message);
    throw error;
  }
}

generateText("Hello World");



