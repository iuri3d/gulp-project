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


    const homeChart = document.getElementById("home-chart").getContext('2d');

    let chart01 = new Chart ( homeChart, {
        type: 'bar',
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
    responsive:true,
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


})