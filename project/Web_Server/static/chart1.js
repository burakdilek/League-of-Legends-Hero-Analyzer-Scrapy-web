
$.ajax({
        url: "chart1_query",
        dataType: "json",
        /* beforeSend: function() {
          loader_gif.show();
          console.log("beforeSend");
        }, 
        complete: function() {
          loader_gif.hide();
        }, */
        success: function( data ) {
           createChart(data);
        }
})

function createChart(data) {
    
    console.log(data);
    var seriesData = data.map(function(arr) {
      return { x:arr[0], y:arr[1] }
    })
    seriesData.pop() // eliminate last one year 2015
    console.log(seriesData);
    $('#chart2').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Riot Points of Heros'
        },
        xAxis: {
            title: {
                text: 'RP',
                align: 'high'
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            // valueSuffix: ' millions'
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    style: { 'fontSize': "8px" }
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            // x: 40,
            // y: 100,
            // floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [ { name: "total", data: seriesData } ]
    });
}
