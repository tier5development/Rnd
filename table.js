const tblBody = document.getElementById("tblBody");

chrome.storage.local.get(["payload"], function ({payload}) {
    payload.forEach(({id, name, url}) => {
      const htmlElem = `<tr>
                        <td><div>${id} </div> <button id="${id}" onClick="removeId()">Delete</button></td>
                        <td><div>${name} </div> <button id="${name}" onClick="removeId()">Delete</button></td>
                        <td><div>${url} </div> <button id="${url}" onClick="removeId()">Delete</button></td>
                        </tr>`;
      tblBody.innerHTML = htmlElem;
    });
    // payload.forEach(({id, name, url}) => {
    //   const idOfElement = document.getElementById(`"${id}"`);
    //   console.log("id of element :::: ", idOfElement);
    // })
});


document.getElementById(`"${payload.id}"`).addEventListener("click", function(){
  console.log("bndjiashjidchji");
})