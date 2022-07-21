const { SecondryDb, PrimaryDb } = require('../../database/mongoose');
const UsersSchema = require('../models/users.model');
const ContentsSchema = require('../models/contents.model');

module.exports = {
    "User_Read": SecondryDb.model('Users', UsersSchema),
    "User_Write": PrimaryDb.model('Users', UsersSchema),

    "Content_Read": SecondryDb.model('Contents', ContentsSchema),
    "Content_Write": PrimaryDb.model('Contents', ContentsSchema),
};