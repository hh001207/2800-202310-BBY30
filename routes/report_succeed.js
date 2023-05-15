const express = require('express');
const router = express.Router();


//fix the requireAuth conflict
router.get('/report_succeed', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  console.log(isAuthenticated);
  if (isAuthenticated) {
  const insertedReportId = req.query.insertedReportId
  res.render('report_succeed.ejs', {authenticated: isAuthenticated, insertedReportId: insertedReportId});
  } else {
      res.redirect('/login');
    }
});

module.exports = router;