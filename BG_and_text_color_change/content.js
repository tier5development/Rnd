chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.task == "changeBG") {
        $("body").css("background-color",request.colorCode);
    }

    if (request.task == "changeColor") {
        $("body").css("color",request.textColorCode);
    }

    const response = {status: "done"};
    sendResponse(response);
})