module.exports = function (app) {

  var rou_admin = require('./routers/admin')
  ,   rou_login = require('./routers/login')
  ,   rou_page  = require('./routers/page')
  ,   rou_logou = require('./routers/logout');

  function restrict(req, res, next) {
    if (req.session.user){
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  }

  //General
  app.get('/', rou_page.page); 

  //Admin
  app.get('/admin', restrict, rou_admin.admin);

  //Login
  app.get( '/login', rou_login.loginGet);
  app.post('/login', rou_login.loginPost);

  //logout
  app.get('/logout', rou_logou.logout);

};
