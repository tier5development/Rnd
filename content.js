chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {

        var StrObj = document.documentElement.innerText;
        var emailsArray = StrObj.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (emailsArray != null && emailsArray.length) {
            console.log(emailsArray);
        } else {
            console.log("no email found");

        }

        var phoneArray = StrObj.match(/\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
        if (phoneArray != null && phoneArray.length) {
            console.log(phoneArray);
        } else {
            console.log("no ph no found");
        }


        if (request.greeting == "hello")
            sendResponse({
                farewell: "goodbye"
            })
    });