
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};
    var util=require('util')

    //查询部分
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
    ret.getEnterpriseList = function (condition, callback) {

        $.ajax({

            url: '/api/EnergyUseEnterprise/GetEnterpriseList',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data.Models.length) {
                    console.log('现在企业是假的');

                    var arr = [
                        { companyId: '1', companyName: '企业名1' },
                        { companyId: '2', companyName: '企业名2' },
                        { companyId: '3', companyName: '企业名3' },
                        { companyId: '4', companyName: '企业名4' },
                    ]
                    callback(arr)
                }

                else {
                    var arr = [];

                    for (var i = 0; i < data.Models.length; i++) {
                        arr.push({
                            companyId: data.Models[i].ENTERPRISEID,
                            companyName: data.Models[i].ENTERPRISENAME
                        })
                    }
                    callback(arr)
                }

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    //获取目标值
    ret.getGoalValue = function (condition, callback) {

        $.ajax({

            url: '/api/CarbonEmissionAnalysis/GetEnergyTarget',
            type: 'get',
            data: condition,
            success: function (data) {

                if(!data.Models.length){return}

                var temp = data.Models[0].RESULTVALUE;

                callback(temp)

            }
        })
    }

    //获取自定义核算方法
    ret.getMethodOptions = function (condition, callback) {
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

    //表格
    ret.getCalcDatagrid = function (condition, callback) {

        $.ajax({
            url: '/api/CarbonEmissionAnalysis/GetCarbonEmissionAnalysisGird',
            type: 'get',
            data: condition,
            success: function (data) {
                var item = data.Models;

                if(item.length)
                {
                    var temp = { list: [], total: null };

                    for (var i = 0; i < item.length; i++) {
                        temp.list.push(item[i])
                    }
                    temp.total = item.length;
                    callback(temp);
                }
                
                else { util.alert('无返回数据');return }
                


            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }

        })






        //var data = demoCalcData();
        //callback(data);
    }

    //图线
    ret.getCalcDatachart = function (condition, callback) {

        $.ajax({
            url: '/api/CarbonEmissionAnalysis/GetCarbonEmissionAnalysisLine',
            type: 'get',
            data: condition,
            success: function (data) {
                var item = data.Models;
                if (item&&item.length)
                {
                    callback(item[0]);
                }
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }

        })
    }

    return ret;
})