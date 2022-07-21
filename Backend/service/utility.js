// const config = require('../../../config/development.json');
const config = require('../config/development.json');


// This function is used to get the event url of an event from ticket master site
exports.getEventUrl = (WindowURL = "", sourceType) => {
    try {
        if (WindowURL == "") {
            let EventUrl = "";
            return EventUrl;
        }
    
        if (sourceType == "CUSTOMFORM") {
            let EventUrl = WindowURL;
            return EventUrl;
        }
    
        const TicketMasterSiteUrl = config.ticketmaster_site_url;
        const WindowURLArr = WindowURL.split("/");
        const eventName = WindowURLArr[3].split("2F")[3].split("%")[0];
        const eventId = WindowURLArr[3].split("2F")[5].split("&")[0];
        let EventUrl = TicketMasterSiteUrl+eventName+"/event/"+eventId;
    
        return EventUrl;
    } catch {
        let EventUrl = "";
        return EventUrl;
    }
    
}

// This function is used to get the timestamp from date
exports.getTimeStampFromDate = (date) => {
    let TimeStamp = new Date(date).getTime(); 
    let newDate = new Date(TimeStamp);
    let nextDayTimeStamp = Number(TimeStamp) + Number(24*60*60*1000);
    let nextDayDate = new Date(nextDayTimeStamp);
    
    return {
        TimeStamp: TimeStamp,
        nextDayTimeStamp: nextDayTimeStamp
    };
}


// This function is used to generate alphanumeric number
exports.getRandomString = (length) => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}


// This function is used to rearrange the purchase request
exports.rearrangePurchaseRequest = (items) => {
    let arrangedRequest = rearrangePurchaseRequest1([], items, 1);
    // console.log("arrangedRequest", arrangedRequest.arrangedRequestArr);
    return arrangedRequest
}

const rearrangePurchaseRequest1 = (arrangedRequestArr, items, iteration) => {
   
    let top = items[0];
    let ItemsExceptTop = remainingArr(items);
    let resultArr = getRefinedData(top, ItemsExceptTop);
    arrangedRequestArr.push(resultArr.top)
    if (resultArr.remainArr.length == 0) {
        return {
            arrangedRequestArr: arrangedRequestArr,
            remainArr: []
        }
    } else {
        
        return rearrangePurchaseRequest1(arrangedRequestArr, resultArr.remainArr, iteration+1)
    }
    
}

const getRefinedData = (top, arr = []) => {
    // let noOfTop = 1;

    let noOfTop = top.noOfTop;
    let seats = [];
    seats.push(top.Seat)
    let remainArr = [];
    for (let i = 0; i < arr.length; i++) {    
        if (arr[i].Section == top.Section 
            && arr[i].Row == top.Row) {
                // noOfTop++;
                noOfTop = noOfTop + arr[i].noOfTop;
                seats.push(arr[i].Seat)
        } else {
            remainArr.push(arr[i])
        }         
    } // for (let i = 0; i < items.length; i++) {
    top = {
        ...top,
        noOfTop: noOfTop,
        seats: seats
    }
    
    return {
        top: top,
        remainArr: remainArr
    }
}

const remainingArr = (items = []) => {
    let remainingArr = []
    for (let i = 1; i < items.length; i++) {         
        remainingArr.push(items[i])
    } // for (let i = 0; i < items.length; i++) {
    return remainingArr;
}

// This function is used to get last day of the month
exports.getLastDateOfMonth = (month, year) => {
    var lastDate = 31;
    var month = Number(month);
    var year = Number(year);

    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) { lastDate = 31; }
    if (month == 4 || month == 6 || month == 9 || month == 11) { lastDate = 30; }
    if (month == 2) { 
        let reminder = year % 4;
        if (reminder == 0) {
            lastDate = 29; 
        } else {
            lastDate = 28; 
        }
        
    }

    return lastDate;
}

exports.isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

exports.getEventIdFromWindowUrl = (obj) => {
    let WindowURL = obj.WindowURL;
    let sourceType = obj.sourceType;
    if (sourceType == 'TICKETMASTER') {
        var EventId = 'NA';
    } else {
        var EventId = 'NA';
    }
    EventId = WindowURL;
    return EventId;
}




