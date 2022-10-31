function doChart() {
    var title = $("#title").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();

    Highcharts.getJSON(
        'http://localhost:8080/api/v1?title=' + title + '&startDate=' + startDate + '&endDate=' + endDate + '',
        function (data) {

            console.log(data)
            var fetchdata_json = [];
            for (i = 0; i < data.length; i++) {
                fetchdata_json.push([Date.parse(data[i].Date), data[i].Cur_OfficialRate]);
            }

            Highcharts.chart('container', {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: title + ' к белорусскому рублю'
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Обменный курс'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'area',
                    name: title + ' к BYN',
                    data: fetchdata_json
                }]
            });
        }
    );

}
