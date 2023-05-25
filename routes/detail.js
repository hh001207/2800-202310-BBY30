const express = require('express');
const router = express.Router();
const app = express();
const mongodb = require('mongodb');
const mongodb_database = process.env.MONGODB_DATABASE;
const { database } = require('../databaseConnection');
const sharesCollection = database.db(mongodb_database).collection('shares');
console.log(sharesCollection)

// router.get('/detail', async function (req, res, next) {
//   try {
//     const detail = await reportsCollection.find().toArray();
//     res.render('detail', { detail, authenticated: req.session.authenticated });
//   } catch (error) {
//     next(error);
//   }
// });

router.get('detail/:id', async function (req, res, next) {
  try {
    const report_list = await reportsCollection.find().toArray();
    console.log(report_list);  // corrected this line
    res.render('detail', { detail: report_list, authenticated: req.session.authenticated });  // corrected this line
  } catch (error) {
    next(error);
  }
});



module.exports = router;
