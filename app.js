/** Module dependencies */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , i18n = require("i18n");

var app = express();

//config express
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
  app.use(i18n.init);

  app.use(function(req, res, next) {
    res.locals.__ = function() {
      return i18n.__.apply(req, arguments);
    };
    res.locals.__n = function() {
      return i18n.__n.apply(req, arguments);
    };
    // do not forget this, otherwise your app will hang
    next();
  });

  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//config il8n
i18n.configure({
  locales:['en', 'es'],
  // where to store json files - defaults to './locales'
  directory: './config',
});

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error
    , msg = req.session.success;

  delete req.session.error;
  delete req.session.success;

  res.locals.message = '';
  console.log(res.locals);
  if (err){
    res.locals.message = __(err);
  }
  if (msg){
    res.locals.message = __(msg);
  }
  next();
});

require("./routes")(app, i18n);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express Server port " + app.get('port'));
});
