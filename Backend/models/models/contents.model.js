const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentsSchema = new Schema({
    newContent: {
        type: String,
        default: ''
    },
    oldContent: {
        type: String,
        default: ''
    },
    tagType: {
        type: String,
        default: ''
    },
    currentUrl: {
        type: String,
        default: ''
    },
    userEmail: {
        type: String,
        default: ''
    },

    status: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    updatedAt: {
      type: Date,
      default: Date.now(),
    }
});

module.exports = ContentsSchema;