
$.ajax({
        url: "chart2_query",
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

    $('#chart5').highcharts({
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80
        },

        title: {
            text: 'Vowel Bigram Frequency'
        },

        xAxis: {
            categories: ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'],
            title: { text: "First Vowel" }
        },

        yAxis: {
            categories: ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'],
            title: { text : "Second Vowel" }
        },

        colorAxis: {
            min: 20,
            stops: [
              [0, '#3060cf'],
              [0.25, '#fffbbc'],
              [0.9  , '#c4463a']
            ],
            max: 25,
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },

        tooltip: {
            formatter: function () {
                var vowels = "aeıioöuü"
                return '<b>' + this.point.value + '</b> vowel pairs<br>' +
                'where <b>' + vowels[this.point.x]  + '</b> is followed by <b>' +
                vowels[this.point.y]  + '</b>';
            }
        },

        series: [{
            name: '',
            borderWidth: 1,
            data: data,
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }]
    });
}
