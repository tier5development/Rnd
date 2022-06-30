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


$("#submitBtn").click(async function(){
    const fbName = $("#fbName").val();
    console.log(fbName);

    var keyObj = { 'fbName': fbName };
    var resultStatus = await setParameter(keyObj);

    const profileUrl = 'https://m.facebook.com/me/';

    // https://m.facebook.com/ankur.bardhan.3
    window.open(profileUrl, '_blank')
});
