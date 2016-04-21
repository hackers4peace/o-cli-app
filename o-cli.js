#! /usr/bin/env node --harmony
'use strict'

const program = require('commander')

/*
 * TODO: (WebID-TLS) openssl rsa -pubin -inform PEM -text -noout < public.key
 */

 program
   .version('0.0.1')
   .command('keygen', 'generate key pair')
   .parse(process.argv);
