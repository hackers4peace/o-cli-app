# o-cli-app

## features

* [x] generate key pair
* [x] sign data
* [x] fetch single resource
* [ ] fetch identity and all related containers ( see o-data in o-app-karma - eager )
* [ ] save data to pod (we start with adding a resource to a concrete container)

## usage

### key:new

``` 
gulp key:new
```

### sign

```
gulp sign --path /path/to/file.jsonld --privPem /path/to/key.pem --pubKey https://bob.example/keys/1
```

### fetch

```
gulp fetch --uri https://alice.example/
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
