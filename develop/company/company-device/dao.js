
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    //获取选择企业
    ret.getEnterpriseName = function (callback) {
        $.ajax({
            url: '/api/KeyEnergyConsuEquip/GetCompany',
            type: 'get',
            data: {},
            success: function (data) {
                var arr;
                if (data) {                    
                    arr = data.Models[0];
                }
                callback(arr);
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取能源类别
    ret.getEnergyTypeList = function (callback) {
        $.ajax({
            url: '/api/KeyEnergyConsuEquip/GetParamList',
            type: 'get',
            data: {},
            success: function (data) {
                var arr = [];
                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].EPARAID,
                        itemName: data.Models[i].PARADESC
                    });
                }
                callback(arr);
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取Line
    ret.getLineData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/KeyEnergyConsuEquip/GetConsume',
            type: 'get',
            data: condition,
            async: false,
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
            callback(item);
        }
    }

    //获取其他信息
    ret.getRankData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/KeyEnergyConsuEquip/GetRunTimeAndRate',
            type: 'get',
            data: condition,
            async: false,
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
            callback(item);
        }
    }
    return ret;
})