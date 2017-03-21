var bodyParser = require('body-parser'); 	// get body-parser
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {
  var apiRouter = express.Router();

  apiRouter.route('/users')

    .post(function(req, res) {

    });


  apiRouter.route('/users/:userid')

    .get(function(req, res) {



    })

    .put(function(req, res) {


    })

    .delete(function(req, res) {


    });


  apiRouter.route('/users/:userid/notes')

    .get(function(req, res) {


    })

    .post(function(req, res) {


    });


  apiRouter.route('/users/:userid/notes/:noteid')

    .get(function(req, res) {


    })

    .post(function(req, res) {


    })


    .delete(function(req, res) {


    });

    return apiRouter;
}
