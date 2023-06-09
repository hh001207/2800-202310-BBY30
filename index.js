require('./utils.js');
const path = require('path');

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const port = process.env.PORT || 3030;

const app = express();

const Joi = require('joi');

const expireTime = 1 * 60 * 60 * 1000;

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;


app.set('view engine', 'ejs');

const node_session_secret = process.env.NODE_SESSION_SECRET;

var { database } = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

app.use(express.urlencoded({ extended: false }));

var mongoStore = MongoStore.create({
	mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
	crypto: {
		secret: mongodb_session_secret,
	},
});



app.use(
	session({
		secret: node_session_secret,
		store: mongoStore,
		saveUninitialized: false,
		resave: true,
	})
);

app.use(express.static('./public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
const editreportRouter = require('./routes/edit_report.js');
const updatereportRouter = require('./routes/update_report.js');
const secretReportRouter = require('./routes/secret_report.js');
const askAIRouter = require('./routes/askAI.js');

app.get('/', homeRouter);

app.get('/signup', signupRouter);

app.post('/register_user', signupRouter);

app.get('/main_map', mainMapRouter);

app.get('/main_list', mainListRouter);

app.get('/setting', settingRouter);

app.post('/change_password', settingRouter);

app.get('/login', loginRouter);

app.post('/loggingin', loginRouter);

app.post('/reporting', reportRouter);

app.post('/update_report', updatereportRouter);

app.get('/loggedin', loginRouter);

app.get('/logout', loginRouter);

app.get('/report', reportRouter);

app.get('/report_succeed', reportSucceedRouterRouter);

app.get('/edit_report', editreportRouter);

app.get('/profile', profileRouter);

app.get('/detail', detailRouter);

app.get('/about_contact', aboutContactRouter);

app.get('/secret_report', secretReportRouter);

app.use('/', profileRouter);

app.get('/ask', askAIRouter);

app.post('/ask', askAIRouter);

app.use('/webpush', require('./routes/report'));

app.use('/report', reportRouter);

app.get('*', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	res.status(404);
	res.render('404', {authenticated: isAuthenticated });
});

async function sendWebPushNotification(subscription, message) {
	try {
	  const response = await fetch('/webpush', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  subscription,
		  message,
		}),
	  });
  
	  if (!response.ok) {
		throw new Error('Failed to send push notification');
	  }
  
	  console.log('Push notification sent successfully');
	} catch (error) {
	  console.error('Error sending push notification:', error);
	}
  }

  app.post('/webpush', async (req, res) => {
	const { subscription, message } = req.body;
  
	try {
	  const webPush = require('web-push');
	  const vapidKeys = {
		publicKey: process.env.VAPID_PUBLIC_KEY,
		privateKey: process.env.VAPID_PRIVATE_KEY,
	  };
  
	  webPush.setVapidDetails(
		'mailto:example@example.com',
		vapidKeys.publicKey,
		vapidKeys.privateKey
	  );
  
	  const payload = JSON.stringify(message);
  
	  await webPush.sendNotification(subscription, payload);
  
	  res.sendStatus(200);
	} catch (error) {
	  console.error('Error sending push notification:', error);
	  res.sendStatus(500);
	}
  });
  

app.listen(port, () => {
	console.log('Node application listening on port ' + port);
});
