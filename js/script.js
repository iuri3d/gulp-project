$(document).ready(function(){

    $('.login').on('click', function(){
        $('#myModal').css('display', 'flex');
    });

    $('.close').on('click', function(){
        $('#myModal').css('display', 'none');
    });

    $('.ticket-open').on('click',function(){
        $(this).parent().siblings('.collapsible').toggleClass('down');
    });
   


})