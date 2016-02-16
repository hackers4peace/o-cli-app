# o-cli-app

## features

* [x] generate key pair
* [x] sign data
* [x] verify signed data
* [x] fetch single resource
* [x] publish data to workspace (we start with adding a resource to a concrete container)
* [ ] fetch identity and all related containers ( see o-data in o-app-karma - eager )

## usage

### key:new

``` 
gulp key:new
```

### sign

```
gulp sign --path /path/to/file.jsonld --privPem /path/to/key.pem --pubKey https://bob.example/keys/1
```

### verify

```
gulp verify --path /path/to/file.jsonld
```

### fetch

```
gulp fetch --uri https://alice.example/
```

### publish

```
gulp publish --path /path/o/file.jsonld --container https://bob.example/activities
```

## dependencies

### o-*

* o-api-client

## common
* gulp
* yargs
* rdf-ext
 * jsonld
 * n3
* jsonld-signatures
 * forge
