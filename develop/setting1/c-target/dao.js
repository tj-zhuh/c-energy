
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

    //地区select的数据组
    ret.getAreaOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/ProvinceCode/GetList',
            type: 'get',
            data: '',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].PROVINCEID,
                        itemName: data.Models[i].PROVINCENAME
                    })
                }

                callback(arr);
            }
        })
    }

    //年份select的数据（自定义，从‘2012年’至‘今年+5年’，不关联数据库）
    ret.getYearOptions = function (callback) {

        var arr = [];
        var date = new Date;
        var startYear = 2012;
        var range = date.getFullYear() - 2007;
        for (var i = 0; i < range; i++) {
            arr.push({
                itemId: startYear + i,
                itemName: startYear + i + '年'
            })
        }
        callback(arr);
    }

    //企业select的数据组
    ret.getEnterpriseOptions = function (callback) {

        var tempid = [];
        var tempname = [];

        $.ajax({
            url: '/api/EnterpriseInfo/GetList',
            type: 'get',
            data: '',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].ENTERPRISEID,
                        itemName: data.Models[i].ENTERPRISENAME
                    })
                }

                callback(arr);
            }
        })
    }

    //获取企业
    ret.getEnterpriseList = function (condition, callback) {

        $.ajax({

            url: '/api/EnterpriseInfo/GetSome',
            type: 'get',
            data: condition,
            success: function (data) {
                var arr = [];
                
                //if (!data.Models.length) {
                //    alert('没有数据！！');
                //    arr.push({
                //        itenId: '',
                //        itemName: ''
                //    })
                //}
                //else {

                    for (var i = 0; i < data.Models.length; i++) {
                        arr.push({
                            itemId: data.Models[i].ENTERPRISEID,
                            itemName: data.Models[i].ENTERPRISENAME
                        })
                    }

                    callback(arr)
                //}


            },
            error: function (a, b, c) {
                console.log(a, b, c)
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

    //类型select的数据组
    ret.getTypeOptions = function (callback) {
        var arr = [
            { itemId: 1, itemName: '企业自查' },
            { itemId: 2, itemName: '核查公司' },
            { itemId: 3, itemName: '国家配额' },
        ];
        callback(arr);
    }

    //已通
    ret.query = function (requestData, callback) {

        $.ajax({
            url: '/api/CTargetValue/GetPage',
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
            url: '/api/CTargetValue/Delete',
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
        
        $.ajax({
            url: '/api/CTargetValue/Add',
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
            url: '/api/CTargetValue/Edit',
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