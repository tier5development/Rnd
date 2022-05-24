let bgColour = $("#bgColour");
let textColour = $("#textColour");

$(document).on("change", bgColour, () => {
    let colorCodeValue = bgColour.val();
    const colorCode = colorCodeValue;
    let queryOptions = {active: true, currentWindow: true};

    chrome.tabs.query(queryOptions, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {task: "changeBG", colorCode: colorCode},
            function (response) {
                console.log(response.status);
            }
        )
    })
})

$(document).on("change", textColour, () => {
    let colorCodeValue = textColour.val();
    const colorCode = colorCodeValue;
    let queryOptions = {active: true, currentWindow: true};

    chrome.tabs.query(queryOptions, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {task: "changeColor", textColorCode: colorCode},
            function (response) {
                console.log(response.status);
            }
        )
    })
})