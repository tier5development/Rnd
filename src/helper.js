// this function used to set data to chrome storage
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

module.exports = {
    setParameter: setParameter,
    getParameter: getParameter
};