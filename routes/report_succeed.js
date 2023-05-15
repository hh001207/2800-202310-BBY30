const express = require('express');
const router = express.Router();


//fix the requireAuth conflict
router.get('/report_succeed', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  console.log(isAuthenticated);
  if (isAuthenticated) {
  res.render('report_succeed.ejs', {authenticated: isAuthenticated});
  } else {
      res.redirect('/login');
    }
});

module.exports = router;