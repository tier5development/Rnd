chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.task == "open") {
        chrome.tabs.create({
            url: 'https://www.facebook.com/'
        });
    }

    const response = {status: "done"};
    sendResponse(response);
})