const express = require('express');
const router = express.Router();
const app = express();
const mongodb = require('mongodb');
const mongodb_database = process.env.MONGODB_DATABASE;
const { database } = require('./databaseConnection');
const reportsCollection = database.db(mongodb_database).collection('shares');

router.get('/main_list', async function (req, res, next) {
  try {
    const report_list = await reportsCollection.find().toArray();
    // console.log(report_list);  // add this line
    res.render('main_list', { report_list, authenticated: req.session.authenticated });
  } catch (error) {
    next(error);
  }
});


app.get('/filteredReports', async (req, res) => {
  try {
    let filter = {};

    if (req.query.neighborhood) {
      if (Array.isArray(req.query.neighborhood)) {
        filter.neighborhood = { $in: req.query.neighborhood };
      } else {
        filter.neighborhood = req.query.neighborhood;
      }
    }
    if (req.query.crimeType) {
      if (Array.isArray(req.query.crimeType)) {
          filter.crimeType = { $in: req.query.crimeType };
      } else {
          filter.crimeType = req.query.crimeType;
      }
  }  
    if (req.query.dateRange && req.query.dateRange !== 'all') {
      const now = new Date();
      if (req.query.dateRange === '1day') {
        filter.date = { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1) };
      } else if (req.query.dateRange === '1week') {
        filter.date = { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7) };
      } else if (req.query.dateRange === '1month') {
        filter.date = { $gte: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()) };
      } else if (req.query.dateRange === '3months') {
        filter.date = { $gte: new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()) };
      }
      else if (req.query.dateRange === '6months') {
        filter.date = { $gte: new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()) };
      }
      else if (req.query.dateRange === '1year') {
        filter.date = { $gte: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()) };
      }
      else if (req.query.dateRange === '3years') {
        filter.date = { $gte: new Date(now.getFullYear() - 3, now.getMonth(), now.getDate()) };
      }
      else if (req.query.dateRange === '5years') {
        filter.date = { $gte: new Date(now.getFullYear() - 5, now.getMonth(), now.getDate()) };
      }

    }
    if (req.query.reportSource && req.query.reportSource !== 'all') {
      filter.reportSource = req.query.reportSource;
    }

    const report_list = await reportsCollection.find(filter).toArray();
    res.render('main_list', { report_list, authenticated: req.session.authenticated });
  } catch (error) {
    next(error);
  }
});




module.exports = router;
