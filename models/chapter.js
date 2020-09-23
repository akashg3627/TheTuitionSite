const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var chapterschema= new Schema({
name: String,
learning: [{
    videourl: String,
    videoname: String,
    notesurl:String,
    notesname: String
}],
pp: [{
    ppurl: String,
    ppname: String
}]
});

var Chapters = mongoose.model('Chapter', chapterschema);
module.exports = Chapters;