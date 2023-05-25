require('../utils.js');
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { ObjectId } = require('mongodb');

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('./routes/databaseConnection');


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

router.post('/update_report', upload.single('picture'), async (req, res) => {
  const reportId = req.body.reportId;
  const { type, YEAR, MONTH, DAY, HOUR, MINUTES, description, street, city, postCode } = req.body;
  const location = `${street}, ${city}, ${postCode}`;
  console.log('Location:', street, city, postCode);
  
  const share = {
	_id: new ObjectId(reportId),
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

  // Update the report in the database
  try {
    var isAuthenticated = req.session.authenticated;
    const shareCollection = database.db(mongodb_database).collection('shares');
    const report = await shareCollection.findOne({ _id: new ObjectId(reportId) });
    let picture = report.picture;
    if (req.file) {
      picture = req.file.filename;
    }
    const result = await shareCollection.updateOne(
      { _id: new ObjectId(reportId) },
      {
        $set: {
          type: type === 'Other' ? other_type : type,
          YEAR: new Date().getFullYear(),
	      MONTH: new Date().getMonth() + 1,
	      DAY: new Date().getDate(),
          location: location,
          description: description || '',
          location: location || '',
          picture: picture || '',
        }
      }
    );

    console.log('Report updated successfully:', result);

    // Redirect to a success page or render a success message
    res.render('report_succeed.ejs', { reportId, authenticated: isAuthenticated});
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).send(`Error updating report: ${error.message}`);
  }
});

module.exports = router;
