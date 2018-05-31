
/* 折线图模块 */

define(function (require) {
    var $ = require('jquery');
    var echarts = require('echarts');

    var ret = {};

    ret.init = function () {
    }

    var Lchart = echarts.init(document.getElementById('chart1'));

    ret.draw = function (idata) {

        var Loption = {
            title: {
                text: '折线标题',
                subtext: '单位：tCO2'
            },
            tooltip: {},
            legend: {
                data:[]
            },
            xAxis: {
                type:'category',
                data: idata.xAxis,
            },
            yAxis: {
                type:'value',
                max: idata.leftYMax,
                min: idata.leftYMin,
            },
            series: []
        };


        for (var i = 0; i < idata.series.length; i++) {
            Loption.series.push({
                name: idata.series[i].name,
                type: 'line',
                data: idata.series[i].data,
                itemStyle: {
                    normal: {
                        color: '#2da5ef',
                        borderWidth: 3,
                        borderColor: 'white'
                    }
                },
                symbol: 'circle',
                symbolSize: 10,
                label: { normal: { show: true } },
            })
            Loption.legend.data.push(idata.series[i].name)
        }



        Lchart.setOption(Loption)
    }

    return ret;
})