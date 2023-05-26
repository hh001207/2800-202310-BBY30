const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const router = express.Router();

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('./routes/databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

router.get('/setting', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	if (isAuthenticated) {
		res.render('setting.ejs', { authenticated: isAuthenticated });
	} else {
		res.redirect('/login');
	}
});

router.post('/change_password', async (req, res) => {
	if (!req.session.username) {
		return res.redirect('/login');
	}

	const oldPassword = req.body.old_password;
	const newPassword = req.body.new_password;
	const confirmPassword = req.body.confirm_password;
	const username = req.session.username;

	try {
		const user = await userCollection.findOne({ username: username });
		const passwordMatch = await bcrypt.compare(oldPassword, user.password);
		if (!passwordMatch) {
			console.log('Invalid old password');
			return res.send('Invalid old password');
		}

		if (newPassword !== confirmPassword) {
			console.log('New password and confirm password do not match');
			return res.send('New password and confirm password do not match');
		}

		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

		try {
			await userCollection.findOneAndUpdate({ username: username }, { $set: { password: hashedPassword } });

			console.log('Password changed!');
			res.redirect('/');
		} catch (err) {
			console.log(err);
			res.send('Error!');
		}
	} catch (err) {
		console.log(err);
		res.send('Error!');
	}
});

module.exports = router;
