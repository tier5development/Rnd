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

async function showTable () {
    let resultStatus = await getParameter(['userDetails']);
    let userDetails = resultStatus.data.userDetails ? {...resultStatus.data.userDetails} : {};
    if (userDetails != '' && Object.keys(resultStatus.data.userDetails).length != 0) {
      let tableStr = '<table border="1"><thead><tr><th>Entity</th><th>Value</th><th>Action</th></tr></thead>';  
      if (userDetails.profileName) {
        tableStr += '<tr><td>Profile Name: </td><td>'+userDetails.profileName+'</td><td><button id="profileName">Delete</button></td></tr>'; 
      }
      
      if (userDetails.faceBookId) {
        tableStr += '<tr><td>Profile Name: </td><td>'+userDetails.faceBookId+'</td><td><button id="faceBookId">Delete</button></td></tr>'; 
      }

      if (userDetails.userName) {
        tableStr += '<tr><td>Profile Name: </td><td>'+userDetails.userName+'</td><td><button id="userName">Delete</button></td></tr>'; 
      }

      tableStr += '</table>';
      $("#tableStr").html(tableStr); 
    } else {
      location.href = 'popup.html';
    }
}

async function populateTable () {
  let resultStatus = await getParameter(['userDetails']);
  if (resultStatus.data.userDetails && Object.keys(resultStatus.data.userDetails).length != 0) {
    showTable();  
  }
}



$('body').on('click', '#profileName', async function () {
  let resultStatus = await getParameter(['userDetails']);

  let userDetails = {}

  if (resultStatus.data.userDetails.faceBookId) {
    userDetails.faceBookId = resultStatus.data.userDetails.faceBookId;
  }

  if (resultStatus.data.userDetails.userName) {
    userDetails.userName = resultStatus.data.userDetails.userName;
  }

  var keyObj = { 'userDetails': userDetails };
  await setParameter(keyObj);

  showTable();
});

$('body').on('click', '#faceBookId', async function () {
  let resultStatus = await getParameter(['userDetails']);

  let userDetails = {}

  if (resultStatus.data.userDetails.profileName) {
    userDetails.profileName = resultStatus.data.userDetails.profileName;
  }

  if (resultStatus.data.userDetails.faceBookId) {
    userDetails.userName = resultStatus.data.userDetails.userName;
  }

  await setParameter({ 'userDetails': userDetails });

  showTable();
});

$('body').on('click', '#userName', async function () {
  let resultStatus = await getParameter(['userDetails']);

  let userDetails = {}

  if (resultStatus.data.userDetails.profileName) {
    userDetails.profileName = resultStatus.data.userDetails.profileName;
  }

  if (resultStatus.data.userDetails.faceBookId) {
    userDetails.faceBookId = resultStatus.data.userDetails.faceBookId;
  }

  var keyObj = { 'userDetails': userDetails };
  await setParameter(keyObj);

  showTable();
});



$("#submitBtn").click(async function(){
    const fbName = $("#fbName").val();
    console.log(fbName);

    var keyObj = { 'fbName': fbName };
    var resultStatus = await setParameter(keyObj);

    const profileUrl = 'https://m.facebook.com/me/';
    window.open(profileUrl, '_blank')
});



$(document).ready(async function(){
 
  let {data} = await getParameter(['userDetails']);
  
  if(!location.href.includes('userDetail.html') && Object.keys(data.userDetails).length != 0){
    location.href='./userDetail.html'
  }
  if(location.href.includes('userDetail.html')){
    populateTable()
  }
});
