/** Module dependencies */
var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

//config
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('la clave secreta de la galeria'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error
  , msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err){
    res.locals.message = '<p class="msg error">xxx' + err + '</p>';
  }
  if (msg){
    res.locals.message = '<p class="msg success">xxx' + msg + '</p>';
  }
  next();
});

require("./routes")(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
