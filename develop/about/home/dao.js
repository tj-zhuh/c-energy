
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var ret = {};

    //模拟顺序城市
    var DATA = ['北京', '安徽', '澳门', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '黑龙江', '河南', '湖北', '湖南', '江苏', '江西', '吉林', '辽宁', '内蒙古', '宁夏', '青海', '山东', '上海', '山西', '陕西', '四川', '台湾', '天津', '香港', '新疆', '西藏', '云南', '浙江'];

    function check_ifnull(x) {
        if (!x) { return 0; }
        else{ return x }
    }
     
    //获得地图数据模型
    ret.getCmapData = function (type,condition, callback) {

        if (type == 'c') {
            $.ajax({
                url: '/api/HomePage/GetCarbonOfProvince',
                type: 'get',
                data: condition,
                success: function (data) {
                    //console.log(data)
                    if (!data||!data.Models) {
                        //util.confirm('现在地图展示的是假数据');
                        data = demoCmapData(condition);
                        callback(data);

                    }
                    else {
                        //对真数据进行处理
                        //util.confirm('现在地图展示的是真数据', function () {
                        //    console.log(1234567)
                        //});
                        var item = data.Models;
                        var temp = [];

                        for (var i = 0; i < item.length; i++) {
                            temp.push({
                                areaName: item[i].PROVINCENAME.slice(0,2),
                                val: check_ifnull(item[i].RESULTVALUE),
                                cLimit: item[i].TARGETVALUE,
                            })
                        }
                        callback(temp);
                    }
                    
                }
            })
        }

        else if (type == 'energy') {
            $.ajax({
                url: '/api/HomePage/GetEnergyOfProvince',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data||!data.Models) {
                        util.confirm('现在展示的是假数据');
                        data = demoCmapData(condition);
                        callback(data);

                    }
                    else {
                        //util.confirm('现在有数据了，请改回真数据，否则不显示任何内容');
                        //对真数据进行处理
                        var item = data.Models;
                        var temp = [];

                        for (var i = 0; i < item.length; i++) {
                            temp.push({
                                areaName: item[i].PROVINCENAME.slice(0, 2),
                                val: check_ifnull(item[i].RESULTVALUE),
                                eLimit: item[i].TARGETVALUE,
                            })
                        }

                        callback(temp);
                    }
                }
            })
        }
    }
     
    //获得千层饼数据模型
    ret.getPieData = function (type,choice,condition, callback) {

        if (type == 'c') {
            if (choice == 'area') {
                $.ajax({
                    url: '/api/HomePage/GetCarbonOfProvinceByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data||!data.Models) {
                            console.log('当前饼图是假数据，类型为' + type + '-' + choice + '的饼');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                circles: null,
                                legend: [],
                                sdata: []
                            };

                            temp.circles = item[0].series[0].data.length

                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(item[0].series[i].name)
                                temp.sdata.push({
                                    name: item[0].series[i].name,
                                    data: (function () {
                                        var tt = [];
                                        for (var j = 0; j < item[0].series[i].data.length; j++) {
                                            tt.push(item[0].series[i].data[j]);
                                        }
                                        return tt
                                    })()
                                })
                            }

                            callback(temp);
                        }
                    }
                })
            }
            else if (choice == 'industry') {
                $.ajax({
                    url: '/api/HomePage/GetCarbonOfBusinessByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前饼图是假数据，类型为' + type + '-' + choice + '的饼');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                circles: null,
                                legend:[],
                                sdata:[]
                            };

                            temp.circles = item[0].series[0].data.length

                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(item[0].series[i].name)
                                temp.sdata.push({
                                    name: item[0].series[i].name,
                                    data:( function () {
                                        var tt = [];
                                        for (var j = 0; j < item[0].series[i].data.length; j++) {
                                            tt.push(item[0].series[i].data[j]);
                                        }
                                        return tt
                                    })()
                                })
                            }

                            callback(temp);
                        }
                    }
                })
            }
        }
        else if (type == 'energy') {
            if (choice == 'area') {
                $.ajax({
                    url: '/api/HomePage/GetEnergyOfProvinceByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前饼图是假数据，类型为' + type + '-' + choice + '的饼');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                circles: null,
                                legend: [],
                                sdata: []
                            };

                            temp.circles = item[0].series[0].data.length

                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(item[0].series[i].name)
                                temp.sdata.push({
                                    name: item[0].series[i].name,
                                    data: (function () {
                                        var tt = [];
                                        for (var j = 0; j < item[0].series[i].data.length; j++) {
                                            tt.push(item[0].series[i].data[j]);
                                        }
                                        return tt
                                    })()
                                })
                            }

                            callback(temp);
                        }
                    }
                })
            }
            else if (choice == 'industry') {
                $.ajax({
                    url: '/api/HomePage/GetEnergyOfBusinessByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前饼图是假数据，类型为' + type + '-' + choice + '的饼');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                circles: null,
                                legend: [],
                                sdata: []
                            };

                            temp.circles = item[0].series[0].data.length

                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(item[0].series[i].name)
                                temp.sdata.push({
                                    name: item[0].series[i].name,
                                    data: (function () {
                                        var tt = [];
                                        for (var j = 0; j < item[0].series[i].data.length; j++) {
                                            tt.push(item[0].series[i].data[j]);
                                        }
                                        return tt
                                    })()
                                })
                            }

                            callback(temp);
                        }
                    }
                })
            }
        }
    

    }
     
    //获得折线图数据模型
    ret.getLineData = function (type, choice,condition, callback) {

        if (type == 'c') {
            if (choice == 'area') {
                $.ajax({
                    url: '/api/HomePage/GetCarbonOfProvinceByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前折线图是假数据，类型为' + type + '-' + choice + '的折线图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                yAxisMin: null,
                                yAxisMax: null,
                                xAxis: null,
                                series: null,
                                legend: []
                            };

                            temp.yAxisMax = item[0].leftYMax;
                            temp.yAxisMin = item[0].leftYMin
                            temp.xAxis = item[0].xAxis

                            temp.series = item[0].series
                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(
                                    item[0].series[i].name
                                )
                            }

                            callback(temp);
                        }
                    }
                })
            }
            else if (choice == 'industry') {
                $.ajax({
                    url: '/api/HomePage/GetCarbonOfBusinessByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前折线图是假数据，类型为' + type + '-' + choice + '的折线图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                yAxisMin: null,
                                yAxisMax: null,
                                xAxis: null,
                                series: null,
                                legend:[]
                            };

                            temp.yAxisMax = item[0].leftYMax;
                            temp.yAxisMin = item[0].leftYMin
                            temp.xAxis = item[0].xAxis
                            
                            temp.series=item[0].series
                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(
                                    item[0].series[i].name
                                )
                            }

                            callback(temp);
                        }
                    }
                })
            }
        }
        else if (type == 'energy') {
            if (choice == 'area') {
                $.ajax({
                    url: '/api/HomePage/GetEnergyOfProvinceByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前折线图是假数据，类型为' + type + '-' + choice + '的折线图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                yAxisMin: null,
                                yAxisMax: null,
                                xAxis: null,
                                series: null,
                                legend: []
                            };

                            temp.yAxisMax = item[0].leftYMax;
                            temp.yAxisMin = item[0].leftYMin
                            temp.xAxis = item[0].xAxis

                            temp.series = item[0].series
                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(
                                    item[0].series[i].name
                                )
                            }

                            callback(temp);
                        }
                    }
                })
            }
            else if (choice == 'industry') {
                $.ajax({
                    url: '/api/HomePage/GetEnergyOfBusinessByMonth',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前折线图是假数据，类型为' + type + '-' + choice + '的折线图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                yAxisMin: null,
                                yAxisMax: null,
                                xAxis: null,
                                series: null,
                                legend: []
                            };

                            temp.yAxisMax = item[0].leftYMax;
                            temp.yAxisMin = item[0].leftYMin
                            temp.xAxis = item[0].xAxis

                            temp.series = item[0].series
                            for (var i = 0; i < item[0].series.length; i++) {
                                temp.legend.push(
                                    item[0].series[i].name
                                )
                            }

                            callback(temp);
                        }
                    }
                })
            }
        }
    }

    //柱状图数据
    ret.getBarData = function (type, choice, condition, callback) {

        if (type == 'c') {
            if (choice == 'area') {
                $.ajax({
                    url: '/api/HomePage/GetCarbonOfProvince',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前柱状图是假数据，类型为' + type + '-' + choice + '的柱状图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                datas: [],
                                legend: []
                            };

                            for (var i = 0; i < item.length; i++) {
                                temp.legend.push(item[i].PROVINCENAME)
                                temp.datas.push(item[i].RESULTVALUE)
                            }

                            callback(temp);
                        }
                    }
                })
            }
            else if (choice == 'industry') {
                $.ajax({
                    url: '/api/HomePage/GetCarbonOfBusiness',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前柱状图是假数据，类型为' + type + '-' + choice + '的柱状图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                datas: [],
                                legend: []
                            };

                            for (var i = 0; i < item.length; i++) {
                                temp.legend.push(item[i].BUSINESSNAME)
                                temp.datas.push(item[i].RESULTVALUE)
                            }

                            callback(temp);
                        }
                    }
                })
            }
        }
        else if (type == 'energy') {
            if (choice == 'area') {
                $.ajax({
                    url: '/api/HomePage/GetEnergyOfProvince',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前柱状图是假数据，类型为' + type + '-' + choice + '的柱状图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                datas: [],
                                legend: []
                            };

                            for (var i = 0; i < item.length; i++) {
                                temp.legend.push(item[i].PROVINCENAME)
                                temp.datas.push(item[i].RESULTVALUE)
                            }

                            callback(temp);
                        }
                    }
                })
            }
            else if (choice == 'industry') {
                $.ajax({
                    url: '/api/HomePage/GetEnergyOfBusiness',
                    type: 'get',
                    data: condition,
                    success: function (data) {

                        if (!data || !data.Models) {
                            console.log('当前柱状图是假数据，类型为' + type + '-' + choice + '的柱状图');
                            data = demoPiesData(condition);

                            callback(data);
                        }
                        else {
                            var item = data.Models;
                            var temp = {
                                datas: [],
                                legend: []
                            };

                            for (var i = 0; i < item.length; i++) {
                                temp.legend.push(item[i].BUSINESSNAME)
                                temp.datas.push(item[i].RESULTVALUE)
                            }

                            callback(temp);
                        }
                    }
                })
            }
        }
    } 

    //获得左侧三个数字
    ret.getLeftThree = function (type,callback) {

        $.ajax({
            url: '/api/HomePage/GetStatisticsNumber',
            type: 'get',
            success: function (data) {

                if (!data || !data.Models) {
                    util.confirm('左侧3个圈圈没有查询到任何数据');
                    return
                }

                else {
                    var item = data.Models;
                    var temp = [];
                    for (var i = 0; i < item.length; i++) {
                        temp.push(item[i])
                    }                  
                    callback(temp)
                }
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })

    }

    ret.changePsw = function (oldPsw, newPsw, callback) { 
        callback(); 
    }

    ret.logout = function (callback) {
        callback();
    }

    /*假数据专区*/

    //地图假数据生成函数
    function demoCmapData(condition) {

        var type = condition.type;

        var data_obj = (function () {
            var temp = (function () {
                var temp = [];
                for (var i = 0; i < 34; i++) {
                    //权宜之策
                    if (DATA[i] == '云南') {
                        temp.push({
                            areaName: DATA[i],
                            c: randomData(),
                            energy: randomData(),
                            cLimit: 500,
                            eLimit: 700
                        })
                    }
                    else if (DATA[i] == '新疆') {
                        temp.push({
                            areaName: DATA[i],
                            c: randomData(),
                            energy: randomData(),
                            cLimit: 1000,
                            eLimit: 1100
                        })
                    }
                    else {
                        temp.push({
                            areaName: DATA[i],
                            c: 0,
                            energy: 0,
                            cLimit: randomData(),
                            eLimit: randomData()
                        })
                    }
                }
                return temp;

            })();
            return temp;
        })()
        return data_obj
    }

    //千层饼假数据生成函数
    function demoPiesData(condition) {
       
        var temp = {
            circles:30,         //千层饼层数


            sdata: [
              { name: '名称1', data: (function () { var temp = []; for (var i = 0; i < 30; i++) { temp.push(i * 128 + randomdata(10,100)) }; return temp })() },
              { name: '名称2', data: (function () { var temp = []; for (var i = 0; i < 30; i++) { temp.push(i * 64 + randomdata(10, 100)) }; return temp })() },
              { name: '名称3', data: (function () { var temp = []; for (var i = 0; i < 30; i++) { temp.push(i * 32 + randomdata(10, 100)) }; return temp })() },
              { name: '名称4', data: (function () { var temp = []; for (var i = 0; i < 30; i++) { temp.push(i * 16 + randomdata(10, 100)) }; return temp })() },
              { name: '名称5', data: (function () { var temp = []; for (var i = 0; i < 30; i++) { temp.push(i * 8 + randomdata(10, 100)) }; return temp })() },
            ]
        };
        return temp;
        //var series = [];
        //for (var i = 0; i < 30; i++) {
        //    series.push({
        //        name: '浏览器（数据纯属虚构）',
        //        type: 'pie',
        //        itemStyle: {
        //            normal: {
        //                label: { show: false },
        //                labelLine: { show: false, length: 20 }
        //            }
        //        },
        //        radius: [i * 4 + 40, i * 4 + 43],
        //        data: [
        //            { value: i * 128 + 80, name: 'Chrome' },
        //            { value: i * 64 + 160, name: 'Firefox' },
        //            { value: i * 32 + 320, name: 'Safari' },
        //            { value: i * 16 + 640, name: 'IE9+' },
        //            { value: i * 8 + 1280, name: 'IE8-' }
        //        ]
        //    })
        //}

        //return series;
       
    }

    //折线图假数据生成函数
    function demoLineData(condition) {

        var type = condition.type;

        var temp = {
            lineMax: 1000,
            lineMin: 0,
            barMax: 1000,
            barMin:0,
            linedata: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            bardata: [{ name: '行业1', value: randomData() }, { name: '行业2', value: randomData() }]
        }
        return temp
    }

    //工具函数随机数
    function randomData() {
        return Math.round(Math.random() * 1000);
    }

    //工具函数带最大最小值
    function randomdata(min, max) {
        return (max-min)*Math.random()*2
    }



    return ret;
})