const express = require('express');
require("./units.js");
const app = express();
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const Joi = require('joi');
const port = process.env.PORT || 3030;
const expireTime = 24 * 60 * 60 * 1000;
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
const node_session_secret = process.env.NODE_SESSION_SECRET;

var {database} = include('databaseConnection');

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

const userCollection = database.db(mongodb_database).collection('users');
const shareCollection = (req) => {
	console.log('req.session.username:', req.session.username);
	return database.db(mongodb_database).collection(req.session.username);
  };
  var mongoStore = MongoStore.create({
    mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
    crypto: {
        secret: mongodb_session_secret
  }
}); 
app.use(session({
  secret: node_session_secret,
      store: mongoStore,
      saveUninitialized: false,
  resave: true,
}
));

function sessionValidation(req, res, next) {
  if (isValidSession(req)) {
      next();
  }
  else {
      res.redirect('/login');
  }
}

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

app.post('/loggingin', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  const schema = Joi.string().max(20).required();
  const validationResult = schema.validate(email);
  if (validationResult.error != null) {
      const errorMessage = validationResult.error.details[0].message;
      console.log(validationResult.error);
      res.render("error.ejs", { error: errorMessage, tryAgainLink: "/login",  navLinks: navLinks, currentURL: urlencoded.parse(req.url).pathname });
      return;
  }

  const result = await userCollection.findOne({ email });

  console.log(result);
  if (!result) {
      console.log("user not found");
      res.render("error.ejs", { error: "invalid email", tryAgainLink: "/login" , navLinks: navLinks, currentURL: urlencoded.parse(req.url).pathname });
      return;
  }
  if (await bcrypt.compare(password, result.password)) {
      console.log("correct password");
      req.session.authenticated = true;
      req.session.username = result.username;
      req.session.user_type = result.user_type;
      req.session.cookie.maxAge = expireTime;

      res.redirect('/members');
      return;
  }
  else {
      console.log("incorrect password");
      res.render("error.ejs", { error: "incorrect password", tryAgainLink: "/login" , navLinks: navLinks, currentURL: urlencoded.parse(req.url).pathname });
      return;
  }
});


app.get('/about_contact', aboutContactRouter);

app.listen(port, () => {
  console.log("Node application listening on port " + port);
});