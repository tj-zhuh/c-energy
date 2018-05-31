
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    //行业selcet的数据
    ret.getBusinessOptions = function (callback) {

        var tempid = [];
        var tempname = [];

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

    //物料类别
    ret.getMcategoryOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/MaterialCategory/Getpage',
            type: 'get',
            data: {
                BUSINESSID: '',
                CATEGORYCODE: '',
                ofs: 0,
                ps: 7
            },
            success: function (data) {
                
                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].MCATEGORYID,
                        itemName: data.Models[i].CATEGORYDESC
                    })
                }

                callback(arr);
            }
        })
    }
    //已通
    ret.query = function (requestData, callback) {

        $.ajax({
            url: '/api/BusinessMaterial/GetPage',
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
        console.log(requestData)
        $.ajax({
            url: '/api/BusinessMaterial/Delete',
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
            url: '/api/BusinessMaterial/Add',
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
            url: '/api/BusinessMaterial/Edit',
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