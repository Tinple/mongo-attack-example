var file = "server-list",
    lineReader = require("line-reader"),
    mongoose = require('mongoose');

function conn (host, cb){
    var url = 'mongodb://' + host,
        options = { server: { socketOptions: { connectTimeoutMS: 4000 }}},
        connection = mongoose.createConnection(url, options);
        Admin = mongoose.mongo.Admin;
    connection.on('error', function(err) {
        if (err) throw new Error(err);
    });
    connection.on('open',function(){
        new Admin(connection.db).listDatabases(function (err, res) {
            if (err) throw new Error(err);
            res.databases.map(function (db) {
                console.log('[*] Database %s %s', db.name, db.sizeOnDisk);
                var db = mongoose.createConnection(url + '/' + db.name, options);
                db.on('open', function () {
                    db.db.collectionNames(function (err, res) {
                        if (err) throw new Error(err);
                        res.map(function (collection) {
                            console.log('[+] Collection %s', collection.name);
                        });
                        console.log();
                        db.close();
                        connection.close();
                    })
                })
            })
        })
        cb(host);
    });
}
lineReader.eachLine(file, function(line) {
    if (String(line)) {
        conn(line, function(host){
            console.log("Detected: " + host);
        });
    }
}).then(function () {
    console.log('[*] Read Done');
});