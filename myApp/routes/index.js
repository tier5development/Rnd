var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code' });
});
router.get('/new', function(req, res, next) {
  res.render('index', { title: 'New Route from rnd_by_gautam branch' });
});

module.exports = router;
