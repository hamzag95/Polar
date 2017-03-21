var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var UserSchema = new Schema ({
    name : String, 
    username: { type: String, required: true, index: { unique: true }}, 
    password: { type: String, required: true, select: false }
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}]

});

module.exports = mongoose.model('User', UserSchema);
