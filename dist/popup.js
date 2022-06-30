let submit = document.getElementById("submit");
let fb_id = document.getElementById("fb_id");

$(document).on("click", submit, () => {
    let queryOptions = {active: true, currentWindow: true};

    chrome.tabs.query(queryOptions, (tabs) => {
       chrome.tabs.sendMessage(
            tabs[0].id,
            {task: "open", link: "facebook"}
        )
    })
})