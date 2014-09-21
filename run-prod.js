
var latest = require('./npm-latest.js')

var seneca = require('seneca')()
      .client({port:9001,pin:'role:npm'})

latest(seneca)
