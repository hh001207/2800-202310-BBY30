const express = require('express');
const router = express.Router();
const mongodb_database = process.env.MONGODB_DATABASE;
const { database } = require('../databaseConnection');
const reportsCollection = database.db(mongodb_database).collection('shares');

router.get('/main_list', async function(req, res, next) {
  try {
    const report_list = await reportsCollection.find().toArray();
    res.render('main_list', { report_list, authenticated: req.session.authenticated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
