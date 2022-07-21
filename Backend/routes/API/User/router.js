const router      = require('express').Router()
const controller  = require('./controller')

router.post('/register',
controller.register  
)

router.post('/login',
controller.login  
)

router.post('/add-content',
controller.addContent  
)

router.post('/get-contents',
controller.getContents  
)

module.exports = router