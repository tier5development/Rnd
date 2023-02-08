$(function(){
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit)
    })
    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['limit','total'],function(budget){
            var newTotal=0;
            if(budget.total){
                newTotal+=parseInt(budget.total)
            }
            var amount=$('#amount').val();
            if(amount){
                newTotal+=parseInt(amount)
            }
            chrome.storage.sync.set({'total':newTotal},function(){
                if(amount && newTotal >= budget.limit){
                    var notif={
                        type:'basic',
                        iconUrl:'logo.png',
                        title:"Limit Reached",
                        message:"Oh No! Limit reached"
                    }

                    chrome.notifications.create('limitNotif',notif)
                }
            });
            $('#total').text(newTotal);
            $('#amount').val('')
        })
    })
})
