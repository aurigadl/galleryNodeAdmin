
/*
 *set up the routes themselves
 */

module.exports = function (app) {

  var routes = require('./routers/admin')
      , user = require('./routers/user');

  app.get('/admin', restrict, routes.admin);
  app.get('/users', user.list);
};
