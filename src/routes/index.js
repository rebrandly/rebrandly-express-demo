const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('My homepage')
})

router.get('/home', function (req, res) {
  res.send('My homepage')
})

router.get('/contact', function (req, res) {
  res.send('Contact us')
})

module.exports = router;
