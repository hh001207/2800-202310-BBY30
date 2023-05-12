const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const router = express.Router();

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

router.get('/setting', (req, res) => {
  res.render('setting.ejs');
});

router.post('/change_password', async (req, res) => {
	if (!req.session.username) {
		return res.redirect('/login');
	}

	const newPassword = req.body.new_password;
	const username = req.session.username;

   var hashedPassword = await bcrypt.hash(newPassword, saltRounds);

   try {
      await userCollection.findOneAndUpdate({ username: username}, { $set: {password: hashedPassword}});
      console.log('Password changed!');
      res.redirect('/');
   } catch (err) {
      console.log(err);
      res.send('Error!');
   }
});

module.exports = router;
