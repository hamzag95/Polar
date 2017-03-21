var bodyParser = require('body-parser'); 	// get body-parser
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {
  var apiRouter = express.Router();

  apiRouter.route('/users')

    .post(function(req, res) {
        var user = new User(); 
        user.name = req.body.name; 
        user.username = req.body.username; 
        user.password = req.body.password
    
        res.json({ message: 'User created!' });
    });


  apiRouter.route('/users/:user_id')

    .get(function(req, res) {



    })

    .put(function(req, res) {


    })

    .delete(function(req, res) {


    });


  apiRouter.route('/users/:user_id/notes')

    .get(function(req, res) {


    })

    .post(function(req, res) {


    });


  apiRouter.route('/users/:user_id/notes/:note_id')

    .get(function(req, res) {


    })

    .post(function(req, res) {


    })


    .delete(function(req, res) {


    });

    return apiRouter;
}
