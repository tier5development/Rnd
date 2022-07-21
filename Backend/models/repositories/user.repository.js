// const User = require('../models/users.model');
const { User_Read, User_Write } = require('../models/replicaSet'); 
const mongoose = require('mongoose');
const UsersRepository = {

   /**
    * @GetUSER
    * Get Details As Per the given parameter
  */
    GetByParameter: async (findQry) => {
      try {
        let Info = await User_Read.find(findQry).exec();
        return Info;
      } catch (e) {
        throw e;
      }
    },
    /**
      * @GetById
      * Get Details As Per _id
    */
   GetById: async (Id) => {
      try {
        let Info = await User_Read.findOne({ '_id': Id }).exec();
        return Info;
      } catch (e) {
        throw e;
      }
    },
      /**
      * @saveDetails
      * save Details in mongo db
    */
   saveDetails: async (data) => {
      try {
        let Info = await User_Write.create(data);
        if (!Info) {
          return null;
        }
        return Info;
      } catch (e) {
        throw e;
      }
    },
  
    /**
      * @getAllUser
      * delete the User from Mongo DB
    */
     deleteInfo: async (findQry) => {
      try {
        let Info = await User_Write.deleteOne(findQry).exec();
        return Info;
      } catch (e) {
        throw e;
      }
    },

    /**
      * @UpdateUserByParamer
      * update User Info
    */
    updateByParameter: async (parameter, Details) => {
    try {
      let UpdateInfo = await User_Write.updateMany(parameter, Details).exec();
      return UpdateInfo;
      } catch (error) {
        throw error;
      }
    },
  
    /**
      * @UpdateUserInfo
      * update User Info
    */
   UpdateInfo: async (Id, Details) => {
    try {
      let UpdateInfo = await User_Write.updateOne({ _id: Id }, Details).exec();
      return UpdateInfo;
      } catch (error) {
        throw error;
      }
    },
    /**
      * @getAllUser
      * get all the User from Mongo DB
    */
     getAllItem: async () => {
      try {
        let UserInfo = await User_Read.find().exec();
        return UserInfo;
      } catch (e) {
        throw e;
      }
    },

    /**
      * @getUserForLogin
      * get User from Mongo DB
    */
     getUserForLogin: async (email) =>  {
      try {
        let UserInfo = await User_Read.aggregate([
          {
            $lookup:
            {
              from: 'roles',
              localField: 'role',
              foreignField: '_id',
              as: 'rolesinfo'
            }
          },
          {
            $unwind: {
              path: '$rolesinfo',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup:
            {
              from: 'users',
              localField: 'parent',
              foreignField: '_id',
              as: 'parentinfo'
            }
          },
          {
            $unwind: {
              path: '$parentinfo',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $match: {
              'email': email
            }
          },
          {
            $group: {
              '_id': '$_id',
              name: {
                $first: '$name'
              },
              email: {
                $first: '$email'
              },
              Company_name: {
                $first: '$Company_name'
              },
              status: {
                $first: '$status'
              },
              isDeleted: {
                $first: '$isDeleted'
              },
              isSuspended: {
                $first: '$isSuspended'
              },
              password: {
                $first: '$password'
              },
              rolesinfo: {
                $first: '$rolesinfo'
              },
              parentinfo: {
                $first: '$parentinfo'
              }
            }
          }
        ]).exec();
        return UserInfo;
      } catch (e) {
        throw e;
      }
    },

    /**
      * @getSection_Permission by aggregation
      * get all the users by using aggregation with pagination
    */
     fetchUserWithPagination: async (page, limit, roleId, parent) => {
      try {

        let aggrQuery = [

            { 
              $match : { 
                $and: [
                  { role : roleId },
                  { parent: mongoose.Types.ObjectId(parent) },
                  { isDeleted: false }
                ]
                
              } 
            },
            { $sort: { _id: -1} },
            {
                $group: {
                _id: null,
                total: {
                    $sum: 1
                },
                results: {
                    $push: '$$ROOT'
                }
                }
            },
            {
                $project: {
                '_id': 0,
                'total': 1,
                'noofpage': { $ceil: { $divide: ["$total", limit] } },
                'items': {
                    $slice: [
                    '$results', page * limit, limit
                    ]
                }
                }
            }
        ];

        let UserInfo = await User_Read.aggregate(aggrQuery).exec();
        return UserInfo;
      } catch (e) {
        throw e;
      }
    },


};

module.exports = UsersRepository;