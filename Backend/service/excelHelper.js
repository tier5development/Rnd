const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const awsS3BucketHelper = require('./awsS3BucketHelper');

exports.exportRequestToExcel = (requests, filePath, parent, fileName) => {
    
    let purchaseRequestList = requests[0].purchaseRequestList
    const workSheetColumnNames = [
        "Request Id",
        "Admin Id",
        "Event Name",
        "Venue",
        "Date",
        "Section",
        "Row",
        "No Of Seats",
        "Seats",
        "UnitPrice",
        "UnitPriceWithTax",
        "Tax Price",
        "Processing Fees",
        "Total Price",
        "Total Price With Tax",
        "User Id",
        "User",
        "RequestType",
        "ManagerId",
        "ManagerName"
    ];

    const workSheetName = "Purchase_Requests";
    
    var requestArr = [];
    for (let i = 0; i < purchaseRequestList.length; i++) {
       
        let RequestId = purchaseRequestList[i]._id.toString();
        let AdminId = purchaseRequestList[i].parent.toString();
        let EventName = purchaseRequestList[i].EventName;
        let EventVenue = purchaseRequestList[i].EventVenue;
        let EventDateTime = new Date(purchaseRequestList[i].EventDateTime);
        let TaxPrice = purchaseRequestList[i].TaxPrice;
        let ProcessingFees = purchaseRequestList[i].ProcessingFees;
        let TotalPriceWithOutTax = purchaseRequestList[i].TotalPriceWithOutTax;
        let TotalPriceWithTax = purchaseRequestList[i].TotalPriceWithTax;
        let UserId = purchaseRequestList[i].UserInfo.toString();
        let buyerName = purchaseRequestList[i].buyerName;
        let requestType = purchaseRequestList[i].requestType;
        var adminManagerId = purchaseRequestList[i].adminManagerId ? purchaseRequestList[i].adminManagerId.toString() : '';
        var adminManagerName = purchaseRequestList[i].adminManagerName ? purchaseRequestList[i].adminManagerName : '';

        EventDateTime = EventDateTime.getFullYear()+'-'+(EventDateTime.getMonth()+1)+'-'+EventDateTime.getDate();

        let arrangedTicketCostDetails = purchaseRequestList[i].arrangedTicketCostDetails;
        // console.log("arrangedTicketCostDetails", arrangedTicketCostDetails);
        var singleRequestArr = [];
        if (arrangedTicketCostDetails.length > 0) {
            for (let k = 0; k < arrangedTicketCostDetails.length; k++) {
                let Section = arrangedTicketCostDetails[k].Section;
                let Row = arrangedTicketCostDetails[k].Row;
                let NoOfSeats = arrangedTicketCostDetails[k].noOfTop;
                let Seats = arrangedTicketCostDetails[k].seats.join();
                let UnitPrice = arrangedTicketCostDetails[k].TicketPrice;
                let UnitPriceWithTax = arrangedTicketCostDetails[k].TotalPrice;
                // console.log("Seat", Seats);
               
                    singleRequestArr = [
                        RequestId,
                        AdminId,
                        EventName, 
                        EventVenue,
                        EventDateTime,
                        Section,
                        Row,
                        NoOfSeats,
                        Seats,
                        UnitPrice,
                        UnitPriceWithTax,
                        TaxPrice,
                        ProcessingFees,
                        TotalPriceWithOutTax,
                        TotalPriceWithTax,
                        UserId,
                        buyerName,
                        requestType,
                        adminManagerId,
                        adminManagerName
                    ];
               
                requestArr.push(singleRequestArr);
               
            }
        } else {
            let Section = "";
            let Row = "";
            let NoOfSeats = "";
            let Seats = "";
            let UnitPrice = "";
            let UnitPriceWithTax = "";
            singleRequestArr = [
                RequestId,
                AdminId,
                EventName, 
                EventVenue,
                EventDateTime,
                Section,
                Row,
                NoOfSeats,
                Seats,
                UnitPrice,
                UnitPriceWithTax,
                TaxPrice,
                ProcessingFees,
                TotalPriceWithOutTax,
                TotalPriceWithTax,
                UserId,
                buyerName,
                requestType,
                adminManagerId,
                adminManagerName
            ];
            requestArr.push(singleRequestArr);
        }// END if (arrangedTicketCostDetails.length > 0) {
       
    } // END for (let i = 0; i < purchaseRequestList.length; i++) {

    exportExcel(requestArr, workSheetColumnNames, workSheetName, filePath, parent, fileName);
}

// this function is called by exportRequestToExcel
const exportExcel = (data, workSheetColumnNames, workSheetName, filePath, parent, fileName) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFileSync(workBook, path.resolve(filePath));
    awsS3BucketHelper.uploadFileInS3Bucket(parent, filePath, fileName);
}

