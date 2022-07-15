
function setValues(params) {
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

function getValues(params) {
    return new Promise((resolve) => {
      chrome.storage.local.get(params, function (data) {
            resolve({
                'data': data
            })  
      });
    });
}

async function showTable () {
    let details = await getValues(['userDetails']);
    let userDetails = details.data.userDetails;

    if (userDetails !== undefined && userDetails != '' && Object.keys(details.data.userDetails).length != 0) {
        let table = '<table border="1"><thead><tr><th>Name</th><th>Value</th><th>Action</th></tr></thead>';  
        if (userDetails.profileName) {
          table += '<tr><td>Profile Name: </td><td>'+userDetails.profileName+'</td><td><button id="profileName">Delete</button></td></tr>'; 
        }
        
        if (userDetails.fbId) {
          table += '<tr><td>FB Id: </td><td>'+userDetails.fbId+'</td><td><button id="fbId">Delete</button></td></tr>'; 
        }
  
        if (userDetails.nickName) {
          table += '<tr><td>Nick Name: </td><td>'+userDetails.nickName+'</td><td><button id="nickName">Delete</button></td></tr>'; 
        }
  
        if (userDetails.userName) {
          table += '<tr><td>User Name: </td><td>'+userDetails.userName+'</td><td><button id="userName">Delete</button></td></tr>'; 
        }
  
        table += '</table>';
        $("#changeContent").html(table); 
    } else {
        let input = '<input type="text" id="fb_id" name="fb_id" placeholder="Please provide input"><br><br><input type="submit" id="submit" name="submit"></input>';
        $("#changeContent").html(input);
    }
}


$(function () {
    showTable ();

    $(document).on("click", "#profileName", async function() {
        let text = "Do you want to delete profile name?";
        if (!confirm(text)) {
            return;
        }
        let userDetails = {};

        let details = await getValues(['userDetails']);

        if (details.data.userDetails.fbId) {
            userDetails.fbId = details.data.userDetails.fbId;
        }
    
        if (details.data.userDetails.nickName) {
            userDetails.nickName = details.data.userDetails.nickName;
        }
    
        if (details.data.userDetails.userName) {
            userDetails.userName = details.data.userDetails.userName;
        }

        var params = { 'userDetails': userDetails };
        setValues(params);

        showTable();
    })

    $(document).on("click", "#fbId", async function() {
        let text = "Do you want to delete facebook Id?";
        if (!confirm(text)) {
            return;
        }
        let userDetails = {};

        let details = await getValues(['userDetails']);
        if (details.data.userDetails.profileName) {
            userDetails.profileName = details.data.userDetails.profileName;
        }
    
        if (details.data.userDetails.nickName) {
            userDetails.nickName = details.data.userDetails.nickName;
        }
    
        if (details.data.userDetails.userName) {
            userDetails.userName = details.data.userDetails.userName;
        }

        var params = { 'userDetails': userDetails };
        setValues(params);

        showTable();
    })

    $(document).on("click", "#nickName", async function() {
        let text = "Do you want to delete nick name?";
        if (!confirm(text)) {
            return;
        }
        let userDetails = {};

        let details = await getValues(['userDetails']);

        if (details.data.userDetails.profileName) {
            userDetails.profileName = details.data.userDetails.profileName;
        }
    
        if (details.data.userDetails.fbId) {
            userDetails.fbId = details.data.userDetails.fbId;
        }
    
        if (details.data.userDetails.userName) {
            userDetails.userName = details.data.userDetails.userName;
        }

        var params = { 'userDetails': userDetails };
        setValues(params);

        showTable();
    })

    $(document).on("click", "#userName", async function() {
        let text = "Do you want to delete user name?";
        if (!confirm(text)) {
            return;
        }
        let userDetails = {};

        let details = await getValues(['userDetails']);

        if (details.data.userDetails.profileName) {
            userDetails.profileName = details.data.userDetails.profileName;
        }
    
        if (details.data.userDetails.fbId) {
            userDetails.fbId = details.data.userDetails.fbId;
        }
    
        if (details.data.userDetails.nickName) {
            userDetails.nickName = details.data.userDetails.nickName;
        }

        var params = { 'userDetails': userDetails };
        setValues(params);

        showTable();
    })

    $(document).on("click", "#submit", function() {
        const fb_id = $("#fb_id").val().trim();
        if(fb_id == ""){
            window.alert("Please enter facebook name")
        }
        else{
            window.open('https://m.facebook.com/me/')
            chrome.storage.local.set({"value": fb_id}, function(res) {
    
                console.log('Value is set to ' + res);
            });
        }
    })  
})