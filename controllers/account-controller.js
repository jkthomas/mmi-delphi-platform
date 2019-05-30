const account = require('../services/account/account-service')
var accountService = new account.AccountService()

class AccountController {
    createAccount (request, response) {
        accountService.createAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    loginAccount (request, response) {
        accountService.loginAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    updateAccount (request, response) {
        accountService.updateAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    deleteAccount (request, response) {
        accountService.deleteAccount(request)
            .then((jsonData) => {
                response.status(200).send(jsonData)
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }
}

module.exports = {
    AccountController
}
