
function setParameter(params) {
    return new Promise((resolve) => {
        chrome.storage.local.set(params, function (err, data) {
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

$(document).ready(function(){
    let userDetails = {};

    chrome.storage.local.get(['value'], function(result) {
        let profileName = $("#cover-name-root").text();
        let isNickName = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(profileName);
        let nickName = "";
        let onlyProfileName = profileName.split(" (")[0];

        if (isNickName) {
            let getNickName = /\(([^)]+)\)/;
            let matches = getNickName.exec(profileName);
            nickName = matches[1];
        } else {
            nickName = 'N/A'
        }

        let current_url_1 = window.location.href.split('facebook.com/');
        let current_url_2 = current_url_1[1].split('?');

        let username = "";

        if (current_url_2[0] == "profile.php") {
            username = "N/A"
        } else {
            username = current_url_2[0]
        }

        let profile_url = "";
        let profile_id = "";
        let fbId = "";

        let i = 1;
        while(true){
            if($("div#m-timeline-cover-section a:eq("+i+")").attr("href").match("photo.php")){
                profile_url = $("div#m-timeline-cover-section a:eq(1)").attr("href").split("&");
                profile_id = profile_url[1].split("=");
                fbId = profile_id[1];
                break;
            }else{
                i++;   
            }
        }


        if (result.value === onlyProfileName || 
            (nickName === 'N/A' && result.value === nickName) ||
            (username === 'N/A' && result.value === username) ||
            result.value === fbId) {
                userDetails = {
                    "profileName": onlyProfileName,
                    "fbId": fbId,
                    "userName": username,
                    "nickName": nickName
                };
                
                let params = { 'userDetails': userDetails };
                setParameter(params);
        } else {
            window.alert("Facebook name has not matched please provide your facebook name")
            window.close();
        }

        // for id take id query string from profile pic
        // Get the value from url after 'facebook.com/' till before '?'. If it is coming as 'profile.php' then username will 'N/A' else it will display username.
        // If nickname is set then it will show with Profile name in bracket. If their will be no nick name then only profile name will show.
    });
});