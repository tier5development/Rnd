const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const awsS3BucketHelper = require('./awsS3BucketHelper');

exports.exportRequestToExcel = (requests, filePath, fileName) => {
    
    const workSheetColumnNames = [
        "requestType",
        "UserInfo",
        "WindowURL",
        "TabId",
        "WindowId",
        "parent",
        "sourceType",
        "RequestId"
    ];

    const workSheetName = "Purchase_Requests";
    
    var requestArr = [];
    for (let i = 0; i < requests.length; i++) {
        let requestType = requests[i].requestType;
        let UserInfo = requests[i].UserInfo.toString();
        let WindowURL = requests[i].WindowURL;
        let TabId = requests[i].TabId;
        let WindowId = requests[i].WindowId;
        let parent = requests[i].parent.toString();
        let sourceType = requests[i].sourceType;
        let RequestId = requests[i].RequestId.toString();

        singleRequestArr = [
            requestType,
            UserInfo,
            WindowURL, 
            TabId,
            WindowId,
            parent,
            sourceType,
            RequestId
        ];

        requestArr.push(singleRequestArr);   
    } // End for (let i = 0; i < purchaseRequestList.length; i++) {

    exportExcel(requestArr, workSheetColumnNames, workSheetName, filePath, fileName);
}

// this function is called by exportRequestToExcel
const exportExcel = (data, workSheetColumnNames, workSheetName, filePath, fileName) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFileSync(workBook, path.resolve(filePath));
    // awsS3BucketHelper.uploadFileInS3Bucket(parent, filePath, fileName);
}