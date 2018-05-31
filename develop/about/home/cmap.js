
define(function (require) {
    var $ = require('jquery');
    var china1 = require('china1');
    var util = require('util');
    var ret = {};

    // 初始化echarts控件
    ret.init = function () {
        // zbc
        //var echarts = require('echarts');
        //if (echarts) {
        //    console.log('初始化了全国地图的echarts控件')
        //}
    }
    //注册图表
    var echarts = require('echarts');
    var mychart0 = echarts.init(document.getElementById('chart0'));
    var mychart1 = echarts.init(document.getElementById('echt1'));
    var mychart2 = echarts.init(document.getElementById('echt2'));
    var mychart3 = echarts.init(document.getElementById('echt3'));

    // 绘制中国地图
    ret.draw = function (type, data) {
        // zbc     
        console.log(data)
        var option = {
            title: {
                left: 'center'
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: function (p) {
                    var temp = p.name + '<br/>';
                    if (type == 'c') {
                        for (var i = 0; i < data.length; i++) {
                            if (p.name == data[i].areaName) {                //找到对应省
                                if (p.value >= data[i].cLimit) {
                                    temp += '<p class="redc">碳排放量:' + p.value + '</p>';
                                }
                                if (p.value < data[i].cLimit) {
                                    temp += '碳排放量:' + p.value;
                                }                              
                            }
                        }
                    }
                    if (type == 'energy') {
                        for (var i = 0; i < data.length; i++) {
                            if (p.name == data[i].areaName) {                //找到对应省
                                if (p.value >= data[i].eLimit) {
                                    temp += '<p class="redc">能耗量:' + p.value + '</p>';
                                }
                                if (p.value < data[i].eLimit) {
                                    temp += '能耗量:' + p.value;
                                }
                            }
                        }
                    }
                    return temp
                }
            },

            legend: {
                show: false,
            },
            visualMap: {
                show: false,
                min: 0,
                max: 2500,
                inRange: {
                    color: ['#eee', '#ffec00', '#ff9900']
                },
                outOfRange: {
                    color: '#000'
                },
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                  {
                      name: '',
                      type: 'map',
                      mapType: 'china1',
                      roam: false,
                      scaleLimit: {
                          min: 1,
                          max: 10
                      },
                      showLegendSymbol: false,
                      selectedMode: false,
                      label: {
                          normal: {
                              show: false
                          },
                          emphasis: {
                              show: false
                          }
                      },
                      data: [
                          { name: 'nouse', value: 0 }
                      ],
                      itemStyle: {
                          emphasis: {
                              areaColor: '#ccc',
                              borderWidth: 3
                          }
                      }
                  }
            ]
        };

        option.series.push({
            name: (function () {
                if (type == 'c') { return "碳排放" }
                else if (type == 'energy') { return "能源排放"}
            })(),
            type: 'map',
            mapType: 'china1',
            showLegendSymbol: false,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            data: (function () {
                var temp = [];
                for (var i = 0; i < data.length; i++) {
                    temp.push({ value: data[i].val, name: data[i].areaName })
                }
                return temp;
            })()
        })

        mychart0.setOption(option);
        console.log('绘制了全国地图，类型为' + type)
    }

    //画千层饼图
    ret.draw_pies = function (type, data) {

        var option1 = {
            animation: { show: true },
            backgroundColor: '#ffffff',
            title: {
                show: false,
                text: '',
                subtext: '纯属虚构',
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: true,
                left: '55%',
                top: '50%',
                orient: 'vertical',
                itemWidth: 242,
                itemHeight: 16,
                itemGap:6,
                textStyle:{
                    fontSize: 10,
                },
                x: 'left',
                data: ['数据一','数据二','数据三','数据四','数据五']
            },
            toolbox: {
                show: false,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: false,
            series: [{
                name: '',
                type: 'pie',
                center: ['30%', '50%'],

                itemStyle: {
                    normal: {
                        label: { show: false },
                        labelLine: { show: false, length: 20 }
                    }
                },
                radius: ['40%', '80%'],

                label: {
                    normal: {
                        show: true,
                        position: 'outside',
                        formatter: '{d}%',
                        textStyle: {
                            fontSize: 12,
                            color: '#212121'
                        }
                    }
                },
                data: [{
                    value: 123, name: '数据一',
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,168,0,1)',
                        }
                    }
                }, {
                    value: 234, name: '数据二',
                    itemStyle: {
                        normal: {
                            color: 'rgba(59,142,148,1)',
                        }
                    }
                }, {
                    value: 345, name: '数据三',
                    itemStyle: {
                        normal: {
                            color: 'rgba(145,192,2,1)',
                        }
                    }
                }, {
                    value: 456, name: '数据四',
                    itemStyle: {
                        normal: {
                            color: 'rgba(15,135,230,1)',
                        }
                    }
                }, {
                    value: 567, name: '数据五',
                    itemStyle: {
                        normal: {
                            color: 'rgba(254,208,53,1)',
                        }
                    }
                }]
            }, {
                name: '',
                type: 'pie',
                silent:true,
                center: ['30%', '50%'],
                radius: ['40%', '50%'],
                data: [{
                    value: 123,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0.3)',
                        }
                    }
                }]
            }]

        }
        //填充series数据
        //for (var i = 0; i < data.circles; i++) {
        //    option1.series.push({
        //        name: '',
        //        type: 'pie',
        //        itemStyle: {
        //            normal: {
        //                label: { show: false },
        //                labelLine: { show: false, length: 20 }
        //            }
        //        },
        //        radius: [i * 8 + 10, i * 8 + 12],
        //        data: (function () {
        //            var temp = [];
        //            for (var j = 0; j < data.sdata.length; j++) {
        //                temp.push({ value: data.sdata[j].data[i], name: data.sdata[j].name })
        //            }
        //            return temp;
        //        })()
        //    })
        //    //if(i){
        //    if (i == data.circles - 2) {
        //        option1.series[i].itemStyle.normal.label.show = true;
        //        option1.series[i].itemStyle.normal.labelLine.show = true;
        //    }
        //}
        //option1.series[0].markPoint = {
        //    symbol: 'emptyCircle',
        //    symbolSize: option1.series[0].radius[0],
        //    data: [{ x: '50%', y: '50%' }]
        //};

        mychart1.setOption(option1)
    }

    //画折线图
    ret.draw_line = function (type, data) {

        if (mychart2)
            mychart2.clear();

        var option2 = {
            backgroundColor: '#ffffff',
            title: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            legend: {
                show: false,
                data:data.legend
            },
            yAxis: {
                type: 'value',
                max: data.yAxisMax,
                min: data.yAxisMin,
                splitLine: { show: true },
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                splitLine: { show: true },
            },
            series: []
        }

        for (var i = 0; i < data.series.length; i++) {
            option2.series.push({
                type: 'line',
                name: data.series[i].name,
                data: data.series[i].data,
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
        }

        mychart2.setOption(option2)

    }

    //画柱状图
    ret.draw_zhuzi = function (type, data) {

        if (mychart3)
            mychart3.clear();

        var option3 = {
            backgroundColor: '#ffffff',
            title: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {
                show: false,
                data:data.legend
            },
            yAxis: {
                type: 'category',
                data: data.legend
            },
            xAxis: {
                type: 'value',
                //max: data.yAxisMax,
                min: 0
            },
            series: []
        };


        option3.series.push({
            type: 'bar',
            name: '未知',
            data: data.datas,
            barMaxWidth: 50
        })
        mychart3.setOption(option3)

    }


    ret.click = function (func) {
        if (typeof func === 'function') {

            mychart0.on('click', function (e) {

                var id = 0; var name = e.name;

                func(id, name)          //暂时先用着

                //如果没数据则什么都不发生
                if (!e.value||e.value == 0) {
                    util.confirm('当前地区无数据，无法进行详细内容查看')
                    return
                }
                func(id, name)

            })
        }
    }


    return ret;
})