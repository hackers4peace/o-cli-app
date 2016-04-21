#! /usr/bin/env node --harmony
'use strict'

const program = require('commander')

program
  .version('0.0.1')
  .command('key [generate]', 'generate key pair')
  .parse(process.argv)
