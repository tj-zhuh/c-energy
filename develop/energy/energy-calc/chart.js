
/* 折线图模块 */

define(function (require) {
    var $ = require('jquery');

    var ret = {};

    ret.init = function () {
        // zbc
        var echarts = require('echarts');
        if (echarts) {
            console.log('已成功加载echarts图表组件')
        }
    }
    var echarts = require('echarts');

    var mychart1 = echarts.init(document.getElementById('chart1'));


    ret.draw = function (data) {
        // zbc


        var option = {
            title: {},
            subtitle: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            legend: {show:false},
            xAxis: {
                type: 'category',
                data: data.xAxis,
                interval: 0,
                axisLine: { show: false },
                splitLine: { show: true },
                axisTick: { show: false }

            },
            yAxis: {
                name: data.yunit,
                type: 'value',
                max: data.leftYMax,
                //max: 100,
                min: data.leftYMin,
                //splitArea: { show: true },
                splitLine: { show: true },
                axisLine: { show: false },
                axisTick: { show: false }
            },

            series: []
        }

        var ss = option.series;
        for (var i = 0; i < data.series.length; i++) {
            ss.push({
                name: data.series[i].name,
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#2da5ef',
                        borderWidth: 3,
                        borderColor: 'white'
                    }
                },
                //markLine: {
                //    silent: true, data: [{ yAxis: Math.random() * 3000 }], show: false
                //},
                symbol: 'circle',
                symbolSize: 10,
                label: { normal: { show: true } },
                data: (function () {
                    var temp = [];
                    for (var j = 0; j < data.series[i].data.length; j++) {
                        temp.push({ value: data.series[i].data[j] });
                    }
                    return temp;
                })()
            })
        }
        mychart1.setOption(option);

    }

    return ret;
})