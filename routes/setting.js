const express = require('express');
const router = express.Router();

router.get('/setting', (req, res) => {
  res.render('setting.ejs');
});

module.exports = router;