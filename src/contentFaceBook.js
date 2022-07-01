
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

    const userName = profileUrl.split("?")[0].split("/")[3];
    const scrappedProfileName = $("#cover-name-root").text();

    const dataSigil = $('div[data-sigil="timeline-cover"]').find('a[href^="/photo.php?"]').attr('href');
    const faceBookId = dataSigil.split('&id=')[1].split('&')[0];

    if (!(enteredValue == scrappedProfileName || enteredValue == userName || enteredValue == faceBookId)) {
        alert("You have given wrong information");
        return;
    }

    let userDetails = {
        "profileName": scrappedProfileName ? scrappedProfileName : '',
        "faceBookId": faceBookId ? faceBookId : '',
        "userName": userName ? userName : ''
    };

    var keyObj = { 'userDetails': userDetails };
    await setParameter(keyObj);

    console.log("faceBookId", faceBookId);
});