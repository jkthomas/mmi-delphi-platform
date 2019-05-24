const account = require('../services/account/account-wrapper')
var accountWrapper = new account.AccountWrapper()

class AccountController {
    createAccount (request, response) {
        accountWrapper.createAccount(request)
            .then((data) => {
                response.status(200).send({ 'message': data })
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    loginAccount (request, response) {
        accountWrapper.loginAccount(request)
            .then((data) => {
                response.status(200).send({ 'message': data })
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    updateAccount (request, response) {
        accountWrapper.updateAccount(request)
            .then((data) => {
                response.status(200).send({ 'message': data })
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    deleteAccount (request, response) {
        accountWrapper.deleteAccount(request)
            .then((data) => {
                response.status(200).send({ 'message': data })
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }
}

module.exports = {
    AccountController
}
