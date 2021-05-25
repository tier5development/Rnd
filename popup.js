var listArray=[];
function init(){
   document.getElementById("tablerows").innerHTML="";
   if (localStorage.allTasks){
       listArray=JSON.parse(localStorage.allTasks);
       for(var i=0; i<listArray.length;i++ ){
           prepareTableCell(i,listArray[i].name,listArray[i].category)
       }  
   }
}
//When add product button clicked
document.querySelector(".button").addEventListener("click" , function() {
    document.querySelector(".container").style.display='block';
    var div = document.getElementById("main");
    div.style.display = "block";
})
//when submit button clicked
document.querySelector(".submit").addEventListener("click" , function() {
    var pName= document.getElementById("name").value;
    var pCategory= document.getElementById("category").value;
    var listObj={name:pName,category:pCategory}
       if(selectedIndex===-1){
           listArray.push(listObj);
       }else{
           listArray.splice(selectedIndex,1,listObj);
       }
       localStorage.allTasks=JSON.stringify(listArray);
       init();
       document.getElementById("name").value="";
       document.getElementById("category").value="";
    var div = document.getElementById("main");
    div.style.display = "none";
})
function prepareTableCell(index,pName,pCategory){
   var table=document.getElementById("tablerows");
   var row=table.insertRow();
   var pNameCell=row.insertCell(0);
   var pCategoryCell=row.insertCell(1);
   var actionCell=row.insertCell(2);

   pNameCell.innerHTML=pName;
   pCategoryCell.innerHTML=pCategory;
   actionCell.innerHTML='<button class="onEdit"('+index+')>Edit</button><button class="deleteTableRow"('+index+')>Delete</button>';

}
function deleteTableRow(index){
   listArray.splice(index,1);
   localStorage.allTasks=JSON.stringify(listArray);
   init(); 
}
var selectedIndex=-1;
document.querySelector(".onEdit").addEventListener("click" , function(index) {
// function onEdit(index){
   selectedIndex=index;
   var listObj=listArray[index];
   document.getElementById("name").value=listObj.name;
   document.getElementById("category").value=listObj.category;
    var div = document.getElementById("main");
    div.style.display = "block";
    document.getElementById("submit").innerHTML="Update";
    init();
})



// var form = document.querySelector("#form");
// form.addEventListener("submit" , function(event) {
//     event.preventDefault()
//     var username=parseInt(document.querySelector("#username").value);
//     console.log(username)

//     // send message from popup to content
//     chrome.tabs.query( { active : true, currentWindow : true }, function (tabs) {
//         chrome.tabs.executeScript(tabs[0].id, { file : "content.js"},
//         function(){
//             chrome.tabs.sendMessage(tabs[0].id, {
//                 number : username
//             })
//         })
//     })

// });



// const sendRequest = (data) => {
//     try {
        
//     }
//     catch(ext) {
//         alert("please reload ");
//     }
// }