module.exports = function (app) {

  var rou_admin = require('./routers/admin')
  ,   rou_login = require('./routers/login');

  function restrict(req, res, next) {
    console.log('restrict ' + req.session.user);
    if (req.session.user){
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  }

  app.get('/', restrict, function (req, res){
    res.render('page'); 
  });

  app.get('/admin', restrict, rou_admin.admin);

  app.post('/login', rou_login.login);

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.get('/logout', function(req, res){
    // destroy the user's session to log them out
    req.session.destroy(function(){
      res.redirect('/');
    });
  });
};
