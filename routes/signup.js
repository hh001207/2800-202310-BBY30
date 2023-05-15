const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const router = express.Router();

const saltRounds = 12;

const expireTime = 1 * 60 * 60 * 1000;

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

router.get('/signup', (req, res) => {
	var isAuthenticated = req.session.authenticated;
  res.render('signup.ejs', {authenticated: isAuthenticated });
});

router.post('/register_user', async (req, res) => {
	var username = req.body.username;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;

	if (!username || !email || !password || !firstname || !lastname) {
		res.send(`All fields are required. <br><br>Please <a href='/signup'>try again</a>`);
		return;
	}

	const schema = Joi.object({
		username: Joi.string().alphanum().max(20).required(),
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().max(20).required(),
	});

	const validationResult = schema.validate({ username, firstname, lastname, email, password });
	if (validationResult.error != null) {
		console.log(validationResult.error);
		res.redirect('/signup');
		return;
	}

	var hashedPassword = await bcrypt.hash(password, saltRounds);

	await userCollection.insertOne({
		username: username,
		firstname: firstname,
		lastname: lastname,
		email: email,
		password: hashedPassword,
	});
	console.log('Inserted user');

	req.session.authenticated = true;
	req.session.username = username;
	req.session.firstname = firstname;
	req.session.lastname = lastname;
	req.session.email = email;
	req.session.password = hashedPassword;
	req.session.cookie.maxAge = expireTime;

	res.redirect('/');
});

module.exports = router;
