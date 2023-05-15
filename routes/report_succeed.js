const express = require('express');
const router = express.Router();

//fix the requireAuth conflict
router.get('/report_succeed', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('report_succeed.ejs', {authenticated: isAuthenticated });
});

module.exports = router;