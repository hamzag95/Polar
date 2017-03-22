var bodyParser = require('body-parser'); 	// get body-parser
var Note       = require('./../models/note');
var User       = require('./../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var express    = require('express');
var superSecret = config.secret;

module.exports = function(app, express, passport) {
    var apiRouter = express.Router();

/*
    apiRouter.use(function(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
        });
    })
    */

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

            Note.find({ author: req.params.user_id }, function(err, notes) {
                if (err) res.send(err);

				// return the users
				res.json(notes);
            });
        })

        .post(function(req, res) {

            var note = new Note();

            note.title = req.body.title;
            note.markdownBody = req.body.markdownBody;
            note.author = req.params.user_id;

            note.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                //return a message
                return res.json({ message: 'Note created!!', title: req.body.title, body: req.markdownBody });
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
