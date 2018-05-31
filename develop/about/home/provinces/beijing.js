
define(function (require) {

    var ret = {};

    ret.init = function () {

        $('#chart0').fadeOut(1000, callback());
        
            //$('#chart0').attr('style', 'display:none')
        function callback() {
            var newcht = $('<div class="chart-container" id="chart1" style="display:none"></div>');
            $('.marks.mark3').append(newcht);
            $('#chart1').fadeIn(2000)
        }
    };

    ret.draw = function (type,data) {
        $.get('/Map_JSON/beijing.json', function (beijingJ) {
            var echarts = require('echarts');

            var mychart1 = echarts.init(document.getElementById('chart1'));
            echarts.registerMap('beijing', beijingJ);

            option = {
                title: {
                    //text: '碳排放量',
                    //subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: function (p) {
                        var temp = p.name + '<br/>';
                        temp += '碳排放量:' + '一些内容' + '<br/>';
                        temp += '<p class="redc">能耗量:' + '另一些内容' + '</p>';
                        return temp
                    }
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    left: 'left',
                    selected: {
                        '一类碳排放': true,
                        '二类碳排放': true,
                        '三类碳排放': true
                    },
                    data: ['一类碳排放', '二类碳排放', '三类碳排放']
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
                    show: true,
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
                          mapType: 'beijing',
                          roam: false,
                          //roam:true,
                          //zoom:2,
                          scaleLimit: {
                              min: 1,
                              max: 10
                          },
                          showLegendSymbol: false,
                          selectedMode: true,
                          label: {
                              normal: {
                                  show: true,
                                  show:false,
                              },
                              emphasis: {
                                  show: false
                              }
                          },
                          data: [
                              { name: 'hehe', value: 0 }
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
            for (i = 0; i < data.length; i++) {
                option.series.push({
                    name: data[i].name,
                    type: 'map',
                    mapType: 'beijing',
                    showLegendSymbol: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: [
                        { name: '延庆县', value: data[i].data[0] },
                        { name: '怀柔区', value: data[i].data[1] },
                        { name: '密云县', value: data[i].data[2] },
                        { name: '平谷区', value: data[i].data[3] },
                        { name: '顺义区', value: data[i].data[4] },
                        { name: '昌平区', value: data[i].data[5] },
                        { name: '门头沟区', value: data[i].data[6] },
                        { name: '石景山区', value: data[i].data[7] },
                        { name: '海淀区', value: data[i].data[8] },
                        { name: '通州区', value: data[i].data[9] },
                        { name: '朝阳区', value: data[i].data[10] },
                        { name: '西城区', value: data[i].data[11] },
                        { name: '东城区', value: data[i].data[12] },
                        { name: '丰台区', value: data[i].data[13] },
                        { name: '房山区', value: data[i].data[14] },
                        { name: '大兴区', value: data[i].data[15] }            
                    ]
                })
            }
            mychart1.setOption(option);











        },cc1())

        function cc1() {
            $('#chart1').fadeIn(2000)
        }
    }







    return ret
})
