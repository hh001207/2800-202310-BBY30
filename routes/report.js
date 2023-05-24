const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const multer = require('multer');
const firebaseAdmin = require('firebase-admin');
const webpush = require('web-push');
const Subscription = require('./webpush');


var admin = require("firebase-admin");

var serviceAccount = require('./serviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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

// Set up your VAPID keys and email address
const vapidPublicKey = 'BPUGx8ahki6vYwmxolUhrAAukf8pmMdUnQSW-rble5J-QUAuuuWw7lTCQMldt3PV4Mi6pbcicuR2lfuIWzRpMXU';
const vapidPrivateKey = 'FCQ7MBeS_drZa8XjLsBhowfP9JCAw-OOak3XtiyQBtU';


// Set up the VAPID details
webpush.setVapidDetails(
  'mailto:  nfeng2@my.bcit.ca',
  vapidPublicKey,
  vapidPrivateKey
);

const expireTime = 1 * 60 * 60 * 1000;

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('databaseConnection');

async function sendWebPushNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, payload);
    console.log('Web notification sent successfully');
  } catch (error) {
    console.error('Error sending web notification:', error);
  }
}


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
	
	const { type, YEAR, MONTH, DAY, HOUR, MINUTES, description, street, city, postCode, mobileToken, webSubscription } = req.body;
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
	mobileToken: mobileToken || '',
  webSubscription: webSubscription || '',
  };

  try {
    var isAuthenticated = req.session.authenticated;
    const shareCollection = database.db(mongodb_database).collection('shares');
    const result = await shareCollection.insertOne(share);  
    const reportId = result.insertedId;
    console.log('Inserted report with ID:', reportId);
    if (mobileToken) {
       const mobileMessage = {
        token: mobileToken,
        notification: {
          title: 'New report',
          body: 'A new report has been added',
        }
       }
       console.log('Sending mobile notification:', mobileMessage);
       await firebaseAdmin.messaging().send(mobileMessage);
       console.log('Mobile notification sent successfully');
      
    }
   
    if (webSubscription) {
      const webMessage = JSON.stringify({
        title: 'New report',
        body: 'A new report has been added',
        url: `/detail/${reportId}`,
      });
      
      const subscriptions = await database.db(mongodb_database).collection('subscriptions').find().toArray();


      subscriptions.forEach(subscription => {
        if (subscription.userId !== req.session.userId) {
          sendWebPushNotification(subscription, webMessage);
        }
      });
      console.log('Web notification sent successfully');
    }
    res.render('report_succeed.ejs', { reportId, authenticated: isAuthenticated});

  } catch (error) {
    console.error('Error adding share:', error);
    res.status(500).send(`Error adding share: ${error.message}`);
  }
});


module.exports = router;