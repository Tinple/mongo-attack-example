## erciyuan

====================

This is Server-Side Javascript Injection

## Requirements

* Nginx / Apache
* PHP
* PHP-Mongo-Driver
* MongoDB prior to 2.4

## Run

You should run `init.php` first to insert the data to mongo. Check the mongo connection
and the authentity yourself. And the payload's default target is `127.0.0.1`, check it
yourself.

## Test

```
make test
```