exports.mergeExcelReport = (filePathList,startDate,endDate,adminId,userEmail) => {
    let purchaseRequestListArr = [];
    for (let i = 0; i < filePathList.length; i++) {  
        let workbook = xlsx.readFileSync(filePathList[i]);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            for (z in worksheet) {
                if (z[0] === "!") continue;
                var col = z.substring(0, 1);
                var row = parseInt(z.substring(1));
                var value = worksheet[z].v;
                if (row == 1) {
                    if (value == 'Request Id') {
                        headers[col] = 'RequestId';
                    } else if (value == 'Admin Id') {
                        headers[col] = 'AdminId';
                    } else if (value == 'Event Name') {
                        headers[col] = 'EventName';
                    } else if (value == 'No Of Seats') {
                        headers[col] = 'NoOfSeats';
                    } else if (value == 'Tax Price') {
                        headers[col] = 'TaxPrice';
                    } else if (value == 'Processing Fees') {
                        headers[col] = 'ProcessingFees';
                    } else if (value == 'Total Price') {
                        headers[col] = 'TotalPriceWithOutTax';
                    } else if (value == 'Total Price With Tax') {
                        headers[col] = 'TotalPriceWithTax';
                    } else if (value == 'User Id') {
                        headers[col] = 'UserId';
                    } else {
                        headers[col] = value;
                    }
                    // headers[col] = value;
                    continue;
                }// End if (row == 1) {  
                if (!data[row]) data[row] = {};
                data[row][headers[col]] = value;
            }
            data.shift();
            data.shift();
            purchaseRequestListArr.push(data)
        }); // End sheet_name_list.forEach(function (y) { 
    } // END for (let i = 0; i < requestArchiveInfo.length; i++) {
    prepareDataForExcelForPurchaseRequest(purchaseRequestListArr, filePathList, startDate,endDate,adminId,userEmail);
} // End exports.mergeExcelReport = (filePathList) => {

const prepareDataForExcelForPurchaseRequest = (purchaseRequestListArr, filePathList, startDate,endDate,adminId,userEmail) => {
    let purchaseRequestList = [];

    for (let i = 0; i < purchaseRequestListArr.length; i++) { 
        if (i == 0) {
            purchaseRequestList = purchaseRequestListArr[i];
        } else {
            purchaseRequestList = purchaseRequestList.concat(purchaseRequestListArr[i]); 
        } 
    }

    const workSheetColumnNames = [
        "Request Id",
        "Admin Id",
        "Event Name",
        "Venue",
        "Date",
        "Section",
        "Row",
        "No Of Seats",
        "Seats",
        "UnitPrice",
        "UnitPriceWithTax",
        "Tax Price",
        "Processing Fees",
        "Total Price",
        "Total Price With Tax",
        "User Id",
        "User"
    ];

    const workSheetName = "Merged_Purchase_Requests";
    var requestArr = [];
    var totalNoOfSeat = 0;
    var TotalRequest = 0;
    var singleRequestArr = 0;
    var sumTotalPriceWithOutTax = 0;
    var sumTotalPriceWithTax = 0;
    var diffUserArr = []; // it is used to count number of user
    for (let i = 0; i < purchaseRequestList.length; i++) {  
        let RequestId = purchaseRequestList[i].RequestId;
        let AdminId = purchaseRequestList[i].AdminId;
        let EventName = purchaseRequestList[i].EventName;
        let EventVenue = purchaseRequestList[i].Venue;
        let EventDateTime = purchaseRequestList[i].Date;
        let Section = purchaseRequestList[i].Section;
        let Row = purchaseRequestList[i].Row;
        let NoOfSeats = purchaseRequestList[i].NoOfSeats;
        let Seats = purchaseRequestList[i].Seats;
        let UnitPrice = purchaseRequestList[i].UnitPrice;
        let UnitPriceWithTax = purchaseRequestList[i].UnitPriceWithTax;
        let TaxPrice = purchaseRequestList[i].TaxPrice;
        let ProcessingFees = purchaseRequestList[i].ProcessingFees;
        let TotalPriceWithOutTax = purchaseRequestList[i].TotalPriceWithOutTax;
        let TotalPriceWithTax = purchaseRequestList[i].TotalPriceWithTax;
        let UserId = purchaseRequestList[i].UserId;
        let buyerName = purchaseRequestList[i].User;

        if (!diffUserArr.includes(UserId)) {
            diffUserArr.push(UserId);
        } 

        totalNoOfSeat = totalNoOfSeat + Number(NoOfSeats);
        singleRequestArr = [
            RequestId,
            AdminId,
            EventName, 
            EventVenue,
            EventDateTime,
            Section,
            Row,
            NoOfSeats,
            Seats,
            UnitPrice,
            UnitPriceWithTax,
            "",
            "",
            "",
            "",
            UserId,
            buyerName
        ];
        requestArr.push(singleRequestArr);
        let singleRequestTotalArr = [];

        if (i < (purchaseRequestList.length - 1)) {
            if (purchaseRequestList[i].RequestId != purchaseRequestList[i+1].RequestId) { // when new request start
                singleRequestTotalArr = [
                    "Total",
                    "",
                    "", 
                    "",
                    "",
                    "",
                    "",
                    totalNoOfSeat,
                    "",
                    "",
                    "",
                    TaxPrice,
                    ProcessingFees,
                    TotalPriceWithOutTax,
                    TotalPriceWithTax,
                    "",
                    ""
                ]
                requestArr.push(singleRequestTotalArr);
                sumTotalPriceWithOutTax = sumTotalPriceWithOutTax + Number(TotalPriceWithOutTax);
                sumTotalPriceWithTax = sumTotalPriceWithTax + Number(TotalPriceWithTax);
                TotalRequest = TotalRequest + 1;
                totalNoOfSeat = 0;    
            } // End if (purchaseRequestList[i].RequestId != purchaseRequestList[i+1].RequestId) {     
        } // End if (i < (purchaseRequestList.length - 1)) {

        if (i == (purchaseRequestList.length - 1)) { // When last row appears
            singleRequestTotalArr = [
                "Total",
                "",
                "", 
                "",
                "",
                "",
                "",
                totalNoOfSeat,
                "",
                "",
                "",
                TaxPrice,
                ProcessingFees,
                TotalPriceWithOutTax,
                TotalPriceWithTax,
                "",
                ""
            ]
            requestArr.push(singleRequestTotalArr);
            TotalRequest = TotalRequest + 1;
            totalNoOfSeat = 0;         
        } // End if (i < (purchaseRequestList.length - 1)) {

    } // END for (let i = 0; i < purchaseRequestList.length; i++) {

    let TotalUser = diffUserArr.length; // total user exist in report

    firstRow = [
        "Total Request",
        TotalRequest,
        "", 
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Total Price",
        sumTotalPriceWithOutTax,
        "Total Price With Tax",
        sumTotalPriceWithTax,
        "Total User",
        TotalUser
    ];
    // requestArr.reverse();
    // requestArr.push(singleRequestArr);
    // requestArr.reverse();

    let fileName = 'mergedReport_'+userEmail+'_'+startDate+'_'+endDate+'.xlsx';
    let filePath = './downloadedFilesFolder/'+fileName;
   
    exportExcelOfMergedReport(firstRow, requestArr, workSheetColumnNames, workSheetName, filePath, fileName);

    // deleting file from local
    deleteFileFromLocal(filePathList);
} // End const prepareDataForExcelForPurchaseRequest = (purchaseRequestList) => {

