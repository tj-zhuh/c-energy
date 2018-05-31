
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    //限额类型select的数据组
    ret.getLimitMatNameOptions = function (callback) {

        var arr = [];
        var cat = new Array('字段一', '字段二', '字段三');

        for (var i = 0; i < 3; i++) {
            arr.push({
                itemId: i + 1,
                itemName: cat[i]
            })
        }
        callback(arr);
    }


    //限额类型select的数据组
    ret.getLimitTypeOptions = function (callback) {

        var arr = [];
        var cat = new Array('限额值', '准入值', '先进值');

        //arr.push({
        //    itemId: '',
        //    itemName: '全部'
        //});

        for (var i = 0; i < 3; i++) {
            arr.push({
                itemId: i + 1,
                itemName: cat[i]
            })
        }
        callback(arr);
    }

    //行业selcet的数据
    ret.getBusinessOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/BusinessCode/GetList',
            type: 'get',
            success: function (data) {

                var arr = [];

                //arr.push({
                //    itemId: '',
                //    itemName: '全部'
                //});

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

    //单位select的数据组
    ret.getTypeOptions = function (callback) {
        var arr = [
            { itemId: 1, itemName: '国标' },
            { itemId: 2, itemName: '省标' },
            { itemId: 3, itemName: '国际' },
            { itemId: 4, itemName: '企业' },
        ]

        callback(arr);
    }

    //能耗指标类别select的数据组
    ret.getIndexOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/EnergyIndex/GetPage',
            type: 'get',
            data: { BUSINESSID: '', ofs: 0, ps: 7 },
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].EINDEXID,
                        itemName: data.Models[i].INDEXNAME
                    })
                }

                callback(arr);
            }
        })
    }

    ret.getIndexOptions2 = function (condition, callback) {
        $.ajax({
            url: '/api/EnergyIndex/GetPage',
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

                callback(arr);
            }
        })
    }


    //已通
    ret.query = function (requestData, callback) {

        $.ajax({
            url: '/api/EngergyLimit/GetPage',
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
            url: '/api/EngergyLimit/Delete',
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
            url: '/api/EngergyLimit/Add',
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
            url: '/api/EngergyLimit/Edit',
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