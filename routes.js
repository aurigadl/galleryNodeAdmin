module.exports = function (app) {

  var routes = require('./routers/admin')
  , fs       = require('./config/config.json')
  , hash     = require('pwd').hash;

  hash(fs.pass, function(err, salt, hash){
    fs.salt = salt;
    fs.hash = hash;
  });


  // Authenticate using our plain-object database of doom!
  function authenticate(name, pass, fn) {
    if (!module.parent){
      console.log('authenticating %s:%s', name, pass);
    }
    var user = fs.name;
    // query the db for the given username
    if (!user){
      return fn(new Error('cannot find user'));
    }
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash(pass, fs.salt, function(err, hash){
      if (err){
        return fn(err);
      }
      if (hash === fs.hash){
        return fn(null, user);
      }
      fn(new Error('invalid password'));
    });
  }

  function restrict(req, res, next) {
    if (req.session.user){
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/admin');
    }
  }

  app.get('/admin', restrict, routes.admin);
};
