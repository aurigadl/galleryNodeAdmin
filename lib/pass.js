//addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
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

  function authenticate(name, pass, fn) {
    if (!module.parent){
      console.log('authenticating %s:%s', name, pass);
    }
    var user = users[name];
    // query the db for the given username
    if (!user){
      return fn(new Error('cannot find user'));
    }
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash(pass, user.salt, function(err, hash){
      if (err){
        return fn(err);
      }
      if (hash === user.hash){
        return fn(null, user);
      }
      fn(new Error('invalid password'));
    });
  }

  function restrict(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  }

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

