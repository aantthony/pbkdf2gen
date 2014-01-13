var crypto = require('crypto');
var KEY_LENGTH = 40;

var iterations = 10;
exports.SECRET = new Buffer('abc');

exports.hash = function (password, callback) {

  var RANDOM_BYTES = 64 / 8 - exports.SECRET.length;

  crypto.randomBytes(RANDOM_BYTES, function (err, data) {
    var salt = Buffer.concat([data, exports.SECRET]);
    crypto.pbkdf2(password, salt, iterations, KEY_LENGTH, function (err, key) {
      var hash = Buffer.concat([data, key]);
      callback(null, hash.toString('base64'));
    });
  });
};

exports.compare = function (hash, password, callback) {
  var RANDOM_BYTES = 64 / 8 - exports.SECRET.length;

  var buffer = new Buffer(hash, 'base64');
  var random = buffer.slice(0, RANDOM_BYTES);
  var key = buffer.slice(RANDOM_BYTES);
  var salt = Buffer.concat([random, exports.SECRET]);
  crypto.pbkdf2(password, salt, iterations, KEY_LENGTH, function (err, resKey) {
    if (err) return next(err);
    var mismatch = key.length - resKey.length;
    if (mismatch) return callback(null, false);
    for(var i = 0; i < key.length; i++) {
      mismatch |= key[i] ^ resKey[i];
    }
    callback(null, mismatch === 0);
  });
};