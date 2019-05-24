const account = require('../services/account/account-wrapper')
var accountWrapper = new account.AccountWrapper()

class AccountController {
    // TODO: Change method as in loginAccount
    createAccount (request, response) {
        accountWrapper.createAccount(request)
            .then((user) => response.status(201).send({ 'message': `User added with ID: ${user.username}` }))
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    loginAccount (request, response) {
        accountWrapper.loginAccount(request)
            .then((data) => {
                response.status(200).send({ 'message': data })
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    // TODO: Change method as in loginAccount
    updateAccount (request, response) {
        accountWrapper.updateAccount(request)
            .then((passwordMatch) => {
                if (passwordMatch) {
                    response.status(200).send({ 'message': 'User password changed' })
                } else {
                    response.status(400).send({ 'message': 'User password was NOT changed' })
                }
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }

    // TODO: Change method as in loginAccount
    deleteAccount (request, response) {
        accountWrapper.deleteAccount(request)
            .then((passwordMatch) => {
                if (passwordMatch) {
                    response.status(200).send({ 'message': 'User deleted' })
                } else {
                    response.status(400).send({ 'message': 'User was NOT deleted' })
                }
            })
            .catch((error) => response.status(400).send({ 'message': error.message }))
    }
}

module.exports = {
    AccountController
}
