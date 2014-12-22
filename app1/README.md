## mongo unauthorized access vulnerability detected

## Requirements

* Node
* MongoDB

## How to detect

Add your server-IP list using MongoDB in `server-list`, and run `payload.js` to detect.

## Test

Start your `mongod` without `auth` flag, and then run


```
$ make test
```

## License

MIT