
define(function (require) {
    var $ = require('jquery');
    var yunnan = require('yunnan');
    var xinjiang = require('xinjiang');


    var ret = {};

    //全市名称（只需添加即可）
    var Citys = ['迪庆藏族自治州', '丽江市', '怒江傈僳族自治州', '大理白族自治州', '昭通市', '楚雄彝族自治州', '昆明市', '曲靖市', '保山市', '德宏傣族景颇族自治州', '临沧市', '普洱市', '玉溪市', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '巴音郭楞蒙古自治州', '阿克苏地区', '阿拉尔市', '图木舒克市', '伊犁哈萨克自治州', '博尔塔拉蒙古自治州', '塔城地区', '克拉玛依市', '昌吉回族自治州', '乌鲁木齐市', '吐鲁番地区', '哈密地区', '阿勒泰地区', '铁门关市', '五家渠市', '石河子市', '北屯市', '双河市']



    // 初始化echarts控件
    ret.init = function () {
        // zbc 
        var echarts = require('echarts');
        if (echarts) {
            console.log('echarts初始化成功')
        }
    }

    //注册图表
    var echarts = require('echarts');
    var mychart0 = echarts.init(document.getElementById('chart0'));
    var mychart1 = echarts.init(document.getElementById('echt1'));
    var mychart2 = echarts.init(document.getElementById('echt2'));
    var mychart3 = echarts.init(document.getElementById('echt3'));

    //画地图
    ret.draw_operator = function (type, name, data) {

        if (mychart0)
            mychart0.clear();

        //console.log(data)
        var option = {
            title: {
                left: 'center'
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: function (p) {
                    console.log()
                    var temp = p.name + '<br/>';
                    if (type == 'c') {
                        for (var i = 0; i < data["areaList"].length; i++) {
                            if (p.name == data["areaList"][i]["areaName"]) {
                                if (p.value >= data["areaList"][i]["limit"]) {
                                    temp += '<p class="redc">碳排放量:' + p.value + '</p>';
                                }
                                else if (p.value < data["areaList"][i]["limit"]) {
                                    temp += '碳排放量:' + p.value;
                                }
                                else {
                                    //temp += p.data.coord[2];
                                }
                            }                
                        }                   
                    }
                    if (type == 'energy') {
                        for (var i = 0; i < data["areaList"].length; i++) {
                            if (p.name == data["areaList"][i]["areaName"]) {
                                if (p.value >= data["areaList"][i]["limit"]) {
                                    temp += '<p class="redc">碳排放量:' + p.value + '</p>';
                                }
                                else if (p.value < data["areaList"][i]["limit"]) {
                                    temp += '碳排放量:' + p.value;
                                }
                                else {
                                    //temp += p.data.coord[2];
                                }
                            }
                        }
                    }
                    return temp
                }
            },
            legend: {
                show: false
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
                      mapType: name,
                      roam: false,
                      scaleLimit: {
                          min: 1,
                          max: 10
                      },
                      showLegendSymbol: false,
                      selectedMode: true,
                      label: {
                          normal: {
                              show: false
                          },
                          emphasis: {
                              show: false
                          }
                      },
                      data: [
                          { name: '', value: 0 }
                      ],
                      itemStyle: {
                          emphasis: {
                              areaColor: 'rgba(255, 255, 0, 0.7)',
                              borderWidth: 3
                          }
                      }
                  }
            ]
        }

        option.series.push({
            name: '',
            type: 'map',
            mapType: name,
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
                for (var i = 0; i < data.areaList.length; i++) {
                    temp.push({ value: data.areaList[i].value, name: data.areaList[i].areaName })
                }
                return temp;
            })(),
            markPoint: (function () {
                var obj = {};


                obj = {
                    symbol: 'image://images2/position.png',
                    itemStyle: {
                        normal: { opacity: 1, }, emphasis: { opacity: 1, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowBlur: 20 }
                    },
                    data: (function () {
                        var temp = [];
                        for (var i = 0; i < data.compinfo.length; i++) {
                            temp.push({
                                //气球大小
                                symbolSize: (function () {
                                    var temp;
                                    if (data.compinfo[i].value >= 4000) {
                                        temp = [30, 50];
                                    }
                                    if (data.compinfo[i].value < 4000) {
                                        temp = [20, 30];
                                    }

                                    return temp;
                                })(),
                                name: data.compinfo[i].name,
                                coord: (function () {
                                    var temp2 = data.compinfo[i].position;
                                    temp2.push(data.compinfo[i].value);
                                    return temp2;
                                })(),
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '某某企业',
                                        textStyle: { color: 'black' }
                                    },
                                    emphasis: {
                                        show: true,
                                        color: 'red',
                                        borderWidth: 2,
                                        formatter: '某某企业',
                                        textStyle: { color: 'black' }
                                    }
                                }
                            })
                        }
                        return temp;
                    })(),
                };
                return obj;

            })()

        })

        mychart0.setOption(option)
    }

    // 绘制
    ret.draw = function (type, name, data) {
        // zbc    
        if (name == '云南') {
            ret.draw_operator(type, name, data);
            console.log('绘制地图，类型是' + type + '，省份名字是' + name)
        }

        if (name == '新疆') {
            ret.draw_operator(type, name, data);
            console.log('绘制地图，类型是' + type + '，省份名字是' + name)
        }

    }

    //画环状饼图
    ret.draw_pies = function (type, data) {

        var option1 = {
            backgroundColor: '#ffffff',
            title: {
                show: true,
                text: '标题1',
                subtext: '纯属虚构',
                x: 'right',
                y: 'bottom'
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: true,

                orient: 'vertical',
                x: 'left',
                data: (function () {
                    var temp = [];
                    for (var i = 0; i < data.outSide.length; i++) {
                        temp.push(data.outSide[i].name);
                    }
                    return temp;
                })()
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
            series: []

        }
        //填充series数据
        option1.series.push({
            name: data.inSideName,
            type: 'pie',
            radius: ['0%', '40%'],
            label: { normal: { position: 'inside' } },
            data: data.inSide
        })

        option1.series.push({
            name: data.outSideName,
            type: 'pie',
            radius: ['50%', '70%'],
            data: data.outSide
        })




        mychart1.setOption(option1)
    }

    //画折线图
    ret.draw_line = function (type, data) {

        var option2 = {
            backgroundColor: '#ffffff',
            title: {},
            tooltip: {},
            legend: {},
            yAxis: {
                type: 'value',
                max: data.leftYMax,
                min: data.leftYMin
            },
            xAxis: {
                type: 'category',
                data: data.xAxis
            },
            series: []
        }

        for (var i = 0; i < data.series.length;i++) {
            option2.series.push({
                type: 'line',
                name: data.series[i].name,
                data: data.series[i].data,             //需要再次填充
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
    ret.draw_bar = function (type, data) {

        var option3 = {
            backgroundColor: '#ffffff',
            title: {},
            tooltip: {},
            legend: {},
            yAxis: {
                type: 'category',
                data:[]
            },
            xAxis: {
                type: 'value',
                //max: data.barMax,
                //min: data.barMin
            },
            series: []
        };

        //获取name函数
        function getName(data) {
            var temp = [];
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i].name)
            }
            return temp
        }

        //获取bardata
        function getbar(data) {
            var temp = [];
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i].value);
            }
            return temp;
        }

        //
        function getbar2(x) {
            var temp = [];
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    temp.push(data[i].RESULTVALUE)
                }
            }
            return temp
        }




        //$.extend(option3.yAxis, { data: getName(data.bardata) })
        option3.series.push({
            type: 'bar',
            name: 'h1',
            data: getbar2(data),
            barMaxWidth: 50
        })
        console.log(option3)
        mychart3.setOption(option3)
    }


    return ret;
})