// this function is called by exportRequestToExcel
const exportExcelOfMergedReport = (firstRow, data, workSheetColumnNames, workSheetName, filePath, fileName) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        firstRow,
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFileSync(workBook, path.resolve(filePath));
}

const deleteFileFromLocal = (filePathList) => {
    for (let i = 0; i < filePathList.length; i++) {  
        fs.unlink(filePathList[i],() => {});
    }    
}

//========================================= Monthly Report =================================================
// includeing purchase request in monthly report file
exports.includeRequestToMonthlyReport = async (requests, filePath, parent, fileName, fileUrlMonthly, oldFileUrlMonthly) => {
    // console.log("requests", requests);
    // return;
    const workSheetName = "Purchase_Requests";
    let purchaseRequestListArr = [];
    var requestArr = [];
    var totalNoOfSeat = 0;
    var TotalRequestArr = [];
    var singleRequestArr = 0;
    var sumTotalPriceWithOutTax = 0;
    var sumTotalPriceWithTax = 0;
    var diffUserArr = []; // it is used to count number of user
    var TotalUser = 0; 
    var TotalRequest = 0;
    var singleRequestArr = [];

    var approvedRequestArr = []; 
    var declinedRequestArr = []; 
    var newRequestArr = []; 

    
    // let downloadFileInS3Bucket = await awsS3BucketHelper.downloadFileInS3BucketMontlyReport(fileUrlMonthly);
    let downloadFileInS3Bucket = await awsS3BucketHelper.downloadFileInS3BucketMontlyReport(oldFileUrlMonthly);
    // console.log("kk",downloadFileInS3Bucket.isError)
    // return;
    if (!downloadFileInS3Bucket.isError) {
        let workbook = xlsx.readFileSync(downloadFileInS3Bucket.filePathLocal);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            
            for (z in worksheet) {
                if (z[0] === "!") continue;
                var col = z.substring(0, 1);
                var row = parseInt(z.substring(1));
                var value = worksheet[z].v;
                if (row == 2) {
                    if (value == 'Request Id') {
                        headers[col] = 'RequestId';
                    } else if (value == 'Admin Id') {
                        headers[col] = 'AdminId';
                    } else if (value == 'Event Name') {
                        headers[col] = 'EventName';
                    } else if (value == 'No Of Seats') {
                        headers[col] = 'NoOfSeats';
                    } else if (value == 'Tax Price') {
                        headers[col] = 'TaxPrice';
                    } else if (value == 'Processing Fees') {
                        headers[col] = 'ProcessingFees';
                    } else if (value == 'Total Price') {
                        headers[col] = 'TotalPriceWithOutTax';
                    } else if (value == 'Total Price With Tax') {
                        headers[col] = 'TotalPriceWithTax';
                    } else if (value == 'User Id') {
                        headers[col] = 'UserId';
                    } else {
                        headers[col] = value;
                    }
                    // headers[col] = value;
                    continue;
                }// End if (row == 2) {  
                
                if (row > 2) {
                    if (!data[row]) data[row] = {};
                    data[row][headers[col]] = value;   
                }
                
            } // End for (z in worksheet) {
            data.shift();
            data.shift();
            purchaseRequestListArr.push(data);       
        }); // End sheet_name_list.forEach(function (y) {
        
        var requestList = purchaseRequestListArr[0]; 
        // console.log("requestList", requestList)
        for (let j = 0; j < requestList.length; j++) {
            if (j > 0) {
                var RequestId = requestList[j].RequestId;
                var AdminId = requestList[j].AdminId;
                var EventName = requestList[j].EventName;
                var EventVenue = requestList[j].Venue;
                var EventDateTime = requestList[j].Date;

                var Section = requestList[j].Section;
                var Row = requestList[j].Row;
                var NoOfSeats = requestList[j].NoOfSeats;
                var Seats = requestList[j].Seats;
                var UnitPrice = requestList[j].UnitPrice;
                var UnitPriceWithTax = requestList[j].UnitPriceWithTax;

                var TaxPrice = requestList[j].TaxPrice;
                var ProcessingFees = requestList[j].ProcessingFees;
                var TotalPriceWithOutTax = requestList[j].TotalPriceWithOutTax;
                var TotalPriceWithTax = requestList[j].TotalPriceWithTax;
                var UserId = requestList[j].UserId;
                var buyerName = requestList[j].User;
                var requestType = requestList[j].RequestType;
                var adminManagerId = requestList[j].ManagerId;
                var adminManagerName = requestList[j].ManagerName;
               

                if (!diffUserArr.includes(UserId) && UserId != '') { diffUserArr.push(UserId); }
                if (!TotalRequestArr.includes(RequestId) && RequestId != 'Total') { 
                    TotalRequestArr.push(RequestId); 
                    if (requestType == 'NEW') {  newRequestArr.push(RequestId); }
                    if (requestType == 'APPROVED') {  approvedRequestArr.push(RequestId); }
                    if (requestType == 'DECLINED') {  declinedRequestArr.push(RequestId); }
                }

                sumTotalPriceWithOutTax = sumTotalPriceWithOutTax + Number(TotalPriceWithOutTax);
                sumTotalPriceWithTax = sumTotalPriceWithTax + Number(TotalPriceWithTax);

                singleRequestArr = [
                    RequestId,
                    AdminId,
                    EventName, 
                    EventVenue,
                    EventDateTime,
                    Section,
                    Row,
                    NoOfSeats,
                    Seats,
                    UnitPrice,
                    UnitPriceWithTax,
                    TaxPrice,
                    ProcessingFees,
                    TotalPriceWithOutTax,
                    TotalPriceWithTax,
                    UserId,
                    buyerName,
                    requestType,
                    adminManagerId,
                    adminManagerName
                ];
                requestArr.push(singleRequestArr);
            } // End if (j > 0) {
        } // End for (let i = 0; i < requestList.length; i++) {
        fs.unlink(downloadFileInS3Bucket.filePathLocal, () => {}); // delete the downloaded file from local
    } // End if (!downloadFileInS3Bucket.isError) {

    let purchaseRequestList = requests[0].purchaseRequestList;
    const workSheetColumnNames = [
        "Request Id",
        "Admin Id",
        "Event Name",
        "Venue",
        "Date",
        "Section",
        "Row",
        "No Of Seats",
        "Seats",
        "UnitPrice",
        "UnitPriceWithTax",
        "Tax Price",
        "Processing Fees",
        "Total Price",
        "Total Price With Tax",
        "User Id",
        "User",
        "RequestType",
        "ManagerId",
        "ManagerName"
    ];

    
    for (let i = 0; i < purchaseRequestList.length; i++) {
       
        var RequestId = purchaseRequestList[i]._id.toString();
        var AdminId = purchaseRequestList[i].parent.toString();
        var EventName = purchaseRequestList[i].EventName;
        var EventVenue = purchaseRequestList[i].EventVenue;
        var EventDateTime = new Date(purchaseRequestList[i].EventDateTime);
        var TaxPrice = purchaseRequestList[i].TaxPrice;
        var ProcessingFees = purchaseRequestList[i].ProcessingFees;
        var TotalPriceWithOutTax = purchaseRequestList[i].TotalPriceWithOutTax;
        var TotalPriceWithTax = purchaseRequestList[i].TotalPriceWithTax;
        var UserId = purchaseRequestList[i].UserInfo.toString();
        var buyerName = purchaseRequestList[i].buyerName;
        var requestType = purchaseRequestList[i].requestType;
        var adminManagerId = purchaseRequestList[i].adminManagerId ? purchaseRequestList[i].adminManagerId.toString() : '';
        var adminManagerName = purchaseRequestList[i].adminManagerName ? purchaseRequestList[i].adminManagerName : '';

        if (TotalRequestArr.includes(RequestId)) continue;

        if (!diffUserArr.includes(UserId)) { diffUserArr.push(UserId); }
        if (!TotalRequestArr.includes(RequestId)) { 
            TotalRequestArr.push(RequestId); 
            if (requestType == 'NEW') {  newRequestArr.push(RequestId); }
            if (requestType == 'APPROVED') {  approvedRequestArr.push(RequestId); }
            if (requestType == 'DECLINED') {  declinedRequestArr.push(RequestId); }
        } // if (!TotalRequestArr.includes(RequestId)) { 
        EventDateTime = EventDateTime.getFullYear()+'-'+(EventDateTime.getMonth()+1)+'-'+EventDateTime.getDate();
        var arrangedTicketCostDetails = purchaseRequestList[i].arrangedTicketCostDetails;        
        if (arrangedTicketCostDetails.length > 0) {
            for (let k = 0; k < arrangedTicketCostDetails.length; k++) {
                var Section = arrangedTicketCostDetails[k].Section;
                var Row = arrangedTicketCostDetails[k].Row;
                var NoOfSeats = arrangedTicketCostDetails[k].noOfTop;
                var Seats = arrangedTicketCostDetails[k].seats.join();
                var UnitPrice = arrangedTicketCostDetails[k].TicketPrice;
                var UnitPriceWithTax = arrangedTicketCostDetails[k].TotalPrice;
                totalNoOfSeat = totalNoOfSeat + Number(NoOfSeats);
                singleRequestArr = [
                    RequestId,
                    AdminId,
                    EventName, 
                    EventVenue,
                    EventDateTime,
                    Section,
                    Row,
                    NoOfSeats,
                    Seats,
                    UnitPrice,
                    UnitPriceWithTax,
                    "",
                    "",
                    "",
                    "",
                    UserId,
                    buyerName,
                    requestType,
                    adminManagerId,
                    adminManagerName
                ];
                requestArr.push(singleRequestArr); 
            }
        } else {
            var Section = "";
            var Row = "";
            var NoOfSeats = "";
            var Seats = "";
            var UnitPrice = "";
            var UnitPriceWithTax = "";
            singleRequestArr = [
                RequestId,
                AdminId,
                EventName, 
                EventVenue,
                EventDateTime,
                Section,
                Row,
                NoOfSeats,
                Seats,
                UnitPrice,
                UnitPriceWithTax,
                "",
                "",
                "",
                "",
                UserId,
                buyerName,
                requestType,
                adminManagerId,
                adminManagerName
            ];
            requestArr.push(singleRequestArr);
        }// END if (arrangedTicketCostDetails.length > 0) {

        if (i < (purchaseRequestList.length - 1)) {
            if (purchaseRequestList[i]._id != purchaseRequestList[i+1]._id) { // when new request start
                singleRequestTotalArr = [
                    "Total",
                    "",
                    "", 
                    "",
                    "",
                    "",
                    "",
                    totalNoOfSeat,
                    "",
                    "",
                    "",
                    TaxPrice,
                    ProcessingFees,
                    TotalPriceWithOutTax,
                    TotalPriceWithTax,
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
                requestArr.push(singleRequestTotalArr);
                sumTotalPriceWithOutTax = sumTotalPriceWithOutTax + Number(TotalPriceWithOutTax);
                sumTotalPriceWithTax = sumTotalPriceWithTax + Number(TotalPriceWithTax);
                totalNoOfSeat = 0;    
            } // End if (purchaseRequestList[i].RequestId != purchaseRequestList[i+1].RequestId) {     
        } // End if (i < (purchaseRequestList.length - 1)) {

        if (i == (purchaseRequestList.length - 1)) { // When last row appears
            singleRequestTotalArr = [
                "Total",
                "",
                "", 
                "",
                "",
                "",
                "",
                totalNoOfSeat,
                "",
                "",
                "",
                TaxPrice,
                ProcessingFees,
                TotalPriceWithOutTax,
                TotalPriceWithTax,
                "",
                "",
                "",
                "",
                ""
            ]
            requestArr.push(singleRequestTotalArr);
            sumTotalPriceWithOutTax = sumTotalPriceWithOutTax + Number(TotalPriceWithOutTax);
            sumTotalPriceWithTax = sumTotalPriceWithTax + Number(TotalPriceWithTax);
            totalNoOfSeat = 0;         
        } // End if (i < (purchaseRequestList.length - 1)) {
       
    } // END for (let i = 0; i < purchaseRequestList.length; i++) {

    TotalUser = Number(diffUserArr.length); // total user exist in report
    TotalRequest = Number(TotalRequestArr.length);
    TotalNewRequest = Number(newRequestArr.length);
    TotalApprovedRequest = Number(approvedRequestArr.length);
    TotalDeclinedRequest = Number(declinedRequestArr.length);
    
    firstRow = [
        "Total Request",
        TotalRequest,
        "New Request", 
        TotalNewRequest,
        "Approved Request",
        TotalApprovedRequest,
        "Declined Request",
        TotalDeclinedRequest,
        "",
        "",
        "",
        "Total Price",
        sumTotalPriceWithOutTax,
        "Total Price With Tax",
        sumTotalPriceWithTax,
        "Total User",
        TotalUser,
        "",
        "",
        ""
    ];
    exportExcelOfMonthlyReport(firstRow, requestArr, workSheetColumnNames, workSheetName, filePath, parent, fileName);
} // End exports.includeRequestToMonthlyReport = (requests, filePath, parent, fileName) => {

