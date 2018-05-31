
/*  数据访问模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    var demo = (function () {

        var _demo = {};

        _demo.demoGridData = function (condition) {
            var gridData = [];

            var tmparr = ['小明', '小红', '小白', '小黑'];
            var roleArr = ['角色1', '角色2', '管理员'];

            var ofs = condition.ofs || 0;
            var ps = condition.ps || 7;

            for (var i = 0; i < 4; i++) {
                var pt = i + 1;

                if (i >= ofs && i < ofs + ps) {
                    gridData.push({
                        INDEX: pt.toString(),
                        USERID: pt.toString(),
                        USERNAME: tmparr[i],
                        ROLENAME: roleArr[i%3],
                    })
                }
            }

            return {
                list: gridData,
                total: 4
            };
        }

        return _demo;

    })();

    //角色select的数据组
    ret.getRoleOptions = function (callback) {

        var arr = [];
        var cat = new Array('管理员', '用户1', '用户2');
        var ids = ['admin', 'role1', 'role2']

        for (var i = 0; i < 3; i++) {
            arr.push({
                itemId: ids[i],
                itemName: cat[i]
            })
        }
        callback(arr);
    }

    ret.query = function (requestData, callback) {
        var data = demo.demoGridData(requestData); // 暂时使用测试数据，需要修改为ajax
        callback(data);
    }
    
    ret.query2 = function (requestData, callback) {

        $.ajax({
            url: '/api/ManageUser/GetUsers',
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

        $.ajax({
            url: '/api/ManageUser/Delete',
            type: 'delete',
            data: requestData,
            success: function () {
                callback({ success: true });  // 需要修改
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    ret.add = function (requestData, callback) {
        $.ajax({
            url: '/api/ManageUser/Add',
            type: 'post',
            data: requestData,
            success: function () {
                callback({ success: true });  // 需要修改
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    ret.edit = function (requestData, callback) {
        $.ajax({
            url: '/api/ManageUser/Edit',
            type: 'put',
            data: requestData,
            success: function () {
                callback({ success: true });  // 需要修改
            },
            error: function (a, b, c) { }
        })
    }

    //重置密码
    ret.reset = function (rdata, callback) {
        $.ajax({
            url: "/api/ManageUser/ResetPwd",
            type: 'put',
            data:rdata,
            success: function (data) {
                callback();
            },
            error: function (a, b, c) {
                console.log(a,b,c)
            }
        })
    }



    return ret;
})