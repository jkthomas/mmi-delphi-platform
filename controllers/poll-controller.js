const poll = require('../services/poll/poll-service')
var pollService = new poll.PollService()

class PollController {
    getValues (request, response) {
        pollService.getValues(request)
            .then((jsonData) => {
                response.json(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }
}

module.exports = {
    PollController
}