// this function is called by includeRequestToMonthlyReport
const exportExcelOfMonthlyReport = (firstRow, data, workSheetColumnNames, workSheetName, filePath, parent, fileName) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        firstRow,
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFileSync(workBook, path.resolve(filePath));
    awsS3BucketHelper.uploadFileInS3Bucket(parent, filePath, fileName);
}

//============================== End Monthly Report ================================================== 

//============================== update single monthly Report ========================================
exports.includeRequestToMonthlyReportSingle = async (requests, filePath, parent, fileName, fileUrlMonthly, oldFileUrlMonthly) => {
    
    const workSheetName = "Purchase_Requests";
    let purchaseRequestListArr = [];
    var requestArr = [];
    var totalNoOfSeat = 0;
    var TotalRequestArr = [];
    var singleRequestArr = 0;
    var sumTotalPriceWithOutTax = 0;
    var sumTotalPriceWithTax = 0;
    var diffUserArr = []; // it is used to count number of user
    var TotalUser = 0; 
    var TotalRequest = 0;
    var singleRequestArr = [];

    var approvedRequestArr = []; 
    var declinedRequestArr = []; 
    var newRequestArr = []; 
    
    // Here, we downolading previous monthly report
    // let downloadFileInS3Bucket = await awsS3BucketHelper.downloadFileInS3BucketMontlyReport(fileUrlMonthly);
    let downloadFileInS3Bucket = await awsS3BucketHelper.downloadFileInS3BucketMontlyReport(oldFileUrlMonthly);
    // console.log("kk",downloadFileInS3Bucket.isError)
    // return;
    if (!downloadFileInS3Bucket.isError) {
        let workbook = xlsx.readFileSync(downloadFileInS3Bucket.filePathLocal);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            
            for (z in worksheet) {
                if (z[0] === "!") continue;
                var col = z.substring(0, 1);
                var row = parseInt(z.substring(1));
                var value = worksheet[z].v;
                if (row == 2) {
                    if (value == 'Request Id') {
                        headers[col] = 'RequestId';
                    } else if (value == 'Admin Id') {
                        headers[col] = 'AdminId';
                    } else if (value == 'Event Name') {
                        headers[col] = 'EventName';
                    } else if (value == 'No Of Seats') {
                        headers[col] = 'NoOfSeats';
                    } else if (value == 'Tax Price') {
                        headers[col] = 'TaxPrice';
                    } else if (value == 'Processing Fees') {
                        headers[col] = 'ProcessingFees';
                    } else if (value == 'Total Price') {
                        headers[col] = 'TotalPriceWithOutTax';
                    } else if (value == 'Total Price With Tax') {
                        headers[col] = 'TotalPriceWithTax';
                    } else if (value == 'User Id') {
                        headers[col] = 'UserId';
                    } else {
                        headers[col] = value;
                    }
                    // headers[col] = value;
                    continue;
                }// End if (row == 2) {  
                
                if (row > 2) {
                    if (!data[row]) data[row] = {};
                    data[row][headers[col]] = value;   
                }
                
            } // End for (z in worksheet) {
            data.shift();
            data.shift();
            purchaseRequestListArr.push(data);       
        }); // End sheet_name_list.forEach(function (y) {
        
        var requestList = purchaseRequestListArr[0]; 
        // console.log("requestList", requestList)
        for (let j = 0; j < requestList.length; j++) {
            if (j > 0) {
                var RequestId = requestList[j].RequestId;
                var AdminId = requestList[j].AdminId;
                var EventName = requestList[j].EventName;
                var EventVenue = requestList[j].Venue;
                var EventDateTime = requestList[j].Date;

                var Section = requestList[j].Section;
                var Row = requestList[j].Row;
                var NoOfSeats = requestList[j].NoOfSeats;
                var Seats = requestList[j].Seats;
                var UnitPrice = requestList[j].UnitPrice;
                var UnitPriceWithTax = requestList[j].UnitPriceWithTax;

                var TaxPrice = requestList[j].TaxPrice;
                var ProcessingFees = requestList[j].ProcessingFees;
                var TotalPriceWithOutTax = requestList[j].TotalPriceWithOutTax;
                var TotalPriceWithTax = requestList[j].TotalPriceWithTax;
                var UserId = requestList[j].UserId;
                var buyerName = requestList[j].User;
                var requestType = requestList[j].RequestType;
                var adminManagerId = requestList[j].ManagerId;
                var adminManagerName = requestList[j].ManagerName;
               

                if (!diffUserArr.includes(UserId) && UserId != '') { diffUserArr.push(UserId); }
                if (!TotalRequestArr.includes(RequestId) && RequestId != 'Total') { 
                    TotalRequestArr.push(RequestId); 
                    if (requestType == 'NEW') {  newRequestArr.push(RequestId); }
                    if (requestType == 'APPROVED') {  approvedRequestArr.push(RequestId); }
                    if (requestType == 'DECLINED') {  declinedRequestArr.push(RequestId); }
                }

                sumTotalPriceWithOutTax = sumTotalPriceWithOutTax + Number(TotalPriceWithOutTax);
                sumTotalPriceWithTax = sumTotalPriceWithTax + Number(TotalPriceWithTax);

                singleRequestArr = [
                    RequestId,
                    AdminId,
                    EventName, 
                    EventVenue,
                    EventDateTime,
                    Section,
                    Row,
                    NoOfSeats,
                    Seats,
                    UnitPrice,
                    UnitPriceWithTax,
                    TaxPrice,
                    ProcessingFees,
                    TotalPriceWithOutTax,
                    TotalPriceWithTax,
                    UserId,
                    buyerName,
                    requestType,
                    adminManagerId,
                    adminManagerName
                ];
                requestArr.push(singleRequestArr);
            } // End if (j > 0) {
        } // End for (let i = 0; i < requestList.length; i++) {
        fs.unlink(downloadFileInS3Bucket.filePathLocal, () => {}); // delete the downloaded file from local
    } // End if (!downloadFileInS3Bucket.isError) {

    let purchaseRequestList = requests[0].purchaseRequestList;
    const workSheetColumnNames = [
        "Request Id",
        "Admin Id",
        "Event Name",
        "Venue",
        "Date",
        "Section",
        "Row",
        "No Of Seats",
        "Seats",
        "UnitPrice",
        "UnitPriceWithTax",
        "Tax Price",
        "Processing Fees",
        "Total Price",
        "Total Price With Tax",
        "User Id",
        "User",
        "RequestType",
        "ManagerId",
        "ManagerName"
    ];

    
    for (let i = 0; i < purchaseRequestList.length; i++) {
  
        var RequestId = purchaseRequestList[i]._id.toString();
        var AdminId = purchaseRequestList[i].parent.toString();
        var EventName = purchaseRequestList[i].EventName;
        var EventVenue = purchaseRequestList[i].EventVenue;
        var EventDateTime = new Date(purchaseRequestList[i].EventDateTime);
        var TaxPrice = purchaseRequestList[i].TaxPrice;
        var ProcessingFees = purchaseRequestList[i].ProcessingFees;
        var TotalPriceWithOutTax = purchaseRequestList[i].TotalPriceWithOutTax;
        var TotalPriceWithTax = purchaseRequestList[i].TotalPriceWithTax;
        var UserId = purchaseRequestList[i].UserInfo.toString();
        var buyerName = purchaseRequestList[i].buyerName;
        var requestType = purchaseRequestList[i].requestType;
        var adminManagerId = purchaseRequestList[i].adminManagerId ? purchaseRequestList[i].adminManagerId.toString() : '';
        var adminManagerName = purchaseRequestList[i].adminManagerName ? purchaseRequestList[i].adminManagerName : '';

        if (TotalRequestArr.includes(RequestId)) continue;

        if (!diffUserArr.includes(UserId)) { diffUserArr.push(UserId); }
        if (!TotalRequestArr.includes(RequestId)) { 
            TotalRequestArr.push(RequestId); 
            if (requestType == 'NEW') {  newRequestArr.push(RequestId); }
            if (requestType == 'APPROVED') {  approvedRequestArr.push(RequestId); }
            if (requestType == 'DECLINED') {  declinedRequestArr.push(RequestId); }
        }
        EventDateTime = EventDateTime.getFullYear()+'-'+(EventDateTime.getMonth()+1)+'-'+EventDateTime.getDate();
        var arrangedTicketCostDetails = purchaseRequestList[i].arrangedTicketCostDetails;        
        if (arrangedTicketCostDetails.length > 0) {
            for (let k = 0; k < arrangedTicketCostDetails.length; k++) {
                var Section = arrangedTicketCostDetails[k].Section;
                var Row = arrangedTicketCostDetails[k].Row;
                var NoOfSeats = arrangedTicketCostDetails[k].noOfTop;
                var Seats = arrangedTicketCostDetails[k].seats.join();
                var UnitPrice = arrangedTicketCostDetails[k].TicketPrice;
                var UnitPriceWithTax = arrangedTicketCostDetails[k].TotalPrice;
                totalNoOfSeat = totalNoOfSeat + Number(NoOfSeats);
                singleRequestArr = [
                    RequestId,
                    AdminId,
                    EventName, 
                    EventVenue,
                    EventDateTime,
                    Section,
                    Row,
                    NoOfSeats,
                    Seats,
                    UnitPrice,
                    UnitPriceWithTax,
                    "",
                    "",
                    "",
                    "",
                    UserId,
                    buyerName,
                    requestType,
                    adminManagerId,
                    adminManagerName
                ];
                requestArr.push(singleRequestArr); 
            }
        } else {
            var Section = "";
            var Row = "";
            var NoOfSeats = "";
            var Seats = "";
            var UnitPrice = "";
            var UnitPriceWithTax = "";
            singleRequestArr = [
                RequestId,
                AdminId,
                EventName, 
                EventVenue,
                EventDateTime,
                Section,
                Row,
                NoOfSeats,
                Seats,
                UnitPrice,
                UnitPriceWithTax,
                "",
                "",
                "",
                "",
                UserId,
                buyerName,
                requestType,
                adminManagerId,
                adminManagerName
            ];
            requestArr.push(singleRequestArr);
        }// END if (arrangedTicketCostDetails.length > 0) {

        if (i < (purchaseRequestList.length - 1)) {
            if (purchaseRequestList[i]._id != purchaseRequestList[i+1]._id) { // when new request start
                singleRequestTotalArr = [
                    "Total",
                    "",
                    "", 
                    "",
                    "",
                    "",
                    "",
                    totalNoOfSeat,
                    "",
                    "",
                    "",
                    TaxPrice,
                    ProcessingFees,
                    TotalPriceWithOutTax,
                    TotalPriceWithTax,
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
                requestArr.push(singleRequestTotalArr);
                sumTotalPriceWithOutTax = sumTotalPriceWithOutTax + Number(TotalPriceWithOutTax);
                sumTotalPriceWithTax = sumTotalPriceWithTax + Number(TotalPriceWithTax);
                totalNoOfSeat = 0;    
            } // End if (purchaseRequestList[i].RequestId != purchaseRequestList[i+1].RequestId) {     
        } // End if (i < (purchaseRequestList.length - 1)) {

        if (i == (purchaseRequestList.length - 1)) { // When last row appears
            singleRequestTotalArr = [
                "Total",
                "",
                "", 
                "",
                "",
                "",
                "",
                totalNoOfSeat,
                "",
                "",
                "",
                TaxPrice,
                ProcessingFees,
                TotalPriceWithOutTax,
                TotalPriceWithTax,
                "",
                "",
                "",
                "",
                ""
            ]
            requestArr.push(singleRequestTotalArr);
            sumTotalPriceWithOutTax = sumTotalPriceWithOutTax + Number(TotalPriceWithOutTax);
            sumTotalPriceWithTax = sumTotalPriceWithTax + Number(TotalPriceWithTax);
            totalNoOfSeat = 0;         
        } // End if (i < (purchaseRequestList.length - 1)) {
       
    } // END for (let i = 0; i < purchaseRequestList.length; i++) {

    TotalUser = Number(diffUserArr.length); // total user exist in report
    TotalRequest = Number(TotalRequestArr.length);
    TotalNewRequest = Number(newRequestArr.length);
    TotalApprovedRequest = Number(approvedRequestArr.length);
    TotalDeclinedRequest = Number(declinedRequestArr.length);
    
    firstRow = [
        "Total Request",
        TotalRequest,
        "New Request", 
        TotalNewRequest,
        "Approved Request",
        TotalApprovedRequest,
        "Declined Request",
        TotalDeclinedRequest,
        "",
        "",
        "",
        "Total Price",
        sumTotalPriceWithOutTax,
        "Total Price With Tax",
        sumTotalPriceWithTax,
        "Total User",
        TotalUser,
        "",
        "",
        ""
    ];

    return new Promise(async function (resolve, reject) { 
        let exportExcelOfMonthlyReportSingleStatus = await exportExcelOfMonthlyReportSingle(firstRow, requestArr, workSheetColumnNames, workSheetName, filePath, parent, fileName);
        resolve(exportExcelOfMonthlyReportSingleStatus);        
    });
   
} // End exports.includeRequestToMonthlyReport = (requests, filePath, parent, fileName) => {

const exportExcelOfMonthlyReportSingle = async (firstRow, data, workSheetColumnNames, workSheetName, filePath, parent, fileName) => {
    console.log("exportExcelOfMonthlyReportSingle");
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        firstRow,
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFileSync(workBook, path.resolve(filePath));
    
    return new Promise(async function (resolve, reject) { 
        let uploadFileInS3BucketStatus = await awsS3BucketHelper.uploadFileInS3Bucket(parent, filePath, fileName);
        resolve(uploadFileInS3BucketStatus);        
    });

}


//------------------------------ end update single monthly report ------------------------------------



