// Import libraries
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Configuration
const saltRounds = 12;
const expireTime = 1 * 60 * 60 * 1000;
const mongodb_database = process.env.MONGODB_DATABASE;

// Create a new router
const router = express.Router();

// Initialize the database connection
var { database } = include('./routes/databaseConnection');
const userCollection = database.db(mongodb_database).collection('users');

// GET: /signup
router.get('/signup', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	res.render('signup.ejs', { authenticated: isAuthenticated });
});

// POST: /register_user
router.post('/register_user', async (req, res) => {
	var username = req.body.username;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;

	// Basic form validation
	if (!username || !email || !password || !firstname || !lastname) {
		res.send(`All fields are required. <br><br>Please <a href='/signup'>try again</a>`);
		return;
	}

	// Advanced form validation
	const schema = Joi.object({
		username: Joi.string().alphanum().max(20).required(),
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().max(20).required(),
	});

	const validationResult = schema.validate({ username, firstname, lastname, email, password });
	if (validationResult.error != null) {
		var isAuthenticated = req.session.authenticated;
		res.render('error', { authenticated: isAuthenticated, error: `${validationResult.error.message}` })
		return;
	}

	// Hash password
	var hashedPassword = await bcrypt.hash(password, saltRounds);

	// Insert user into database
	await userCollection.insertOne({
		username: username,
		firstname: firstname,
		lastname: lastname,
		email: email,
		password: hashedPassword,
	});

	// Save user in session
	req.session.authenticated = true;
	req.session.username = username;
	req.session.firstname = firstname;
	req.session.lastname = lastname;
	req.session.email = email;
	req.session.password = hashedPassword;
	req.session.cookie.maxAge = expireTime;

	// Redirect to home page
	res.redirect('/');
});

// Export the router
module.exports = router;
