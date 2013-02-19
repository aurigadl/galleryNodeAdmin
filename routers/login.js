/*
 * Login.
 */

//Login Post
exports.loginPost = function(req, res){

  var hash = require('pwd').hash
  , fs     = require('../config/config');

  hash(fs.pass, function(err, salt, hash){
    fs.salt = salt;
    fs.hash = hash;
  });

  name = req.body.username;
  pass = req.body.password;

  hash(pass, fs.salt, function(err, hash){
    if (fs.hash == hash && name === fs.login) {
        req.session.user = name;
        req.session.message = 'Authenticated as ' + name;
      res.redirect('admin');
    }else{
      req.session.message = 'The username or password you entered is incorrect';
      res.redirect('login');
    }
  });
};

//Login Get
exports.loginGet = function(req, res){
  res.render('login');
};
