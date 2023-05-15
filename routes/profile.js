const express = require('express');
const router = express.Router();
const mongodb_database = process.env.MONGODB_DATABASE;
const { database } = require('../databaseConnection');
const userCollection = database.db(mongodb_database).collection('users');
router.use(express.urlencoded({ extended: false }));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// GET route to render the profile page
router.get('/profile', (req, res) => {
  const { username, firstname, lastname, gender, age, job, email } = req.session;

  res.render('profile', {
    username: req.session.username,
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    gender: req.session.gender,
    age: req.session.age,
    job: req.session.job,  // Add this line
    email: req.session.email,
    password: req.session.password,
  });
});

router.post("/save", async (req, res) => {
  // Get the current username from session
  const currentUsername = req.session.username;

  // Get updated profile data from the request body
  const { username, firstname, lastname, gender, age, job, email } = req.body;

  try {
    // Update the user data in the database
    const result = await userCollection.findOneAndUpdate(
      { username: currentUsername },
      {
        $set: {
          username: username,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          age: age,
          job: job,
          email: email
        }
      },
      { returnOriginal: false }
    );

    if (!result.value) {
      console.error('Update was unsuccessful:', result);
      return res.status(500).send("Error editing profile");
    }

    // Get the updated user data from the database
    const updatedUser = await userCollection.findOne({ username: username });

    // Update the session data with the updated user details
    req.session.username = updatedUser.username;
    req.session.firstname = updatedUser.firstname;
    req.session.lastname = updatedUser.lastname;
    req.session.gender = updatedUser.gender;
    req.session.age = updatedUser.age;
    req.session.job = updatedUser.job;
    req.session.email = updatedUser.email;

    req.session.save(err => {
      if (err) {
        console.error('Error occurred during session save:', err);
        return res.status(500).send("Error editing profile");
      }

      // Redirect to the profile page after the session is saved
      res.json(updatedUser);
    });
  } catch (err) {
    console.error('Error occurred during findOneAndUpdate:', err);
    res.status(500).send("Error editing profile");
  }
});
module.exports = router;


