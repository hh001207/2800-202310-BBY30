const express = require('express');
const router = express.Router();
const mongodb_database = process.env.MONGODB_DATABASE;
const { database } = require('../databaseConnection');
const userCollection = database.db(mongodb_database).collection('users');
router.use(express.urlencoded({ extended: false }));
const ObjectId = require('mongodb').ObjectId;

// GET route to render the profile page
router.get('/profile', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	if (isAuthenticated) {
		res.render('profile.ejs', {
			username: req.session.username,
			firstname: req.session.firstname,
			lastname: req.session.lastname,
			email: req.session.email,
			password: req.session.password,
			authenticated: isAuthenticated,
		});
	} else {
		res.redirect('/login');
	}
});

// router.post('/profile', async (req, res) => {
//   const {
//     username,
//     firstname,
//     lastname,
//     gender,
//     age,
//     job,
//     email,
//     password,
//     country,
//     city
//   } = req.body;
//   try {
//     await userCollection.updateOne(
//       { _id: ObjectId(req.session.userId) },
//       {
//         $set: {
//           username,
//           firstname,
//           lastname,
//           gender,
//           age,
//           job,
//           email,
//           password,
//           country,
//           city
//         }
//       }
//     );
//     res.status(200).send("Profile updated successfully.");
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     res.status(500).send("Error updating profile.");
//   }
// });

module.exports = router;
