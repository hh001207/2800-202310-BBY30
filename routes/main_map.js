const express = require('express');
const router = express.Router();

router.get('/main_map', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('main_map.ejs', {authenticated: isAuthenticated });
});

module.exports = router;