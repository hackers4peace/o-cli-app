# o-cli-app

## features

* [x] sign data
* [ ] save data to pod (we start with adding a resource to a concrete container)
* [ ] fetch identity and all related containers ( see o-data in o-app-karma - eager )
* [ ] generate key pair (later, for now we can use openssl)

## usage

### sign

```
gulp sign --path /path/to/file.jsonld --privPem /path/to/key.pem
--pubKey https://bob.example/keys/1
```

## dependencies

### o-*

* o-api-client

## common
* gulp
* yargs
* lodash
* rdf-ext
 * jsonld
 * n3
* jsonld-signatures
 * forge
