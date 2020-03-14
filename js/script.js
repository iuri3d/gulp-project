$(document).ready(function(){

    //////////////Display Login Modal/////////
    $('.login').on('click', function(){
        $('#myModal').css('display', 'flex');
    });

    //////////////Close Login Modal//////////
    $('.close').on('click', function(){
        $('#myModal').css('display', 'none');
    });

    /////////////Expand tickets////////////////////
    $('.ticket-open').on('click',function(){
        $(this).parent().siblings('.collapsible').toggleClass('down');
    });
   
    ////// Toggle side bar open //////
    $(".hamburger").click(function() {
        $(".sidebar").toggleClass("open");
        $(".contentbox").toggleClass("open");
    
    });


})