const express = require('express');
const router = express.Router();
const app = express();
const mongodb = require('mongodb');
const mongodb_database = process.env.MONGODB_DATABASE;
const { database } = require('../databaseConnection');
const reportsCollection = database.db(mongodb_database).collection('shares');

router.get('/detail', async function (req, res, next) {
  try {
    const report_list = await reportsCollection.find().toArray();
    console.log(report_list);  // corrected this line
    res.render('detail', { detail: report_list, authenticated: req.session.authenticated });  // corrected this line
  } catch (error) {
    next(error);
  }
});



module.exports = router;
