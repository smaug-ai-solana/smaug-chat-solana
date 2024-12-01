const axios = require("axios");
const logger = require("./logger");

exports.callAIModel = async (prompt, previousMessages = [], maxRetries = 5) => {
  const makeRequest = async () => {
    let retryCount = 0;
    const baseDelay = 1000;

    while (retryCount < maxRetries) {
      try {
        const systemMessage = process.env.AI_PROMPT;

        // Construct messages array with system message and context
        const messages = [
          {
            role: "system",
            content: systemMessage,
          },
          ...previousMessages, // Include previous messages for context
          {
            role: "user",
            content: prompt,
          },
        ];

        const response = await axios.post(
          process.env.AI_API_URL,
          {
            model: process.env.AI_MODEL,
            messages: messages,
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.AI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const responseText = response.data.choices[0].message.content;
        return responseText;
      } catch (error) {
        logger.error("Error calling API:", error);
        retryCount++;
        await new Promise((resolve) =>
          setTimeout(resolve, baseDelay * retryCount)
        );
      }
    }
    throw new Error(`Failed after ${maxRetries} retries`);
  };

  return makeRequest();
};

exports.verifyAiModelResponse = (response) => {
  if (response.includes("SOL")) {
    throw new Error("AI model responded with SOL");
  }
};
