/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    //能源介质selcet的数据
    ret.getEMediumSelectOptions = function (callback) {
        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/EnergyMedium/GetList',
            type: 'get',
            success: function (data) {
                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].EMEDIUMID,
                        itemName: data.Models[i].ENERGYDESC
                    })
                }

                callback(arr);
            }
        })
    }

    //单位select的数据组
    ret.getUnitOptions = function (callback) {
        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/MeasureUnit/GetList',
            type: 'get',
            data: '',
            success: function (data) {
                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].UNITID,
                        itemName: data.Models[i].UNITDESC + '（' + data.Models[i].UNITCODE + '）'
                    })
                }

                callback(arr);
            }
        })
    }

    //行业select的数据组---待修改
    ret.getBusinessOptions = function (callback) {
        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/BusinessCode/GetList',
            type: 'get',
            data: '',
            success: function (data) {
                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].BUSINESSID,
                        itemName: data.Models[i].BUSINESSNAME
                    })
                }

                callback(arr);
            }
        })
    }

    //来源select的数据组---待修改
    ret.getSourceOptions = function (callback) {
        
        var arr = [{ itemId: 1, itemName: '国标' }, { itemId: 2, itemName: '指南' }, { itemId: 3, itemName: '通用' }];

        callback(arr);
    }

    //已通
    ret.query = function (requestData, callback) {
        $.ajax({
            url: '/api/EnergyFactorGb/GetPage',
            type: 'get',
            data: requestData,
            success: function (data) {
                var item = data.Models;

                if (item) {
                    callback({ list: item, total: data.Total })
                }
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }
    //已通
    ret.delete = function (requestData, callback) {
        $.ajax({
            url: '/api/EnergyFactorGb/Delete',
            type: 'delete',
            data: requestData,
            success: function () {
                // TODO 调用ajax删除数据
                callback({ success: true });  // 需要修改
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }
    //已通
    ret.add = function (requestData, callback) {
        console.log(requestData)
        $.ajax({
            url: '/api/EnergyFactorGb/Add',
            type: 'post',
            data: requestData,
            success: function () {
                // TODO 调用ajax删除数据
                callback({ success: true });  // 需要修改
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }
    //已通
    ret.edit = function (requestData, callback) {
        console.log(requestData)

        $.ajax({
            url: '/api/EnergyFactorGb/Edit',
            type: 'put',
            data: requestData,
            success: function () {
                // TODO 调用ajax删除数据
                callback({ success: true });  // 需要修改
            },
            error: function (a, b, c) { }
        })
    }

    return ret;
})