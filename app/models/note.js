var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var noteSchema = new Schema ({
    title: String,
    tags: [String],
    author: String,
    markdownBody: String,
    htmlBody: String
});

module.exports = mongoose.model('Note', noteSchema);
