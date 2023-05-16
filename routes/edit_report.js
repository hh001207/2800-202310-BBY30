const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();

const { ObjectId } = require('mongodb');

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('databaseConnection');

router.use(express.json());

router.use(express.urlencoded({ extended: false }));

router.get('/edit_report', async (req, res) => {
    const reportId = req.query.reportId;
    console.log('reportId:', reportId);

    const userId = req.session.username; 
    console.log('userId:', userId);

    try {
      const reportCollection = database.db(mongodb_database).collection('shares');
      const report = await reportCollection.findOne({ _id: new ObjectId(reportId) });
      console.log('report:', report);
      if (!report) {
        // Report not found, handle the error
        return res.status(404).send('Report not found');
      }
      var isAuthenticated = req.session.authenticated;
      if (isAuthenticated) {
      res.render('edit_report.ejs', { report: reportId , authenticated: isAuthenticated});
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      res.status(500).send(`Error fetching report: ${error.message}`);
    }
  });

module.exports = router;