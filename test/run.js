
var latest = require('../npm-latest.js')

var seneca  = require('seneca')()
      .use('jsonfile-store',{folder:__dirname+'/data'})
      .use('../../nodezoo-npm')

latest(seneca)
