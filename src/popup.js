




const printTbl = (nameArr) => {
      let str = '';
      for (i=0;i<nameArr.length; i++) {
        str += '<li>'+nameArr[i]+'</li>';
      }

      $("#olTag").html(str);
}

function getLocalStorage() {
  let nameArr = JSON.parse(localStorage.getItem("nameArr") || "[]");
  return nameArr;
}

function toLocalStorage(nameArr) {
  localStorage.setItem("nameArr", JSON.stringify(nameArr));
}

$("#addBtn").click(function(event){
  event.preventDefault();
     let nameArr = getLocalStorage();
     let fullName = $("#fullName").val();
     if (fullName == '') {
        alert("Give the name");
        return;
     } 

     nameArr.push(fullName);
     toLocalStorage(nameArr);

     printTbl(nameArr);
     $("#fullName").val('');
     $("#fullName").focus();


});