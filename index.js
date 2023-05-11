const express = require('express');

const app = express();

const port = process.env.PORT || 3030;

app.set("view engine", "ejs");

app.use(express.static('./public'));

const homeRouter = require('./routes/home.js');
const mainMapRouter = require('./routes/main_map.js');
const mainListRouter = require('./routes/main_list.js');

app.get('/', homeRouter);

app.get('/main_map', mainMapRouter);

app.get('/main_list', mainListRouter);

app.get('/setting', (req, res) => {
  res.render('setting');
})

app.get('/signup', (req, res) => {
  res.render('Signup');
})

app.get('/login', (req, res) => {
  res.render('Login');
})

app.get('/report', (req, res) => {
  res.render('report');
})

app.get('/report_succeed', (req, res) => {
  res.render('report_succeed');
})

app.get('/profile', (req, res) => {
  res.render('profile');
})

app.get('/detail', (req, res) => {
  res.render('detail');
})

app.get('/about_contact', (req, res) => {
  res.render('about_contact');
})

app.listen(port, () => {
  console.log("Node application listening on port " + port);
});