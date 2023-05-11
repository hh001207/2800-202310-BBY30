const express = require('express');

const app = express();

const port = process.env.PORT || 3030;

app.set("view engine", "ejs");

app.use(express.static('./public'));

const homeRouter = require('./routes/home.js');
const mainMapRouter = require('./routes/main_map.js');
const mainListRouter = require('./routes/main_list.js');
const aboutContactRouter = require('./routes/about_contact.js');
const detailRouter = require('./routes/detail.js');
const loginRouter = require('./routes/login.js');
const profileRouter = require('./routes/profile.js');
const reportRouter = require('./routes/report.js');
const settingRouter = require('./routes/setting.js');
const signupRouter = require('./routes/signup.js');
const reportSucceedRouterRouter = require('./routes/report_succeed.js');

app.get('/', homeRouter);

app.get('/main_map', mainMapRouter);

app.get('/main_list', mainListRouter);

app.get('/setting', settingRouter);

app.get('/signup', signupRouter);

app.get('/login', loginRouter);

app.get('/report', reportRouter);

app.get('/report_succeed', reportSucceedRouterRouter);

app.get('/profile', profileRouter);

app.get('/detail', detailRouter);

app.get('/about_contact', aboutContactRouter);

app.get('/contact', (req, res) => {
  res.render('Contact');
})


app.listen(port, () => {
  console.log("Node application listening on port " + port);
});