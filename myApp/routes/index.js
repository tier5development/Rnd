var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code' });
});

router.get('/newBranch', function(req, res, next) {
  res.render('index', { title: 'new Code' });
});
router.get('/newBranch2', function(req, res, next) {
  res.render('index', { title: 'new Code 2' });
});
router.get('/newBranch3', function(req, res, next) {
  res.render('index', { title: 'new Code 3' });
});


router.get('/rebase', function(req, res, next) {
  res.render('index', { title: 'rebase' });
});

module.exports = router;
