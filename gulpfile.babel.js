import gulp from 'gulp'
import { argv } from 'yargs'
import fs from 'fs'
import Client from 'o-api-client'

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

