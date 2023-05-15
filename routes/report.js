const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();


const expireTime = 1 * 60 * 60 * 1000;

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');
const shareCollection = (req) => {
	console.log('req.session.username:', req.session.username);
	return database.db(mongodb_database).collection(req.session.username);
  };

router.use(express.json());

router.use(express.urlencoded({ extended: false }));

function requireAuth(req, res, next) {
	if (req.session.authenticated) {
	  next();
	} else {
	  res.redirect('/login');
	}
  }

router.use('/report', requireAuth);

router.get('/report', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  if (isAuthenticated) {
  res.render('report.ejs', {authenticated: isAuthenticated });
  } else {
    res.redirect('/login');
  }
});



router.get('/report_succeed', (req, res) => {
	res.render('report_succeed.ejs');
  });
  

router.post('/reporting', async (req, res) => {
	console.log('Handling share request1...');
	console.log('Request body:', req.body);
	if (!req.session.authenticated) {
	  res.redirect('/login');
	  return;
	}
	
	const { title, description, street, city, postCode } = req.body;
	const location = `${street}, ${city}, ${postCode}`;
	console.log('Location:', street, city, postCode);

  const share = {
	_id: null,
    title: title || '',
    description: description || '',
	location: location || '',
	userId: req.session.username,
  };

  try {
    const shareCollection = database.db(mongodb_database).collection('shares');
    const result = await shareCollection.insertOne(share);

    res.render('report_succeed.ejs');
  } catch (error) {
    console.error('Error adding share:', error);
    res.status(500).send(`Error adding share: ${error.message}`);
  }
});

module.exports = router;