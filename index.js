
module.exports = require('./lib');

if (process.env.PBKDF2GEN_COVERAGE){
  var dir = './lib-cov/';
  module.exports = require(dir);
}