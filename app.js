/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('connect-flash'),
    app = express(),
    server = http.createServer(app),
    MongoStore = require('connect-mongo')(express);

    var config = require('./config');

// mongoose
var databaseName = config.database;
mongoose.connect('mongodb://localhost/' + databaseName);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database: " + databaseName);
});

app.sessionStore = new MongoStore({ url: 'mongodb://localhost/' + databaseName })
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your super secret something here'));
app.use(express.session({
    secret: config.cryptoKey,
    store: app.sessionStore
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

// passport config
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

routes(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
