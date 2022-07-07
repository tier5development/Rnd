
// this function used to get data from chrome storage
function getParameter(keyArr) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keyArr, function (data) {
            resolve({
                'data': data
            })  
      });
    });
}

function setParameter(keyObj) {
    return new Promise((resolve) => {
        chrome.storage.local.set(keyObj, function (err, data) {
            if (err) {
                resolve({
                    'isError': true
                })
            } else {
                resolve({
                    'isError': false
                })
            }    
        });
    });
}


$(document).ready(async function(){

    var keyArr = ['fbName'];
    var resultStatus = await getParameter(keyArr);

    const enteredValue = resultStatus.data.fbName;
    const profileUrl = window.location.href;

    let userName = profileUrl.split("?")[0].split("/")[3];
    let scrappedProfileName = $("#cover-name-root").text();

    let scrappedProfileNameArr = scrappedProfileName.split("(");
    console.log("scrappedProfileNameArr", scrappedProfileNameArr);

    let onlyProfileName = scrappedProfileNameArr[0] ? scrappedProfileNameArr[0].trim() : "NA"; 
    let nickName = scrappedProfileNameArr[1] ? scrappedProfileNameArr[1].replace(')', '').trim() : "NA";

    if (userName == 'profile.php') {
        userName = "NA";
    }

    const dataSigil = $('div[data-sigil="timeline-cover"]').find('a[href^="/photo.php?"]').attr('href');
    const faceBookId = dataSigil.split('&id=')[1].split('&')[0];

    if (!(enteredValue == onlyProfileName || enteredValue == userName || enteredValue == faceBookId || enteredValue == nickName)) {
        alert("You have given wrong information");
        return;
    }

    let userDetails = {
        "profileName": onlyProfileName ? onlyProfileName : '',
        "faceBookId": faceBookId ? faceBookId : '',
        "userName": userName ? userName : '',
        "nickName": nickName ? nickName : ''
    };

    var keyObj = { 'userDetails': userDetails };
    await setParameter(keyObj);

    console.log("faceBookId", faceBookId);
});