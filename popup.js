var listArray = [];
function init() {
    document.getElementById("tablerows").innerHTML = "";
    if (localStorage.allTasks) {
        listArray = JSON.parse(localStorage.allTasks);
        for (var i = 0; i < listArray.length; i++) {
            prepareTableCell(i, listArray[i].name, listArray[i].category);
        }
    }
}
//When add product button clicked
document.querySelector(".button").addEventListener("click", function () {
    document.querySelector(".container").style.display = "block";
    var div = document.getElementById("main");
    div.style.display = "block";
});
//when submit button clicked
document.querySelector(".submit").addEventListener("click", function () {
    var pName = document.getElementById("name").value;
    var pCategory = document.getElementById("category").value;
    var listObj = { name: pName, category: pCategory };
    if (selectedIndex === -1) {
        listArray.push(listObj);
    } else {
        listArray.splice(selectedIndex, 1, listObj);
    }
    localStorage.allTasks = JSON.stringify(listArray);
    init();
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    var div = document.getElementById("main");
    div.style.display = "none";
});
function prepareTableCell(index, pName, pCategory) {
    var table = document.getElementById("tablerows");
    var row = table.insertRow();
    var pNameCell = row.insertCell(0);
    var pCategoryCell = row.insertCell(1);
    var actionCell = row.insertCell(2);

    pNameCell.innerHTML = pName;
    pCategoryCell.innerHTML = pCategory;
    actionCell.innerHTML = '<button id="sam" class="onEdit(' + index + ')">Edit</button><button id="magic" class="deleteTableRow(' + index + ')" >Delete</button>';
}

var tar = document.getElementById("magic");
if (tar) {
    tar.addEventListener(
        "click",
        function (index) {
            listArray.splice(index, 1);
            localStorage.allTasks = JSON.stringify(listArray);
            init();
            console.log("hii");
        },
        false
    );
}
//  function deleteTableRow(index){
//    listArray.splice(index,1);
//    localStorage.allTasks=JSON.stringify(listArray);
//    init();

var selectedIndex = -1;
// document.querySelector(".onEdit('+index+')").addEventListener("click" , function(index) {
//     index.preventDefault()
// function onEdit(index){
var rar = document.getElementById("sam");
if (rar) {
    tar.addEventListener(
        "click",
        function (index) {
            console.log("hii");
            selectedIndex = index;
            var listObj = listArray[index];
            document.getElementById("name").value = listObj.name;
            document.getElementById("category").value = listObj.category;
            var div = document.getElementById("main");
            div.style.display = "block";
            document.getElementById("submit").innerHTML = "Update";
            init();
        },
        false
    );
}

//  window.onclick=function(event){
//      var target= event.target;
//      if(target.matches('.deleteTableRow')){
//         //  var deleteEle=document.activeElement.id;
//         //  var ele=document.getElementById(deleteEle);
//         // alert(ele.txt);
//         listArray.splice(index,1);
//            localStorage.allTasks=JSON.stringify(listArray);
//            init();
//      }
//  }
