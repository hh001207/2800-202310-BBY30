const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs', { username: req.session.username });
});

module.exports = router;