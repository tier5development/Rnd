chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.task == "open") {
        // chrome.runtime.onInstalled.addListener((reason) => {
        //     if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
              
        //     }
        // });
        chrome.tabs.create({
            url: 'https://www.facebook.com/'
        });
    }

    const response = {status: "done"};
    sendResponse(response);
})