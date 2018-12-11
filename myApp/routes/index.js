var express = require('express');
var router = express.Router();

/* GET home page. */
// This Code is Modified under <feature_branch_by_gautam>
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code' });
});

router.get('/newBranch', function(req, res, next) {
  res.render('index', { title: 'new Code' });
});

module.exports = router;
