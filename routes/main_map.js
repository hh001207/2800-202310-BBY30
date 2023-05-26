const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bby30:bby30@cluster0.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/locations', async (req, res) => {
  client.connect(err => {
    const collection = client.db("test").collection("posts");
    collection.find({}).toArray(function(err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
        } else {
            res.json(docs);
        }
    });
  });
});

//test

router.get('/main_map', (req, res) => {
  var isAuthenticated = req.session.authenticated;
  res.render('main_map.ejs', { authenticated: isAuthenticated, apiKey: 'AIzaSyAPFKFtKYoZT8kPL4P4CP_U7WoxhaM0S8k' });
});

module.exports = router;
