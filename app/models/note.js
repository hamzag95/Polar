var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('User');

var noteSchema = new Schema ({
    title: String,
    tags: [String],
    user: Us
    markdownBody: String,
    htmlBody: String

});

module.exports = mongoose.model('Note', noteSchema);
