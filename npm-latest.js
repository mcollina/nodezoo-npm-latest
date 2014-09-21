/* Copyright (c) 2014 Richard Rodger, MIT License */
/* jshint node:true, asi:true, eqnull:true */
"use strict";


var fs      = require('fs')

var js      = require('JSONStream')
var through = require('through')
var semver  = require('semver')


module.exports = function npm_latest( seneca ) {

  try {
    var infile = process.argv[2] || '/tmp/npm-all.json'

    var source = fs.createReadStream(infile)

    var concurrent = 0

    source
      .pipe(js.parse([true]))
      .pipe(through(function(data){
        var stream = this
        console.log(data)

        if( !data.name ) {
          return;
        }

        concurrent++;
        if( 10 < concurrent ) {
          stream.pause()
        }

        var name = data.name

        seneca.act('role:npm,cmd:get',{name:name},function(err,mod){
          if( err ) return finish(err);

          console.log(mod)

          if( data['dist-tags'] && 
              semver.gt( data['dist-tags'].latest, mod.version ) ) 
          {
            seneca.act('role:npm,cmd:get,update:true',{name:name},function(err,mod){
              if( err ) return finish(err);

              console.log('UPDATE '+mod.name)
              finish()
            })
          }
          else return finish();
        })


        function finish(err) {
          if( err ) console.error(err);

          if( stream.paused ) {
            stream.resume()
          }
          concurrent--;
        }
      }))

  }
  catch(e) {
    console.log('FAILED')
    console.error(e)
    process.exit(1)
  }

}
