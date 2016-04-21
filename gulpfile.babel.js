import gulp from 'gulp'
import { argv } from 'yargs'
import Crypto from 'native-crypto'
import KeyCon from 'pem-jwk'

/*
 * TODO: (WebID-TLS) openssl rsa -pubin -inform PEM -text -noout < public.key
 */
gulp.task('key:generate', (done) => {
  Crypto.generate('RS256')
    .then((keypair) => {
      console.log(KeyCon.jwk2pem(keypair.publicKey))
      console.log(KeyCon.jwk2pem(keypair.privateKey))
      done()
    })
})
