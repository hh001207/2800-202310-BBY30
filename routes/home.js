const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('index.ejs', { username: req.session.username, authenticated: isAuthenticated });
});

module.exports = router;