import gulp from 'gulp'
import { argv } from 'yargs'
import fs from 'fs'
import Client from 'o-api-client'
import forge from 'node-forge'
import fetch from 'node-fetch'
import Store from 'rdf-store-inmemory'

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
  let client = new Client({}, { fetch: fetch })
  client.get(argv.uri)
    .then((response) => {
      console.log(response.url)
      console.log(response.graph.toString())
      return done()
    }).catch((err) => {
      console.log(err)
      return done()
    })
})

gulp.task('fetch:all', (done) => {
  console.log('fetch:full uri: ', argv.uri)
  let store = new Store()
  let client = new Client(store, {}, { fetch: fetch })
  client.getReferencedContainers(argv.uri)
    .then((responses) => {
      return Promise.all(responses.map((response) => {
        if (!response.error) {
          return client.getAllContained(response.url)
        } else { return Promise.resolve() }
      }))
    }).then((all) => {
      console.log(Object.keys(store.graphs))
      console.log('fetched ', Object.keys(store.graphs).length, ' resources')
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
  fetch(argv.container, { method: 'POST', body: JSON.stringify(doc), headers: { 'Content-Type': 'application/ld+json' } })
    .then((res) => {
      return res.json()
    }).then((json) => {
      console.log(json)
      return done()
    }).catch((err) => {
      console.log(err)
      return done()
    })
})
