const express = require('express');
const router = express.Router();

//fix the requireAuth conflict
router.get('/report_succeed', (req, res) => {
  res.render('report_succeed.ejs');
});

module.exports = router;