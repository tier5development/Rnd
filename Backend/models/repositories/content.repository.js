// const User = require('../models/users.model');
const { Content_Read, Content_Write } = require('../models/replicaSet'); 
const mongoose = require('mongoose');
const ContentsRepository = {

   /**
    * @GetUSER
    * Get Details As Per the given parameter
  */
    GetByParameter: async (findQry) => {
      try {
        let Info = await Content_Read.find(findQry).exec();
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
        let Info = await Content_Read.findOne({ '_id': Id }).exec();
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
        let Info = await Content_Write.create(data);
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
        let Info = await Content_Write.deleteOne(findQry).exec();
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
      let UpdateInfo = await Content_Write.updateMany(parameter, Details).exec();
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
      let UpdateInfo = await Content_Write.updateOne({ _id: Id }, Details).exec();
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
        let UserInfo = await Content_Read.find().exec();
        return UserInfo;
      } catch (e) {
        throw e;
      }
    },

    /**
      * @getContentList
      * get Content from Mongo DB
    */
    getContentList: async (currentUrl, userEmail) =>  {
      try {

        let projectStmt = { 
          $project: { 
            "_id": 0,
            "newContent": 1, 
            "oldContent": 1 
          } 
        };

        let ContentInfo = await Content_Read.aggregate([
          { 
            $facet: {
                "pTagTypeContent": [ 
                  { 
                    $match: { 
                      $and: [ 
                        { "currentUrl": currentUrl }, 
                        { "userEmail": userEmail },
                        { "tagType": "p" }  
                      ] 
                    } 
                  },
                  projectStmt
                ],
                "h1TagTypeContent": [ 
                  { 
                    $match: { 
                      $and: [ 
                        { "currentUrl": currentUrl }, 
                        { "userEmail": userEmail },
                        { "tagType": "h1" }  
                      ] 
                    } 
                  },
                  projectStmt
                ],
                "h3TagTypeContent": [ 
                  { 
                    $match: { 
                      $and: [ 
                        { "currentUrl": currentUrl }, 
                        { "userEmail": userEmail },
                        { "tagType": "h3" }  
                      ] 
                    } 
                  },
                  projectStmt
                ],
                "spanTagTypeContent": [ 
                  { 
                    $match: { 
                      $and: [ 
                        { "currentUrl": currentUrl }, 
                        { "userEmail": userEmail },
                        { "tagType": "span" }  
                      ] 
                    } 
                  },
                  projectStmt
                ],
                "liTagTypeContent": [ 
                  { 
                    $match: { 
                      $and: [ 
                        { "currentUrl": currentUrl }, 
                        { "userEmail": userEmail },
                        { "tagType": "li" }  
                      ] 
                    } 
                  },
                  projectStmt
                ]
            }
          } 
        ]).exec();
        return ContentInfo;
      } catch (e) {
        throw e;
      }
    },
   


};

module.exports = ContentsRepository;