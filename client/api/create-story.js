// /api/create-story.js
require('dotenv').config();
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const messages = [
      { role: 'system', content: 'You are a skilled writer of stories for children.' },
      { role: 'user', content: prompt },
    ];
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    res.json({ story: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating story' });
  }
};
