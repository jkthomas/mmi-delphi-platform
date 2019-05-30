var express = require('express')
var router = express.Router()
const account = require('../controllers/account-controller')
var AccountController = new account.AccountController()

/* POST signup. */
router.post('/signup', function (req, res) {
    AccountController.createAccount(req, res)
})

/* POST login. */
router.post('/login', function (req, res) {
    AccountController.loginAccount(req, res)
})

/* PUT update account information. */
router.put('/update', function (req, res) {
    AccountController.updateAccount(req, res)
})

/* DELETE delete account. */
// router.delete('/delete', function (req, res) {
//     AccountController.deleteAccount(req, res)
// })

module.exports = router
