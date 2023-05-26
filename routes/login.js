// Import libraries
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Create a new router
const router = express.Router();

// Middleware to parse urlencoded bodies
router.use(express.urlencoded({ extended: false }));

// Configuration
const expireTime = 1 * 60 * 60 * 1000;
const mongodb_database = process.env.MONGODB_DATABASE;

// Initialize the database connection
var { database } = include('./routes/databaseConnection');
const userCollection = database.db(mongodb_database).collection('users');

// GET: /login
router.get('/login', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	res.render('login.ejs', { authenticated: isAuthenticated });
});

// POST: /loggingin
router.post('/loggingin', async (req, res) => {
	var email = req.body.email;
	var password = req.body.password;

	// Validate the email
	const schema = Joi.string().required();
	const validationResult = schema.validate(email);
	if (validationResult.error != null) {
		res.render('error', { error: `${validationResult.error.message}`, authenticated: req.session.authenticated });
		return;
	}

	// Find the user in the database
	const result = await userCollection
		.find({ email: email })
		.project({ username: 1, password: 1, firstname: 1, lastname: 1 })
		.toArray();

	// Check the result
	if (result.length === 0) {
		res.render('error', { error: 'Invalid email or password', authenticated: req.session.authenticated });
		return;
	} else if (result.length > 1) {
		res.redirect('/loggedin');
		return;
	}

	// Compare the password
	if (await bcrypt.compare(password, result[0].password)) {
		// Successful login
		req.session.authenticated = true;
		req.session.email = email;
		req.session.firstname = result[0].firstname;
		req.session.lastname = result[0].lastname;
		req.session.username = result[0].username;
		req.session.password = result[0].password;
		req.session.cookie.maxAge = expireTime;

		res.redirect('/loggedin');
		return;
	} else {
		// Failed login
		res.render('error', { error: 'Invalid password', authenticated: req.session.authenticated });
		return;
	}
});

// GET: /loggedin
router.get('/loggedin', (req, res) => {
	if (req.session.authenticated) {
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

// GET: /logout
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

// Export the router
module.exports = router;
