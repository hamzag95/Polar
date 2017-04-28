
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User   = require('./../app/models/user');

mongoose.connect('mongodb://polar:pw456@ds137100.mlab.com:37100/polar');
describe('db Users', function() {



    it('puts users', function(done) {
      var user = new User();
      user.id = 'testing123';
      user.email = 'testing@polar.io';
      user.name = 'polarTest';

      mongoose.collection('users').insert(user);
          done();
        });
    });
