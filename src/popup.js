 /*-----------------------------------------<first part>------------------------------------*/  
 
 
 document.querySelector("#login").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#raunok").style.display = "block";
  document.querySelector("#div3").style.display = "block";
  document.querySelector("#div0").style.display = "none";
 });
 






  /*--------------------------------------<second part>------------------------------------*/

var selectedRow = null;

document.querySelector("#div1").addEventListener("click", function (event) {
  var x = document.querySelector("#div1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
    document.querySelector("#div3").style.display = "none";
    document.querySelector("#div2").style.display = "block";
  }
  event.preventDefault();
});

function getLocalStorage() {
  let productarr = JSON.parse(localStorage.getItem("productarr") || "[]");
  return productarr;
}

function printTable() {
  let productarr = getLocalStorage();
  let str = "";
  for (var i = 0; i < productarr.length; i++) {
    str =
      str +
      "<tr><td>" +
      productarr[i].fullName +
      "</td><td>" +
      productarr[i].empCode +
      '</td><td><button id="edi-' +
      productarr[i].pid +
      '" class="btnedit">edit</button><button id="del-' +
      productarr[i].pid +
      '" class="btnDel">delete</button></td> </tr>';
  }
  $("#tblbody").html(str);
}

function toLocalStorage(product) {
  localStorage.setItem("productarr", JSON.stringify(product));
  let productarr = getLocalStorage();
}

document.querySelector("#button").addEventListener("click", function (event){
  event.preventDefault();
  printTable();
  let productarr = getLocalStorage();
  var product = productarr;
  let fullName = document.getElementById("fullName").value;
  let empCode = document.getElementById("empCode").value;
  let pid = document.getElementById("pid").value;

  if (pid == "NA") {
    // add
    pid = Date.now();
    product.push({
      pid: pid,
      fullName: fullName,
      empCode: empCode,
    });
    toLocalStorage(product);
    printTable();
  } else {
    // edit
    let productarr = getLocalStorage();
    productarr.map((product) => {
      if (product.pid == pid) {
        product.fullName = fullName;
        product.empCode = empCode;
      }
    });
    toLocalStorage(productarr);
    printTable();
  }
  document.querySelector("#div2").style.display = "none";
  document.querySelector("#div1").style.display = "block";
  document.querySelector("#div3").style.display = "block";

})


$(document).ready(function () {
  printTable();
});

$("body").on("click", ".btnDel", function () {
  let id = $(this).attr("id");
  let res = id.split("-");
  let pid = res[1];
  let productarr = getLocalStorage();
  const resultArr = productarr.filter((product) => product.pid != pid);
  localStorage.setItem("productarr", JSON.stringify(resultArr));
  printTable();
});

$("body").on("click", ".btnedit", function () {
  $("#div1").hide();
  $("#div2").show();
  $("#div3").hide();
  let id = $(this).attr("id");
  let res = id.split("-");
  let pid = res[1];
  let productarr = getLocalStorage();
  const resultarr = productarr.filter((product) => product.pid == pid);
  $("#pid").val(pid);
  $("#fullName").val(resultarr[0].fullName);
  $("#empCode").val(resultarr[0].empCode);
});
