        console.log("hcvhsui");
        let groupIdContainerString = document.querySelector('a[href*="/photo.php?"]').href;
        groupIdContainerString = groupIdContainerString.split("&id=")[1].split("&")[0];
        console.log("groupIdContainerString ::: ", groupIdContainerString);
        let name  = document.querySelector('div[data-sigil="timeline-cover"]').querySelector('h3').innerHTML;
        // console.log("name :::", name);
        let Url = window.location.href;
        let userName = Url.split("?")[0].split("/")[3];

        chrome.storage.local.get(['value'], function(result) {
            console.log('Value currently is ' + result.value);
            const value = result.value;
            if(groupIdContainerString === value || name === value || userName === value ){
                // const arr = []
                // window.alert(groupIdContainerString);
                const dataObj = {
                    "name":name,
                    "url": userName,
                    "id": groupIdContainerString
                }
                // arr.push(dataObj)
                console.log("array data", dataObj);
                chrome.storage.local.set({payload: dataObj}, function() {
            
                    console.log('Value is set to ' + JSON.stringify(dataObj));
                  });
                

            }
            else{
                window.alert("facebook name has not matched please provide your facebook name")
            }
          });

