const express = require('express');
const router = express.Router();

router.get('/about_contact', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('about_contact.ejs', {authenticated: isAuthenticated });
});

module.exports = router;