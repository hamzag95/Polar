var db     = require('mocha-mongo')('mongodb://polar:pw456@ds137100.mlab.com:37100/polar');
var User   = require('./../app/models/user');
var expect = require('chai').expect;

var ready = db.ready();

describe('polarDB', function () {

  before(function (done) {
    mongoose.connect('mongodb://polar:pw456@ds137100.mlab.com:37100/polar', done);
  });

  it('testing of the db', ready(function() {
    var user = new User();
    user.id = 'testing123';
    user.email = 'testing@polar.io';
    user.name = 'polarTest';

    db.collection('users').insert(user);


}));


});
