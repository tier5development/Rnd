const router      = require('express').Router();
const controller  = require('./controller');
var cron = require('node-cron');

router.post('/check',
controller.check  
)

module.exports = router