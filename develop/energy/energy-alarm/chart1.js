
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

    var mychart = echarts.init(document.getElementById('chart1'));


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
                data:[],  //data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                interval: 0,
                axisLine: { show: false },
                splitLine: { show: true },
                axisTick: { show: false }

            },
            yAxis: {
                type: 'value',
                max: 1000,
                min: 0,
                //splitArea: { show: true },
                splitLine: { show: true },
                axisLine: { show: false },
                axisTick: { show: false }
            },

            series: [{
                name: '能耗',
                type: 'line',
                stack: '总量',
                data:[],   //data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                markLine: {
                    data: [
                        [{ name: '标线1起点', value: 197, xAxis: '1月', yAxis: 197 }, { name: '标线1终点', xAxis: '12月', yAxis: 197 }]
                    ],
                }
            }]
        }

        mychart.setOption(option);
    }
    ret.draw = function (data) {
        var selectedDisplays=[], yMax, yMin;
        var ss=[];

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
                    //markLine: {
                    //    data: [
                    //        [{ name: '标线1起点', value: 197, xAxis: '1月', yAxis: 197 }, { name: '标线1终点', xAxis: '12月', yAxis: 197 }]
                    //    ],
                    //},
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
                //splitArea: { show: true },
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