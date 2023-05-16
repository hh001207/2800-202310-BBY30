const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const multer = require('multer');

const expireTime = 1 * 60 * 60 * 1000;

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('databaseConnection');


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder where uploaded files should be stored
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Specify how the file should be named
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });

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

  

router.post('/reporting', upload.single('picture'), async (req, res) => {
	console.log('Handling share request1...');
	console.log('Request body:', req.body);
	if (!req.session.authenticated) {
	  res.redirect('/login');
	  return;
	}
	
	const { type, YEAR, MONTH, DAY, HOUR, MINUTES, description, street, city, postCode } = req.body;
	const location = `${street}, ${city}, ${postCode}`;
	console.log('Location:', street, city, postCode);

const share = {
	_id: null,
  userId: req.session.username,
  type: type || '',
  YEAR: new Date().getFullYear(),
	MONTH: new Date().getMonth() + 1,
	DAY: new Date().getDate(),
  HOUR: new Date().getHours(),
  MINUTES: new Date().getMinutes(),
  description: description || '',
	location: location || '',
  picture: req.file ? req.file.filename : '',
	
  };

  try {
    var isAuthenticated = req.session.authenticated;
    const shareCollection = database.db(mongodb_database).collection('shares');
    const result = await shareCollection.insertOne(share);  
    const reportId = result.insertedId;
    console.log('Inserted report with ID:', reportId);
    res.render('report_succeed.ejs', { reportId, authenticated: isAuthenticated});

  } catch (error) {
    console.error('Error adding share:', error);
    res.status(500).send(`Error adding share: ${error.message}`);
  }
});

module.exports = router;