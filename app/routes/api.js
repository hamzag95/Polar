var bodyParser = require('body-parser'); 	// get body-parser
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {
  var apiRouter = express.Router();

  
}
