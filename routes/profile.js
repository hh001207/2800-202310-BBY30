const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('profile.ejs', {
    username: req.session.username,
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    email: req.session.email,
    password: req.session.password,
  });
});

module.exports = router;

