// const querystring = require('querystring')
// const http = require('http')
let jwt = require('jsonwebtoken')

class PollWrapper {
    generateRequestOptions (path, method, contentLength) {
        var options = {
            hostname: 'X',
            port: 0,
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
        // TODO: To be implemented after adding poll service module
    }

    // TODO: Temporary method for JWT usage - until implementing poll service module
    getValues (externalRequest) {
        return new Promise((resolve, reject) => {
            let token = externalRequest.headers['x-access-token'] || externalRequest.headers['authorization']
            if (token === undefined || token === null) {
                reject(new Error('Token was not specified'))
            }

            jwt.verify(token, 'testToken', (err, decoded) => {
                if (err) {
                    reject(new Error('Token verify error'))
                } else {
                    console.log(decoded)
                    resolve({
                        'value1': 'one',
                        'value2': 'two'
                    })
                }
            })
        })
    }
}

module.exports = {
    PollWrapper
}
