
$("#registerBtn").click(async function () {
  const name = $("#name").val();
  const email = $("#email").val();
  const password = $("#password").val();

  if (name == "") {
    alert("Please Enter a valid Name");
    return;
  }

  if (email == "") {
    alert("Please Enter a valid Email");
    return;
  }

  if (password == "") {
    alert("Please Enter a valid password");
    return;
  }

  let payload = {
    name,
    email,
    password,
  };

  let registerStatus = await handleRequest(registerUrl, payload);

  if (registerStatus.code != 2) {
    alert("Some Error Occur");
    return;
  }

  $("#msg").text("User has been Registered");
  $("#name").val("");
  $("#email").val("");
  $("#password").val("");
});

$("#loginBtn").click(async function () {
  const email = $("#email").val();
  const password = $("#password").val();

  if (email == "") {
    alert("Please Enter a valid Email");
    return;
  }

  if (password == "") {
    alert("Please Enter a valid password");
    return;
  }

  let payload = {
    email,
    password,
  };

  let loginStatus = await handleRequest(loginUrl, payload);

  if (loginStatus.code != 2) {
    alert("Invalid Credentials");
    return;
  }

  await setParameter({ 'userDetails': loginStatus.payload.userDetails })

  if(!location.href.includes('userDetail.html')){
    location.href='./userDetail.html'
  }

});

// When User click on signup link
$("#signupHref").click(async function () {
  if (!location.href.includes("signup.html")) {
    location.href = "./signup.html";
  }
});

// When User click on login link
$("#loginHref").click(async function () {
  if (!location.href.includes("popup.html")) {
    location.href = "./popup.html";
  }
});

// When User click on login link
$("#logoutBtn").click(async function () {
  await setParameter({ 'userDetails': null })
  if(!location.href.includes('popup.html')){
    location.href = "./popup.html";
  }
});

$(document).ready(async function(){
  let {data} = await getParameter(['userDetails']);
  if(!location.href.includes('userDetail.html')){
    if (data) {
      if ((data.userDetails != null)) {
        location.href='./userDetail.html'; 
      }
    }
  } 

  if(location.href.includes('userDetail.html')){
    $("#userName").html("<p>"+data.userDetails.name+"</p>");
    $("#userEmail").html("<p>"+data.userDetails.email+"</p>"); 
  }
});
