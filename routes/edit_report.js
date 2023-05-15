const express = require('express');
const router = express.Router();

router.get('/edit_report', async (req, res) => {
    const reportId = req.query.reportId;
  
    try {
      const shareCollection = database.db(mongodb_database).collection('shares');
      const report = await shareCollection.findOne({ _id: reportId });
  
      if (!report) {
        // Report not found, handle the error
        return res.status(404).send('Report not found');
      }
  
      res.render('edit_report.ejs', { report });
    } catch (error) {
      console.error('Error fetching report:', error);
      res.status(500).send(`Error fetching report: ${error.message}`);
    }
  });
  


module.exports = router;