const router = require('express').Router()
router.use('/api', require('./API/router'))

router.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});
console.log("here")
module.exports = router