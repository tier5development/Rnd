$("form").submit(function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var category = document.getElementById("category").value;
    $(".data-table tbody").append(
        "<tr data-name=  " +
            name +
            " data-category=" +
            category +
            "><td>" +
            name +
            "</td><td>" +
            category +
            "</td><td><button class='btn btn-danger btn-lg btn-delete mr-3' type='button'>Delete</button><button class='btn btn-info btn-lg btn-edit' type='button'>Edit</button></td></tr>"
    );

    document.getElementsById("name").val("");
});

$("body").on("click", ".btn-delete", function () {
    $(this).parents("tr").remove();
});

$("body").on("click", ".btn-edit", function () {
    var name = $(this).parents("tr").attr("data-name");
    var category = $(this).parents("tr").attr("data-category");

    $(this)
        .parents("tr")
        .find("td:eq(0)")
        .html("<input name='edit_text' value='" + name + "'>");
    $(this)
        .parents("tr")
        .find("td:eq(1)")
        .html("<input name='edit_category' value='" + category + "'>");

    $(this).parents("tr").find("td:eq(2)").prepend("<button type='button' class='btn btn-info btn-lg btn-update mr-3'>Update</button>");
    $(this).hide();
});

$("body").on("click", ".btn-update", function () {
    var name = $(this).parents("tr").find("input[name='edit_text']").val();
    var category = $(this).parents("tr").find("input[name='edit_category']").val();

    $(this).parents("tr").find("td:eq(0)").text(name);
    $(this).parents("tr").find("td:eq(1)").text(category);

    $(this).parents("tr").attr("data-name", name);
    $(this).parents("tr").attr("data-category", category);

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-update").remove();
});
function showhide() {
    var div = document.getElementById("main");
    div.style.display = "block";
}
function showhide2() {
    var div = document.getElementById("main");
    div.style.display = "none";

    var inputValue = document.getElementById("name").value;
    var pname = document.createTextNode(inputValue);

    var Cat = document.getElementById("category").value;
    var pcategory = document.createTextNode(Cat);

    let localItems = JSON.parse(localStorage.getItem("localItems") || "[]");
    let allItems = [...localItems, { id: Date.now(), productName: inputValue, productCategory: Cat }];

    localStorage.setItem("localItems", JSON.stringify(allItems));
}
