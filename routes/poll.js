var express = require('express')
var router = express.Router()
const poll = require('../controllers/poll-controller')
var PollController = new poll.PollController()

router.get('/getValues', function (req, res) {
    PollController.getValues(req, res)
})

module.exports = router
