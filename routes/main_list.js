const express = require('express');
const router = express.Router();

router.get('/main_list', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('main_list.ejs', {authenticated: isAuthenticated });
});

module.exports = router;