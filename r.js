require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('langchain/dist/chat_models/openai'); // Correct path for LangChain v0.3.23
const { LLMChain } = require('langchain');
const { PromptTemplate } = require('langchain');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Setup OpenAI model via LangChain v0.3.23
const openAI = new OpenAI({
  apiKey: "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",
  model: 'gpt-3.5-turbo', // Model name should be correct
  temperature: 0.5, // Adjust the temperature as needed
});

// Prompt Template
const prompt = new PromptTemplate({
  template: `You are a sentiment analysis expert.  
Classify the following feedback into one of these categories: Positive, Negative, or Neutral.  
Feedback: "{feedback}"  
Sentiment:`,
  inputVariables: ['feedback'],
});

// LangChain LLM Chain
const chain = new LLMChain({ llm: openAI, prompt });

// API Route
app.post('/feedback', async (req, res) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: 'Feedback is required' });
  }

  try {
    const response = await chain.call({ feedback });
    const sentiment = response.text.trim();

    res.json({
      feedback,
      sentiment,
    });
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Sentiment Analysis API running at http://localhost:${port}`);
});
