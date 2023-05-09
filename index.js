const express = require('express');

const app = express();

const port = process.env.PORT || 3030;

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('template');
})

app.get('/main_map', (req, res) => {
  res.render('main_map');
})

app.get('/setting', (req, res) => {
  res.render('setting');
})

app.listen(port, () => {
  console.log("Node application listening on port " + port);
});