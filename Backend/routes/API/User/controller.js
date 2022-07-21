const UserRepo = require('../../../models/repositories/user.repository');
const ContentRepo = require('../../../models/repositories/content.repository');

const hashHelper = require('../../../service/hashHelper');
const nodeMailer = require('../../../service/nodeMailer');
const awsS3BucketHelper = require('../../../service/awsS3BucketHelper');
const utility = require('../../../service/utility');
const cast = require('TypeCast');
const jwt = require("jsonwebtoken");
const _ = require('underscore');

const config = require('../../../config/development.json');

const fs = require('fs');
const AWS = require('aws-sdk');

// Here, this function is used to create the user
module.exports.register = async (req,   res)    =>  {
    try{
        console.log("requestBody", req.body)
        const name = req.body.name ? req.body.name : '';
        const email = req.body.email ? req.body.email : '';
        const password = req.body.password ? req.body.password : '123456';

        // Here, validation to restrict the duplicate entry
        const User = await UserRepo.GetByParameter({
            email: email
        });

        if (User.length > 0) {
            res.send({
                code: 3,
                message: "User with this email already exists",
                payload: User 
            })
            return; 
        }

        const hashPassword = await hashHelper.getHashPassword(password);
        Userinfo = {
            name: name,
            email: email,
            password: hashPassword
        };

        // Here, we are inserting the role     
        const SaveInfo = await UserRepo.saveDetails(Userinfo);
        res.send({
            code: 2,
            message: "Successful",
            payload: SaveInfo
        })
        return;
        
    }catch(error){
        res.send({
            code: 3,
            message: "Error",
            payload:  error.message
        })
    }
}


// Here, this function is used to login the user
module.exports.login = async (req,   res)    =>  {
    try{
        console.log("requestBody", req.body)
        const email = req.body.email ? req.body.email : '';
        const password = req.body.password ? req.body.password : '';

        // Here, validation to restrict the duplicate entry
        const User = await UserRepo.GetByParameter({
            email: email
        });

        if (User.length < 1) {
            res.send({
                code: 3,
                message: "User not exists with this email in the system",
                payload: User 
            })
            return; 
        }

        // taking only essential details of the user
        let userDetails = {
            "name": User[0].name,
			"email": User[0].email
        }

        let authencated = await hashHelper.compareHashPassword(User[0].password, password); 
                
        if (!authencated) {
            res.send({
                code: 3,
                message: "Invalid Credentials.",
                payload: null 
            })
            return;
        }
        
        let token = jwt.sign(
            {
                User: userDetails
            }, 
            'secret', 
            {
                expiresIn: '12h' 
            }
        );

        res.send({
            code: 2,
            message: "Successfull.",
            payload: {
                "token": token,
                "userDetails": userDetails
            } 
        })
        return;
        
    }catch(error){
        res.send({
            code: 3,
            message: "Error",
            payload:  error.message
        })
    }
}


// Here, this function is used to add Content
module.exports.addContent = async (req,   res)    =>  {
    try{
        console.log("requestBody", req.body)
        const newContent = req.body.newContent ? req.body.newContent : '';
        const oldContent = req.body.oldContent ? req.body.oldContent : '';
        const tagType = req.body.tagType ? req.body.tagType : '';
        const currentUrl = req.body.currentUrl ? req.body.currentUrl : '';
        const userEmail = req.body.userEmail ? req.body.userEmail : '';

        Contentinfo = {
            newContent,
            oldContent,
            tagType,
            currentUrl,
            userEmail
        };

        // Here, we are inserting the content     
        const SaveInfo = await ContentRepo.saveDetails(Contentinfo);
        res.send({
            code: 2,
            message: "Successful",
            payload: SaveInfo
        })
        return;    
    }catch(error){
        res.send({
            code: 3,
            message: "Error",
            payload:  error.message
        })
    }
}

// Here, this function is used to add Content
module.exports.getContents = async (req,   res)    =>  {
    try{
        console.log("requestBody", req.body)
        const currentUrl = req.body.currentUrl ? req.body.currentUrl : '';
        const userEmail = req.body.userEmail ? req.body.userEmail : '';

        let contentList = await ContentRepo.getContentList(currentUrl, userEmail);
        
        res.send({
            code: 2,
            message: "Successful",
            payload: contentList[0]
        })
        return;    
    }catch(error){
        res.send({
            code: 3,
            message: "Error",
            payload:  error.message
        })
    }
}


