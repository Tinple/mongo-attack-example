var express = require('express');
var mongoose = require('mongoose');
var app = express();
var sha1 = require('util-crack').sha1;

var LockSchema = new mongoose.Schema({
    name: String,
    lock: String,
    hash: String
});

var Lock = mongoose.model('Lock', LockSchema);

[['Locker', '9cc32bd6', '9cc32bd6']].forEach(function (cred) {
    var instance = new Lock();
    instance.name = cred[0];
    instance.lock = cred[1];
    instance.hash = sha1(cred[2]);

    instance.save();
});

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());
app.use(function (err, req, res, next) {
    res.status(404);
    res.end('404');
    next(err);
});

app.get('/', function(req, res) {
    res.render('index', {});
});

app.post('/', function(req, res) {
    // lock is vulnerable for the query
    Lock.findOne({lock: req.body.lock}, function (err, lock) {
        if (err) {
            return res.render('index', {message: err.message});
        }
        if (!lock) {
            return res.render('index', {message: 'It seeeeeeemed the lock is not right!!!(╯°□°）╯︵ ┻━┻'});
        }

        try {
            var shakey = sha1(req.body.key);
        } catch (e) {
            return res.render('index', {message: 'It seeeeeeemed the lock is not right!!!(╯°□°）╯︵ ┻━┻'}); 
        }

        if (lock.hash != shakey) {
            return res.render('index', {message: 'Right, but it seemmed the key is not right!!!(╯°□°）╯︵ ┻━┻(╯°□°）╯︵ ┻━┻(╯°□°）╯︵ ┻━┻'});
        }

        return res.render('index', {message: 'Ohhhhhh!!!  Yes, you saved me!! Put back xxx!!!'});
    });
});

var server = app.listen(49090, function () {
    mongoose.connect('mongodb://localhost/lockmeout');
    console.log('listening on port %d', server.address().port);
});