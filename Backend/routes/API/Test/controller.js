
const hashHelper = require('../../../service/hashHelper');
const utility = require('../../../service/utility');
const config = require('../../../config/development.json');

const nodeMailer = require('../../../service/nodeMailer');

const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');


const ENDPOINT = config.socket_url;
const cast = require('TypeCast');

// Here, this function is used to handle duplicate entry
module.exports.check   =   async   (req,   res)    =>  {
    try{
          
        res.send({
            code: 1,
            message: "Successful",
            payload: "Just Checking"
        })
        
    }catch(error){
        res.send({
            code: 3,
            message: "Error",
            payload:  error.message
        })
    }
}






