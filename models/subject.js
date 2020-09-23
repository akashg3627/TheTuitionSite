const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var subjectschema= new Schema({
name: String,
chapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
}],
quiz: [{
    quizurl: String,
    quizname: String
}]
});

var Subjects = mongoose.model('Subject', subjectschema);
module.exports = Subjects;