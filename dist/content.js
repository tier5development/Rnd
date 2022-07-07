
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
        let isNickName = /\([\d]+\)/.test(profileName);
        let nickName = "";

        if (isNickName) {
            let getNickName = /\(([^)]+)\)/;
            let matches = getNickName.exec("Vishal Shaw (Example)");
            nickName = matches[1];
            
            let newProfileName = profileName.split(matches[0]);

            profileName = newProfileName.trim();
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

        let profile_url = $("div#m-timeline-cover-section a:eq(1)").attr("href").split("&");
        let profile_id = profile_url[1].split("=")
        let fbId = profile_id[1]

        if (result.value === profileName || 
            (nickName === 'N/A' && result.value === nickName) ||
            (username === 'N/A' && result.value === username) ||
            result.value === fbId) {
        } else {
            window.alert("Facebook name has not matched please provide your facebook name")
            window.close();
        }

        // for id take id query string from profile pic
        // Get the value from url after 'facebook.com/' till before '?'. If it is coming as 'profile.php' then username will 'N/A' else it will display username.
        // If nickname is set then it will show with Profile name in bracket. If their will be no nick name then only profile name will show.

        userDetails = {
            "profileName": profileName,
            "fbId": fbId,
            "userName": username,
            "nickName": nickName
        };
        
        let params = { 'userDetails': userDetails };
        setParameter(params);
    });
});