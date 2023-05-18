const express = require('express');
const router = express.Router();

router.get('/secret_report', (req, res) => {
	var isAuthenticated = req.session.authenticated;
	if (isAuthenticated) {
		res.render('secret_report.ejs', { username: req.session.username, authenticated: isAuthenticated });
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
