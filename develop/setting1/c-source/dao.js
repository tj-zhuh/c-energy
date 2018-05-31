
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};


    //小表格数据
    ret.getLightdata = ['碳排放元类别名称1', '碳排放元类别名称2', '碳排放元类别名称3', '碳排放元类别名称4', '碳排放元类别名称5', ]

    //行业selcet的数据
    ret.getIndustryOptions = function (callback) {

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

    //国标类别select的数据
    ret.getGbOptions = function (callback) {
        var arr = [];
        $.ajax({
            url: '/api/EmissionType/GetList',
            type: 'get',
            success: function (data) {
                for (var i = 0; i < data.Models.length; i++) {
                    if (data.Models[i].EMISSIONTYPESOURCE == '1' || data.Models[i].EMISSIONTYPESOURCE == '3') {
                        arr.push({
                            itemId: data.Models[i].EMISSIONTYPEID,
                            itemName: data.Models[i].EMISSIONDESC
                        })
                    }
                }

                callback(arr);
            }
        })
    }

    //指南类别select的数据
    ret.getZnOptions = function (callback) {
        var arr = [];
        $.ajax({
            url: '/api/EmissionType/GetList',
            type: 'get',
            success: function (data) {

                for (var i = 0; i < data.Models.length; i++) {
                    if (data.Models[i].EMISSIONTYPESOURCE == '2' || data.Models[i].EMISSIONTYPESOURCE == '3')
                        arr.push({
                            itemId: data.Models[i].EMISSIONTYPEID,
                            itemName: data.Models[i].EMISSIONDESC
                        })
                }

                callback(arr);
            }
        })
    }

    //通用类别select的数据
    ret.getCmOptions = function (callback) {
        var arr = [];
        $.ajax({
            url: '/api/EmissionType/GetList',
            type: 'get',
            success: function (data) {

                for (var i = 0; i < data.Models.length; i++) {
                    if (data.Models[i].EMISSIONTYPESOURCE == '3')
                        arr.push({
                            itemId: data.Models[i].EMISSIONTYPEID,
                            itemName: data.Models[i].EMISSIONDESC
                        })
                }

                callback(arr);
            }
        })
    }

    //排放源类别类型selec的数据组
    ret.getTypeSourceOptions = function (callback) {
        var arr = [
            { itemId: '1', itemName: '国标' },
            { itemId: '2', itemName: '指南' },
            { itemId: '3', itemName: '通用' }
        ]

        callback(arr);
    }

    //排放源类别类型selec的数据组
    ret.getDiffOptions = function (callback) {
        var arr = [
            { itemId: '1', itemName: '仅属于国标类别' },
            { itemId: '2', itemName: '仅属于指南类别' },
            { itemId: '3', itemName: '属于通用类别' },
            { itemId: '4', itemName: '需按国标和指南各自划分' }
        ]

        callback(arr);
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

    //排放源类别select
    ret.getClassOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/EmissionType/GetList',
            type: 'get',
            data: '',
            success: function (data) {

                var arr = [];
                var item = data.Models;

                for (var i = 0; i < item.length; i++) {
                    
                    arr.push({
                        itemId: data.Models[i].EMISSIONTYPEID,
                        itemName: data.Models[i].EMISSIONTYPEDESC
                    })
                }

                callback(arr);

            }
        })
    }

    //排放源类别条件select
    ret.getClassOptions2 = function (dataRequest, callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/EmissionType/GetList',
            type: 'get',
            data: dataRequest,
            success: function (data) {

                var arr = [];
                var item = data.Models;

                for (var i = 0; i < item.length; i++) {

                    arr.push({
                        itemId: data.Models[i].EMISSIONTYPEID,
                        itemName: data.Models[i].EMISSIONTYPEDESC
                    })
                }

                callback(arr);

            }
        })
    }

    var demo = (function () {

        var _demo = {};

        _demo.demoGridData = function (condition) {
            var gridData = [];

            var tmparr = ['平瘦煤', '柴油', '电力', '地表水'];

            var ofs = condition.ofs || 0;
            var ps = condition.ps || 7;

            for (var i = 0; i < 50; i++) {
                var pt = i + 1;

                if (i >= ofs && i < ofs + ps) {
                    gridData.push({
                        index: pt.toString(),
                        cSourceId: pt.toString(),
                        industry: '',
                        cOutputType: '',
                        cName: '',
                        calulateUnit: '',
                        paramName: '',
                        paramName1: ''

                    })
                }
            }

            return {
                list: gridData,
                total: 50
            };
        }

        _demo.getCSourceCatelogs = function (condition) {
            var arr = [];
            for (var i = 0; i < 5; i++) {
                var pt = (i + 1).toString();
                arr.push({
                    itemId: pt,
                    itemName: '碳排放元类别名称' + pt
                })
            }
            return arr;
        }

        return _demo;

    })();

    ret.getCSourceCatelogs = function (callback) {
        var data = demo.getCSourceCatelogs();
        callback(data);
    }

    ret.updateCSourceCatelogs = function (data, callback) {
        // TODO 提交数据
        callback({ success: true });
    }

    //已通
    ret.query = function (requestData, callback) {

        $.ajax({
            url: '/api/EmissionSource/GetPage',
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
            url: '/api/EmissionSource/Delete',
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
            url: '/api/EmissionSource/Add',
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
            url: '/api/EmissionSource/Edit',
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