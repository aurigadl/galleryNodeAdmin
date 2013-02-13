/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

exports.hash = ( function (pwd, salt, fn) {

  var crypto = require('crypto');

  // Bytesize.
  var len = 128;

  // Iterations. ~300ms
  var iterations = 12000;

  // A private function which logs any arguments
  myPrivateMethod = function( foo ) {
    if (3 == arguments.length) {
      crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
      fn = salt;
      crypto.randomBytes(len, function(err, salt){
        if (err) return fn(err);
        salt = salt.toString('base64');
        crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
          if (err) return fn(err);
          fn(null, salt, hash);
        });
      });
    }
  };

  return {

    // A public variable
    myPublicVar: "foo",

    // A public function utilizing privates
    myPublicFunction: function( bar ) {

      // Increment our private counter
      myPrivateVar++;

      // Call our private method using bar
      myPrivateMethod( bar );

    }
  };

})();

//addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
