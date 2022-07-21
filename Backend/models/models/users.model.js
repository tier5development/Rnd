const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
   
    isDeleted: {
        type: Boolean,
        default: false,
        enum: [false, true]
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

// create the model for Users and expose it to our app
// module.exports = mongoose.model('Users', UsersSchema);

module.exports = UsersSchema;