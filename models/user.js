var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    telenum: Number,
    address: String,
    standard: Number,
    stream: String
});

UserSchema.plugin(passportLocalMongoose);
const Users = mongoose.model('user',UserSchema);

module.exports = Users;