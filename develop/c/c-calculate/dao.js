
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};
    var util=require('util')

    //获得计算结果数据
    ret.getCalcData = function (condition, callback) {
        $.ajax({
            url: '/api/CComputeResult/EexcuteFormula',
            type: 'post',
            data: condition,
            success: function (data) {
                var item = data.Models;

                if (item && item.length) {

                    var temp1 = { list: [], total: null };
                    var temp2 = { list: [], total: null };
                    var temp3 = { list: [], total: null };

                    var temp = item[0].Echart;

                    for (var i = 0; i < item[0].ActivityData.length; i++) {
                        temp1.list.push(item[0].ActivityData[i]);
                    }
                    temp1.total = item[0].ActivityData.length;

                    for (var i = 0; i < item[0].EmissionData.length; i++) {
                        temp2.list.push(item[0].EmissionData[i]);
                    }
                    temp2.total = item[0].EmissionData.length;

                    for (var i = 0; i < item[0].ResultTable.length; i++) {
                        temp3.list.push(item[0].ResultTable[i]);
                    }
                    temp3.total = item[0].ResultTable.length;

                    callback(temp, temp1, temp2, temp3)
                }

                else {
                    util.alert('暂无数据');
                    return;
                }

            },
            error: function (a,b,c) {
                console.log(a,b,c)
            }
        })
    }

    ret.getChartData = function () {
        var chartData = '';

        return chartData;
    }

    //查询区
    //获取省份
    ret.getProvinceList = function (callback) {

        $.ajax({

            url: '/api/ProvinceCode/GetList',
            type: 'get',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].PROVINCEID,
                        itemName: data.Models[i].PROVINCENAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })


    }

    //获取行业
    ret.getBusinessList = function (callback) {

        $.ajax({

            url: '/api/BusinessCode/GetList',
            type: 'get',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].BUSINESSID,
                        itemName: data.Models[i].BUSINESSNAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    //获取企业
    ret.getEnterpriseList = function (condition,callback) {

        $.ajax({

            url: '/api/EnterpriseInfo/GetSome',
            type: 'get',
            data:condition,
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].ENTERPRISEID,
                        itemName: data.Models[i].ENTERPRISENAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    //获取目标值
    ret.getTargetInfo = function (condition, callback) {

        $.ajax({

            url: '/api/CTargetValue/GetTargetInfo',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data.Models.length) { return }

                var temp = data.Models[0].CTARGETVALUE;

                callback(temp)

            }
        })
    }

    //获取计算公式
    ret.getcalcFormula = function (condition, callback) {
        $.ajax({
            url: '/api/FormulaFactor/GetFormula',
            type: 'get',
            data: condition,
            success: function (data) {
                if (!data || !data.Models || !data.Models.length) {
                    util.alert('没有获得计算公式');
                    return
                }
                else {
                    var temp = null;
                    var item = data.Models;

                    temp = (item[0].FORMULANOTE).replace(/\|/g, "");

                    if(typeof callback=='function'){callback(temp)}else{throw new Error('计算公式后面的后接函数不是一个方法')}
                }
            },
            error: function (z, b, c) {
                console.log(z,b,c)
            }
        })
    }

    //获取自定义核算方法
    ret.getMethodOptions = function (condition,callback) {
        $.ajax({
            url: '/api/FormulaFactor/GetSome',
            type: 'get',
            data: condition,
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].FORFACTORID,
                        itemName: data.Models[i].FACTORNAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }


    /////////////////////////////////////////////////////////////////////////////
    //ret.getInitData = function (condition, callback) {
    //    var data = demoInitData();
    //    callback(data);
    //}
    //function demoInitData() {

    //    var areaSource = [{
    //        areaId: '1',
    //        areaName: '云南11'
    //    }, {
    //        areaId: '2',
    //        areaName: '新疆'
    //    }];

    //    var businessSource = [{
    //        businessId: '1',
    //        businessName: '水泥'
    //    }];

    //    var companySource = [];
    //    for (var i = 0; i < 5; i++) {
    //        companySource.push({
    //            companyId: (i + 1).toString(),
    //            companyName: '测试企业' + (i + 1)
    //        })
    //    }

    //    var sequenceBoundary = {
    //        startYear: 2015,
    //        startMonth: 1,
    //        endYear: 2017,
    //        endMonth: 5
    //    }

    //    var ret = {
    //        areaSource: areaSource,
    //        businessSource: businessSource,
    //        companySource: companySource,
    //        sequenceBoundary: sequenceBoundary,
    //    }

    //    return ret;
    //}

    return ret;
})