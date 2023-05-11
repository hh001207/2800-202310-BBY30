require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const app = express();

const Joi = require("joi");

const urlencoded = require('url');

const port = process.env.PORT || 3030;

// expires in 1 hour
const expireTime = 1000 * 60 * 60;

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;

const node_session_secret = process.env.NODE_SESSION_SECRET;

var { database } = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

app.use(express.urlencoded({ extended: false }));

var mongoStore = MongoStore.create({
    mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
    crypto: {
        secret: mongodb_session_secret
    }
})

app.use(session({
    secret: node_session_secret,
    store: mongoStore, //default is memory store 
    saveUninitialized: false,
    resave: true
}
));

function isValidSession(req) {
  if (req.session.authenticated) {
      return true;
  }
  return false;
}

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