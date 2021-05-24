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
function showhide() {
    var div = document.getElementById("main");
    div.style.display = "block";
}
function onSubmit(){
    var div = document.getElementById("main");
    div.style.display = "none";
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
}

function prepareTableCell(index,pName,pCategory){
   var table=document.getElementById("tablerows");
   var row=table.insertRow();
   var pNameCell=row.insertCell(0);
   var pCategoryCell=row.insertCell(1);
   var actionCell=row.insertCell(2);

   pNameCell.innerHTML=pName;
   pCategoryCell.innerHTML=pCategory;
   actionCell.innerHTML='<button onclick="onEdit('+index+')"class="btn-success">Edit</button><button onclick="deleteTableRow('+index+')"class="btn-danger">Delete</button>';

}
function deleteTableRow(index){
   listArray.splice(index,1);
   localStorage.allTasks=JSON.stringify(listArray);
   init(); 
}
var selectedIndex=-1;
function onEdit(index){
   selectedIndex=index;
   var listObj=listArray[index];
   document.getElementById("name").value=listObj.name;
   document.getElementById("category").value=listObj.category;
    var div = document.getElementById("main");
    div.style.display = "block";
    document.getElementById("submit").innerHTML="Update";
    init();
}


