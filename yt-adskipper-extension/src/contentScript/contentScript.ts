
console.log("inside script")
window.onload = () => {

    //alert("inside window,load")

    var observer = new MutationObserver((mutations) => {
        mutations.forEach(function (mutation) {
                //console.log("inside observer")
            if (mutation.target && mutation.target.textContent && mutation.target.textContent.indexOf('Skip Ads'|| 'Skip Ad') != -1) {
                console.log("inside Ads")

                mutation.target.addEventListener(
                    'click', function () {
                    });


                let clickEvent = new Event('click');
                mutation.target.dispatchEvent(clickEvent);
                console.log("cliked")

            }
           

        }
        )
    })
    observer.observe(document.body, { attributes: true, subtree: true, childList: true, characterData: true });

}