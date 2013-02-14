/** Module dependencies */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , hash = require('./lib/pass').hash;

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

// dummy database
var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash('foobar', function(err, salt, hash){
  if (err){
    throw err;
  }
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});


// Authenticate using our plain-object database of doom!


require("./routes")(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
