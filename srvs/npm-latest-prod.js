
var seneca = require('seneca')()
      .use('redis-transport')
      .use('run')
      .listen()
