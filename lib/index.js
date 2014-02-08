var crypto = require('crypto');

exports.hash = function (password, numIterations, keylength, saltlength, _callback) {
  var callback = [].pop.call(arguments);

  var iterations = arguments[1]  || 2000;
  var KEY_LENGTH = arguments[2]  || 128;
  var SALT_LENGTH = arguments[3] || 128;
  var RANDOM_BYTES = SALT_LENGTH / 8;
  crypto.randomBytes(RANDOM_BYTES, function (err, data) {
    var salt = data;
    crypto.pbkdf2(password, salt, iterations, KEY_LENGTH, function (err, key) {
      var hash = Buffer.concat([data, key]);
      callback(null, hash.toString('base64') + ':' + iterations + '/' + KEY_LENGTH + '/' + SALT_LENGTH);
    });
  });
};

exports.compare = function (hash, password, callback) {

  var params = hash.split(':');
  var meta = (params[1] || '').split('/');

  var iterations = Number(meta[0])  || 2000;
  var KEY_LENGTH = Number(meta[1])  || 128;
  var SALT_LENGTH = Number(meta[2]) || 128;
  var RANDOM_BYTES = SALT_LENGTH / 8;
  var buffer = new Buffer(params[0], 'base64');
  var random = buffer.slice(0, RANDOM_BYTES);
  var key = buffer.slice(RANDOM_BYTES);
  crypto.pbkdf2(password, random, iterations, KEY_LENGTH, function (err, resKey) {
    if (err) return next(err);
    var mismatch = key.length - resKey.length;
    if (mismatch) return callback(null, false);
    for(var i = 0; i < key.length; i++) {
      mismatch |= key[i] ^ resKey[i];
    }
    callback(null, mismatch === 0);
  });
};