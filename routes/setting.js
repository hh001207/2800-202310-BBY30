const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/setting', (req, res) => {
  res.render('setting.ejs');
});

router.post('/change_password', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }

  const newPassword = req.body.new_password;
  const username = req.session.username;

  bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error hashing password');
    }

    userCollection.findOneAndUpdate(
      { username: username },
      { $set: { password: hashedPassword } },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating password');
        }

        console.log('Password updated successfully');
        res.redirect('/setting');
      }
    );
  });
});

module.exports = router;
