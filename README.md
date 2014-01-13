pbkdf2gen
=========

pbkdf2 helper.

Automatically generates salts.

## Usage

```javascript
var pbkdf2 = require('pbkdf2gen');
var user = {name: 'Anthony'};

pbkdf2.hash('password123', function (err, hash) {
  // hash includes the salt, derived key, and in the next version will contain the number of iterations
  user.hash = hash;

  console.log(user.hash); // xOkuvcf7n4OdTc+/3rkGRqYAWUDXvuxy8bGaDb3PyPEBdVBVwEi2yw+fLHQW

  // check it
  pbkdf2.compare(user.hash, 'password123', function (err, correct) {
    console.log(correct); // true
  });
});
