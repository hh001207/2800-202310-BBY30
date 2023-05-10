const express = require('express');

const app = express();

const port = process.env.PORT || 3030;

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/main_map', (req, res) => {
  res.render('main_map');
})

app.get('/main_list', (req, res) => {
  res.render('main_list');
})

app.get('/setting', (req, res) => {
  res.render('setting');
})

app.get('/signup', (req, res) => {
  res.render('Signup');
})

app.get('/Login', (req, res) => {
  res.render('Login');
})

app.get('/contact', (req, res) => {
  res.render('Contact');
})


app.listen(port, () => {
  console.log("Node application listening on port " + port);
});