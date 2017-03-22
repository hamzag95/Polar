var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    id           : String,
    token        : String,
    email        : String,
    name         : { type: String, unique: false },
    notes        : [{type: Schema.Types.ObjectId, ref: 'Note'}]

});

module.exports = mongoose.model('User', UserSchema);
