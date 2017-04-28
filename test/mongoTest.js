
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User   = require('./../app/models/user');
var user;



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

      user.save(done);
      console.log(user)

        });

    it('find user', function(done) {
      console.log(user);
      assert.equal('testing123', user.find(user).id;
      done();

    });

    });
