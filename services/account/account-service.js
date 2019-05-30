const querystring = require('querystring')
const http = require('http')
let jwt = require('jsonwebtoken')
let secret = require('../../utilities/connection/secrets').secret

class AccountService {
    generateRequestOptions (path, method, contentLength) {
        var options = {
            hostname: 'x',
            port: x,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': contentLength
            }
        }

        return options
    }

    makeRequest (options, data) {
        return new Promise((resolve, reject) => {
            var req = http.request(options, (res) => {
                console.log('StatusCode:', res.statusCode)
                console.log('Headers:', res.headers)

                res.on('data', (responseData) => {
                    console.log('Received data:', responseData.toString('utf8'))
                    var jsonResponseData = JSON.parse(responseData.toString('utf8'))
                    if (res.statusCode === 200) {
                        resolve(jsonResponseData)
                    } else {
                        reject(new Error(jsonResponseData.message))
                    }
                })
            })

            req.on('error', (e) => {
                console.error(e)
                reject(new Error(e.message))
            })

            req.write(data)
            req.end()
        })
    }

    createAccount (externalRequest) {
        return new Promise((resolve, reject) => {
            const { username, password } = externalRequest.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }

            var postData = querystring.stringify({
                'username': username,
                'password': password
            })

            var options = this.generateRequestOptions('/account/signup', 'POST', Buffer.byteLength(postData))

            this.makeRequest(options, postData)
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        })
    }

    loginAccount (externalRequest) {
        return new Promise((resolve, reject) => {
            const { username, password } = externalRequest.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }

            var postData = querystring.stringify({
                'username': username,
                'password': password
            })

            var options = this.generateRequestOptions('/account/login', 'POST', Buffer.byteLength(postData))

            let token = jwt.sign({ username: username }, secret,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            )

            this.makeRequest(options, postData)
                .then((data) => resolve({
                    success: true,
                    message: data.message,
                    token: token
                }))
                .catch((error) => reject(error))
        })
    }

    // TODO: Add additional JWT token to all user operations

    /* eslint-disable camelcase */
    updateAccount (externalRequest) {
        return new Promise((resolve, reject) => {
            let token = externalRequest.headers['x-access-token'] || externalRequest.headers['authorization']
            if (token === undefined || token === null) {
                reject(new Error('Token was not specified'))
            }
            const { username, password, new_password } = externalRequest.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }
            if (new_password === undefined || new_password === null) {
                reject(new Error('New password was not specified'))
            }

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(new Error('Token verify error'))
                } else {
                    var putData = querystring.stringify({
                        'username': username,
                        'password': password,
                        'new_password': new_password
                    })

                    var options = this.generateRequestOptions('/account/update', 'PUT', Buffer.byteLength(putData))

                    this.makeRequest(options, putData)
                        .then((data) => resolve(data))
                        .catch((error) => reject(error))
                }
            })
        })
    }
    /* eslint-enable camelcase */

    // TODO: Consider user deleting allowance - currently unused
    deleteAccount (externalRequest) {
        return new Promise((resolve, reject) => {
            const { username, password } = externalRequest.body
            if (username === undefined || username === null) {
                reject(new Error('Username was not specified'))
            }
            if (password === undefined || password === null) {
                reject(new Error('Password was not specified'))
            }

            var deleteData = querystring.stringify({
                'username': username,
                'password': password
            })

            var options = this.generateRequestOptions('/account/delete', 'DELETE', Buffer.byteLength(deleteData))

            this.makeRequest(options, deleteData)
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        })
    }
}

module.exports = {
    AccountService
}
