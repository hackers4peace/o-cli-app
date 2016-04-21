#! /usr/bin/env node --harmony
'use strict'

const program = require('commander')
const crypto = require('native-crypto')
const keyconv = require('pem-jwk')

/*
 * TODO: (WebID-TLS) openssl rsa -pubin -inform PEM -text -noout < public.key
 */

 keygen ()

 function keygen () {
   crypto.generate('RS256')
     .then((keypair) => {
       console.log(keyconv.jwk2pem(keypair.publicKey))
       console.log(keyconv.jwk2pem(keypair.privateKey))
       process.exit()
     })
 }
