import gulp from 'gulp'
import { argv } from 'yargs'
import fs from 'fs'
import Client from 'o-api-client'
import forge from 'node-forge'
import fetch from 'node-fetch'

/*
 *
 * TODO: openssl rsa -pubin -inform PEM -text -noout < public.key
 */
gulp.task('key:new', () => {
  let keypair = forge.pki.rsa.generateKeyPair({bits: 4096, e: 0x10001})
  console.log(forge.pki.privateKeyToPem(keypair.privateKey))
  console.log(forge.pki.publicKeyToPem(keypair.publicKey))
})

/**
 * @param path - path to JSON-LD file we want to sign
 * @param pubKey - URI of a public key
 * @param privPem - PEM encoded private key
 */
gulp.task('sign', (done) => {
  console.log('sign path: ', argv.path)
  console.log('sign pubKey: ', argv.pubKey)
  console.log('sign privPem: ', argv.privPem)
  let doc = JSON.parse(fs.readFileSync(argv.path, 'utf8'))
  let privPem = fs.readFileSync(argv.privPem, 'utf8')
  let client = new Client(fetch, privPem, argv.pubKey)
  client.sign(doc)
    .then((signed) => {
      console.log(JSON.stringify(signed))
      return done()
    }).catch((err) => {
      console.log(err)
      return done()
    })
})

/**
 * @param path - path to JSON-LD file we want to verify
 */
gulp.task('verify', (done) => {
  console.log('sign path: ', argv.path)
  let doc = JSON.parse(fs.readFileSync(argv.path, 'utf8'))
  let client = new Client(fetch)
  client.verify(doc)
    .then((verified) => {
      console.log(verified)
      return done()
    }).catch((err) => {
      console.log(err)
      return done()
    })
})

/**
 * @param uri - URI to fetch
 */

gulp.task('fetch', (done) => {
  console.log('fetch uri: ', argv.uri)
  fetch(argv.uri)
    .then((res) => {
      return res.text()
    }).then((body) => {
      console.log(body)
      return done()
    }).catch((err) => {
      console.log(err)
      return done()
    })
})

/**
 * @param path - path to JSON-LD file
 * @param container - uri of container we post to
 */

gulp.task('publish', (done) => {
  console.log('publish path: ', argv.path)
  console.log('publish container: ', argv.container)
  let doc = JSON.parse(fs.readFileSync(argv.path, 'utf8'))
  fetch(argv.container, { method: 'POST', body: JSON.stringify(doc), headers: { "Content-Type": "application/ld+json" } })
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      console.log(json);
      return done()
    }).catch((err) => {
      console.log(err)
      return done()
    })
})
