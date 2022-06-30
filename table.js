let fetchData = chrome.storage.local.get(['payload'], function(result) {
    console.log('Value currently is ' + result.payload);
  });

let payload = JSON.parse(fetchData);
console.log("employeeData ::::::::::::: ", fetchData);


