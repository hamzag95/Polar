// BASE SETUP
// =======================================

// CALL THE PACKAGES ---------------------
var express     = require('express');       // call express
var app         = express();                // define our app using express
var bodyParser  = require('body-parser');   // get body-parser
var morgan      = require('morgan');        // used to see requests
var mongoose    = require('mongoose');      // for working with our database
var config      = require('./config');
var path        = require('path');
var passport    = require('passport');
var session     = require('express-session');
var flash       = require('connect-flash');

// APP CONFIGURATION =====================
// =======================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization');
  next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database
mongoose.connect(process.env.DATABASE || config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('views', path.join(__dirname, '/public/app/views'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./passport')(passport);

// ROUTES FOR OUR API ====================
// =======================================

// API ROUTES ----------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

require('./app/routes/passportRoutes')(app, passport);

// MAIN CATCHALL ROUTE -------------------
// SEND USERS TO FRONTEND ----------------
// has to be registered after API routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/home.html'));
});

// route for home page
app.get('/index', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
});

app.get('/random', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/random.html'));
});

// START THE SERVER
// =======================================
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("App is running on port " + port);
});
