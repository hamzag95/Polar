var bodyParser = require('body-parser'); 	// get body-parser
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var User        = require('../models/user');
//var express    = require('express');
var superSecret = config.secret;

module.exports = function(app, express, passport) {
  var apiRouter = express.Router();

  apiRouter.route('/users')
    .post(function(req, res) {
        var user = new User();

        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        //user.notes = null;

        user.save(function(err) {
            if (err) {
                //duplicate entry
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists.'});
                else
                    return res.send(err);
                }

                //return a message
                res.json({ message: 'User created!'});
        });

    });


  apiRouter.route('/users/:user_id')

    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
                    if (err) return res.send(err);
                    // return that user
                    res.json(user);
        });

    })

    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {

        if (err) return res.send(err);

        //set the new user information if it exists in the request
        if (req.body.name) user.name = req.body.name;
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;

        //save the user
        user.save(function(err) {
            if (err) return res.send(err);

            //return a message
            res.json({ message: 'User updated!' });
        });
     })

    })

    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
            }, function(err, user) {
                if (err) return res.send(err);

                res.json({ message: 'Successfully deleted' });
        })

    });


  apiRouter.route('/users/:user_id/notes')

    .get(function(req, res) {

       User.findById(req.params.user_id, function(err, user) {
                    if (err) return res.send(err);
                    // return that user
                    res.json(user.notes);
        });



    })

    .post(function(req, res) {

        var note = new Note();
        note.title = req.title;
        note.markdownBody = req.markdownBody;

        note.save(function(err) {
            if (err) {
                //duplicate entry
                if (err.code == 11000)
                    return res.json({ success: false, message: 'you already have a ntoe with that name'});
                else
                    return res.send(err);
                }

                //return a message
                res.json({ message: 'Note created!'});
        });


    });


  apiRouter.route('/users/:user_id/notes/:note_id')

    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
                    if (err) return res.send(err);
                    // return that user
                    res.json(user);
        });


    })

    .post(function(req, res) {


    })


    .delete(function(req, res) {


    });

    return apiRouter;
}
