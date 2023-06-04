// /api/create-story.js
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

    console.log('Sending prompt to OpenAI API: ', prompt);
    const startTime = Date.now();

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const endTime = Date.now();
    console.log('Received response from OpenAI API in ', (endTime - startTime), 'ms');

    console.log('Response from OpenAI API: ', completion.data.choices[0].message.content);
    res.json({ story: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('Error creating story: ', error);
    res.status(500).json({ error: 'Error creating story' });
  }
};

