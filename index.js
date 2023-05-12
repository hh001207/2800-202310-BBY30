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

app.get('/about_contact', aboutContactRouter);

app.listen(port, () => {
  console.log("Node application listening on port " + port);
});