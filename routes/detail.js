const express = require('express');
const router = express.Router();

router.get('/detail', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('detail.ejs', {authenticated: isAuthenticated });
});

module.exports = router;