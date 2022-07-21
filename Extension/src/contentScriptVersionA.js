// Test Url: https://developer.chrome.com/docs/extensions/whatsnew/
// https://developer.chrome.com/docs/extensions/whatsnew/

// Here, We start changing the content of P Tag Which is going to be clicked
$("p").dblclick(function () {
  let firstElement = $(this);
  if ($("#appendedDiv").length == 0) {
    appendInputDiv(firstElement, "p");
  }
});

// Here, We start changing the content of h1 Tag Which is going to be clicked
$("h1").dblclick(function () {
  let firstElement = $(this);
  if ($("#appendedDiv").length == 0) {
    appendInputDiv(firstElement, "h1");
  }
});

// Here, We start changing the content of h3 Tag Which is going to be clicked
$("h3").dblclick(function () {
  let firstElement = $(this);
  if ($("#appendedDiv").length == 0) {
    appendInputDiv(firstElement, "h3");
  }
});

// Here, We start changing the content of span Tag Which is going to be clicked
$("span").dblclick(function () {
  let firstElement = $(this);
  if ($("#appendedDiv").length == 0) {
    appendInputDiv(firstElement, "span");
  }
});

// Here, We start changing the content of li Tag Which is going to be clicked
$("li").dblclick(function () {
  let firstElement = $(this);
  if ($("#appendedDiv").length == 0) {
    appendInputDiv(firstElement, "li");
  }
});

// Here, We replace the old Contents with the new inserted one
$("body").on("click", "#saveNewStr", async function () {
  let newContent = $("#newContent").val();
  let oldContent = $("#oldContent").val();
  let tagType = $("#tagType").val();
  let currentUrl = window.location.href;

  if (newContent == "") {
    alert("You have to enter some input");
    return;
  }

  if (newContent == oldContent) {
    alert("You have not performed any change");
    return;
  }

  let { data } = await getParameter(["userDetails"]);
  let userEmail = data.userDetails ? data.userDetails.email : "NA";

  let payload = {
    newContent,
    oldContent,
    tagType,
    currentUrl,
    userEmail,
  };

  let saveStatus = await handleRequest(addContentUrl, payload);
  $("#appendedDiv").parent().text($("#newContent").val());
}); // End $("body").on("click", "#saveNewStr", async function () {

// Here, We remove the input box on Which new content is placed
$("body").on("click", "#cancelNewStr", async function () {
  $("#appendedDiv").remove();
});


$(document).ready(async function () {
  console.log("Content Script Works");
  renderAddedContentInDom();
});
