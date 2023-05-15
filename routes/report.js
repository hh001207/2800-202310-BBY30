const express = require('express');
const router = express.Router();

router.get('/report', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  if (isAuthenticated) {
  res.render('report.ejs', {authenticated: isAuthenticated });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;