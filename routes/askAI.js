// Import required libraries and packages
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Create a new router
const router = express.Router();

// Initialize OpenAI configuration with API Key from environment variables
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Route to render AI question form
router.get('/ask', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	res.render('askAI.ejs', { username: req.session.username, authenticated: isAuthenticated });
});

// Route to post a question to AI and get a response
router.post('/ask', async (req, res) => {
	const question = req.body.question;
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `Q: ${question}\nA:`,
		temperature: 0,
		max_tokens: 1000,
		top_p: 1,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
		stop: ['\n'],
	});

	// Check if the response from OpenAI is valid
	if (response.data.choices && response.data.choices.length > 0 && response.data.choices[0].text) {
		res.json({ answer: response.data.choices[0].text.trim() });
	} else {
		res.json({ answer: 'No response from the API' });
	}
});

// Export the router
module.exports = router;
