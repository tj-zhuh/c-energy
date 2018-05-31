
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var ret = {};

    ret.getInitData = function (condition, callback) {
        var data = demoInitData();

        callback(data);
    }

 
    ret.getCompanySource = function (condition, callback) {
        var data = demoCompanySource();
        callback(data);
    }

    ret.getCalcData = function (condition, callback) {
        var data = demoCalcData();
        callback(data);
    }

    //查询区域
    //获取省份
    ret.getProvinceList = function (callback) {

        $.ajax({
            url: '/api/ProvinceCode/GetList',
            type: 'get',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        areaId: data.Models[i].PROVINCEID,
                        areaName: data.Models[i].PROVINCENAME
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

    //指标
    ret.getTargetSource = function (condition, callback) {

        $.ajax({
            url: '/api/EfficiencyAnalysis/GetEnergyConsumptionIndex',
            type: 'get',
            data: condition,
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].EINDEXID,
                        itemName: data.Models[i].INDEXNAME
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

            url: '/api/EfficiencyAnalysis/GetEnergyTarget',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data.Models.length) { callback(220);return}

                var temp = data.Models[0].SAVINGVALUE;

                callback(temp)

            }
        })
    }

    //获取不确定度(废弃)
    ret.getUncertainty = function (condition, callback) {
       
        $.ajax({

            url: '/api/BusinessCode/GetList',
            type: 'get',
            data: condition,
            success: function (data) {

                //if (!data.Models.length) { callback(220); return }


                callback(getRandom(0,100))
                

            }
        })
    }

    //获取表格
    ret.getGrid1 = function (condition, callback) {

        $.ajax({
            url: '/api/EfficiencyAnalysis/GetEnergyAnalysisGird',
            type: 'get',
            data: condition,
            success: function (data) {
                var item = data.Models;
                //console.log(data)
                var temp = { list: [], total: null };
                if (item && item.length) {
                    for (var i = 0; i < item.length; i++) {
                        temp.list.push(item[i])
                    }
                    temp.total = item.length;


                    callback(temp)
                }
                else{util.alert('没数据不好意思')}

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })

    
    }

    //折线
    ret.getLine = function (condition, callback) {

        $.ajax({
            url: '/api/EfficiencyAnalysis/GetEnergyAnalysisLine',
            type: 'get',
            data: condition,
            success: function (data) {

            
                if (data.Models && data.Models.length) {
                    callback(data.Models[0])

                }
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }



    function demoInitData() {

        var areaSource = [{
            areaId: '1',
            areaName: '云南'
        }, {
            areaId: '2',
            areaName: '新疆'
        }];

        var businessSource = [{
            businessId: '1',
            businessName: '水泥'
        }];

        var companySource = [];
        for (var i = 0; i < 5; i++) {
            companySource.push({
                companyId: (i + 1).toString(),
                companyName: '云南水泥厂' + (i + 1)
            })
        }

        var sequenceBoundary = {
            startYear: 2015,
            startMonth: 1,
            endYear: 2017,
            endMonth: 5
        }

        var targetSource = [{
            targetId: '1',
            targetName: '熟料综合煤耗'
        }, {
            targetId: '2',
            targetName: '某某指标'
        }];

        var ret = {
            areaSource: areaSource,
            businessSource: businessSource,
            companySource: companySource,
            sequenceBoundary: sequenceBoundary,
            targetSource: targetSource
        }

        return ret;
    }

    function demoCompanySource(condition) {
        var areaName
        if (condition.areaId == 1) {
            areaName = '云南';
        } else {
            areaName = '新疆';
        }

        var companySource = [];
        for (var i = 0; i < 5; i++) {
            companySource.push({
                companyId: (i + 1).toString(),
                companyName: areaName + '水泥厂' + (i + 1)
            })
        }

        return companySource;
    }

    function demoTargetSource(condition) {
        var source = [];
        source.push({
            targetId: '1',
            targetName: '塑料综合煤耗'
        });

        source.push({
            targetId: '2',
            targetName: '某某指标'
        });

        return source;
    }

    function getRandom(min, max) {
        return min + (max - min) * Math.random();
    }

    function demoCalcData(condition) {
        var grid1Data = [];

        for (var i = 0; i < 3; i++) {
            var pt = i + 1;
            grid1Data.push({
                companyId: pt.toString(),
                companyName: '企业' + pt,
                name: '某名称',
                cost: 100,
                uncertainty: 100
            })
        }

        var grid2Data = [];

        for (var i = 0; i < 20; i++) {
            var pt = i + 1;
            grid2Data.push({
                name: '某名称',
                valueBonudary: '某范围',
                uncertainty: 100
            })
        }

        function random_data(min, max) {
            var temp;
            temp = ((max - min) * Math.random()) + min;
            temp = temp.toFixed(2);
            return temp;
        }

        var chartData = {
            ymax: 1000,
            ymin: 200,
            yunit: '单位名称',
            linedata: [{
                name: '该序列名称',
                value: [
                    random_data(200, 1000), random_data(200, 1000), random_data(200, 1000), random_data(200, 1000),
                    random_data(200, 1000), random_data(200, 1000), random_data(200, 1000), random_data(200, 1000),
                    random_data(200, 1000), random_data(200, 1000), random_data(200, 1000), random_data(200, 1000)
                ]
            }]
        };

        return {
            grid1Data: grid1Data,
            grid2Data: grid2Data,
            chartData: chartData
        }
    }

    return ret;
})