
/* 折线图模块 */

define(function (require) {
    var $ = require('jquery');

    var ret = {};

    var chartId;

    ret.init = function () {

        var echarts = require('echarts');
        if (echarts) {
            console.log('已成功加载echarts图表组件')
        }
    }
    var echarts = require('echarts');

    var mychart = echarts.init(document.getElementById('chart11'));

    ret.draw = function (data) {

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            legend: {
                data: []
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                interval: 0,
                axisLine: { show: false },
                splitLine: { show: true },
                axisTick: { show: false }

            },
            yAxis: {
                type: 'value',
                max: data.ymax,
                min: data.ymin,
                //splitArea: { show: true },
                splitLine: { show: true },
                axisLine: { show: false },
                axisTick: { show: false }
            },

            series: []
        }

        var ss = option.series;
        for (var i = 0; i < data.linedata.length; i++) {
            ss.push({
                name: data.linedata[i].name,
                type: 'line',
                //stack: '总量',
                //markLine: {
                //    data: [
                //        [{ name: '标线1起点', value: 197, xAxis: '1月', yAxis: 197 }, { name: '标线1终点', xAxis: '12月', yAxis: 197 }]
                //    ],
                //},
                data: (function () {
                    var temp = [];
                    for (var j = 0; j < data.linedata[i].value.length; j++) {
                        temp.push({ value: data.linedata[i].value[j] });
                    }
                    return temp;
                })()
            })
        }

        mychart.setOption(option);
    }

    return ret;
})