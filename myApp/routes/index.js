var express = require('express');
var router = express.Router();

/* GET home page. */
// This Code is Modified under <feature_branch_by_gautam>
router.get('/', function(req, res, next) {
  res.render('index', { title: 'feature_branch_by_gautam' });
});

module.exports = router;
