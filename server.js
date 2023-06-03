require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// TEXT-DAVINCI-003

// app.post('/create-story', async (req, res) => {
//   try {
//     const prompt = req.body.prompt;
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: prompt,
//       max_tokens: 3000, // Adjust as needed
//     });
//     res.json({ story: completion.data.choices[0].text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error creating story' });
//   }
// });


// gpt-3.5-turbo

app.post('/create-story', async (req, res) => {
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
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
