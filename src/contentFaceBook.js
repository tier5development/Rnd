
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


$(document).ready(async function(){

    const keyArr = ['fbName'];
    const resultStatus = await getParameter(keyArr);

    const profileName = resultStatus.data.fbName;
    const profileUrl = window.location.href;

    console.log("profileUrl", profileUrl);

    const userName = profileUrl.split("?")[0].split("/")[3];
    
    // Here, we checking if the profile name is authentic or not
    const userNameArr = userName.split(".");
    const profileNameArr = profileName.split(" ");

    let isMismatched = false; // this tag determine whether the user authentic or not
    for (let i = 0; i < profileNameArr.length; i++) {
        console.log("vvv",userNameArr.includes(profileNameArr[i].toLowerCase()))
        if (!userNameArr.includes(profileNameArr[i].toLowerCase())) {
            isMismatched = true;
            break;
        }
    }

    if (isMismatched) {
        alert("You have given wrong profile name");
        return;
    }



});