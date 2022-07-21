const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../config/development.json');

const downloadFolder = 'downloadedFilesFolder';
const xlsx = require('xlsx');

// This function is used to make folder in s3 bucket
exports.makeFolderInS3Bucket = (folderName) => {

    let aws_s3 = config.aws_s3;
    let bucketName = aws_s3.bucketName;
    let accessKeyId = aws_s3.accessKeyId;
    let secretAccessKey = aws_s3.secretAccessKey; 
    let aws_url = aws_s3.aws_url;
    let folderUrl = "https://" + bucketName + aws_url + folderName;

    let s3 = new AWS.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });
           
    let params = {
        Bucket: bucketName, // pass your bucket name
        Key: folderName+'/',
        ACL: 'public-read',
        Body: 'No Body'
    };

    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) {
                resolve({
                    "isError": true,
                });
                return;
            } else {  
                resolve({
                    "isError": false,
                    "message": "Folder Successfully made",
                    "folderUrl": folderUrl,
                    "userId": folderName
                });
                return;
            }  
        }); // END s3.upload(params, function (err, data) {
    }); // End return new Promise(function (resolve, reject) {          
} // End exports.exportRequestToExcel = (requests, filePath) => {


// This function is used to upload folder in s3 bucket
exports.uploadFileInS3Bucket = (folderName, filePath, fileName) => {
    // let fileToUpload = './outputFilesFolder/file11.xlsx';
    console.log("uploadFileInS3Bucket");
    let aws_s3 = config.aws_s3;
    let bucketName = aws_s3.bucketName;
    let accessKeyId = aws_s3.accessKeyId;
    let secretAccessKey = aws_s3.secretAccessKey; 
    let aws_url = aws_s3.aws_url;
    let fileUrl = "https://"+bucketName+aws_url+folderName+'/'+fileName ;

    let s3 = new AWS.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });

    let fileContent = fs.readFileSync(filePath);
           
    let paramsDel = {
        Bucket: bucketName, // pass your bucket name
        Key: folderName+'/'+fileName,
    };

    let params = {
        Bucket: bucketName, // pass your bucket name
        Key: folderName+'/'+fileName,
        ACL: 'public-read',
        Body: fileContent
    };

    return new Promise(function (resolve, reject) {
        // s3.deleteObject(paramsDel, function (err, data) {
        //     if (data) {
        //         console.log("File deleted successfully");
                
                s3.upload(params, function (err, data) {
                    if (err) {
                        console.log("err", err)
                        resolve({
                            "isError": true,
                        });
                        return;
                    } else { 
                        fs.unlink(filePath, function (err, response) {
                            if (err) {
                                resolve({
                                    "isError": true,
                                    "message": "file is not deleted from local",
                                });
                            } else {
                                resolve({
                                    "isError": false,
                                    "message": "file Successfully uploaded",
                                    "fileUrl": fileUrl
                                });
                                return;
                            }           
                        }); // fs.unlink(fileToUpload, function (err, response) {     
                    }  
                }); // END s3.upload(params, function (err, data) {
       
    }); // End return new Promise(function (resolve, reject) {          
} // End exports.exportRequestToExcel = (requests, filePath) => {

// This function is used to upload folder in s3 bucket
exports.downloadFileInS3Bucket = (fileUrl) => {
    console.log("downloadFileInS3Bucket", fileUrl);
    let aws_s3 = config.aws_s3;
    let bucketName = aws_s3.bucketName;
    let accessKeyId = aws_s3.accessKeyId;
    let secretAccessKey = aws_s3.secretAccessKey; 
    let aws_url = aws_s3.aws_url;
   
    let s3 = new AWS.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });

    let fileUrlArr = fileUrl.split('/');
    fileUrlArr = fileUrlArr.reverse();
    let fileName = fileUrlArr[1]+'/'+fileUrlArr[0];
    let filePathLocal = downloadFolder+'/'+fileUrlArr[1]+'_'+fileUrlArr[0];

    const params = {
        Bucket: bucketName, // pass your bucket name
        Key: fileName, // file will be saved as testBucket/contacts.csv
    };

    console.log("fileName", fileName);

    return new Promise(function (resolve, reject) {
        s3.getObject(params, function(err, data) {
            if (err) {
                resolve({
                    "isError": true,
                    "message": "file was not downloaded in local",
                });
            } else {
                fs.writeFileSync(filePathLocal, data.Body)
                resolve({
                    "isError": false,
                    "message": "file was downloaded in local",
                    "filePathLocal": filePathLocal
                });
            } 
        })
    }); // End return new Promise(function (resolve, reject) {

} // End exports.exportRequestToExcel = (requests, filePath) => {

// This function is used to downlad folder in s3 bucket
exports.downloadFileInS3BucketMontlyReport = (fileUrl) => {
    
    let aws_s3 = config.aws_s3;
    let bucketName = aws_s3.bucketName;
    let accessKeyId = aws_s3.accessKeyId;
    let secretAccessKey = aws_s3.secretAccessKey; 
    let aws_url = aws_s3.aws_url;
   
    let s3 = new AWS.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });

    let fileUrlArr = fileUrl.split('/');
    fileUrlArr = fileUrlArr.reverse();
    let fileName = fileUrlArr[1]+'/'+fileUrlArr[0];
    let filePathLocal = downloadFolder+'/'+fileUrlArr[1]+'_'+fileUrlArr[0];

    const params = {
        Bucket: bucketName, // pass your bucket name
        Key: fileName, // file will be saved as testBucket/contacts.csv
    };

    return new Promise(function (resolve, reject) {
        s3.getObject(params, function(err, data) {
            if (err) {
                resolve({
                    "isError": true,
                    "message": "file was not downloaded in local",
                });
            } else {
                fs.writeFileSync(filePathLocal, data.Body)
                resolve({
                    "isError": false,
                    "message": "file was downloaded in local",
                    "filePathLocal": filePathLocal
                });
            } 
        })
    }); // End return new Promise(function (resolve, reject) {

} // End exports.exportRequestToExcel = (requests, filePath) => {

// This function is used to upload folder in s3 bucket
exports.readFileFromS3Bucket = (fileUrl) => {

    let aws_s3 = config.aws_s3;
    let bucketName = aws_s3.bucketName;
    let accessKeyId = aws_s3.accessKeyId;
    let secretAccessKey = aws_s3.secretAccessKey; 
    let aws_url = aws_s3.aws_url;
   
    let s3 = new AWS.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });

    let fileUrlArr = fileUrl.split('/');
    fileUrlArr = fileUrlArr.reverse();
    let fileName = fileUrlArr[1]+'/'+fileUrlArr[0];
    let filePathLocal = downloadFolder+'/'+fileUrlArr[1]+'_'+fileUrlArr[0];

    const params = {
        Bucket: bucketName, // pass your bucket name
        Key: fileName, // file will be saved as testBucket/contacts.csv
    };

    return new Promise(function (resolve, reject) {
        s3.getObject(params, function(err, data) {
            if (err) {
                resolve({
                    "isError": true,
                    "message": "file was not downloaded in local",
                });
            } else {
                fs.writeFileSync(filePathLocal, data.Body)
                resolve({
                    "isError": false,
                    "message": "file was downloaded in local",
                    "filePathLocal": filePathLocal
                });
            } 
        })
    }); // End return new Promise(function (resolve, reject) {

} // End exports.exportRequestToExcel = (requests, filePath) => {




