
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
    var mychart = echarts.init(document.getElementById('chart2'));

    ret.iniDraw = function () {

        var mydate = new Date();
        var cYear = mydate.getFullYear();

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
                data: [],  //data: [cYear + '/1', cYear + '/2', cYear + '/3', cYear + '/4', cYear + '/5', cYear + '/6', cYear + '/7', cYear + '/8', cYear + '/9', cYear + '/10', cYear + '/11', cYear + '/12'],
                interval: 0,
                axisLine: { show: false },
                splitLine: { show: true },
                axisTick: { show: false }

            },
            yAxis: {
                type: 'value',
                max: 1000,
                min: 0,
                splitLine: { show: true },
                axisLine: { show: false },
                axisTick: { show: false }
            },

            series: [{
                name: '',
                type: 'line',
                data: [],
            }, {
                name: '',
                type: 'line',
                data: [],
            }, {
                name: '',
                type: 'line',
                data: [],
            }]
        }

        mychart.setOption(option);
    }

    ret.draw = function (data) {
        var selectedDisplays = [], yMax, yMin;
        var ss = [];

        //清空Echarts
        selectedDisplays = [];
        yMax = null;
        yMin = null;
        ss = [];

        if (data && data[0]) {
            yMin = data[0].leftYMin;
            yMax = data[0].leftYMax;
            for (var j = 0; j < data[0].xAxis.length; j++) {
                selectedDisplays.push(data[0].xAxis[j]);
            }
            for (var i = 0; i < data[0].series.length; i++) {
                var a = data[0].series[i];
                ss.push({
                    name: a.name,
                    type: 'line',
                    data: a.data
                })
            }

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
                    data: selectedDisplays,
                    interval: 0,
                    axisLine: { show: false },
                    splitLine: { show: true },
                    axisTick: { show: false }

                },
                yAxis: {
                    type: 'value',
                    max: yMax,
                    min: yMin,
                    splitLine: { show: true },
                    axisLine: { show: false },
                    axisTick: { show: false }
                },

                series: ss
            }

            mychart.setOption(option);
        }
    }

    return ret;
})