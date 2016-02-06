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
  let keypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001})
  console.log(forge.pki.privateKeyToPem(keypair.privateKey))
  console.log(forge.pki.publicKeyToPem(keypair.publicKey))
})

/*
 * prints document as expanded JSON-LD
 */
gulp.task('sign', () => {
  console.log('sign path: ', argv.path)
  console.log('sign pubKey: ', argv.pubKey)
  console.log('sign privPem: ', argv.privPem)
  let doc = JSON.parse(fs.readFileSync(argv.path, 'utf8'))
  let privPem = fs.readFileSync(argv.privPem, 'utf8')
  let client = new Client(privPem, argv.pubKey)
  client.sign(doc)
    .then((signed) => {
      return console.log(JSON.stringify(signed))
    }).catch((err) => {
      console.log(err)
    })
})

gulp.task('fetch', () => {
  console.log('fetch uri: ', argv.uri)
  fetch(argv.uri)
    .then((res) => {
      return res.text()
    }).then((body) => {
      console.log(body)
    })
})
