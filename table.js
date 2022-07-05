const tblBody = document.getElementById("tblBody");
const tblHead = document.getElementById("tblHead");
console.log(tblHead);
// function renderHtml(){
chrome.storage.local.get(["payload"], function ({ payload }) {
  console.log("payload data top:::", payload);
  console.log("dataaaaaaaa:::", payload.id, payload.name, payload.url);
  // appendTableHead();
  appendTableBody(payload);

  //Removing the user id
  // document.querySelector("button")
  // .addEventListener("click", function (e) {
  //   e.preventDefault();
  //   console.log("value of event", e);
  //   console.log("working or not");
  //   let items = chrome.storage.local.get(["payload"]);
  //   console.log("data contains in items", items);
  //   console.log("value of payload", payload);
  //   // console.log(keyArr);
  //   keyIdRemove("id", payload);
  //   if (payload.id == undefined)
  //     document.getElementById("idData").style.display = "none";
  // });
  //Removing the user name
  // document.getElementById("userName")
  // .addEventListener("click", function () {
  //   console.log("working or not");
  //   let items = chrome.storage.local.get(["payload"]);
  //   console.log("data contains in items", items);
  //   console.log("value of payload", payload);
  //   // console.log(keyArr);
  //   keyIdRemove("name", payload);
  //   if (payload.name == undefined)
  //     document.getElementById("nameData").style.display = "none";
  // });

  //Removing the user url
  // document.querySelector(".deleteBtn").addEventListener("click", function(e) {
  //   e.preventDefault();
  //   console.log("latest value of ee", e);
  // })

  //remove function
  // function keyIdRemove(param, payload) {
  //   let keyArr = Object.keys(payload);
  //   let obj = {};
  //   keyArr.forEach((key) => {
  //     if (key != param) {
  //       obj[key] = payload[key];
  //     }
  //   });
  //   console.log("object value:::", obj);
  //   chrome.storage.local.set({ payload: obj }, function () {
  //     console.log("Value is set to " + obj);
  //   });
  // }
});
// }

function appendTableBody(payload) {
  let tbody = "";
  let trHtml = "";
  const keys = Object.keys(payload);
  console.log("keys value:::", keys);
  keys.forEach((key) => {
    trHtml += `<th>${key}</th>`;

    tbody += `<td id="idData">${payload[key]}<button class="deleteBtn" id="${payload[key]}">Delete</button></td>`;
  });
  tblHead.innerHTML = trHtml;
  tblBody.innerHTML = tbody;

  document.querySelectorAll(".deleteBtn").forEach((btns) => {
    btns.addEventListener("click", function (e) {
      console.log("getting click or not");
      const obj = {};
      keys.forEach((key) => {
        if (payload[key] != e.srcElement.id) {
          obj[key] = payload[key];
        }
        console.log("value of obj 12122:::", obj);
        chrome.storage.local.set({ payload: obj }, function () {
          console.log("Value is set to " + obj);
          appendTableBody(payload);
        });
      });
    });
  });
}

/*

function appendChild(payload){
  let th="";
  let td="";

  const keys=Object.keys(payload);
  keys.forEach(key=>{
    th += `<th>${key}</th>`
  })

}

*/
