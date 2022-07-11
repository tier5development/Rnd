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

      if (userDetails.nickName) {
        tableStr += '<tr><td>Nick Name: </td><td>'+userDetails.nickName+'</td><td><button id="nickName">Delete</button></td></tr>'; 
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
  let text = "Do you want to delete profile name?";
  if (!confirm(text)) {
    return;
  }
  let resultStatus = await getParameter(['userDetails']);

  let userDetails = {};

  if (resultStatus.data.userDetails.faceBookId) {
    userDetails.faceBookId = resultStatus.data.userDetails.faceBookId;
  }

  if (resultStatus.data.userDetails.nickName) {
    userDetails.nickName = resultStatus.data.userDetails.nickName;
  }

  if (resultStatus.data.userDetails.userName) {
    userDetails.userName = resultStatus.data.userDetails.userName;
  }

  await setParameter({ 'userDetails': userDetails });
  showTable();
});

$('body').on('click', '#faceBookId', async function () {
  let text = "Do you want to delete FaceBook Id?";
  if (!confirm(text)) {
    return;
  }
  let resultStatus = await getParameter(['userDetails']);

  let userDetails = {}

  if (resultStatus.data.userDetails.profileName) {
    userDetails.profileName = resultStatus.data.userDetails.profileName;
  }

  if (resultStatus.data.userDetails.nickName) {
    userDetails.nickName = resultStatus.data.userDetails.nickName;
  }

  if (resultStatus.data.userDetails.faceBookId) {
    userDetails.userName = resultStatus.data.userDetails.userName;
  }

  await setParameter({ 'userDetails': userDetails });

  showTable();
});

$('body').on('click', '#userName', async function () {
  let text = "Do you want to delete username?";
  if (!confirm(text)) {
    return;
  }
  let resultStatus = await getParameter(['userDetails']);

  let userDetails = {}

  if (resultStatus.data.userDetails.profileName) {
    userDetails.profileName = resultStatus.data.userDetails.profileName;
  }

  if (resultStatus.data.userDetails.nickName) {
    userDetails.nickName = resultStatus.data.userDetails.nickName;
  }

  if (resultStatus.data.userDetails.faceBookId) {
    userDetails.faceBookId = resultStatus.data.userDetails.faceBookId;
  }

  var keyObj = { 'userDetails': userDetails };
  await setParameter(keyObj);

  showTable();
});

$('body').on('click', '#nickName', async function () {
  let text = "Do you want to delete nickName?";
  if (!confirm(text)) {
    return;
  }
  let resultStatus = await getParameter(['userDetails']);

  let userDetails = {}

  if (resultStatus.data.userDetails.profileName) {
    userDetails.profileName = resultStatus.data.userDetails.profileName;
  }

  if (resultStatus.data.userDetails.userName) {
    userDetails.userName = resultStatus.data.userDetails.userName;
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
