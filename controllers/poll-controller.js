const poll = require('../services/poll/poll-wrapper')
var pollWrapper = new poll.PollWrapper()

class PollController {
    getValues (request, response) {
        pollWrapper.getValues(request)
            .then((jsonData) => {
                response.json(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }
}

module.exports = {
    PollController
}
