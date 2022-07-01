let groupIdContainerString = document.querySelector('a[href*="/photo.php?"]').href;
groupIdContainerString = groupIdContainerString.split("&id=")[1].split("&")[0];

console.log("groupIdContainerString -> ", groupIdContainerString);

let name  = document.querySelector('div[data-sigil="timeline-cover"]').querySelector('h3').innerHTML;
let url = window.location.href;
let userName = url.split("?")[0].split("/")[3];

chrome.storage.local.get(['value'], function(result) {
    const value = result.value;
    if(groupIdContainerString === value || name === value || userName === value ){
        const dataObj = {
            "Name":name,
            "URL": userName,
            "Id": groupIdContainerString
        }
        chrome.storage.local.set({"payload": dataObj}, function(res) {
    
            console.log('Value is set to ' + res);
        });
    }
    else{
        window.alert("The name doesn't match, please provide the correct facebook name");
    }
});