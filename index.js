function show1() {
    var div = document.getElementById("main");
    div.style.display = "block";
}

const formEl = document.querySelector("form");
const tbodyEl = document.querySelector("tbody");
const tableEl = document.querySelector("table");

function add(e) {
    e.preventDefault();

    let prodName = document.getElementById("pname").value;

    let category = document.getElementById("pcat").value;

    tbodyEl.innerHTML += `
             <tr>
                 <td>${prodName}</td>
                 <td>${category}</td>
                 <td><button class="deleteBtn btn-warning"">Delete</button></td>
                 <td><button class="editBtn btn-success"">Edit</button></td>
             </tr>
         `;

    let localItems = JSON.parse(localStorage.getItem("localItems") || "[]");
    let allItems = [...localItems, { id: Date.now(), productName: prodName, productCategory: category }];
    localStorage.setItem("localItems", JSON.stringify(allItems));
}

function onDeleteRow(e) {
    if (!e.target.classList.contains("deleteBtn")) {
        return;
    }

    const btn = e.target;
    btn.closest("tr").remove();
}

formEl.addEventListener("submit", add);
tableEl.addEventListener("click", onDeleteRow);

function show2() {
    var div = document.getElementById("main");
    div.style.display = "none";
}
