var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var noteSchema = new Schema ({
    title: String,
    tags: [String],
    author: [String],
    markdownBody: String,
    htmlBody: String,
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
