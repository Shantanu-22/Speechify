const apiKey = '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';

// Set a custom chatbot name
const chatbotName = "LinguaBot";

async function makeAPIRequest(userMessage) {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: userMessage,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const chatGPTResponse = response.data.choices[0].text;
    return chatGPTResponse;
  } catch (error) {
    console.error('Error in makeAPIRequest:', error);
    return 'An error occurred while fetching the response.';
  }
}

const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('fname');
const chatResponse = document.getElementById('myTextarea');

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userMessage = userInput.value.trim();

  if (!userMessage) {
    return;
  }

  try {
    // Call the function to make the API request
    const response = await makeAPIRequest(userMessage);

    // Display the response with the chatbot's name
    chatResponse.value += `User: ${userMessage}\n${chatbotName}: ${response}\n\n`;

    // Clear the input field
    userInput.value = '';
  } catch (error) {
    console.error('Error in chatForm submit:', error);
  }
});
