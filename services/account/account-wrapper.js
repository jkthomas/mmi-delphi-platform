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

                // TODO: Manage both 'message' and 'user' in json response - needed???
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

            var options = this.generateRequestOptions('x', 'POST')

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

            var options = this.generateRequestOptions('x', 'POST')

            this.makeRequest(options, postData)
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        })
    }

    updateAccount (externalRequest) {
        // TODO: Implement
    }

    deleteAccount (externalRequest) {
        // TODO: Implement
    }
}

module.exports = {
    AccountWrapper
}
