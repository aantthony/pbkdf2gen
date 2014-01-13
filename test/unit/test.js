var should = require('should');

describe('pbkdf2gen', function () {
  var lib = require('../../lib');

  describe('#hash', function (done) {
    it('should not crash', function (done) {
      lib.hash('3248923489', done);
    });
  });
  describe('#compare', function () {

    it('should return true for a valid hash', function (done) {
      lib.compare('xOkuvcf7n4OdTc+/3rkGRqYAWUDXvuxy8bGaDb3PyPEBdVBVwEi2yw+fLHQW', 'password123', function (err, res) {
        if (!res) throw new Error('Expected match');
        done();
      });
    });

    it('should return false for a valid hash with the wrong password', function (done) {
      lib.compare('xOkuvcf7n4OdTc+/3rkGRqYAWUDXvuxy8bGaDb3PyPEBdVBVwEi2yw+fLHQW', 'passw3ord123', function (err, res) {
        if (res) throw new Error('Unexpected match');
        done();
      });
    });
  });
  describe('#hash', function (done) {
    it('should generate valid hashes', function (done) {
      lib.hash('2390239029023', function (err, hash) {
        if (err) return done(err);
        lib.compare(hash, '2390239029023', function (err, res) {
          if (!res) throw new Error('Expected match');
          done();
        });
      });
    });
    it('should generate different hashes each time', function (done) {
      lib.hash('2390239029023', function (err, hash1) {
        if (err) return done(err);
        lib.hash('2390239029023', function (err, hash2) {
          if (err) return done(err);
          hash1.should.not.equal(hash2);
          done();
        });
      });
    });
  });

});