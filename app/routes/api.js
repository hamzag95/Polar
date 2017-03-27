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

    apiRouter.get('/users/', function(req, res) {
        return res.json(req.user);
    });

    apiRouter.route('/users/:user_id')

        .get(function(req, res) {
            User.findOne({ 'id' : req.params.user_id }, function(err, user) {
                        if (err) return res.send(err);
                        // return that user
                        res.json(user);
            });

        })

        .put(function(req, res) {
            User.findOne({ 'id' : req.params.user_id }, function(err, user) {

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

        // Get all of a user's notes
        .get(function(req, res) {

            Note.find({ author: req.params.user_id }, function(err, notes) {
                if (err) res.send(err);

				// return the users
				res.json(notes);
            });
        })

        // Create a new note
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
                return res.json({ message: 'Note created' });
            });


        });
    
    apiRouter.route('/users/:user_id/notes/:note_id')

        .get(function(req, res) {
            Note.findById(req.params.note_id, function(err, note) {
                        if (err) return res.send(err);

                        if (req.user != null && req.user.id == note.author) {
                            // return that note
                            res.json(note);
                        } else {
                            res.json({ message: "You don't have access to this note" });
                        }
            });
        })

        .post(function(req, res) {

        })

        .delete(function(req, res) {
            var id = req.params.note_id;
            console.log("THE ID " + id);
            //Note.findOne({ _id:id }).remove().exec();
            Note.remove({
                _id: id
            }, function(err, note) {
                if (err)
                    res.send(err);
                res.json({message: 'Success'});
            });
        });

    return apiRouter;
}
