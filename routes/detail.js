const express = require('express');
const router = express.Router();
const mongodb_database = process.env.MONGODB_DATABASE;
const { database } = require('../databaseConnection');
const reportsCollection = database.db(process.env.MONGODB_DATABASE).collection('shares');
const { ObjectId } = require('mongodb');

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
    const { id } = req.params;
    const crime = await reportsCollection.findOne({ _id: new ObjectId(id) });
    res.render('detail', { crime, authenticated: req.session.authenticated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
