$(document).ready(function(){

    
    //////////////Display Login Modal/////////
    $('.login').on('click', function(){
        $('#myModal').css('display', 'flex');
    });

    //////////////Close Login Modal//////////
    $('#myModal .close').on('click', function(){
        $('#myModal').css('display', 'none');
    });

    //////////////Open Compose modal//////////////

    $('#compose-button').on('click', function() {
        $('#modalCompose').css('display', 'block');
        $('body').addClass('modalOpen');
    });

    ///////////////Close Compose Modal ////////////

    $('#modalCompose .close').on('click', function() {
        $('#modalCompose').css('display', 'none');
        $('body').removeClass('modalOpen');
    });

    ///////////////Open Event Modal ////////
    $('#event-button').on('click', function(){
        $('#modalEvent').css('display', 'block');
        $('body').addClass('modalOpen');
    });

    /////////////////Close Event Modal ///////////
    $('#modalEvent .close').on('click', function(){
        $('#modalEvent').css('display', 'none');
        $('body').removeClass('modalOpen');
    });

    ///////////////Open Ticket Modal ///////////////

    $('#ticket-button').on('click', function(){
        $('#modalTickets').css('display', 'block');
        $('body').addClass('modalOpen');
    });

    //////////////Close Ticket Modal////////////////

    $('#modalTickets .close').on('click', function(){
        $('#modalTickets').css('display', 'none');
        $('body').removeClass('modalOpen');
    });

    /////////////Expand tickets////////////////////
    $('.ticket-open').on('click',function(){
        $(this).parent().siblings('.collapsible').toggleClass('down');
    });
   
    ////// Toggle side bar open //////
    $(".hamburger").click(function() {
        $(".sidebar").toggleClass("open");
        $(".contentbox").toggleClass("open");

        /* FOR GRAPHICS TO FIT IN DIV */
        var chartWidth = $('.chart').width();
        $('#home-chart').css('width',chartWidth);        
    });

    $('.notifications').on('click', function(){
        $('.notifications-pop').toggleClass('active');
    });


    if ( document.getElementById("home-chart") ){

    const homeChart = document.getElementById("home-chart").getContext('2d');

        let chart01 = new Chart ( homeChart, {
            type: 'horizontalBar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        });
    }
    openCloseSidebar();

    function openCloseSidebar(){
        if ( $(window).width() > 1024 ) {
            $('.sidebar').addClass('open');
            $('.contentbox').addClass('open');
        }
        else {
            $('.sidebar').removeClass('open');
            $('.contentbox').removeClass('open');
        }
    }
    
    $( window ).resize(function() {
        openCloseSidebar();
    });



    /* add or remove product button */
    $('.product-selector .button-selector').on('click', function(){        
        var oldValue = $(this).siblings('input').val();

        /* add */   
        if ( $(this).hasClass("add") ){
            var newValue = parseInt(oldValue) + 1;
            $(this).siblings('input').val(newValue);
        }
        /* remove */
        else if ( $(this).hasClass("remove") ){
            // verify if number of products is not under 0
            var newValue = ( (parseInt(oldValue) - 1) <= 0 ) ? 0 : ( parseInt(oldValue) - 1 );
            $(this).siblings('input').val(newValue);
        }
    });
})