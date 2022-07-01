let submit = document.getElementById("submit");

submit.addEventListener("click", function() {
    const fb_id = document.getElementById("fb_id").value;
    if(fb_id == ""){
        window.alert("Please enter facebook name")
    }
    else{
        window.open('https://facebook.com/me/')
        chrome.storage.local.set({"value": fb_id}, function(res) {

            console.log('Value is set to ' + res);
        });
    }
})