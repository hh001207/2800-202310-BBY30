const express = require('express');
const router = express.Router();

//test

router.get('/main_map', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('main_map.ejs', { authenticated: isAuthenticated, apiKey: 'AIzaSyAPFKFtKYoZT8kPL4P4CP_U7WoxhaM0S8k' });
});

module.exports = router;
