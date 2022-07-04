const tblBody = document.getElementById("tblBody");
const tblHead = document.getElementById("tblHead");

// function renderHtml(){
chrome.storage.local.get(["payload"], function ({ payload }) {
  console.log("dataaaaaaaa:::", payload.id, payload.name, payload.url);
  const arr = ["ID", "NAME", "URL"]
  let trHtml = "";
  arr.forEach((key) => {
    trHtml = `<tr>
  <th>${key}</th>
  </tr>`;
    tblHead.innerHTML = trHtml;
  });
  const htmlElem = `<tr>
                        <td id="idData">${payload.id}<button id="userId">Delete</button></td>
                        <td id="nameData">${payload.name}<button id="userName">Delete</button></td>
                        <td id="urlData">${payload.url}<button id="userUrl">Delete</button></td>
                        </tr>`;
  tblBody.innerHTML = htmlElem;

  //Removing the user id
  document.getElementById("userId").addEventListener("click", function () {
    console.log("working or not");
    let items = chrome.storage.local.get(["payload"]);
    console.log("data contains in items", items);
    console.log("value of payload", payload);
    // console.log(keyArr);
    keyIdRemove("id", payload);
    if (payload.id == undefined)
      document.getElementById("idData").style.display = "none";
  });
  //Removing the user name
  document.getElementById("userName").addEventListener("click", function () {
    console.log("working or not");
    let items = chrome.storage.local.get(["payload"]);
    console.log("data contains in items", items);
    console.log("value of payload", payload);
    // console.log(keyArr);
    keyIdRemove("name", payload);
    if (payload.name == undefined)
      document.getElementById("nameData").style.display = "none";
  });

  //Removing the user url
  document.getElementById("userUrl").addEventListener("click", function () {
    console.log("working or not");
    let items = chrome.storage.local.get(["payload"]);
    console.log("data contains in items", items);
    console.log("value of payload", payload);
    // console.log(keyArr);
    keyIdRemove("url", payload);
    if (payload.url == undefined)
      document.getElementById("urlData").style.display = "none";
  });

  //remove function
  function keyIdRemove(param, payload) {
    let keyArr = Object.keys(payload);
    let obj = {};
    keyArr.forEach((key) => {
      if (key != param) {
        obj[key] = payload[key];
      }
    });
    console.log("object value:::", obj);
    chrome.storage.local.set({ payload: obj }, function () {
      console.log("Value is set to " + obj);
    });
  }
});
// }
