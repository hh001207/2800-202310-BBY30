const express = require('express');
const router = express.Router();

router.get('/detail', (req, res) => {
  res.render('detail.ejs');
});

module.exports = router;