const express = require('express');
const router = express.Router();

router.get('/main_map', (req, res) => {
  res.render('main_map.ejs');
});

module.exports = router;