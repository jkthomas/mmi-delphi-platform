const account = require('../services/account/account-wrapper')
var accountWrapper = new account.AccountWrapper()

class AccountController {
    createAccount (request, response) {
        accountWrapper.createAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    loginAccount (request, response) {
        accountWrapper.loginAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    updateAccount (request, response) {
        accountWrapper.updateAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    deleteAccount (request, response) {
        accountWrapper.deleteAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }
}

module.exports = {
    AccountController
}
