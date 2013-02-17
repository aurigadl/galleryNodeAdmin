/*
 * POST login.
 */

exports.login = function(req, res){

  var hash = require('pwd').hash
  , fs     = require('../config/config');

  hash(fs.pass, function(err, salt, hash){
    fs.salt = salt;
    fs.hash = hash;
  });

  name = req.body.username;
  pass = req.body.password;

  hash(pass, fs.salt, function(err, hash){
    if (fs.hash === hash) {
      req.session.regenerate(function(){
        console.log('restrict ' + req.session.user);
        req.session.success = 'Authenticated as  %s ' + name;
      });
      req.session.user = name;
      res.redirect('/admin');
    }else{
      req.session.error = 'Authentication failed, please check your data';
    }
  });

  res.render('login');

};
