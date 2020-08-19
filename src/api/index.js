const express = require('express');

const assessments = require('./assessments');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Assessments API'
  });
});

router.use('/assessments', assessments);

module.exports = router;