
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User   = require('./../app/models/user');



describe('db Users', function() {
  before(function (done) {
  mongoose.connect('mongodb://polar:pw456@ds137100.mlab.com:37100/polar');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function() {
    console.log('We are connected to test database!');
    done();
  });
});


    it('put users', function(done) {
      user = new User();
      user.id = 'testing123';
      user.email = 'testing@polar.io';
      user.name = 'polarTest';

      user.save(done());
      console.log(user)

     //User.findOne({'id' : 'testing123'})

        });
    });

    it('find user', function(done) {

      User.findOne({ 'id' : 'testing123' }, function(err, user) {
                if (err) return res.send(err);
                // return that user
                assert.true(user != null);
    }, done());


    });

        it('remove user', function(done) {

      User.remove({id: 'testing123'}, function(err, user) {
                    //if (err) console.log("remove worked");
                    //else console.log("remove failed");
                    //res.json({ message: 'Successfully deleted' });

                    //assert.true(user == null);

            });

    User.findOne({ 'id' : 'testing123' }, function(err, user) {
                if (err) return res.send(err);
                // return that user
                assert.true(user == null);
    }, done());
    it('puts users', function(done) {
        var user = new User();
        user.id = 'testing123';
        user.email = 'testing@polar.io';
        user.name = 'polarTest';

        user.save(done);
        console.log(user)

    });
});
