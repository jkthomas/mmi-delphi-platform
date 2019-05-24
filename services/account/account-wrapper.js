const querystring = require('querystring')
const http = require('http')

class AccountWrapper {
    generateRequestOptions (path, method) {
        var options = {
            hostname: 'x',
            port: x,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
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
                        resolve(jsonResponseData.message)
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

            var options = this.generateRequestOptions('/account/signup', 'POST')

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

            var options = this.generateRequestOptions('/account/login', 'POST')

            this.makeRequest(options, postData)
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        })
    }

    /* eslint-disable camelcase */
    updateAccount (externalRequest) {
        return new Promise((resolve, reject) => {
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

            var putData = querystring.stringify({
                'username': username,
                'password': password,
                'new_password': new_password
            })

            var options = this.generateRequestOptions('/account/update', 'PUT')

            this.makeRequest(options, putData)
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        })
    }
    /* eslint-enable camelcase */

    // TODO: Request body seems to be empty on request only for this method - ignored?
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

            var options = this.generateRequestOptions('/account/delete', 'DELETE')

            this.makeRequest(options, deleteData)
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        })
    }
}

module.exports = {
    AccountWrapper
}
