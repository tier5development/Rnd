function displayProduct() {
    let productArr = getTasksFromLocalStorage();

    str = "";
    var i;
    for (i = 0; i < productArr.length; i++) {
        str =
            str +
            "<tr width: 100%><td>" +
            productArr[i].pname +
            "</td><td>" +
            productArr[i].pcat +
            '</tpd><td><button id="edit-' +
            productArr[i].pid +
            '" class="editBtn">Edit</button></td><td><button id="del-' +
            productArr[i].pid +
            '" class="deleteBtn">Delete</button></td></tr>';
    }

    $("#tbody1").html(str);
}

function getTasksFromLocalStorage() {
    let productArr = JSON.parse(localStorage.getItem("productArr") || "[]");
    return productArr;
}

function saveTaskTolocalStorage(productArr) {
    localStorage.setItem("productArr", JSON.stringify(productArr));
    let product = getTasksFromLocalStorage();
}

$(".btn1").on("click", function () {
    $("#main").css("display", "block");
});

$(".btn").on("click", function () {
    let productArr = getTasksFromLocalStorage();
    let pname = document.getElementById("pname").value;
    let pcat = $("#pcat").val();
    let pid = $("#pid").val();

    if (pid == "NA") {
        pid = Date.now();

        productArr.push({
            pid: pid,
            pname: pname,
            pcat: pcat,
        });
        console.log(JSON.stringify(productArr));
        saveTaskTolocalStorage(productArr);
        displayProduct();
    } else {
        let productArr = getTasksFromLocalStorage();
        productArr.map((product) => {
            if (product.pid == pid) {
                product.pname = pname;
                product.pcat = pcat;
            }
        });

        console.log("productArr", productArr);
        saveTaskTolocalStorage(productArr);
        displayProduct();
    }

    $("#main").css("display", "none");
});

$("body").on("click", ".editBtn", function () {
    let id = $(this).attr("id");
    let res = id.split("-");
    let pid = res[1];

    let productArr = getTasksFromLocalStorage();
    const resultArr = productArr.filter((product) => product.pid == pid);

    $("#pid").val(pid);
    $("#pname").val(resultArr[0].pname);
    $("#pcat").val(resultArr[0].pcat);

    var div = document.getElementById("main");
    div.style.display = "block";
});

$("body").on("click", ".deleteBtn", function () {
    let id = $(this).attr("id");
    let res = id.split("-");
    let pid = res[1];
    let productArr = getTasksFromLocalStorage();
    const resultArr = productArr.filter((product) => product.pid != pid);

    saveTaskTolocalStorage(resultArr);
    displayProduct();
});

$("#submit").click(function (event) {
    event.preventDefault();
});

$(document).ready(function () {
    displayProduct();
});
