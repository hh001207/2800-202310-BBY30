// Import required libraries and packages
const express = require('express');

// Create a new router
const router = express.Router();

// Route to render index page
router.get('/', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	res.render('index.ejs', { username: req.session.username, authenticated: isAuthenticated });
});

// Export the router
module.exports = router;
