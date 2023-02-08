$(document).ready(function(){
    $('#inp').keyup(function(){
        $('#greet').text('Hello '+$('#inp').val()+'!');
    })
})