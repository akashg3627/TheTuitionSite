const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var levelschema= new Schema({
standard: Number,
subjects: [{
    type: mongoose.Schema.Types.ObjectId,
ref: 'Subject'
}]
});

var Levels = mongoose.model('level', levelschema);
module.exports = Levels;
