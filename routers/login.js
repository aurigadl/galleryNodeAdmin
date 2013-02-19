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
    if (fs.hash === hash && name === fs.login) {
      req.session.regenerate(function(){
        req.session.message = 'Authenticated as ' + name;
      });
      req.session.user = name;
      res.redirect('admin');
    }else{
      req.session.message = 'Authentication failed, please check your data';
      res.redirect('login');
    }
  });
};

//Login Get
exports.loginGet = function(req, res){
  res.render('login');
};
