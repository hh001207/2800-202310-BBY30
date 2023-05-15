const express = require('express');

const bcrypt = require('bcrypt');
const Joi = require('joi');

const router = express.Router();

const expireTime = 1 * 60 * 60 * 1000;

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

router.use(express.urlencoded({ extended: false }));

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.post('/loggingin', async (req, res) => {
	var email = req.body.email;
	var password = req.body.password;

	
	console.log(password);
	const schema = Joi.string().required();
	const validationResult = schema.validate(email);
	if (validationResult.error != null) {
		res.render('error', { error: `${validationResult.error.message}` });
		return;
	}

	const result = await userCollection.find({ email: email }).project({ username: 1, password: 1, firstname: 1, lastname: 1 }).toArray();

	console.log(result);
	
	if (result.length === 0) {
		res.render('error', { error: 'Invalid email or password' });
		return;
	} else if (result.length > 1) {
		res.redirect('/loggedin');
		return;
	}
	if (await bcrypt.compare(password, result[0].password)) {
		console.log('correct password');

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
		console.log(result[0].password);
		res.render('error', { error: 'Invalid password', authenticated: req.session.authenticated });
		return;
	}
});

router.get('/loggedin', (req, res) => {
	if (req.session.authenticated) {
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;