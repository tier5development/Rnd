
const router = require('express').Router()

router.use('/user',
require('./User/router')
)

router.use('/test',
require('./Test/router')
)


module.exports = router