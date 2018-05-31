
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var ret = {};

    /*真数据专区*/
    //地区数据
    ret.getAreaData = function (callback) {

        $.ajax({
            url: '/api/ProvinceCode/GetList',
            type: 'get',
            success: function (data) {

                if (!data.Models.length) {
                    console.log('地区没查到任何数据')
                }
                else {
                    var arr = [];

                    for (var i = 0; i < data.Models.length; i++) {
                        arr.push({
                            itemId: data.Models[i].PROVINCEID,
                            itemName: data.Models[i].PROVINCENAME,
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

    //行业数据
    ret.getBusinessData = function (callback) {

        $.ajax({
            url: '/api/BusinessCode/GetList',
            type: 'get',
            success: function (data) {

                if (!data.Models.length) {
                    console.log('地区没查到任何数据')
                }
                else {
                    var arr = [];

                    for (var i = 0; i < data.Models.length; i++) {
                        arr.push({
                            itemId: data.Models[i].BUSINESSID,
                            itemName: data.Models[i].BUSINESSNAME,
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

    //企业数据
    ret.getEnterpriseData = function (condition, callback) {

        $.ajax({
            url: '/api/EnterpriseInfo/GetSome',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data.Models.length) {
                    console.log('企业没查到任何数据')
                    callback([])
                }
                else {
                    var arr = [];

                    for (var i = 0; i < data.Models.length; i++) {
                        arr.push({
                            itemId: data.Models[i].ENTERPRISEID,
                            itemName: data.Models[i].ENTERPRISENAME,
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

    //查询表格
    ret.getPageResults = function (condition, callback) {

        $.ajax({
            url: '/api/CPictures/GetPage',
            type: 'get',
            data: condition,
            success: function (data) {
                var arr = {};
                if (data.Models.length) {
                    arr = {
                        ENTERPRISEPICTUREID: data.Models[0].ENTERPRISEPICTUREID,
                        ENTERPRISEID: data.Models[0].ENTERPRISEID,
                        ENTERPRISENAME: data.Models[0].ENTERPRISENAME,
                        ENTERPRISEPICTURE: data.Models[0].ENTERPRISEPICTURE,
                        PICTURETYPE: data.Models[0].PICTURETYPE,
                    }
                }
                callback(arr);
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    return ret;
})