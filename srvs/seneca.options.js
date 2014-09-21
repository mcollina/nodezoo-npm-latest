module.exports = {

  run: {
    batch: {
      'npm-latest': {
        command:         'node',
        args:            ['run-prod.js','/tmp/npm-all.json'],
        cwd:             __dirname+'/..',
        timeout:         300*1000,
        report_interval: 1000
      }
    }
  },

  transport: {
    web: {
      port: 9202
    }
  }
}
