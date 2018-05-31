
/* 折线图模块 */

define(function (require) {
    var $ = require('jquery');
    var echarts = require('echarts');

    var ret = {};

    ret.init = function () {

    }
    var myLine = echarts.init(document.getElementById('chart1'));
    //var myPie = echarts.init(document.getElementById('chart2'));
    //var myBar = echarts.init(document.getElementById('chart3'));

    //画
    ret.draw = function (idata) {
        var Loption = {
            title: {text:'折线标题'},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',

                },
            },
            legend: {
                data:[]
            },
            xAxis: {
                type: 'category',
                data: idata.xAxis,
                interval:0
            },
            yAxis: {
                type: 'value',
                min: idata.leftYMin,
                max: idata.leftYMax
            },
            series:[]
        }
        //装填数据

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
                label: { normal: { show: true } }
            });
            Loption.legend.data.push(idata.series[i].name);
        }

        myLine.setOption(Loption);
        //myPie.setOption(Poption);
        //myBar.setOption(Boption);
    }

    return ret;
})