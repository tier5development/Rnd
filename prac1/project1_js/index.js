var enterUser= function(){
    function grabUser(){
        var name=document.querySelector('#user_name').value;
        var email=document.querySelector('#user_email').value;
        var age=document.querySelector('#user_age').value;

        var elements=[name,email,age];

        if(validate(elements)){
            console.log('true');
        }
        else{
            console.log('false')
        }
    }

    document.querySelector('#myForm').addEventListener('submit',function(event){
        event.preventDefault();
        grabUser();
    })
}

var validate=function(elements){

}