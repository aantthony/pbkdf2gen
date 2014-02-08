var should = require('should');


describe('pbkdf2gen', function () {

  var lib = require('../../index');

  describe('#hash', function (done) {
    it('should not crash', function (done) {
      lib.hash('3248923489', done);
    });
  });

  describe('#compare', function () {

    var HASH_PASSWORD123 = 'fn+ACbi9ET+TWNrpzmDKaww08JTgdjD3PZIXPt7pzG7OpDAurU5w7vbJpe6nkDcA11aGiTC7Sb25sZzmbPXdkwZlvj9rq0gfO6I2XmSLJAgQtBMig2Op25UiELBQQBe1RVaIvD4k/eXVS6TVO5sRQCYw9FV7O2WCRi1H8AXha3ZykuaXhQJxR8DtO3UktiHF:1500';

    it('should return true for a valid hash', function (done) {
      lib.compare(HASH_PASSWORD123, 'password123', function (err, res) {
        if (!res) throw new Error('Expected match');
        done();
      });
    });

    it('should return false for a valid hash with the wrong password', function (done) {
      lib.compare(HASH_PASSWORD123, 'passw3ord123', function (err, res) {
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