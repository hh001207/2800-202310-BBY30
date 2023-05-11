const express = require('express');
const router = express.Router();

router.get('/about_contact', (req, res) => {
  res.render('about_contact.ejs');
});

module.exports = router;