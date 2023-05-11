const express = require('express');
const router = express.Router();

router.get('/main_list', (req, res) => {
  res.render('main_list.ejs');
});

module.exports = router;