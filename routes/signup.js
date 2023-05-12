const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const MongoStore = require('connect-mongo');
const userCollection = database.db(mongodb_database).collection("users");

// Connect to your MongoDB
var mongoStore = MongoStore.create({
  mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
  crypto: {
    secret: mongodb_session_secret,
  },
});

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});


// Middleware
router.use(bodyParser.urlencoded({ extended: true }));

// Routes
router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

router.post('/register_user', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user');
    } else {
      res.status(201).redirect('/success_page'); // Redirect to a success page, create it if needed
    }
  });
});

module.exports = router;
