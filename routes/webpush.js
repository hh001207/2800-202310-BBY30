const express = require('express');
const webpush = require('web-push');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();

const expireTime = 1 * 60 * 60 * 1000;

const mongodb_database = process.env.MONGODB_DATABASE;

var { database } = include('./routes/databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

router.use(express.urlencoded({ extended: false }));

// // Define the Mongoose schema and model for subscriptions
// const subscriptionSchema = {
//     userId: { type: String, required: true },
//     subscription: { type: Object, required: true },
//   };
  
//   const Subscription = database.model('Subscription', subscriptionSchema);

//   console.log('subscriptionSchema', subscriptionSchema);

// Handle the route for saving subscriptions
router.post('/subscribe', async (req, res) => {
    const { userId, subscription } = req.body;
  
    // Create a new subscription document and save it
    const newSubscription = new Subscription({
      userId,
      subscription,
    });
  
    await newSubscription.save();
  
    res.sendStatus(200);
  });


router.post('/send-notification', async (req, res) => {
    const { userId, message } = req.body;
  
    // Retrieve the subscriptions for the specified user
    const subscriptions = await Subscription.find({ userId });
  
    // Send notifications to each subscription
    for (const subscription of subscriptions) {
      await webpush.sendNotification(subscription.subscription, message);
    }
  
    res.sendStatus(200);
  });
  
  module.exports = router;
  