// Urls Of Apis
const addContentUrl = "http://localhost:8000/api/user/add-content";
const getContentUrl = "http://localhost:8000/api/user/get-contents";
const loginUrl = "http://localhost:8000/api/user/login";
const registerUrl = "http://localhost:8000/api/user/register";

// this function used to set data to chrome storage
function setParameter(keyObj) {
  return new Promise((resolve) => {
    chrome.storage.local.set(keyObj, function (err, data) {
      if (err) {
        resolve({
          isError: true,
        });
      } else {
        resolve({
          isError: false,
        });
      }
    });
  });
}

// this function used to get data from chrome storage
function getParameter(keyArr) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keyArr, function (data) {
      resolve({
        data: data,
      });
    });
  });
}

//----------------Calling backend Apis--------------------------------
const handleRequest = async (path, bodyData, methodType = "post") => {
  let getWithCredentialHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  };

  let resData = await fetch(path, {
    method: methodType,
    headers: getWithCredentialHeader,
    body: JSON.stringify(bodyData),
  });

  return resData.json().then((data) => {
    return data;
  });
};

// Here, We appending the input field to add new content
const appendInputDiv = async (firstElement, tagType) => {
  $(firstElement).css("color", "red");
  $(firstElement).append(
    `<div id='appendedDiv'>
  <br><input type='text' id='newContent' value='` +
      firstElement.text() +
      `' name='newContent'>
  <input type='hidden' id='oldContent' value='` +
      firstElement.text() +
      `' name='oldContent'>
  <input type='hidden' id='tagType' value='` +
      tagType +
      `' name='tagType'>
  <button id='saveNewStr'>Save</button>
  <button id='cancelNewStr'>Cancel</button></div>`
  );
};


//======================================================================

