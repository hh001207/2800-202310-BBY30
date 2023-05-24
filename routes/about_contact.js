// Import required libraries and packages
const express = require('express');

// Create a new router
const router = express.Router();

// Route to render about_contact form
router.get('/about_contact', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	res.render('about_contact.ejs', { authenticated: isAuthenticated });
});

// Export the router
module.exports = router;
