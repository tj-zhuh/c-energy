
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    //排放源selcet的数据
    ret.getout_SourceOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/EmissionSource/GetList',
            type: 'get',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].EEMISSIONID,
                        itemName: data.Models[i].EMISSIONDESC
                    })
                }

                callback(arr);
            }
        })
    }

    //排放因子select的数据组
    ret.getcoeffientOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/EmissionFactor/GetList',
            type: 'get',
            data: '',
            success: function (data) {
                var item = data.Models;
                var arr = [];
                if (item&&item.length) {
                    for (var i = 0; i < item.length; i++) {
                        arr.push({
                            itemId: item[i].EFACTORID,
                            itemName: item[i].FACTORDESC
                        })
                    }
                }
                callback(arr);
            }
        })
    }

    //再绑定排放因子方法

    ret.getcoeffientOptions2 = function (condition, callback) {

        $.ajax({
            url: '/api/EmissionFactor/GetPage',
            type: 'get',
            data: condition,
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].EFACTORID,
                        itemName: data.Models[i].FACTORDESC
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


    //行业select的数据组
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

    //地区sele的数据组
    ret.getAreaOptions = function (callback) {
        var arr = [
            { itemId: 0, itemName: '全部' },
            { itemId: 1, itemName: '华北' },
            { itemId: 2, itemName: '东北' },
            { itemId: 3, itemName: '华东' },
            { itemId: 4, itemName: '华中' },
            { itemId: 5, itemName: '西北' },
            { itemId: 6, itemName: '南方' },
            { itemId: 7, itemName: '海南' },
        ];

        callback(arr);
    }

    //类别类型selec的数据组
    ret.getTypeSourceOptions = function (callback) {
        var arr = [
            { itemId: 1, itemName: '国标' },
            { itemId: 2, itemName: '指南' },
            { itemId: 3, itemName: '通用' },
        ];

        callback(arr);
    }


    //已通
    ret.query = function (requestData, callback) {

        $.ajax({
            url: '/api/FactorConfigGb/GetPage',
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
            url: '/api/FactorConfigGb/Delete',
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
            url: '/api/FactorConfigGb/Add',
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
            url: '/api/FactorConfigGb/Edit',
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