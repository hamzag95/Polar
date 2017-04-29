
var expect = require('chai').expect;
var request = require('request');

describe('Get User Info', function() {
    var url = "http://localhost:8080/api/users/111054800999716037493";

    it('returns status 200', function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);

        }, done());
    });

    it ('contains full name', function(done) {
        request(url, function(error, response, body) {

            expect(JSON.parse(body).name).to.equal('Max Wang');
        }, done());
    });

    it ('contains email', function(done) {
        request(url, function(error, response, body) {
            expect(JSON.parse(body).email).to.equal('maxwang051@gmail.com');
        }, done());
    });

});
