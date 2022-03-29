const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    altervatives: [
        {
            text: {
                type: String,
                required: true
            }
        }
    ]
});

const quizSubjects = mongoose.model('Question_DB',questionSchema);

module.exports = quizSubjects;