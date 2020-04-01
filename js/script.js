$(document).ready(function(){

    openCloseSidebar();

    function openCloseSidebar(){
        if ( $(window).width() > 1024 ) {
            $('.sidebar').addClass('open');
            $('.contentbox').addClass('open');
            $('#hamb').addClass('open');
        }
        else {
            $('.sidebar').removeClass('open');
            $('.contentbox').removeClass('open');
            $('#hamb').removeClass('open');
        }
    }
    
    $( window ).resize(function() {
        openCloseSidebar();
    });

    
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
    $("#hamb").click(function() {
        $(this).toggleClass('open');
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
            labels: ['José', 'Margarida', 'Paula', 'João'],
            datasets: [{
                label: 'Vendas do Mês',
                data: [1254, 1994, 323, 1597],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
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



    // METEO LIBRARY

    /* see if browser has geolocation */
    navigator.geolocation.watchPosition(function(position) {
        /* if user accepts geolocation - show meteo where he is */
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        getWeatherLocation(latitude, longitude);
    },
    function(error) {
        if (error.code == error.PERMISSION_DENIED){
            /* if user do not accept geolocation - show meteo from Aveiro */
            getWeatherDefault();
        }
    });

    function getWeatherLocation(latitude, longitude) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?lang=pt&lat=" + latitude + "&lon=" + longitude + "&APPID=b7aaa3a349294d5706002e82df3de1ea&units=metric",
            success: function(json) {
                console.log(json);
                displayMeteoData (json)
            }
        });
    }

    function getWeatherDefault() {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?lang=pt&APPID=b7aaa3a349294d5706002e82df3de1ea&units=metric&q=Lisbon,PT",
            success: function(json) {
                displayMeteoData (json)
            }
        });
    }

    function displayMeteoData (json) {
        var date = new Date();
        var month = date.getMonth()+1;
        var today = date.getDate();
        var year = date.getYear();
        var week = [];

        /* days of the week */
        for ( i = 0 ; i < 5; i++ ){
            /* 31 days */
            if ( month == 1 ||  month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12 ) {
                getDate(31);
            }
            /* 30 days */
            else if ( month == 4 || month == 6 || month == 9 || month == 11) {
                getDate(30);
            }
            /* February */
            else{
                /* 29 days */
                if ((((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))){
                    getDate(29);
                }
                else{
                    /* 28 days */
                    getDate(28);
                }
            }
        }

        function getDate(monthDays){
            if ( today + i <= monthDays ){
                week[i] = (today + i) + "/" + month;
            }
            else{
                week[i] = Math.abs((today + i) - monthDays) + "/" + (month + 1)
            }
        }


        $('#meteo-city').html(json.city.name);

        /* DAY ONE */        
        $("#iconDay1").html(getWeatherIcon(json.list[0].weather[0].id));
        $("#tempDay1").html(Math.round(json.list[0].main.temp) + "<span>º</span>");
        $("#dateDay1").html(week[0]);
        /* DAY TWO */
        $("#iconDay2").html(getWeatherIcon(json.list[7].weather[0].id));
        $("#tempDay2").html(Math.round(json.list[7].main.temp) + "<span>º</span>");
        $("#dateDay2").html(week[1]);
        /* DAY THREE */
        $("#iconDay3").html(getWeatherIcon(json.list[14].weather[0].id));
        $("#tempDay3").html(Math.round(json.list[14].main.temp) + "<span>º</span>");
        $("#dateDay3").html(week[2]);
        /* DAY FOUR */
        $("#iconDay4").html(getWeatherIcon(json.list[21].weather[0].id));
        $("#tempDay4").html(Math.round(json.list[21].main.temp) + "<span>º</span>");
        $("#dateDay4").html(week[3]);
        /* DAY FIVE */
        $("#iconDay5").html(getWeatherIcon(json.list[28].weather[0].id));
        $("#tempDay5").html(Math.round(json.list[28].main.temp) + "<span>º</span>");
        $("#dateDay5").html(week[4]);
    }

    function getWeatherIcon(iconId) {
        var icon = "";
        if(iconId >= 200 && iconId < 300){
            icon = "thunderstorm";
        }
        else if(iconId >= 300 && iconId < 400){
            icon = "rain-mix";
        }
        else if(iconId >= 500 && iconId < 600){
            icon = "rain";
        }
        else if(iconId >= 600 && iconId < 700){
            icon = "snow";
        }
        else if(iconId >= 700 && iconId < 800){
            icon = "fog";
        }
        else if(iconId == 800){
            icon = "day-sunny";
        }
        else if(iconId > 800 && iconId < 900){
            icon = "cloud";
        }
        icon = "<i class='wi wi-" + icon + "'></i>";
        return icon;
    }
})