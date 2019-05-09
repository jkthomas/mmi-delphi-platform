var express = require('express')
var router = express.Router()
const account = require('../controllers/account-controller')
var AccountController = new account.AccountController()

/* POST signup. */
router.post('/signup', AccountController.createAccount)

/* POST login. */
router.post('/login', AccountController.loginAccount)

/* PUT update account information. */
router.put('/update', AccountController.updateAccount)

/* DELETE delete account. */
router.delete('/delete', AccountController.deleteAccount)

module.exports = router
