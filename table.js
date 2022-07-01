const tblBody = document.getElementById("tblBody");
const fid = document.getElementById("id");
const fname = document.getElementById("name");
const furl = document.getElementById("url")

chrome.storage.local.get(["payload"], function ({payload}) {
    payload.forEach(({id, name, url}) => {
      // const htmlElem = `<tr>
      //                   <td><div>${id} </div> <button id="userId" onClick="removeId(event)">Delete</button></td>
      //                   <td><div>${name} </div> <button id="userName" onClick="removeName()">Delete</button></td>
      //                   <td><div>${url} </div> <button id="userUrl" onClick="removeUrl()">Delete</button></td>
      //                   </tr>`;
      // const row = tblBody.insertRow();
      // row.insertCell(0).innerHTML = id + `<button id="userId" onClick=removeId(event)>DeleteId</button>`;
      // row.insertCell(1).innerHTML =name + `<button id="userName" onClick=removeName()>Delete</button>`; 
      // row.insertCell(2).innerHTML = url + `<button id="userUrl" onClick=removeUrl()>Delete</button>`; 
      // tblBody.innerHTML = row;
      fid.innerHTML = id;
      fname.innerHTML = name;
      furl.innerHTML = url

    });
    // payload.forEach(({id, name, url}) => {
    //   const idOfElement = document.getElementById(`"${id}"`);
    //   console.log("id of element :::: ", idOfElement);
    // })
});


const removeId = (e) => {
  e.preventDefault();
  console.log("working");
}