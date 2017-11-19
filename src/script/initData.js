iChartInitData=(function () {
    var normalTable={
        barTable:{
            kind0:{
                title: {
                    text: 'iChart入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: [{
                    type: 'value'
                }],
                yAxis: [{
                    type: 'category',
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                }],
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }],
                iChartHeight: '512px',
                iChartWidth: '512px'
            }
        }
    };
    return {
        normalTable:normalTable
    }
})();