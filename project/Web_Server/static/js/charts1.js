
$(function () {
     chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart1',
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [0, 55]
        }, {
            name: 'John',
            data: [7, 3]
        }]
    });
});

