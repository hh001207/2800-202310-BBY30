const express = require('express');
const router = express.Router();

router.get('/main_map', (req, res) => {
  // Render the main_map.ejs template and pass the Google Maps API key
  res.render('main_map.ejs', { apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' });
});

module.exports = router;
