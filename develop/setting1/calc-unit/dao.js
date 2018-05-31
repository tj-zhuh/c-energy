
/*  数据访问模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    ret.getGbCodeOptions = function (callback) {

        var arr = [];
        var flag = 0;   //判断重复值标志，有重复为1，无重复为0.

        $.ajax({
            url: '/api/MeasureUnit/GetList',
            type: 'get',
            success: function (data) {
                for (var i = 0; i < data.Models.length; i++) {
                    flag = 0;
                    for (var j = 0; j < i; j++) {
                        if (data.Models[i].GBUNITDESC == data.Models[j].GBUNITDESC)
                            flag = 1;
                    }
                    if (flag == 0) {
                        arr.push({
                            itemId: data.Models[i].UNITID,
                            itemName: data.Models[i].GBUNITDESC
                        })
                    }
                }

                callback(arr);
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    ret.query = function (requestData, callback) {

        $.ajax({
            url: '/api/MeasureUnit/GetPage',
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

    ret.delete = function (requestData, callback) {
        console.log(requestData)
        $.ajax({
            url: '/api/MeasureUnit/Delete',
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

    ret.add = function (requestData, callback) {

        $.ajax({
            url: '/api/MeasureUnit/Add',
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

    ret.edit = function (requestData, callback) {

        console.log(requestData)

        $.ajax({
            url: '/api/MeasureUnit/Edit',
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