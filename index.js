#! /usr/bin/env node --harmony
'use strict'

const program = require('commander')
const crypto = require('native-crypto')
const keyconv = require('pem-jwk')

/*
 * TODO: (WebID-TLS) openssl rsa -pubin -inform PEM -text -noout < public.key
 */
program
  .version('0.0.1')
  .arguments('<cmd>')
  .action((cmd) => {
    console.log(cmd)
    if (cmd === 'keygen') keygen()
  })

program.parse(process.argv)

function keygen () {
  crypto.generate('RS256')
    .then((keypair) => {
      console.log(keyconv.jwk2pem(keypair.publicKey))
      console.log(keyconv.jwk2pem(keypair.privateKey))
      process.exit()
    })
}
