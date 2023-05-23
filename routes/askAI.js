const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
router.use(bodyParser.json());

router.get('/ask', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('askAI.ejs', { username: req.session.username, authenticated: isAuthenticated });
});

router.post('/ask', async (req, res) => {
  const question = req.body.question;
  const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Q: ${question}\nA:`,
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['\n'],
  });

  if (response.data.choices && response.data.choices.length > 0 && response.data.choices[0].text) {
      res.json({ answer: response.data.choices[0].text.trim() });
  } else {
      res.json({ answer: 'No response from the API' });
  }
});

module.exports = router;