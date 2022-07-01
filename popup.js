const clickMe  = document.getElementById("submit");
clickMe.addEventListener("click", function() {
    const inpValue = document.getElementById("inp").value;
    if(inpValue == ""){
        window.alert("Enter some string before submiting")
    }
    else{
        window.open('https://m.facebook.com/me/')
        chrome.storage.local.set({"value": inpValue}, function() {

            console.log('Value is set to ' + inpValue);
          });
    }

}) 