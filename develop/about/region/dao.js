
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var ret = {};
    //暂时用
    ret.DATA = ['迪庆藏族自治州', '丽江市', '怒江傈僳族自治州', '大理白族自治州', '昭通市', '楚雄彝族自治州', '昆明市', '曲靖市', '保山市', '德宏傣族景颇族自治州', '临沧市', '普洱市', '玉溪市', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '巴音郭楞蒙古自治州', '阿克苏地区', '阿拉尔市', '图木舒克市', '伊犁哈萨克自治州', '博尔塔拉蒙古自治州', '塔城地区', '克拉玛依市', '昌吉回族自治州', '乌鲁木齐市', '吐鲁番地区', '哈密地区', '阿勒泰地区', '铁门关市', '五家渠市', '石河子市', '北屯市', '双河市']

    ret.getCmapData = function (condition, callback) {

        var data = demoCmapData(condition);
        callback(data);
    }


    function demoCmapData(condition) {
        
        // zbc
        var data_obj = (function () {
            var temp = [];
            for (var i = 0; i < ret.DATA.length; i++) {
                temp.push({
                    areaName: ret.DATA[i],
                    value: randomData(),
                    limit: randomData()
                })
            }
            return temp;
        })()
        return data_obj;
    } 

    function demoBubble() {
        var temp = [];

        //for (var i = 0; i < 5; i++) {
        //    temp.push({ name: ('公司' + i).toString(), position: [randomdata(84, 88), randomdata(41, 44)], value: randomdata(1000, 5000) });
        //}

        temp.push({ name: '公司一', position: [81, 42], value: 1000 });
        temp.push({ name: '公司二', position: [83, 37], value: 1000 });
        temp.push({ name: '公司三', position: [87, 45], value: 1000 });

        return temp
    }


    //获得环状饼数据模型
    ret.getDemoPie = function (condition, callback) {


        //$.ajax({
        //    url: '/api/xxxx/xxxxxx',
        //    type: 'get',
        //    data: condition,
        //    success: function (data) {
        //        callback(data);
        //    }
        //})

        var data = demoPiesData(condition);
        callback(data);
    }


    //获得折线图数据模型
    ret.getDemoLine = function (condition, callback) {


        //$.ajax({
        //    url: '/api/xxxx/xxxxxx',
        //    type: 'get',
        //    data: condition,
        //    success: function (data) {
        //        callback(data);
        //    }
        //})

        var data = demoLineData(condition);
        callback(data);
    }

    //环状饼假数据生成函数
    function demoPiesData(condition) {

        var temp = {

            outSideName: '大标题1',

            inSideName: '大标题2',

            //外环数据组
            outSide: [
                { name: '名称1', value: randomData() },
                { name: '名称2', value: randomData() },
                { name: '名称3', value: randomData() },
                { name: '名称4', value: randomData() },
                { name: '名称5', value: randomData() },
                { name: '名称6', value: randomData() },
                { name: '名称7', value: randomData() }
            ],

            //内环数据组
            inSide: [
                { name: '名称8', value: randomData() },
                { name: '名称9', value: randomData() },
                { name: '名称10', value: randomData() },
            ]
        };
        return temp;

    }

    //折线图假数据生成函数
    function demoLineData(condition) {

        var type = condition.type;

        var temp = {
            lineMax: 1000,
            lineMin: 0,
            barMax: 1000,
            barMin: 0,
            linedata: [randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData(), randomData()],
            bardata: [{ name: '行业1', value: randomData() }, { name: '行业2', value: randomData() }]
        }
        return temp
    }

    //工具函数随机数
    function randomData() {
        return (Math.round(Math.random() * 1000)).toFixed(2);
    }
    //工具函数带最大最小值
    function randomdata(min, max) {
        return (max - min) * Math.random()*3+min
    }



    /*真数据专区*/

    //获得左侧三个数据
    ret.getLeftthree = function (condition, callback) {

        $.ajax({
            url: '/api/HomePage/GetStatisticsDetail',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data || !data.Models || !data.Models.length) {
                    console.log('左侧三数据服务器没返回任何东西！');
                }

                else {
                    var item = data.Models;

                    if (typeof callback == 'function') {
                        callback(item[0]);
                    }
                    else { throw new Error('查询左侧三个数据之后调用的函数不是一个function');}
                }
            }
        })
    }

    //获得地图数据
    ret.getRCmapData = function (type,condition, callback) {


        if (type == 'c') {
            $.ajax({
                url: '/api/HomePage/GetCarbonOfCity',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data ||!data.Models|| !data.Models.length) {
                        console.log('地图数据服务器没返回任何东西！，现在使用的是假数据');
                        var data2 = demoCmapData(condition);
                        if (typeof callback == 'function') {
                            callback(data2);
                        }
                        return
                    }

                    else {
                        var item = data.Models;
                        var temp = [];
                        for (var i = 0; i < item.length; i++) {
                            temp.push({
                                areaName: item[i].CITYNAME,
                                value: item[i].RESULTVALUE,
                                limit:item[i].TARGETVALUE
                            })
                        }

                        if (typeof callback == 'function') {
                            callback(temp);
                        }
                        else { throw new Error('c类型地图后接函数不是一个正确方法'); }
                    }
                }
            })
        }
        else if (type == 'energy') {

            $.ajax({
                url: '/api/HomePage/GetEnergyOfCity',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('地图数据服务器没返回任何东西！，现在使用的是假数据');
                        var data2 = demoCmapData(condition);
                        if (typeof callback == 'function') {
                            callback(data2);
                        }
                        return
                    }

                    else {
                        var item = data.Models;
                        var temp = [];
                        for (var i = 0; i < item.length; i++) {
                            temp.push({
                                areaName: item[i].CITYNAME,
                                value: item[i].RESULTVALUE,
                                limit: item[i].TARGETVALUE
                            })
                        }

                        if (typeof callback == 'function') {
                            callback(temp);
                        }
                        else { throw new Error('c类型地图后接函数不是一个正确方法'); }
                    }
                }
            })
        }

    }

    //获得地图上面气泡的数据
    ret.getBubbleData = function (type,condition, callback) {

        if (type == 'c') {
            $.ajax({
                url: '/api/HomePage/GetCarbonOfEnterprise',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('气泡数据服务器没返回任何东西！，现在使用的是假数据');
                        var data2 = demoBubble();
                        callback(data2);
                        return
                    }

                    else {
                        var item = data.Models;
                        var temp = [];
                        for (var i = 0; i < item.length; i++) {
                            temp.push({ name: item[i].ENTERPRISENAME, position: [item[i].LONGITUDE, item[i].LATITUDE], value: item[i].RESULTVALUE })
                        }

                        if (typeof callback == 'function') {
                            callback(temp);
                        }
                        else { throw new Error('c类型气泡后接函数不是一个正确方法'); }
                    }
                }
            })
        }
        else if (type == 'energy') {

            $.ajax({
                url: '/api/HomePage/GetEnergyOfEnterprise',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('气泡数据服务器没返回任何东西！现在使用的是假数据');
                        var data2 = demoBubble();
                        callback(data2);
                        return
                    }

                    else {
                        var item = data.Models;
                        var temp = [];
                        for (var i = 0; i < item.length; i++) {
                            temp.push({ name: item[i].ENTERPRISENAME, position: [item[i].LONGITUDE, item[i].LATITUDE], value: item[i].RESULTVALUE })
                        }

                        if (typeof callback == 'function') {
                            callback(temp);
                        }
                        else { throw new Error('c类型气泡后接函数不是一个正确方法'); }
                    }
                }
            })
        }
    }

    //获得饼图数据
    ret.getPieData = function (type, condition, callback) {

        if (type == 'c') {

            var PieData = {
                inSideName: '标题1',
                inSide: [],
                outSideName: '标题2',
                outSide: []
            };

            //行业数据
            $.ajax({
                url: '/api/HomePage/GetCarbonOfBusiness',
                type: 'get',
                data: condition,
                success: function (data1) {

                    if (!data1 || !data1.Models || !data1.Models.length) {
                        console.log('饼图行业数据服务器没返回任何东西！，现在使用的是假数据');
                        var data2 = demoPiesData(condition);
                        callback(data2);
                        return
                    }

                    else {
                        var item1 = data1.Models;

                        for (var i = 0; i < item1.length; i++) {
                            PieData["inSide"].push({
                                name: item1[i].BUSINESSNAME,
                                value: item1[i].RESULTVALUE
                            })
                        }
                        //地区数据
                        $.ajax({
                            url: '/api/HomePage/GetCarbonOfCity',
                            type: 'get',
                            data: condition,
                            success: function (data2) {

                                if (!data2 || !data2.Models || !data2.Models.length) {
                                    console.log('饼图地区数据服务器没返回任何东西！，现在使用的是假数据');
                                    var data2 = demoPiesData(condition);
                                    callback(data2);
                                    return
                                }

                                else {
                                    var item2 = data2.Models;

                                    for (var i = 0; i < item2.length; i++) {
                                        PieData["outSide"].push({
                                            name: item2[i].CITYNAME,
                                            value: item2[i].RESULTVALUE
                                        })
                                    }

                                    if (typeof callback == 'function') {
                                        callback(PieData);
                                    }
                                    else { throw new Error('c类型饼图后接函数不是一个正确方法'); }
                                }
                            }
                        })

                    }
                }
            })
        }
        else if (type == 'energy') {

            var PieData = {
                inSideName: '标题1',
                inSide: [],
                outSideName: '标题2',
                outSide: []
            };

            //行业数据
            $.ajax({
                url: '/api/HomePage/GetEnergyOfBusiness',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('饼图行业数据服务器没返回任何东西！现在使用的是假数据');
                        var data2 = demoPiesData(condition);
                        callback(data2);
                        return
                    }

                    else {
                        var item = data.Models;




                    }
                }
            })

            //地区数据
            $.ajax({
                url: '/api/HomePage/GetEnergyOfCity',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('饼图地区数据服务器没返回任何东西！，现在使用的是假数据');
                        var data2 = demoPiesData(condition);
                        callback(data2);
                        return
                    }

                    else {
                        var item = data.Models;




                    }
                }
            })

            //对饼数据的处理






            if (typeof callback == 'function') {
                callback(PieData);
            }
            else { throw new Error('energy类型饼图后接函数不是一个正确方法'); }
        }
    }

    //获得折线图数据
    ret.getLineData = function (type, condition, callback) {

        if (type == 'c') {
            $.ajax({
                url: '/api/HomePage/GetCarbonOfCityByMonth',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('折线数据服务器没返回任何东西！，现在使用的是假数据');
                        return
                    }

                    else {
                        var item = data.Models;



                        if (typeof callback == 'function') {
                            callback(item[0]);
                        }
                        else { throw new Error('c类型折线后接函数不是一个正确方法'); }
                    }
                }
            })
        }
        else if (type == 'energy') {

            $.ajax({
                url: '/api/HomePage/GetEnergyOfCityByMonth',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('折线数据服务器没返回任何东西！现在使用的是假数据');
                        return
                    }

                    else {
                        var item = data.Models;



                        if (typeof callback == 'function') {
                            callback(item[0]);
                        }
                        else { throw new Error('energy类型折线后接函数不是一个正确方法'); }
                    }
                }
            })
        }
    }

    //获得柱状图数据
    ret.getBarData = function (type, condition, callback) {

        if (type == 'c') {
            $.ajax({
                url: '/api/HomePage/GetCarbonOfBusiness',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('柱状图数据服务器没返回任何东西！，现在使用的是假数据');
                        return
                    }

                    else {
                        var item = data.Models;



                        if (typeof callback == 'function') {
                            callback(item);
                        }
                        else { throw new Error('c类型柱状图后接函数不是一个正确方法'); }
                    }
                }
            })
        }
        else if (type == 'energy') {

            $.ajax({
                url: '/api/HomePage/GetEnergyOfBusiness',
                type: 'get',
                data: condition,
                success: function (data) {

                    if (!data || !data.Models || !data.Models.length) {
                        console.log('柱状图数据服务器没返回任何东西！现在使用的是假数据');
                        return
                    }

                    else {
                        var item = data.Models;



                        if (typeof callback == 'function') {
                            callback(item);
                        }
                        else { throw new Error('energy类型柱状图后接函数不是一个正确方法'); }
                    }
                }
            })
        }
    }


    return ret;
})