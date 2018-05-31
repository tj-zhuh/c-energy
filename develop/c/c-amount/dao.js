
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

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
            error: function (req, msg) {
                console.log(msg);
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
            error: function (req, msg) {
                console.log(msg);
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
                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        companyId: data.Models[i].ENTERPRISEID,
                        companyName: data.Models[i].ENTERPRISENAME
                    })
                }
                callback(arr)

            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    ret.getGoalValue=function (condition, callback) {
        $.ajax({
            url: '/api/CarbonEmissions/GetCarbonTarget',
            type: 'get',
            data: condition,
            success: function (data) {
                callback(data.Models[0].CTARGETVALUE);
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取Grid
    ret.getGridData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/CarbonEmissions/GetIndustrialCarbonEmissionsGird',
            type: 'get',
            data: condition,
            //async:false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Models.length
                }
                if (item) {
                    callback(item);
                }
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })        
        //callback(item);
    }

    //获取Line
    ret.getLineData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/CarbonEmissions/GetCarbonEmissionsLine',
            type: 'get',
            data: condition,
            async:false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Total
                }               
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
        if (item) {
            callback(item)
        }
    }

    //获取Rank
    ret.getRankData = function (condition, callback) {

        var item = null;
        $.ajax({
            url: '/api/CarbonEmissions/GetCarbonEmissionsRank',
            type: 'get',
            data: condition,
            async:false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Total
                }            
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
        if (item) {
            callback(item)
        }
    }
    return ret;
})